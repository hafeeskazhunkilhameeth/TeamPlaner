# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.utils import count_teilnehmer, count_total_teilnehmer, teilnehmer_details, count_teilnehmer_spieler, count_teilnehmer_goalies
from frappe.utils.data import nowdate

#no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	if "TeamPlaner Spieler" not in frappe.get_roles(frappe.session.user):
		frappe.throw(_("Du benötigst eine Spieler Rolle für den Zugriff auf diese Seite"), frappe.PermissionError)
	context.show_sidebar=True
	user = frappe.session.user
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	context['trainings'] = frappe.client.get_list('TeamPlaner Training', fields=['name', 'von', 'bis', 'ort', 'beschriftung'], filters=[['datum','>=',nowdate()], ['team','=',team]], order_by='name', limit_page_length=1000)
	#obsolet
	#context['teilnehmer'] = {}
	
	context['teilnehmende_spieler'] = {}
	context['teilnehmende_goalies'] = {}
	context['spieler'] = {}
	i = 1
	context['trainings_kurz'] = []
	for training in context['trainings']:
		if i <= 5:
			context['trainings_kurz'].append(training)
			i += 1
		#obsolet
		#teiln = count_teilnehmer(training.name, 'TeamPlaner Training')
		
		teiln_spieler = count_teilnehmer_spieler(training.name, 'TeamPlaner Training')
		teiln_goalies = count_teilnehmer_goalies(training.name, 'TeamPlaner Training')
		total = count_total_teilnehmer(training.name, 'TeamPlaner Training')
		
		#obsolet
		#context['teilnehmer'][training.name] = '{teiln} von {total}'.format(teiln=teiln, total=total)
		
		context['teilnehmende_spieler'][training.name] = '{teiln_spieler} Spieler'.format(teiln_spieler=teiln_spieler)
		context['teilnehmende_goalies'][training.name] = '{teiln_goalies} Goalie(s)'.format(teiln_goalies=teiln_goalies)
		
		context['spieler'][training.name] = teilnehmer_details(training.name, 'TeamPlaner Training')
	return context
	
@frappe.whitelist()
def get_details(training):
	training = frappe.get_doc("TeamPlaner Training", training)
	return training.details