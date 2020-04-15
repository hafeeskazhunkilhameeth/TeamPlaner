# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	user = frappe.session.user
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	context['team'] = frappe.db.sql("""SELECT
										`mitglied`.`vorname`,
										`mitglied`.`nachname`,
										`mitglied`.`lizenznummer`,
										`mitglied`.`rueckennummer`,
										`mitglied`.`position`,
										`mitglied`.`bild`
									FROM `tabTeamplaner Team Verweis` AS `team`
									INNER JOIN `tabTeamPlaner Mitglied` as `mitglied`
									ON `team`.`parent` = `mitglied`.`name`
									WHERE `team` = '{team}'""".format(team=team), as_dict=True)
	
	return context