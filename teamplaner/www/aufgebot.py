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
	context.aufgebot_sidebar =True
	context['alle_spieler'] = alle_spieler()
	return context
	
def alle_spieler():
	user = frappe.session.user
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	alle_spieler = frappe.db.sql("""SELECT
									`mitglied`.`vorname`,
									`mitglied`.`nachname`,
									`mitglied`.`position`,
									`mitglied`.`bild`
									FROM (`tabTeamPlaner Mitglied` AS `mitglied`
									INNER JOIN `tabTeamplaner Team Verweis` AS `verweis` ON `mitglied`.`name` = `verweis`.`parent`)
									WHERE `verweis`.`team` = '{team}'""".format(team=team), as_dict=True)
									
	return alle_spieler