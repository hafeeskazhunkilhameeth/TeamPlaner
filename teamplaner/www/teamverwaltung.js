function show_neuer_spieler() {
	document.getElementById("team_section").style.display = "none";
	document.getElementById("neuer_spieler").style.display = "block";
}

function show_spieler_bearbeiten() {
	document.getElementById("team_section").style.display = "none";
	document.getElementById("spieler_bearbeiten").style.display = "block";
}

function show_allgemeine_einstellungen() {
	document.getElementById("saison_von").value = "{{ saisondaten.saison_von }}";
	document.getElementById("saison_bis").value = "{{ saisondaten.saison_bis }}";
	document.getElementById("team_section").style.display = "none";
	document.getElementById("allgemeine_einstellungen").style.display = "block";
}

function reset_tab_team() {
	document.getElementById("team_section").style.display = "block";
	document.getElementById("spieler_bearbeiten").style.display = "none";
	document.getElementById("neuer_spieler").style.display = "none";
	document.getElementById("allgemeine_einstellungen").style.display = "none";
}

function show_neues_training() {
	document.getElementById("training_section").style.display = "none";
	document.getElementById("neues_training").style.display = "block";
}

function show_training_bearbeiten() {
	document.getElementById("training_section").style.display = "none";
	document.getElementById("training_bearbeiten").style.display = "block";
}

function reset_tab_training() {
	document.getElementById("training_section").style.display = "block";
	document.getElementById("neues_training").style.display = "none";
	document.getElementById("training_bearbeiten").style.display = "none";
}

function show_neues_spiel() {
	document.getElementById("spiel_section").style.display = "none";
	document.getElementById("neues_spiel").style.display = "block";
}

function show_spiel_bearbeiten() {
	document.getElementById("spiel_section").style.display = "none";
	document.getElementById("spiel_bearbeiten").style.display = "block";
}

function reset_tab_spiel() {
	document.getElementById("spiel_section").style.display = "block";
	document.getElementById("neues_spiel").style.display = "none";
	document.getElementById("spiel_bearbeiten").style.display = "none";
}

function add_spieler() {
	frappe.show_message("Bitte warten");
	var vorname = document.getElementById("vorname").value;
	var nachname = document.getElementById("nachname").value;
	var mail = document.getElementById("mail").value;
	var lizenznummer = document.getElementById("lizenznummer").value;
	var nummer = document.getElementById("nummer").value;
	var position = document.getElementById("position").value;
	var linie = document.getElementById("linie").value;
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.neuer_spieler",
		'args': {
			'vorname': vorname,
			'nachname': nachname,
			'mail': mail,
			'lizenznummer': lizenznummer,
			'nummer': nummer,
			'position': position,
			'linie': linie
		},
		'callback': function(r) {
			document.getElementById("vorname").value = "";
			document.getElementById("nachname").value = "";
			document.getElementById("mail").value = "";
			document.getElementById("lizenznummer").value = "";
			document.getElementById("nummer").value = "";
			document.getElementById("position").value = "";
			document.getElementById("linie").value = "";
			frappe.hide_message();
			frappe.msgprint("Es wurde erfolgreich ein neuer Spieler angelegt.");
		}
	});
}

function get_spieler_details() {
	var spieler = document.getElementById("spieler").value;
	if (spieler != "Bitte wähle einen Spieler aus") {
		frappe.call({
			'method': "teamplaner.www.teamverwaltung.get_spieler_details",
			'args': {
				'spieler': spieler
			},
			'callback': function(r) {
				var spieler = r.message;
				document.getElementById("bea_vorname").value = spieler.vorname;
				document.getElementById("bea_nachname").value = spieler.nachname;
				document.getElementById("bea_lizenznummer").value = spieler.lizenznummer;
				document.getElementById("bea_nummer").value = spieler.rueckennummer;
				document.getElementById("bea_position").value = spieler.position;
				document.getElementById("bea_linie").value = spieler.linie;
			}
		});
	} else {
		document.getElementById("bea_vorname").value = "";
		document.getElementById("bea_nachname").value = "";
		document.getElementById("bea_lizenznummer").value = "";
		document.getElementById("bea_nummer").value = "";
		document.getElementById("bea_position").value = "";
		document.getElementById("bea_linie").value = "";
	}
}

function add_training() {
	frappe.show_message("Bitte warten");
	var wann = document.getElementById("wann").value;
	var wo = document.getElementById("wo").value;
	var von = document.getElementById("von").value;
	var bis = document.getElementById("bis").value;
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.neues_training",
		'args': {
			'wann': wann,
			'wo': wo,
			'von': von,
			'bis':bis
		},
		'callback': function(r) {
			frappe.hide_message();
			frappe.msgprint("Das Training wurde erfolgreich angelegt.");
		}
	});
}

function get_training_details() {
	var training = document.getElementById("training").value;
	if (training != "Bitte wähle ein Training aus") {
		frappe.call({
			'method': "teamplaner.www.teamverwaltung.get_training_details",
			'args': {
				'training': training
			},
			'callback': function(r) {
				var training = r.message;
				document.getElementById("bea_wann").value = training.datum;
				document.getElementById("bea_wo").value = training.ort;
				document.getElementById("bea_von").value = training.von;
				document.getElementById("bea_bis").value = training.bis;
			}
		});
	} else {
		document.getElementById("bea_wann").value = "";
		document.getElementById("bea_wo").value = "";
		document.getElementById("bea_von").value = "";
		document.getElementById("bea_bis").value = "";
	}
}

function add_spiel() {
	frappe.show_message("Bitte warten");
	var wann = document.getElementById("spiel_wann").value;
	var wo = document.getElementById("spiel_wo").value;
	var von = document.getElementById("spiel_von").value;
	var bis = document.getElementById("spiel_bis").value;
	if (document.getElementById("1spiel").checked) {
		var zwei_spiele = 0;
		var zwei_heimspiel = 0;
		var gegner_1 = document.getElementById("gegner_1").value;
		var gegner_2 = document.getElementById("gegner_2").value;
		if (document.getElementById("1heim").checked) {
			var eins_heimspiel = 1;
		} else {
			var eins_heimspiel = 0;
		}
	} else{
		var zwei_spiele = 1;
		var gegner_1 = document.getElementById("gegner_1").value;
		var gegner_2 = document.getElementById("gegner_2").value;
		if (document.getElementById("1heim").checked) {
			var eins_heimspiel = 1;
		} else {
			var eins_heimspiel = 0;
		}
		if (document.getElementById("2heim").checked) {
			var zwei_heimspiel = 1;
		} else {
			var zwei_heimspiel = 0;
		}
	}
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.neues_spiel",
		'args': {
			'wann': wann,
			'wo': wo,
			'von': von,
			'bis':bis,
			'gegner_1': gegner_1,
			'zwei_spiele': zwei_spiele,
			'gegner_2': gegner_2,
			'eins_heimspiel': eins_heimspiel,
			'zwei_heimspiel': zwei_heimspiel
		},
		'callback': function(r) {
			frappe.hide_message();
			document.getElementById("spiel_wann").value = "";
			document.getElementById("spiel_wo").value = "";
			document.getElementById("spiel_von").value = "";
			document.getElementById("spiel_bis").value = "";
			document.getElementById("gegner_1").value = "";
			document.getElementById("gegner_2").value = "";
			document.getElementById("1heim").checked = false;
			document.getElementById("2heim").checked = false;
			document.getElementById("2spiele").checked = true;
			frappe.msgprint("Das Spiel wurde erfolgreich angelegt.");
		}
	});
}

function change_spieler() {
	frappe.show_message("Bitte warten");
	var spieler = document.getElementById("spieler").value;
	var vorname = document.getElementById("bea_vorname").value;
	var nachname = document.getElementById("bea_nachname").value;
	var lizenznummer = document.getElementById("bea_lizenznummer").value;
	var nummer = document.getElementById("bea_nummer").value;
	var position = document.getElementById("bea_position").value;
	var linie = document.getElementById("bea_linie").value;
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.spieler_bearbeiten",
		'args': {
			'spieler': spieler,
			'vorname': vorname,
			'nachname': nachname,
			'lizenznummer': lizenznummer,
			'nummer': nummer,
			'position': position,
			'linie': linie
		},
		'callback': function(r) {
			frappe.hide_message();
			frappe.msgprint("Der Spieler wurde erfolgreich geändert.");
		}
	});
}

function change_training() {
	frappe.show_message("Bitte warten");
	var training = document.getElementById("training").value;
	var wo = document.getElementById("bea_wo").value;
	var von = document.getElementById("bea_von").value;
	var bis = document.getElementById("bea_bis").value;
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.training_bearbeiten",
		'args': {
			'training': training,
			'wo': wo,
			'von': von,
			'bis':bis
		},
		'callback': function(r) {
			frappe.hide_message();
			frappe.msgprint("Das Training wurde erfolgreich geändert.");
		}
	});
}

function change_spiel() {
	
}

function delete_spieler() {
	frappe.show_message("Bitte warten");
	var spieler = document.getElementById("spieler").value;
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.spieler_entfernen",
		'args': {
			'spieler': spieler
		},
		'callback': function(r) {
			frappe.hide_message();
			document.getElementById("spieler").value = "Bitte wähle einen Spieler aus";
			document.getElementById("bea_vorname").value = "";
			document.getElementById("bea_nachname").value = "";
			document.getElementById("bea_lizenznummer").value = "";
			document.getElementById("bea_nummer").value = "";
			document.getElementById("bea_position").value = "";
			document.getElementById("bea_linie").value = "";
			frappe.msgprint("Der Spieler wurde erfolgreich gelöscht.");
		}
	});
}

function delete_training() {
	frappe.show_message("Bitte warten");
	var training = document.getElementById("training").value;
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.training_entfernen",
		'args': {
			'training': training
		},
		'callback': function(r) {
			frappe.hide_message();
			document.getElementById("training").value = "Bitte wähle ein Training aus";
			document.getElementById("bea_wo").value = "";
			document.getElementById("bea_von").value = "";
			document.getElementById("bea_bis").value = "";
			frappe.msgprint("Das Training wurde erfolgreich gelöscht.");
		}
	});
}

function delete_spiel() {
	frappe.show_message("Bitte warten");
	var spiel = document.getElementById("spiel").value;
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.spiel_entfernen",
		'args': {
			'spiel': spiel
		},
		'callback': function(r) {
			frappe.hide_message();
			document.getElementById("spiel").value = "Bitte wähle ein Spiel aus";
			document.getElementById("bea_spiel_wann").value = "";
			document.getElementById("bea_spiel_wo").value = "";
			document.getElementById("bea_spiel_von").value = "";
			document.getElementById("bea_spiel_bis").value = "";
			document.getElementById("bea_gegner_1").value = "";
			document.getElementById("bea_gegner_2").value = "";
			document.getElementById("bea_1heim").checked = false;
			document.getElementById("bea_2heim").checked = false;
			document.getElementById("bea_1spiel").checked = false;
			document.getElementById("bea_2spiele").checked = false;
			frappe.msgprint("Das Spiel wurde erfolgreich gelöscht.");
		}
	});
}

function change_anz_spiele(anz) {
	if (anz == '1') {
		document.getElementById("gegner_2").disabled = true;
		document.getElementById("2heim").disabled = true;
	} else {
		document.getElementById("gegner_2").disabled = false;
		document.getElementById("2heim").disabled = false;
	}
}

function bea_change_anz_spiele(anz) {
	if (anz == '1') {
		document.getElementById("bea_gegner_2").disabled = true;
		document.getElementById("bea_2heim").disabled = true;
	} else {
		document.getElementById("bea_gegner_2").disabled = false;
		document.getElementById("bea_2heim").disabled = false;
	}
}

function get_spiel_details() {
	var spiel = document.getElementById("spiel").value;
	if (spiel != "Bitte wähle ein Spiel aus") {
		frappe.call({
			'method': "teamplaner.www.teamverwaltung.get_spiel_details",
			'args': {
				'spiel': spiel
			},
			'callback': function(r) {
				var spiel = r.message;
				document.getElementById("bea_spiel_wann").value = spiel.datum;
				document.getElementById("bea_spiel_wo").value = spiel.ort;
				document.getElementById("bea_spiel_von").value = spiel.von;
				document.getElementById("bea_spiel_bis").value = spiel.bis;
				document.getElementById("bea_gegner_1").value = spiel.gegner;
				document.getElementById("bea_gegner_2").value = spiel.zweiter_gegner;
				if (spiel.eins_heimspiel == 1) {
					document.getElementById("bea_1heim").checked = true;
				} else {
					document.getElementById("bea_1heim").checked = false;
				}
				if (spiel.zwei_heimspiel == 1) {
					document.getElementById("bea_2heim").checked = true;
				} else {
					document.getElementById("bea_2heim").checked = false;
				}
				if (spiel.zwei_spiele == 1) {
					document.getElementById("bea_2spiele").checked = true;
				} else {
					document.getElementById("bea_1spiel").checked = true;
				}
			}
		});
	} else {
		document.getElementById("bea_spiel_wann").value = "";
		document.getElementById("bea_spiel_wo").value = "";
		document.getElementById("bea_spiel_von").value = "";
		document.getElementById("bea_spiel_bis").value = "";
		document.getElementById("bea_gegner_1").value = "";
		document.getElementById("bea_gegner_2").value = "";
		document.getElementById("bea_1heim").checked = false;
		document.getElementById("bea_2heim").checked = false;
		document.getElementById("bea_1spiel").checked = false;
		document.getElementById("bea_2spiele").checked = false;
	}
}

function delete_alte_daten() {
	frappe.show_message("Bitte warten");
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.delete_old_data",
		'args': {},
		'callback': function(r) {
			frappe.hide_message();
			frappe.msgprint("Alle Trainings/Spiele vor dem heutigen Datum wurden entfernt.");
		}
	});
}

function allgemeine_einstellungen_save() {
	frappe.show_message("Bitte warten");
	var von = document.getElementById("saison_von").value;
	var bis = document.getElementById("saison_bis").value;
	frappe.call({
		'method': "teamplaner.www.teamverwaltung.change_saisondaten",
		'args': {
			'von': von,
			'bis': bis
		},
		'callback': function(r) {
			frappe.hide_message();
			frappe.msgprint("Die Saisondaten wurden angepasst.");
		}
	});
}