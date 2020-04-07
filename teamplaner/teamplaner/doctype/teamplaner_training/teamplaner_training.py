# -*- coding: utf-8 -*-
# Copyright (c) 2019, libracore and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils.data import add_days, getdate

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
				
@frappe.whitelist()
def massenanlage(von, bis, start, anz, team, ort):
	#frappe.throw("OK")
	i = 0
	while i < int(anz):
		try:
			faktor = i * 7
			if faktor > 0:
				datum = add_days(start, faktor)
			else:
				datum = start
			training = frappe.get_doc({
				"doctype": "TeamPlaner Training",
				"von": von,
				"bis": bis,
				"datum": datum,
				"team": team,
				"ort": ort
			}).insert(ignore_permissions = True)
			i += 1
		except:
			i += 1
	return "OK"