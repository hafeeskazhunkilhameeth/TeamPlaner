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
	context['alle_spiele'] = {}
	context['alle_spiele']['spiele'] = {}
	spiele = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Spiel` WHERE YEAR(`name`) = YEAR(CURDATE())""", as_dict=True)
	context['alle_spiele']['spiele'] = spiele
	for spiel in spiele:
		context['alle_spiele']['tabellen'] = frappe.db.sql("""SELECT `vorname`, `nachname`, `mail`, `parent` FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{spiel}' AND `parenttype` = 'TeamPlaner Spiel'""".format(spiel=spiel.name), as_dict=True)
		
	return context