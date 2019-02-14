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
	if "TeamPlaner Scorer" not in frappe.get_roles(frappe.session.user):
		frappe.throw(_("You need a special role to access this page"), frappe.PermissionError)
	context.show_sidebar=True
	context['top_ten'] = scorerliste()['top_ten']
	context['tabellendaten'] = frappe.db.sql("""SELECT
													`mitglied`.`vorname`,
													`mitglied`.`nachname`,
													`mitglied`.`mail`,
													`scorerliste`.`spiel`,
													`scorerliste`.`tor`,
													`scorerliste`.`assist`
												FROM (`tabTeamPlaner Mitglied` AS `mitglied`
												INNER JOIN `tabTeamPlaner Scorer Liste` AS `scorerliste` ON `mitglied`.`name` = `scorerliste`.`parent`)""", as_dict=True)
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
	
def scorerliste():
	data = {}
	user = frappe.session.user
	import datetime
	jahr = str(datetime.date.today().year)
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
											YEAR(`score`.`spiel`) = '2019'
										GROUP BY `score`.`parent`
										ORDER BY SUM(`score`.`total`) DESC LIMIT 10""".format(jahr=jahr, team=team), as_dict=True)
	
	return data