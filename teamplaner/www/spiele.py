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
	context['trainings'] = frappe.client.get_list('TeamPlaner Spiel', fields=['name', 'von', 'bis', 'ort', 'aufgebot_status', 'zwei_aufgebot_status', 'beschriftung', 'gegner', 'zweiter_gegner'], filters=[['datum','>=',nowdate()]], order_by='name', limit_page_length=1000)
	context['teilnehmer'] = {}
	context['spieler'] = {}
	i = 1
	context['trainings_kurz'] = []
	for training in context['trainings']:
		if i <= 5:
			context['trainings_kurz'].append(training)
			i += 1
		teiln = count_teilnehmer(training.name, 'TeamPlaner Spiel')
		total = count_total_teilnehmer(training.name, 'TeamPlaner Spiel')
		context['teilnehmer'][training.name] = '{teiln} von {total}'.format(teiln=teiln, total=total)
		context['spieler'][training.name] = teilnehmer_details(training.name, 'TeamPlaner Spiel')
	return context