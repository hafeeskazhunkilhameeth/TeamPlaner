# -*- coding: utf-8 -*-
# Copyright (c) 2019, libracore and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class TeamPlanerTraining(Document):
	def before_save(self):
		if not self.spieler:
			alle_spieler = frappe.get_all('Teamplaner Team Verweis', filters={'team': self.team}, fields=['parent'])
			for _spieler in alle_spieler:
				spieler = frappe.get_doc('TeamPlaner Mitglied', _spieler.parent)
				row = self.append('spieler', {})
				row.vorname = spieler.vorname
				row.nachname = spieler.nachname
				row.position = spieler.position
				row.status = 'Anwesend'
				row.mail = spieler.mail