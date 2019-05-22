# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.teamplaner.doctype.teamplaner_mitglied.teamplaner_mitglied import invite_user, add_user_to_events
from teamplaner.www.statistik import get_saisondaten

#no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	if "TeamPlaner Trainer" not in frappe.get_roles(frappe.session.user):
		frappe.throw(_("Du benötigst eine Trainer Rolle für den Zugriff auf diese Seite"), frappe.PermissionError)
	context.show_sidebar=True
	
	context['spieler'] = frappe.db.sql("""SELECT `vorname`, `nachname`, `name` FROM `tabTeamPlaner Mitglied`""", as_dict=True)
	context['trainings'] = frappe.db.sql("""SELECT `name`, `ort` FROM `tabTeamPlaner Training`""", as_dict=True)
	context['spiele'] = frappe.db.sql("""SELECT `name`, `ort` FROM `tabTeamPlaner Spiel`""", as_dict=True)
	context['saisondaten'] = get_saisondaten()
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
	
@frappe.whitelist()
def get_spieler_details(spieler):
	spieler = frappe.get_doc("TeamPlaner Mitglied", spieler)
	return spieler
	
@frappe.whitelist()
def spieler_bearbeiten(spieler, vorname, nachname, lizenznummer, nummer, position, linie):
	spieler = frappe.get_doc("TeamPlaner Mitglied", spieler)
	spieler.vorname = vorname
	spieler.nachname = nachname
	spieler.lizenznummer = lizenznummer
	spieler.rueckennummer = nummer
	spieler.position = position
	spieler.linie = linie
	spieler.save()
	return spieler.name
	
@frappe.whitelist()
def spieler_entfernen(spieler):
	spieler = frappe.get_doc("TeamPlaner Mitglied", spieler)
	spieler.delete()
	return
	
@frappe.whitelist()
def neues_training(wann, wo, von, bis, details):
	training = frappe.new_doc("TeamPlaner Training")
	training.datum = wann
	training.ort = wo
	training.von = str(von) + ":00"
	training.bis = str(bis) + ":00"
	training.team = "Herren 2"
	training.details = details
	training.save()
	return training.name
	
@frappe.whitelist()
def get_training_details(training):
	training = frappe.get_doc("TeamPlaner Training", training)
	return training
	
@frappe.whitelist()
def training_bearbeiten(training, wo, von, bis, details):
	training = frappe.get_doc("TeamPlaner Training", training)
	training.ort = wo
	training.von = von
	training.bis = bis
	training.details = details
	training.save()
	return training.name
	
@frappe.whitelist()
def training_entfernen(training):
	training = frappe.get_doc("TeamPlaner Training", training)
	training.delete()
	return
	
@frappe.whitelist()
def neues_spiel(wann, wo, von, bis, gegner_1, zwei_spiele, gegner_2, eins_heimspiel, zwei_heimspiel):
	spiel = frappe.new_doc("TeamPlaner Spiel")
	spiel.datum = wann
	spiel.ort = wo
	spiel.von = str(von) + ":00"
	spiel.bis = str(bis) + ":00"
	spiel.team = "Herren 2"
	spiel.gegner = gegner_1
	spiel.zweiter_gegner = gegner_2
	spiel.zwei_spiele = zwei_spiele
	spiel.eins_heimspiel = eins_heimspiel
	spiel.zwei_heimspiel = zwei_heimspiel
	
	spiel.save()
	return spiel.name
	
@frappe.whitelist()
def get_spiel_details(spiel):
	spiel = frappe.get_doc("TeamPlaner Spiel", spiel)
	return spiel
	
@frappe.whitelist()
def spiel_entfernen(spiel):
	spiel = frappe.get_doc("TeamPlaner Spiel", spiel)
	spiel.delete()
	return
	
@frappe.whitelist()
def delete_old_data():
	training = frappe.db.sql("""DELETE FROM `tabTeamPlaner Training` WHERE `name` < CURDATE()""", as_dict=True)
	spiele = frappe.db.sql("""DELETE FROM `tabTeamPlaner Spiel` WHERE `name` < CURDATE()""", as_dict=True)
	return
	
@frappe.whitelist()
def change_saisondaten(von, bis):
	team = frappe.get_doc("TeamPlaner Team", "Herren 2")
	team.saison_von = von
	team.saison_bis = bis
	team.save()
	return