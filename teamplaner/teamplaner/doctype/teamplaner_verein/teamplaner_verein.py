# -*- coding: utf-8 -*-
# Copyright (c) 2019, libracore and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class TeamPlanerVerein(Document):
	def onload(Document):
		self = Document
		teams = frappe.get_list("TeamPlaner Team", fields=("title"), filters={"team_von_verein": self.name })
		self.set_onload('team_uebersicht', teams)
	