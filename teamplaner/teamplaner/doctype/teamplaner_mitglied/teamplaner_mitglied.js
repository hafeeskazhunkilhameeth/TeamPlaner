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
			frm.add_custom_button(__("Busse hinzufügen"), function() {
				return busse(frm);
			});
		}
	}
});

function busse (frm) {
	frappe.call({
		method: "teamplaner.teamplaner.doctype.teamplaner_mitglied.teamplaner_mitglied.get_bussen",
		args: {},
		callback: function(r) {
			var d = new frappe.ui.Dialog({
				'title': 'Busse hinzufügen',
				'fields': [
					{fieldname: 'datum', fieldtype: 'Date', default: frappe.datetime.nowdate(), label: 'Datum'},
					{fieldname: 'busse', fieldtype: 'Select', options: r.message.join('\n'), label:__('Busse')},
					{fieldname: 'sb1', fieldtype: 'Section Break', depends_on: 'eval:doc.busse=="Eigene"'},
					{fieldname: 'beschreibung', fieldtype: 'Data', label: 'Beschreibung', depends_on: 'eval:doc.busse=="Eigene"'},
					{fieldname: 'sb2', fieldtype: 'Section Break', depends_on: 'eval:doc.busse=="Eigene"'},
					{fieldname: 'training', fieldtype: 'Check', label: 'Training', depends_on: 'eval:doc.busse=="Eigene"'},
					{fieldname: 'cb', fieldtype: 'Column Break', depends_on: 'eval:doc.busse=="Eigene"'},
					{fieldname: 'spiel', fieldtype: 'Check', label: 'Spiel', depends_on: 'eval:doc.busse=="Eigene"'},
					{fieldname: 'betrag', fieldtype: 'Currency', label: 'Betrag'}
				],
				primary_action: function(){
					d.hide();
					console.log(d.get_values());
					if (d.get_values().busse == "Eigene") {
						frappe.call({
							method: "teamplaner.teamplaner.doctype.teamplaner_mitglied.teamplaner_mitglied.add_busse",
							args: {
								mitglied: frm.doc.name,
								busse: d.get_values().busse,
								datum: d.get_values().datum,
								beschreibung: d.get_values().beschreibung,
								training: d.get_values().training,
								spiel: d.get_values().spiel,
								betrag: d.get_values().betrag
								
							},
							callback: function(r) {
								frappe.msgprint("Die Busse wurde hinzugefügt.");
							}
						});
					} else {
						frappe.call({
							method: "teamplaner.teamplaner.doctype.teamplaner_mitglied.teamplaner_mitglied.add_busse",
							args: {
								mitglied: frm.doc.name,
								busse: d.get_values().busse,
								datum: d.get_values().datum
								
							},
							callback: function(r) {
								frappe.msgprint("Die Busse wurde hinzugefügt.");
							}
						});
					}
				},
				primary_action_label: __('Hinzufügen')
			});
			d.show();
		}
	});
	
	
}