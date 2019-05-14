# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.utils import count_teilnehmer, count_total_teilnehmer, teilnehmer_details
from frappe.utils.data import nowdate, getdate

#no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	if "TeamPlaner Bussenverwalter" not in frappe.get_roles(frappe.session.user):
		frappe.throw(_("You need a special role to access this page"), frappe.PermissionError)
	context.show_sidebar=True
	context['alle_spieler'] = get_spieler()
	context['alle_bussen'] = get_bussen()['alle_bussen']
	return context
	
def get_spieler():
	user = frappe.session.user
	if "TeamPlaner Spieler" not in frappe.get_roles(frappe.session.user):
		team = 'Herren 2'
	else:
		spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
		team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	
	alle_spieler = frappe.db.sql("""SELECT
										`mitglied`.`vorname`,
										`mitglied`.`nachname`,
										`mitglied`.`name`
									FROM (`tabTeamPlaner Mitglied` AS `mitglied`
									INNER JOIN `tabTeamplaner Team Verweis` AS `verweis` ON `mitglied`.`name` = `verweis`.`parent`)
									WHERE `verweis`.`team` = '{team}'
									ORDER BY `mitglied`.`nachname` ASC""".format(team=team), as_dict=True)
	return alle_spieler
	
def get_bussen():
	data = {}
	data['alle_bussen'] = frappe.db.sql("""SELECT `beschreibung`, `betrag`, `training`, `spiel` FROM `tabTeamPlaner Bussenkatalog`""", as_dict=True)
	return data
	
@frappe.whitelist()
def add_busse(betrag, beschreibung, training, spiel, spieler):
	mitglied = frappe.get_doc("TeamPlaner Mitglied", spieler)
	row = mitglied.append('bussen', {})
	row.training = training
	row.spiel = spiel
	row.bemerkung = beschreibung + " - " + getdate(nowdate()).strftime("%d.%m.%Y")
	row.betrag = betrag
	mitglied.save()
	
	return "OK"
	
@frappe.whitelist()
def get_spieler_bussen(spieler):
	alle_bussen_von_spieler = frappe.db.sql("""SELECT `spiel`, `training`, `betrag`, `bemerkung`, `name` FROM `tabTeamPlaner Bussenverweis` WHERE `parent` = '{spieler}'""".format(spieler=spieler), as_dict=True)
	return alle_bussen_von_spieler
	
@frappe.whitelist()
def remove_busse(busse):
	return frappe.db.sql("""DELETE FROM `tabTeamPlaner Bussenverweis` WHERE `name` = '{busse}'""".format(busse=busse), as_list=True)