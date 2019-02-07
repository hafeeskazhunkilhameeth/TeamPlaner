# -*- coding: utf-8 -*-
# Copyright (c) 2019, libracore and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class TeamPlanerTeam(Document):
	def onload(Document):
		self = Document
		# trainer
		_trainer_mitglieder_grob = frappe.get_list("Teamplaner Team Verweis", fields=("parent"), filters={"team": self.name, "trainer": 1})
		if _trainer_mitglieder_grob:
			trainer_mitglieder_grob = []
			for m in _trainer_mitglieder_grob:
				trainer_mitglieder_grob.append(m.parent)
			trainer_mitglieder = frappe.get_all("TeamPlaner Mitglied", fields=("vorname", "nachname", "rueckennummer", "position", "lizenznummer"), filters=[["name", "in", trainer_mitglieder_grob]], limit=1000)
			self.set_onload('trainer', trainer_mitglieder)

		# betreuer
		_betreuer_mitglieder_grob = frappe.get_list("Teamplaner Team Verweis", fields=("parent"), filters={"team": self.name, "betreuer": 1})
		if _betreuer_mitglieder_grob:
			betreuer_mitglieder_grob = []
			for m in _betreuer_mitglieder_grob:
				betreuer_mitglieder_grob.append(m.parent)
			betreuer_mitglieder = frappe.get_all("TeamPlaner Mitglied", fields=("vorname", "nachname", "rueckennummer", "position", "lizenznummer"), filters=[["name", "in", betreuer_mitglieder_grob]], limit=1000)
			self.set_onload('betreuer', betreuer_mitglieder)
			
		# spieler
		_spieler_mitglieder_grob = frappe.get_list("Teamplaner Team Verweis", fields=("parent"), filters={"team": self.name, "spieler": 1})
		if _spieler_mitglieder_grob:
			spieler_mitglieder_grob = []
			for m in _spieler_mitglieder_grob:
				spieler_mitglieder_grob.append(m.parent)
			spieler_mitglieder = frappe.get_all("TeamPlaner Mitglied", fields=("vorname", "nachname", "rueckennummer", "position", "lizenznummer"), filters=[["name", "in", spieler_mitglieder_grob]], limit=1000)
			self.set_onload('spieler', spieler_mitglieder)