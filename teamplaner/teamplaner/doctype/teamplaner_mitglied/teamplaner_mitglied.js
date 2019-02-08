// Copyright (c) 2019, libracore and contributors
// For license information, please see license.txt

frappe.ui.form.on('TeamPlaner Mitglied', {
	refresh: function(frm) {
		if(!frm.is_new() && frm.perm[0].write) {
			frm.add_custom_button(__("Login Daten an Mitglied senden"), function() {
				return frappe.call({
					method: "teamplaner.teamplaner.doctype.teamplaner_mitglied.teamplaner_mitglied.invite_user",
					args: {
						mitglied: frm.doc.name
					},
					callback: function(r) {
						frappe.msgprint("Es wurde erfolgreich ein User-Account eingerichtet.");
					}
				});
			});
			frm.add_custom_button(__("Mitglied zu allen Events hinzufügen"), function() {
				return frappe.call({
					method: "teamplaner.teamplaner.doctype.teamplaner_mitglied.teamplaner_mitglied.add_user_to_events",
					args: {
						mitglied: frm.doc.name
					},
					callback: function(r) {
						frappe.msgprint("Das Mitglied wurde erfolgreich allen künftigen Events hinzugefügt.");
					}
				});
			});
		}
	}
});
