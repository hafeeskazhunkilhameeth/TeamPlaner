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
	context['tabellendaten'] = frappe.db.sql("""SELECT DISTINCT
												`spiele`.`name` AS `spiel`,
												`mitglied_verweis`.`mail`,
												`mitglied`.`vorname`,
												`mitglied`.`nachname`,
												`scorerliste`.`tor`,
												`scorerliste`.`assist`,
												`scorerliste`.`total`
											FROM (((`tabTeamPlaner Spiel` AS `spiele`
											INNER JOIN `tabTeamPlaner Spieler Verweis Anwesenheit` AS `mitglied_verweis` ON `spiele`.`name` = `mitglied_verweis`.`parent`)
											INNER JOIN `tabTeamPlaner Mitglied` AS `mitglied` ON `mitglied`.`mail` = `mitglied_verweis`.`mail`)
											INNER JOIN `tabTeamPlaner Scorer Liste` AS `scorerliste` ON `spiele`.`name` = `scorerliste`.`spiel`)""", as_dict=True)
	context['spiele'] = []
	for x in context['tabellendaten']:
		if x.spiel not in context['spiele']:
			context['spiele'].append(x.spiel)
	return context