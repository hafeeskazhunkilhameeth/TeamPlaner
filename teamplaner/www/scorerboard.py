# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.utils import count_teilnehmer, count_total_teilnehmer, teilnehmer_details
from frappe.utils.data import nowdate
import json

#no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	if "TeamPlaner Scorer" not in frappe.get_roles(frappe.session.user):
		frappe.throw(_("You need a special role to access this page"), frappe.PermissionError)
	context.show_sidebar=True
	saisondaten = get_saisondaten()
	context['saisondaten'] = saisondaten
	context['top_ten'] = scorerliste()['top_ten']
	context['tabellendaten'] = frappe.db.sql("""SELECT
													`mitglied`.`vorname`,
													`mitglied`.`nachname`,
													`mitglied`.`mail`,
													`scorerliste`.`spiel`,
													`scorerliste`.`tor`,
													`scorerliste`.`assist`
												FROM (`tabTeamPlaner Mitglied` AS `mitglied`
												INNER JOIN `tabTeamPlaner Scorer Liste` AS `scorerliste` ON `mitglied`.`name` = `scorerliste`.`parent`)
												ORDER BY `scorerliste`.`spiel` DESC""", as_dict=True)
	context['spiele'] = []
	for x in context['tabellendaten']:
		if x.spiel not in context['spiele']:
			context['spiele'].append(x.spiel)
	
	return context
	
@frappe.whitelist()
def update_scorer(spiel, mail, tor, assist, total):
	parent = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{mail}'""".format(mail=mail), as_list=True)[0][0]
	frappe.db.sql("""UPDATE `tabTeamPlaner Scorer Liste` SET `tor` = '{tor}', `assist` = '{assist}', `total` = '{total}' WHERE `parent` = '{parent}' AND `spiel` = '{spiel}'""".format(tor=int(tor), assist=int(assist), total=int(total), parent=parent, spiel=spiel), as_list=True)
	return "OK"
	
@frappe.whitelist()
def update_scorer_alle(spiel, spieler, sh, sg, ssh, ssg):
	#sh = spiel 1 heim
	#sg = spiel 1 gast
	#ssh = spiel 2 heim
	# ssg = spiel 2 gast
	
	if isinstance(spieler, basestring):
		spieler = json.loads(spieler)
		for score in spieler:
			#frappe.throw(str(score))
			parent = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{mail}'""".format(mail=score[0]), as_list=True)[0][0]
			total = int(score[1]) + int(score[2])
			frappe.db.sql("""UPDATE `tabTeamPlaner Scorer Liste` SET `tor` = '{tor}', `assist` = '{assist}', `total` = '{total}' WHERE `parent` = '{parent}' AND `spiel` = '{spiel}'""".format(tor=int(score[1]), assist=int(score[2]), total=total, parent=parent, spiel=spiel), as_list=True)
		update_resultat = frappe.db.sql("""UPDATE `tabTeamPlaner Spiel` SET `eins_heim` = '{sh}', `eins_gast` = '{sg}', `zwei_heim` = '{ssh}', `zwei_gast` = '{ssg}' WHERE `name` = '{spiel}'""".format(sh=sh, ssh=ssh, sg=sg, ssg=ssg, spiel=spiel), as_list=True)
		return "OK"
	else:
		return "NOK"
	
def scorerliste():
	data = {}
	user = frappe.session.user
	# import datetime
	# jahr = str(datetime.date.today().year)
	saisondaten = get_saisondaten()
	von = saisondaten.saison_von
	bis = saisondaten.saison_bis
	if "TeamPlaner Spieler" not in frappe.get_roles(frappe.session.user):
		team = 'Herren 2'
	else:
		spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
		team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	data['top_ten'] = frappe.db.sql("""SELECT
											`mitglied`.`vorname` AS 'vorname',
											`mitglied`.`nachname` AS 'nachname',
											SUM(`score`.`tor`) AS 'tor',
											SUM(`score`.`assist`) AS 'assist',
											SUM(`score`.`total`) AS 'total'
										FROM `tabTeamPlaner Scorer Liste` AS `score`
										INNER JOIN `tabTeamPlaner Mitglied` AS `mitglied` ON `score`.`parent` = `mitglied`.`name`
										WHERE
											`score`.`spiel` >= '{von}'
											AND `score`.`spiel` <= '{bis}'
										GROUP BY `score`.`parent`
										ORDER BY SUM(`score`.`total`) DESC LIMIT 10""".format(von=von, bis=bis, team=team), as_dict=True)
	
	return data
	
def get_saisondaten():
	data = {}
	user = frappe.session.user
	if "TeamPlaner Spieler" not in frappe.get_roles(frappe.session.user):
		team = 'Herren 2'
	else:
		spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
		team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0] or 'Herren 2'
	saisondaten = frappe.db.sql("""SELECT `saison_von`, `saison_bis` FROM `tabTeamPlaner Team` WHERE `name` = '{team}'""".format(team=team), as_dict=True)
	return saisondaten[0]
	
@frappe.whitelist()
def get_resultat(spiel):
	resultate = []
	spiel = frappe.get_doc("TeamPlaner Spiel", spiel)
	verein = frappe.db.sql("""SELECT `team_von_verein` FROM `tabTeamPlaner Team` WHERE `name` = '{team}'""".format(team=spiel.team), as_list=True)[0][0]
	if not spiel.zwei_spiele == 1:
		_resultate = {}
		if spiel.eins_heimspiel == 1:
			_resultate['heim'] = verein
			_resultate['gegner'] = spiel.gegner
			_resultate['score_heim'] = spiel.eins_heim
			_resultate['score_gegner'] = spiel.eins_gast
		else:
			_resultate['heim'] = spiel.gegner
			_resultate['gegner'] = verein
			_resultate['score_heim'] = spiel.eins_heim
			_resultate['score_gegner'] = spiel.eins_gast
		resultate.append(_resultate)
			
	else:
		_resultate = {}
		if spiel.eins_heimspiel == 1:
			_resultate['heim'] = verein
			_resultate['gegner'] = spiel.gegner
			_resultate['score_heim'] = spiel.eins_heim
			_resultate['score_gegner'] = spiel.eins_gast
		else:
			_resultate['heim'] = spiel.gegner
			_resultate['gegner'] = verein
			_resultate['score_heim'] = spiel.eins_heim
			_resultate['score_gegner'] = spiel.eins_gast
		resultate.append(_resultate)
		_resultate = {}
		if spiel.zwei_heimspiel == 1:
			_resultate['heim'] = verein
			_resultate['gegner'] = spiel.zweiter_gegner
			_resultate['score_heim'] = spiel.zwei_heim
			_resultate['score_gegner'] = spiel.zwei_gast
		else:
			_resultate['heim'] = spiel.zweiter_gegner
			_resultate['gegner'] = verein
			_resultate['score_heim'] = spiel.zwei_heim
			_resultate['score_gegner'] = spiel.zwei_gast
		resultate.append(_resultate)
		
	return resultate