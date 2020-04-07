# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

def get_context(context):
	if frappe.session.user=='Guest':
		context['start_btn'] = '<a href="/login" class="btn btn-primary" role="button">Anmelden</a>'
	else:
		context['start_btn'] = '<a href="/me" class="btn btn-primary" role="button">Mein Profil</a>'
	return context