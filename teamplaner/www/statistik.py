# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.utils import count_teilnehmer, count_total_teilnehmer, teilnehmer_details
from frappe.utils.data import nowdate

#no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	context.show_sidebar=True
	user = frappe.session.user
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	saisondaten = get_saisondaten()
	context['spieler_total_anwesend'] = spieler_all_over(spieler, team)['anwesend']
	context['spieler_total_abwesend'] = spieler_all_over(spieler, team)['abwesend']
	context['spieler_total_pro_monat'] = spieler_pro_monat()['anzahl_trainings']
	context['spieler_anwesend_pro_monat'] = spieler_pro_monat()['anzahl_anwesend']
	context['spieler_abwesend_pro_monat'] = spieler_pro_monat()['anzahl_abwesend']
	context['total_trainings_pro_monat'] = total_pro_monat()['total_anzahl_trainings']
	context['total_anwesend_pro_monat'] = total_pro_monat()['total_anzahl_anwesend']
	context['total_abwesend_pro_monat'] = total_pro_monat()['total_anzahl_abwesend']
	context['top_ten'] = scorerliste()['top_ten']
	context['saisondaten'] = saisondaten

	return context
	
def spieler_all_over(spieler, team):
	data = {}
	user = frappe.session.user
	# import datetime
	# jahr = datetime.date.today().year
	saisondaten = get_saisondaten()
	von = saisondaten.saison_von #str(jahr) + "-01-01"
	bis = saisondaten.saison_bis #str(jahr) + "-12-31"
	# spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	# team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	data['anwesend'] = frappe.db.sql("""
		SELECT COUNT(`name`)  FROM `tabTeamPlaner Spieler Verweis Anwesenheit`
		WHERE
			`status` = 'Anwesend'
			AND `mail` = '{user}'
			AND `parent` IN (SELECT `name` FROM `tabTeamPlaner Training` WHERE `team` = '{team}' AND `datum` >= '{von}' AND `datum` <= '{bis}')""".format(user=user, team=team, von=von, bis=bis), as_list=True)[0][0]
			
	data['abwesend'] = frappe.db.sql("""
		SELECT COUNT(`name`)  FROM `tabTeamPlaner Spieler Verweis Anwesenheit`
		WHERE
			`status` = 'Abwesend'
			AND `mail` = '{user}'
			AND `parent` IN (SELECT `name` FROM `tabTeamPlaner Training` WHERE `team` = '{team}' AND `datum` >= '{von}' AND `datum` <= '{bis}')""".format(user=user, team=team, von=von, bis=bis), as_list=True)[0][0]
	
	return data
	
def spieler_pro_monat():
	data = {}
	user = frappe.session.user
	# import datetime
	# jahr = str(datetime.date.today().year)
	# start_jan = jahr + "01-01"
	# ende_jan = jahr + "-01-"
	# von = str(jahr) + "-01-01"
	# bis = str(jahr) + "-12-31"
	saisondaten = get_saisondaten()
	von = saisondaten.saison_von
	bis = saisondaten.saison_bis
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	data['anzahl_trainings'] = frappe.db.sql("""SELECT
													MONTH(`datum`) AS 'monat',
													COUNT(`name`) AS 'anzahl'
												FROM `tabTeamPlaner Training`
												WHERE
													`datum` >= '{von}'
													AND `datum` <= '{bis}'
													AND `team` = '{team}'
												GROUP BY MONTH(`datum`)""".format(von=von, bis=bis, team=team), as_dict=True)
												
	data['anzahl_anwesend'] = frappe.db.sql("""SELECT
													MONTH(`datum`) AS 'monat',
													COUNT(`name`) AS 'anzahl'
												FROM `tabTeamPlaner Training`
												WHERE
													`datum` >= '{von}'
													AND `datum` <= '{bis}'
													AND `team` = '{team}'
													AND `name` IN (SELECT `parent` FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `status` = 'Anwesend' AND `mail` = '{user}')
												GROUP BY MONTH(`datum`)""".format(von=von, bis=bis, team=team, user=user), as_dict=True)
												
	data['anzahl_abwesend'] = frappe.db.sql("""SELECT
													MONTH(`datum`) AS 'monat',
													COUNT(`name`) AS 'anzahl'
												FROM `tabTeamPlaner Training`
												WHERE
													`datum` >= '{von}'
													AND `datum` <= '{bis}'
													AND `team` = '{team}'
													AND `name` IN (SELECT `parent` FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `status` = 'Abwesend' AND `mail` = '{user}')
												GROUP BY MONTH(`datum`)""".format(von=von, bis=bis, team=team, user=user), as_dict=True)
	
	return data
	
def total_pro_monat():
	data = {}
	user = frappe.session.user
	# import datetime
	# jahr = str(datetime.date.today().year)
	saisondaten = get_saisondaten()
	von = saisondaten.saison_von
	bis = saisondaten.saison_bis
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	data['total_anzahl_trainings'] = frappe.db.sql("""SELECT
													MONTH(`datum`) AS 'monat',
													COUNT(`name`) AS 'anzahl'
												FROM `tabTeamPlaner Training`
												WHERE
													`datum` >= '{von}'
													AND `datum` <= '{bis}'
													AND `team` = '{team}'
												GROUP BY MONTH(`datum`)""".format(von=von, bis=bis, team=team), as_dict=True)
												
	data['total_anzahl_anwesend'] = frappe.db.sql("""SELECT
														MONTH(`parent`) AS 'monat',
														COUNT(`name`) AS 'anzahl'
													FROM `tabTeamPlaner Spieler Verweis Anwesenheit`
													WHERE
													`parent` >= '{von}'
													AND `parent` <= '{bis}'
													AND `status` = 'Anwesend'
													AND `parent` IN (SELECT `name` FROM `tabTeamPlaner Training` WHERE `team` = '{team}')
													GROUP BY MONTH(`parent`)""".format(von=von, bis=bis, team=team), as_dict=True)
												
	data['total_anzahl_abwesend'] = frappe.db.sql("""SELECT
														MONTH(`parent`) AS 'monat',
														COUNT(`name`) AS 'anzahl'
													FROM `tabTeamPlaner Spieler Verweis Anwesenheit`
													WHERE
													`parent` >= '{von}'
													AND `parent` <= '{bis}'
													AND `status` = 'Abwesend'
													AND `parent` IN (SELECT `name` FROM `tabTeamPlaner Training` WHERE `team` = '{team}')
													GROUP BY MONTH(`parent`)""".format(von=von, bis=bis, team=team), as_dict=True)
	
	return data
	
def scorerliste():
	data = {}
	user = frappe.session.user
	# import datetime
	# jahr = str(datetime.date.today().year)
	saisondaten = get_saisondaten()
	von = saisondaten.saison_von
	bis = saisondaten.saison_bis
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
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	saisondaten = frappe.db.sql("""SELECT `saison_von`, `saison_bis` FROM `tabTeamPlaner Team` WHERE `name` = '{team}'""".format(team=team), as_dict=True)
	return saisondaten[0]