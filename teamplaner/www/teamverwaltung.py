# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.teamplaner.doctype.teamplaner_mitglied.teamplaner_mitglied import invite_user, add_user_to_events

#no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	if "TeamPlaner Trainer" not in frappe.get_roles(frappe.session.user):
		frappe.throw(_("Du benötigst eine Trainer Rolle für den Zugriff auf diese Seite"), frappe.PermissionError)
	context.show_sidebar=True
	
	return context
	
@frappe.whitelist()
def neuer_spieler(vorname, nachname, mail, lizenznummer, nummer, position, linie):
	spieler = frappe.new_doc("TeamPlaner Mitglied")
	spieler.vorname = vorname
	spieler.nachname = nachname
	spieler.mail = mail
	spieler.lizenznummer = lizenznummer
	spieler.rueckennummer = nummer
	spieler.position = position
	spieler.linie = linie
	team = spieler.append('belongs_to_team', {})
	team.team = "Herren 2"
	team.spieler = 1
	spieler.save()
	invite_user(spieler.name)
	add_user_to_events(spieler.name)
	return spieler.name