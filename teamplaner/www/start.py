# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

def get_context(context):
	if frappe.session.user=='Guest':
		context['start_btn'] = '<a href="/login" class="btn btn-primary" role="button">Anmelden</a>'
	else:
		#context['start_btn'] = '<a href="/me" class="btn btn-primary" role="button">Mein Profil</a>'
		user = frappe.session.user
		# spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
		# _team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
		# team = frappe.get_doc("TeamPlaner Team", _team)
		# context["logo"] = team.logo
		context["me"] = True
		#context.user = frappe.session.user
		context["user_data"] = frappe.get_doc("User", frappe.session.user)
		spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=frappe.session.user), as_dict=True)
		context["spieler_data"] = frappe.get_doc("TeamPlaner Mitglied", spieler[0].name)
	return context