# -*- coding: utf-8 -*-
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
	if "TeamPlaner Spieler" not in frappe.get_roles(frappe.session.user):
		frappe.throw(_("Du benötigst eine Spieler Rolle für den Zugriff auf diese Seite"), frappe.PermissionError)
	context.show_sidebar=True
	#context['bussen'] = 'vor spieler'
	#return context
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=frappe.session.user), as_list=True)[0][0]
	context['bussen'] = frappe.db.sql("""SELECT `training`, `spiel`, `bemerkung`, `betrag` FROM `tabTeamPlaner Bussenverweis` WHERE `parent` = '{spieler}' ORDER BY `creation` ASC""".format(spieler=spieler), as_list=True)
	#frappe.client.get_list('TeamPlaner Bussenverweis', fields=['training', 'spiel', 'bemerkung', 'betrag'], filters=[['parent','=',spieler]], order_by='creation', limit_page_length=1000)
	return context