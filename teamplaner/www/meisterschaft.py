# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.swissunihockey import get_tabelle, get_resultate

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	user = frappe.session.user
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	_team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	team = frappe.get_doc("TeamPlaner Team", _team)
	context["tabelle"] = get_tabelle(team.season, team.league, team.game_class, team.group)
	context["resultate"] = get_resultate(team.team_id, team.season)
	context["season"] = team.season
	context["league"] = team.league
	context["game_class"] = team.game_class
	context["group"] = team.group
	return context