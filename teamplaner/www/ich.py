# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
import frappe.www.list

no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)

	context.user = frappe.session.user
	context.user_data = frappe.get_doc("User", frappe.session.user)
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=frappe.session.user), as_dict=True)
	context.spieler_data = frappe.get_doc("TeamPlaner Mitglied", spieler[0].name)