function show_neuer_spieler() {
	document.getElementById("team_section").style.display = "none";
	document.getElementById("neuer_spieler").style.display = "block";
}

function show_spieler_bearbeiten() {
	document.getElementById("team_section").style.display = "none";
	document.getElementById("spieler_bearbeiten").style.display = "block";
}

function reset_tab_team() {
	document.getElementById("team_section").style.display = "block";
	document.getElementById("spieler_bearbeiten").style.display = "none";
	document.getElementById("neuer_spieler").style.display = "none";
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
			frappe.msgprint("Es wurde erfolgreich ein neuer Spieler angelegt.");
		}
	});
}

function add_training() {
	
}

function add_spiel() {
	
}

function change_spieler() {
	
}

function change_training() {
	
}

function change_spiel() {
	
}

function delete_spieler() {
	
}

function delete_training() {
	
}

function delete_spiel() {
	
}
