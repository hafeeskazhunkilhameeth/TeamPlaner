// Copyright (c) 2019, libracore and contributors
// For license information, please see license.txt

frappe.ui.form.on('TeamPlaner Spiel', {
	refresh: function(frm) {
		if(!frm.is_new() && frm.perm[0].write) {
			frm.add_custom_button(__("Spieler für Aufgebot laden"), function() {
				return frappe.call({
					method: "teamplaner.teamplaner.doctype.teamplaner_spiel.teamplaner_spiel.load_spieler",
					args: {
						spiel: frm.doc.name
					},
					callback: function(r) {
						if (r.message == "OK") {
							frappe.msgprint("Alle anwesenden Spieler wurden erfolgreich dem Aufgebot hinzugefügt.");
						} else {
							frappe.msgprint("Bitte entfernen Sie zuerst das bereits erstellte Aufgebot.");
						}
					}
				});
			});
		}
	}
});