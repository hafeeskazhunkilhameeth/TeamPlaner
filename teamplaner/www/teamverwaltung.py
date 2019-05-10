# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

#no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	if "TeamPlaner Trainer" not in frappe.get_roles(frappe.session.user):
		frappe.throw(_("Du benötigst eine Trainer Rolle für den Zugriff auf diese Seite"), frappe.PermissionError)
	context.show_sidebar=True
	
	return context