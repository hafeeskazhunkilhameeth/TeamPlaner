# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

def count_teilnehmer(training, doctype):
	return frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `status` = 'Anwesend' AND `parenttype` = '{doctype}'""".format(training=training, doctype=doctype), as_list=True)[0][0]
	
def count_teilnehmer_spieler(training, doctype):
	return frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `status` = 'Anwesend' AND `parenttype` = '{doctype}' AND `position` != 'Torwart'""".format(training=training, doctype=doctype), as_list=True)[0][0]
	
def count_teilnehmer_goalies(training, doctype):
	return frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `status` = 'Anwesend' AND `parenttype` = '{doctype}' AND `position` = 'Torwart'""".format(training=training, doctype=doctype), as_list=True)[0][0]
	
def count_total_teilnehmer(training, doctype):
	return frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `parenttype` = '{doctype}'""".format(training=training, doctype=doctype), as_list=True)[0][0]
	

def teilnehmer_details(training, doctype):
	return frappe.db.sql("""SELECT `vorname`, `nachname`, `status`, `mail`, `bemerkung` FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `parenttype` = '{doctype}'""".format(training=training, doctype=doctype), as_list=True)
	
@frappe.whitelist()
def change_anwesenheit(training, spieler, status, busse="keine"):
	antwort = "keine_busse"
	if status == "Anwesend":
		new_status = "Abwesend"
		if busse != 'keine':
			if frappe.db.get_single_value('TeamPlaner Bussen', 'busse_anwesenheitskontrolle') == 1:
				add_busse(spieler, training)
				antwort = "busse"
	else:
		new_status = "Anwesend"
		
	frappe.db.sql("""UPDATE `tabTeamPlaner Spieler Verweis Anwesenheit` SET `status` = '{new_status}' WHERE `parent` = '{training}' AND `mail` = '{mail}'""".format(new_status=new_status, mail=spieler, training=training), as_list=True)
	return antwort
	
def add_busse(spieler, training):
	busse = frappe.db.sql("""SELECT `beschreibung`, `betrag` FROM `tabTeamPlaner Bussenkatalog` WHERE `standard` = 1 LIMIT 1""", as_list=True)[0]
	training = frappe.get_doc("TeamPlaner Training", training)
	mitglied = frappe.get_doc("TeamPlaner Mitglied", frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{mail}'""".format(mail=spieler), as_list=True)[0][0])
	row = mitglied.append('bussen', {})
	row.training = 1
	row.bemerkung = busse[0] + " - " + training.beschriftung
	row.referenz = training.name
	row.betrag = busse[1]
	mitglied.save()

	
@frappe.whitelist()
def get_aufgebot(spiel, ref):
	if ref == '1':
		anzahl_linien = frappe.db.sql("""SELECT `linien_anz` FROM `tabTeamPlaner Spiel` WHERE `name` = '{spiel}'""".format(spiel=spiel), as_list=True)[0][0]
		bemerkung = frappe.db.sql("""SELECT `aufgebot_bemerkungen` FROM `tabTeamPlaner Spiel` WHERE `name` = '{spiel}'""".format(spiel=spiel), as_list=True)[0][0]
		try:
			torwart = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `linie` = 'Torhüter' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)[0][0]
		except:
			torwart = 'n/a'
		# 1.linie
		eins_verteidiger = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Verteidiger' AND `linie` = '1.' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)
		try:
			eins_center = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Center / Top' AND `linie` = '1.' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)[0][0]
		except:
			eins_center = 'n/a'
		eins_fluegel = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Flügel' AND `linie` = '1.' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)
		# 2.linie
		zwei_verteidiger = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Verteidiger' AND `linie` = '2.' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)
		try:
			zwei_center = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Center / Top' AND `linie` = '2.' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)[0][0]
		except:
			zwei_center = 'n/a'
		zwei_fluegel = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Flügel' AND `linie` = '2.' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)
		# 3.linie
		drei_verteidiger = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Verteidiger' AND `linie` = '3.' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)
		try:
			drei_center = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Center / Top' AND `linie` = '3.' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)[0][0]
		except:
			drei_center = 'n/a'
		drei_fluegel = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Flügel' AND `linie` = '3.' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)
		# reserve
		reserve = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `linie` = 'Reserve' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)
		# kein aufgebot
		kein_aufgebot = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `linie` = 'Kein Aufgebot' AND `parentfield` = 'linien'""".format(spiel=spiel), as_list=True)
		
		team = {
			'tor': torwart,
			'eins': [eins_verteidiger, eins_center, eins_fluegel],
			'zwei': [zwei_verteidiger, zwei_center, zwei_fluegel],
			'drei': [drei_verteidiger, drei_center, drei_fluegel],
			'reserve': reserve,
			'kein_aufgebot': kein_aufgebot,
			'anzahl_linien': anzahl_linien,
			'bemerkung': bemerkung or 'Keine'
		}
		return team
	if ref == '2':
		anzahl_linien = frappe.db.sql("""SELECT `zwei_linien_anz` FROM `tabTeamPlaner Spiel` WHERE `name` = '{spiel}'""".format(spiel=spiel), as_list=True)[0][0]
		bemerkung = frappe.db.sql("""SELECT `zwei_aufgebot_bemerkungen` FROM `tabTeamPlaner Spiel` WHERE `name` = '{spiel}'""".format(spiel=spiel), as_list=True)[0][0]
		try:
			torwart = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `linie` = 'Torhüter' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)[0][0]
		except:
			torwart = 'n/a'
		# 1.linie
		eins_verteidiger = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Verteidiger' AND `linie` = '1.' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)
		try:
			eins_center = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Center / Top' AND `linie` = '1.' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)[0][0]
		except:
			eins_center = 'n/a'
		eins_fluegel = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Flügel' AND `linie` = '1.' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)
		# 2.linie
		zwei_verteidiger = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Verteidiger' AND `linie` = '2.' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)
		try:
			zwei_center = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Center / Top' AND `linie` = '2.' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)[0][0]
		except:
			zwei_center = 'n/a'
		zwei_fluegel = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Flügel' AND `linie` = '2.' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)
		# 3.linie
		drei_verteidiger = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Verteidiger' AND `linie` = '3.' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)
		try:
			drei_center = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Center / Top' AND `linie` = '3.' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)[0][0]
		except:
			drei_center = 'n/a'
		drei_fluegel = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Flügel' AND `linie` = '3.' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)
		# reserve
		reserve = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `linie` = 'Reserve' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)
		# kein aufgebot
		kein_aufgebot = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `linie` = 'Kein Aufgebot' AND `parentfield` = 'zwei_linien'""".format(spiel=spiel), as_list=True)
		
		team = {
			'tor': torwart,
			'eins': [eins_verteidiger, eins_center, eins_fluegel],
			'zwei': [zwei_verteidiger, zwei_center, zwei_fluegel],
			'drei': [drei_verteidiger, drei_center, drei_fluegel],
			'reserve': reserve,
			'kein_aufgebot': kein_aufgebot,
			'anzahl_linien': anzahl_linien,
			'bemerkung': bemerkung or 'Keine'
		}
		return team
		
@frappe.whitelist()
def update_remark(spieler, training, bemerkung):
	frappe.db.sql("""UPDATE `tabTeamPlaner Spieler Verweis Anwesenheit` SET `bemerkung` = '{bemerkung}' WHERE `parent` = '{training}' AND `parenttype` = 'TeamPlaner Training' AND `mail` = '{spieler}'""".format(training=training, spieler=spieler, bemerkung=bemerkung), as_list=True)
	return "ok"