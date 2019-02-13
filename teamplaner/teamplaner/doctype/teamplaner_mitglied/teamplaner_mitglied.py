# -*- coding: utf-8 -*-
# Copyright (c) 2019, libracore and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint
from frappe.model.document import Document
from frappe.utils.data import getdate

class TeamPlanerMitglied(Document):
	self = Document
	def on_trash(self):
		delete_links_in_anwesenheit = frappe.db.sql("""DELETE FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `mail` = '{mail}'""".format(mail=self.mail), as_list=True)
		try:
			user = frappe.get_doc("User", self.mail)
			if user:
				user.delete()
		except:
			pass
		msgprint("Alle Training und Spiel Anwesenheiten dieses Mitgliedes, sowie die Zugangsdaten wurden gelöscht")
	def before_save(self):
		self.beschriftung = self.vorname + " " + self.nachname
		for score in self.scorerliste:
			score.total = score.tor + score.assist

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
			"send_welcome_email": 1,
			"user_image": spieler.bild
		}).insert(ignore_permissions = True)

	return user.name
	
	
@frappe.whitelist()
def add_user_to_events(mitglied):
	spieler = frappe.get_doc("TeamPlaner Mitglied", mitglied)
	for _team in spieler.belongs_to_team:
		team = _team.team
		# trainings
		alle_trainings = frappe.db.sql("""SELECT DISTINCT `name` FROM `tabTeamPlaner Training` WHERE `team` = '{team}'""".format(team=team), as_list=True)
		for _training in alle_trainings:
			training = _training[0]
			kontrolle = frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `mail` = '{mail}'""".format(training=training, mail=spieler.mail), as_list=True)[0][0]
			if kontrolle < 1:
				doc_training = frappe.get_doc("TeamPlaner Training", training)
				row = doc_training.append('spieler', {})
				row.vorname = spieler.vorname
				row.nachname = spieler.nachname
				row.position = spieler.position
				row.status = 'Anwesend'
				row.mail = spieler.mail
				doc_training.save()
		# spiele
		alle_spiele = frappe.db.sql("""SELECT DISTINCT `name` FROM `tabTeamPlaner Spiel` WHERE `team` = '{team}'""".format(team=team), as_list=True)
		for _spiel in alle_spiele:
			spiel = _spiel[0]
			#anwesenheit
			kontrolle = frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{spiel}' AND `mail` = '{mail}'""".format(spiel=spiel, mail=spieler.mail), as_list=True)[0][0]
			if kontrolle < 1:
				doc_spiel = frappe.get_doc("TeamPlaner Spiel", spiel)
				row = doc_spiel.append('spieler', {})
				row.vorname = spieler.vorname
				row.nachname = spieler.nachname
				row.position = spieler.position
				row.status = 'Anwesend'
				row.mail = spieler.mail
				#aufgebot
				row = doc_spiel.append('linien', {})
				row.spielername = spieler.vorname + " " + spieler.nachname
				row.position = spieler.position
				row.linie = 'Kein Aufgebot'
				doc_spiel.save()
			score = frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Scorer Liste` WHERE `Parent` = '{mail}'""".format(mail=spieler.mail), as_list=True)[0][0]
			if score == 0:
				row = spieler.append('scorerliste', {})
				row.spiel = spiel
				row.tor = 0
				row.assist = 0
				row.total = 0
				spieler.save()
	return "OK"
	
@frappe.whitelist()
def add_busse(mitglied, busse, datum, beschreibung=None, training=None, spiel=None, betrag=None):
	if busse == "Eigene":
		mitglied = frappe.get_doc("TeamPlaner Mitglied", mitglied)
		row = mitglied.append('bussen', {})
		row.training = training
		row.spiel = spiel
		row.bemerkung = beschreibung + " - " + getdate(datum).strftime("%d.%m.%Y")
		row.betrag = betrag
		mitglied.save()
	else:
		mitglied = frappe.get_doc("TeamPlaner Mitglied", mitglied)
		busse = frappe.db.sql("""SELECT `training`, `spiel`, `betrag`, `beschreibung` FROM `tabTeamPlaner Bussenkatalog` WHERE `beschreibung` = '{beschreibung}'""".format(beschreibung=busse), as_dict=True)[0]
		row = mitglied.append('bussen', {})
		row.training = busse.training
		row.spiel = busse.spiel
		row.bemerkung = busse.beschreibung + " - " + getdate(datum).strftime("%d.%m.%Y")
		row.betrag = busse.betrag
		mitglied.save()
		
	return "OK"
	
	
@frappe.whitelist()
def get_bussen():
	data = []
	bussen = frappe.db.sql("""SELECT `beschreibung` FROM `tabTeamPlaner Bussenkatalog`""", as_list=True)
	for busse in bussen:
		data.append(busse[0])
	data.append("Eigene")
	return data