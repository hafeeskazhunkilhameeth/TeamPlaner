# -*- coding: utf-8 -*-
# Copyright (c) 2019, libracore and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class TeamPlanerMitglied(Document):
	pass

@frappe.whitelist()
def invite_user(mitglied):
	spieler = frappe.get_doc("TeamPlaner Mitglied", mitglied)

	if not spieler.mail:
		frappe.throw(_("Please set Email Address"))

	if spieler.has_permission("write"):
		user = frappe.get_doc({
			"doctype": "User",
			"first_name": spieler.vorname,
			"last_name": spieler.nachname,
			"email": spieler.mail,
			"user_type": "Website User",
			"send_welcome_email": 1
		}).insert(ignore_permissions = True)

	return user.name