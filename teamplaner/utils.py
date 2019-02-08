# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

def count_teilnehmer(training, doctype):
	return frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `status` = 'Anwesend' AND `parenttype` = '{doctype}'""".format(training=training, doctype=doctype), as_list=True)[0][0]
	
def count_total_teilnehmer(training, doctype):
	return frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `parenttype` = '{doctype}'""".format(training=training, doctype=doctype), as_list=True)[0][0]
	
def teilnehmer_details(training, doctype):
	return frappe.db.sql("""SELECT `vorname`, `nachname`, `status`, `mail` FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `parenttype` = '{doctype}'""".format(training=training, doctype=doctype), as_list=True)
	
@frappe.whitelist()
def change_anwesenheit(training, spieler, status):
	if status == "Anwesend":
		new_status = "Abwesend"
	else:
		new_status = "Anwesend"
	frappe.db.sql("""UPDATE `tabTeamPlaner Spieler Verweis Anwesenheit` SET `status` = '{new_status}' WHERE `parent` = '{training}' AND `mail` = '{mail}'""".format(new_status=new_status, mail=spieler, training=training), as_list=True)
	return "OK"
	
@frappe.whitelist()
def get_aufgebot(spiel):
	anzahl_linien = frappe.db.sql("""SELECT `linien_anz` FROM `tabTeamPlaner Spiel` WHERE `name` = '{spiel}'""".format(spiel=spiel), as_list=True)[0][0]
	try:
		torwart = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `linie` = 'Torhüter'""".format(spiel=spiel), as_list=True)[0][0]
	except:
		torwart = 'n/a'
	# 1.linie
	eins_verteidiger = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Verteidiger' AND `linie` = '1.'""".format(spiel=spiel), as_list=True)
	try:
		eins_center = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Center / Top' AND `linie` = '1.'""".format(spiel=spiel), as_list=True)[0][0]
	except:
		eins_center = 'n/a'
	eins_fluegel = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Flügel' AND `linie` = '1.'""".format(spiel=spiel), as_list=True)
	# 2.linie
	zwei_verteidiger = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Verteidiger' AND `linie` = '2.'""".format(spiel=spiel), as_list=True)
	try:
		zwei_center = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Center / Top' AND `linie` = '2.'""".format(spiel=spiel), as_list=True)[0][0]
	except:
		zwei_center = 'n/a'
	zwei_fluegel = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Flügel' AND `linie` = '2.'""".format(spiel=spiel), as_list=True)
	# 3.linie
	drei_verteidiger = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Verteidiger' AND `linie` = '3.'""".format(spiel=spiel), as_list=True)
	try:
		drei_center = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Center / Top' AND `linie` = '3.'""".format(spiel=spiel), as_list=True)[0][0]
	except:
		drei_center = 'n/a'
	drei_fluegel = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `position` = 'Flügel' AND `linie` = '3.'""".format(spiel=spiel), as_list=True)
	# reserve
	reserve = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `linie` = 'Reserve'""".format(spiel=spiel), as_list=True)
	# kein aufgebot
	kein_aufgebot = frappe.db.sql("""SELECT `spielername` FROM `tabTeamPlaner Linien Definition` WHERE `parent` = '{spiel}' AND `linie` = 'Kein Aufgebot'""".format(spiel=spiel), as_list=True)
	
	team = {
		'tor': torwart,
		'eins': [eins_verteidiger, eins_center, eins_fluegel],
		'zwei': [zwei_verteidiger, zwei_center, zwei_fluegel],
		'drei': [drei_verteidiger, drei_center, drei_fluegel],
		'reserve': reserve,
		'kein_aufgebot': kein_aufgebot,
		'anzahl_linien': anzahl_linien
	}
	return team