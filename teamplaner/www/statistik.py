# Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from teamplaner.utils import count_teilnehmer, count_total_teilnehmer, teilnehmer_details
from frappe.utils.data import nowdate

#no_cache = 1

def get_context(context):
	if frappe.session.user=='Guest':
		frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
	context.show_sidebar=True
	context['spieler_total_anwesend'] = spieler_all_over()['anwesend']
	context['spieler_total_abwesend'] = spieler_all_over()['abwesend']
	context['spieler_total_pro_monat'] = spieler_pro_monat()['anzahl_trainings']
	context['spieler_anwesend_pro_monat'] = spieler_pro_monat()['anzahl_anwesend']
	context['spieler_abwesend_pro_monat'] = spieler_pro_monat()['anzahl_abwesend']
	context['total_trainings_pro_monat'] = total_pro_monat()['total_anzahl_trainings']
	context['total_anwesend_pro_monat'] = total_pro_monat()['total_anzahl_anwesend']
	context['total_abwesend_pro_monat'] = total_pro_monat()['total_anzahl_abwesend']

	return context
	
def spieler_all_over():
	data = {}
	user = frappe.session.user
	import datetime
	jahr = datetime.date.today().year
	von = str(jahr) + "-01-01"
	bis = str(jahr) + "-12-31"
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	data['anwesend'] = frappe.db.sql("""
		SELECT COUNT(`name`)  FROM `tabTeamPlaner Spieler Verweis Anwesenheit`
		WHERE
			`status` = 'Anwesend'
			AND `mail` = '{user}'
			AND `parent` IN (SELECT `name` FROM `tabTeamPlaner Training` WHERE `team` = '{team}' AND `datum` >= '{von}' AND `datum` <= '{bis}')""".format(user=user, team=team, von=von, bis=bis), as_list=True)[0][0]
			
	data['abwesend'] = frappe.db.sql("""
		SELECT COUNT(`name`)  FROM `tabTeamPlaner Spieler Verweis Anwesenheit`
		WHERE
			`status` = 'Abwesend'
			AND `mail` = '{user}'
			AND `parent` IN (SELECT `name` FROM `tabTeamPlaner Training` WHERE `team` = '{team}' AND `datum` >= '{von}' AND `datum` <= '{bis}')""".format(user=user, team=team, von=von, bis=bis), as_list=True)[0][0]
	
	return data
	
def spieler_pro_monat():
	data = {}
	user = frappe.session.user
	import datetime
	jahr = str(datetime.date.today().year)
	start_jan = jahr + "01-01"
	ende_jan = jahr + "-01-"
	von = str(jahr) + "-01-01"
	bis = str(jahr) + "-12-31"
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	data['anzahl_trainings'] = frappe.db.sql("""SELECT
													MONTH(`datum`) AS 'monat',
													COUNT(`name`) AS 'anzahl'
												FROM `tabTeamPlaner Training`
												WHERE
													YEAR(`datum`) = '{jahr}'
													AND `team` = '{team}'
												GROUP BY MONTH(`datum`)""".format(jahr=jahr, team=team), as_dict=True)
												
	data['anzahl_anwesend'] = frappe.db.sql("""SELECT
													MONTH(`datum`) AS 'monat',
													COUNT(`name`) AS 'anzahl'
												FROM `tabTeamPlaner Training`
												WHERE
													YEAR(`datum`) = '{jahr}'
													AND `team` = '{team}'
													AND `name` IN (SELECT `parent` FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `status` = 'Anwesend' AND `mail` = '{user}')
												GROUP BY MONTH(`datum`)""".format(jahr=jahr, team=team, user=user), as_dict=True)
												
	data['anzahl_abwesend'] = frappe.db.sql("""SELECT
													MONTH(`datum`) AS 'monat',
													COUNT(`name`) AS 'anzahl'
												FROM `tabTeamPlaner Training`
												WHERE
													YEAR(`datum`) = '{jahr}'
													AND `team` = '{team}'
													AND `name` IN (SELECT `parent` FROM `tabTeamPlaner Spieler Verweis Anwesenheit` WHERE `status` = 'Abwesend' AND `mail` = '{user}')
												GROUP BY MONTH(`datum`)""".format(jahr=jahr, team=team, user=user), as_dict=True)
	
	return data
	
def total_pro_monat():
	data = {}
	user = frappe.session.user
	import datetime
	jahr = str(datetime.date.today().year)
	spieler = frappe.db.sql("""SELECT `name` FROM `tabTeamPlaner Mitglied` WHERE `mail` = '{user}'""".format(user=user), as_list=True)[0][0]
	team = frappe.db.sql("""SELECT `team` FROM `tabTeamplaner Team Verweis` WHERE `parent` = '{spieler}' LIMIT 1""".format(spieler=spieler), as_list=True)[0][0]
	data['total_anzahl_trainings'] = frappe.db.sql("""SELECT
													MONTH(`datum`) AS 'monat',
													COUNT(`name`) AS 'anzahl'
												FROM `tabTeamPlaner Training`
												WHERE
													YEAR(`datum`) = '{jahr}'
													AND `team` = '{team}'
												GROUP BY MONTH(`datum`)""".format(jahr=jahr, team=team), as_dict=True)
												
	data['total_anzahl_anwesend'] = frappe.db.sql("""SELECT
														MONTH(`parent`) AS 'monat',
														COUNT(`name`) AS 'anzahl'
													FROM `tabTeamPlaner Spieler Verweis Anwesenheit`
													WHERE
													YEAR(`parent`) = '{jahr}'
													AND `status` = 'Anwesend'
													AND `parent` IN (SELECT `name` FROM `tabTeamPlaner Training` WHERE `team` = '{team}')
													GROUP BY MONTH(`parent`)""".format(jahr=jahr, team=team), as_dict=True)
												
	data['total_anzahl_abwesend'] = frappe.db.sql("""SELECT
														MONTH(`parent`) AS 'monat',
														COUNT(`name`) AS 'anzahl'
													FROM `tabTeamPlaner Spieler Verweis Anwesenheit`
													WHERE
													YEAR(`parent`) = '{jahr}'
													AND `status` = 'Abwesend'
													AND `parent` IN (SELECT `name` FROM `tabTeamPlaner Training` WHERE `team` = '{team}')
													GROUP BY MONTH(`parent`)""".format(jahr=jahr, team=team), as_dict=True)
	
	return data