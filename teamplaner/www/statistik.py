# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.swissunihockey import get_tabelle, get_resultate

no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	user = frappe.session.user
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	_team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	team = frappe.get_doc("TeamPlaner Team", _team)
	alle_spieler = frappe.db.sql("""SELECT `parent` FROM `tabTeamplaner Team Verweis` WHERE `team` = '{team}'""".format(team=team.name), as_dict=True)
	context["spieler_statistik"] = []
	for spieler in alle_spieler:
		data = {}
		_spieler = frappe.get_doc("TeamPlaner Mitglied", spieler.parent)
		data["spieler"] = _spieler.vorname + " " + _spieler.nachname
		data["id"] = spieler.parent
		data["anwesend"] = frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `mail` = '{mail}' AND `status` = 'Anwesend'""".format(mail=_spieler.mail), as_list=True)[0][0]
		data["abwesend"] = frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `mail` = '{mail}' AND `status` = 'Abwesend'""".format(mail=_spieler.mail), as_list=True)[0][0]
		context["spieler_statistik"].append(data)
	return context