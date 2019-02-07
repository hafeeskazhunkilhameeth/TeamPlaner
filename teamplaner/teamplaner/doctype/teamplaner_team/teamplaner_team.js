// Copyright (c) 2019, libracore and contributors
// For license information, please see license.txt

frappe.ui.form.on('TeamPlaner Team', {
	refresh: function(frm) {
		var mitglieder_uebersicht = '<p>'
		
		// trainer
		var trainer = frappe.get_doc("TeamPlaner Team", cur_frm.doc.name)['__onload'];
		var trainer_list = '<b>Trainer</b><br>';
		if (trainer && trainer['trainer']) {
			if (trainer['trainer'].length >= 1) {
				for (i=0; i < trainer['trainer'].length; i++) {
					trainer_list = trainer_list + trainer['trainer'][i]['vorname'] + ' ' + trainer['trainer'][i]['nachname'] + '<br>';
				}
				//cur_frm.set_df_property('mitglieder_uebersicht','options','<p>' + trainer_list + '</p>');
				mitglieder_uebersicht = mitglieder_uebersicht + trainer_list + '<br>';
			} else {
				//cur_frm.set_df_property('mitglieder_uebersicht','options','<p>Zu diesem Team existieren noch keine Trainer</p>');
				mitglieder_uebersicht = mitglieder_uebersicht + trainer_list + 'Zu diesem Team existieren noch keine Trainer<br><br>';
			}
		} else {
			//cur_frm.set_df_property('mitglieder_uebersicht','options','<p>Zu diesem Team existieren noch keine Trainer</p>');
			mitglieder_uebersicht = mitglieder_uebersicht + trainer_list + 'Zu diesem Team existieren noch keine Trainer<br><br>';
		}
		
		// betreuer
		var betreuer = frappe.get_doc("TeamPlaner Team", cur_frm.doc.name)['__onload'];
		var betreuer_list = '<b>Betreuer</b><br>';
		if (betreuer && betreuer['betreuer']) {
			if (betreuer['betreuer'].length >= 1) {
				for (i=0; i < betreuer['betreuer'].length; i++) {
					betreuer_list = betreuer_list + betreuer['betreuer'][i]['vorname'] + ' ' + betreuer['betreuer'][i]['nachname'] + '<br>';
				}
				//cur_frm.set_df_property('mitglieder_uebersicht','options','<p>' + betreuer_list + '</p>');
				mitglieder_uebersicht = mitglieder_uebersicht + betreuer_list + '<br>';
			} else {
				//cur_frm.set_df_property('mitglieder_uebersicht','options','<p>Zu diesem Team existieren noch keine Betreuer</p>');
				mitglieder_uebersicht = mitglieder_uebersicht + betreuer_list + 'Zu diesem Team existieren noch keine Betreuer<br><br>';
			}
		} else {
			//cur_frm.set_df_property('mitglieder_uebersicht','options','<p>Zu diesem Team existieren noch keine Betreuer</p>');
			mitglieder_uebersicht = mitglieder_uebersicht + betreuer_list + 'Zu diesem Team existieren noch keine Betreuer<br><br>';
		}
		
		// spieler
		var spieler = frappe.get_doc("TeamPlaner Team", cur_frm.doc.name)['__onload'];
		var spieler_list = '<b>Spieler</b><br>';
		if (spieler && spieler['spieler']) {
			if (spieler['spieler'].length >= 1) {
				for (i=0; i < spieler['spieler'].length; i++) {
					spieler_list = spieler_list + spieler['spieler'][i]['vorname'] + ' ' + spieler['spieler'][i]['nachname'] + ', ' + spieler['spieler'][i]['rueckennummer'] + ', ' + spieler['spieler'][i]['position'] + ', ' + spieler['spieler'][i]['lizenznummer'] + '<br>';
				}
				//cur_frm.set_df_property('mitglieder_uebersicht','options','<p>' + spieler_list + '</p>');
				mitglieder_uebersicht = mitglieder_uebersicht + spieler_list + '<br>';
			} else {
				//cur_frm.set_df_property('mitglieder_uebersicht','options','<p>Zu diesem Team existieren noch keine Spieler</p>');
				mitglieder_uebersicht = mitglieder_uebersicht + spieler_list + 'Zu diesem Team existieren noch keine Spieler<br><br>';
			}
		} else {
			//cur_frm.set_df_property('mitglieder_uebersicht','options','<p>Zu diesem Team existieren noch keine Spieler</p>');
			mitglieder_uebersicht = mitglieder_uebersicht + spieler_list + 'Zu diesem Team existieren noch keine Spieler<br><br>';
		}
		
		mitglieder_uebersicht = mitglieder_uebersicht + '</p>';
		cur_frm.set_df_property('mitglieder_uebersicht','options',mitglieder_uebersicht);
	}
});
