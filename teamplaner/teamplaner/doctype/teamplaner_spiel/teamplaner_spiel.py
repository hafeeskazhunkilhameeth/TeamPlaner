# -*- coding: utf-8 -*-
# Copyright (c) 2019, libracore and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils.data import getdate

class TeamPlanerSpiel(Document):
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

		self.beschriftung = getdate(self.datum).strftime("%d.%m.%Y")
	
	def on_trash(self):
		delete_links = frappe.db.sql("""DELETE FROM `tabTeamPlaner Scorer Liste` WHERE `spiel` = '{spiel}'""".format(spiel=self.name), as_list=True)
		
	def after_insert(self):
		alle_spieler = frappe.get_all('Teamplaner Team Verweis', filters={'team': self.team}, fields=['parent'])
		for _spieler in alle_spieler:
			spieler = frappe.get_doc('TeamPlaner Mitglied', _spieler.parent)
			score = frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Scorer Liste` WHERE `Parent` = '{mail}'""".format(mail=spieler.mail), as_list=True)[0][0]
			if score == 0:
				row = spieler.append('scorerliste', {})
				row.spiel = self.name
				row.tor = 0
				row.assist = 0
				row.total = 0
				spieler.save()

@frappe.whitelist()
def load_spieler(spiel):
	spiel = frappe.get_doc("TeamPlaner Spiel", spiel)
	if not spiel.linien:
		for spieler in spiel.spieler:
			if spieler.status == "Anwesend":
				sp = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{mail}'""".format(mail=spieler.mail), as_list=True)[0][0]
				sp_detail = frappe.get_doc("TeamPlaner Mitglied", sp)
				row = spiel.append('linien', {})
				row.spielername = spieler.vorname + ' ' + spieler.nachname
				row.position = spieler.position
				row.linie = sp_detail.linie
		spiel.save()
		return "OK"
	else:
		return "NOK"