# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.utils import count_teilnehmer, count_total_teilnehmer, teilnehmer_details
from frappe.utils.data import nowdate, add_days

#no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	context.show_sidebar=True
	context['spieler'] = spieler()
	return context
	
	
def spieler():
	spieler = []
	_spieler = frappe.db.sql("""SELECT `vorname`, `nachname` FROM `tabTeamPlaner Mitglied` ORDER BY `vorname` ASC""", as_dict=True)
	for s in _spieler:
		spieler.append(s.vorname + " " + s.nachname)
	return spieler
	
@frappe.whitelist()
def save_block(dl, dr, c, ol, _or, bemerkung):
	block = frappe.new_doc("Wunsch Block")
	username = frappe.get_doc("User", frappe.session.user)
	firstname = username.first_name or ''
	lastname = username.last_name or ''
	block.von = firstname + " " + lastname
	block.dl = dl
	block.dr = dr
	block.c = c
	block.ol = ol
	block._or = _or
	block.bemerkungen = bemerkung
	block.save()