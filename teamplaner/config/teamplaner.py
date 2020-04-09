from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Verwaltung"),
			"items": [
				{
					"type": "doctype",
					"name": "TeamPlaner Mitglied",
					"label": _("Mitglieder / Spieler"),
					"description": _("Verwaltung der Spieler, Trainer und Betreuer")
				},
				{
					"type": "doctype",
					"name": "TeamPlaner Team",
					"label": _("Teams"),
					"description": _("Verwaltung der Teams")
				},
				{
					"type": "doctype",
					"name": "TeamPlaner Verein",
					"label": _("Vereine"),
					"description": _("Verwaltung der Vereine")
				},
				{
					"type": "doctype",
					"name": "TeamPlaner Bussen",
					"label": _("Bussen Einstellungen"),
					"description": _("Verwaltung der Bussen")
				}
			]
		},
		{
			"label": _("Planung"),
			"items": [
				{
					"type": "doctype",
					"name": "TeamPlaner Training",
					"label": _("Trainings"),
					"description": _("Verwaltung der Trainings")
				},
				{
					"type": "doctype",
					"name": "TeamPlaner Spiel",
					"label": _("Spiele"),
					"description": _("Verwaltung der Spiele")
				}
			]
		}
	]