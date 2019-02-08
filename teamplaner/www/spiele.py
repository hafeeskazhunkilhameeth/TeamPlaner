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
	context['trainings'] = frappe.client.get_list('TeamPlaner Spiel', fields=['name', 'von', 'bis', 'ort', 'aufgebot_status', 'beschriftung', 'gegner'], filters=[['datum','>=',nowdate()]], order_by='name', limit_page_length=1000)
	context['teilnehmer'] = {}
	context['spieler'] = {}
	for training in context['trainings']:
		teiln = count_teilnehmer(training.name, 'TeamPlaner Spiel')
		total = count_total_teilnehmer(training.name, 'TeamPlaner Spiel')
		context['teilnehmer'][training.name] = '{teiln} von {total}'.format(teiln=teiln, total=total)
		context['spieler'][training.name] = teilnehmer_details(training.name, 'TeamPlaner Spiel')
	return context