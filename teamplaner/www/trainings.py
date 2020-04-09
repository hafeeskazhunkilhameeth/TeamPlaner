# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.utils import count_teilnehmer, count_total_teilnehmer, teilnehmer_details, count_teilnehmer_spieler, count_teilnehmer_goalies
from frappe.utils.data import nowdate

no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	user = frappe.session.user
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	context['trainings'] = frappe.db.sql("""SELECT
												`training`.`name`,
												`training`.`von`,
												`training`.`bis`,
												`training`.`ort`,
												`training`.`beschriftung`,
												`training`.`datum`,
												`training`.`details`,
												`anwesenheit`.`status`,
												`anwesenheit`.`name` AS `referenz`
											FROM `tabTeamPlaner Training` as `training`
											INNER JOIN `tabTeamPlaner Spieler Verweis Anwesenheit` as `anwesenheit`
											ON `training`.`name` = `anwesenheit`.`parent`
											WHERE
												`training`.`datum` >= '{datum}'
												AND `training`.`team` = '{team}'
												AND `anwesenheit`.`mail` = '{mail}'
											ORDER BY `training`.`datum`""".format(datum=nowdate(), team=team, mail=user), as_dict=True)
											
	context['anwesenheiten'] = []
	context["heute"] = nowdate()
	for training in context['trainings']:
		context['anwesenheiten'].append({
			'training': training.name,
			'spieler': frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `status` = 'Anwesend' AND `position` != 'Torwart'""".format(training=training.name), as_list=True)[0][0],
			'torwarte': frappe.db.sql("""SELECT COUNT(`name`) FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}' AND `status` = 'Anwesend' AND `position` = 'Torwart'""".format(training=training.name), as_list=True)[0][0],
			'alle': frappe.db.sql("""SELECT `vorname`, `nachname`, `status`, `bemerkung` FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `parent` = '{training}'""".format(training=training.name), as_dict=True)
		})
		
	return context
	
@frappe.whitelist()
def abmelden(training, bemerkung):
	frappe.db.sql("""Update `tabTeamPlaner Spieler Verweis Anwesenheit` SET `status` = 'Abwesend', `bemerkung` = '{bemerkung}' WHERE `name` = '{training}'""".format(bemerkung=bemerkung, training=training), as_list=True)
	return
	
@frappe.whitelist()
def anmelden(training):
	frappe.db.sql("""Update `tabTeamPlaner Spieler Verweis Anwesenheit` SET `status` = 'Anwesend', `bemerkung` = '' WHERE `name` = '{training}'""".format(training=training), as_list=True)
	return
	
@frappe.whitelist()
def bemerkung(training, bemerkung):
	frappe.db.sql("""Update `tabTeamPlaner Spieler Verweis Anwesenheit` SET `bemerkung` = '{bemerkung}' WHERE `name` = '{training}'""".format(bemerkung=bemerkung, training=training), as_list=True)
	return