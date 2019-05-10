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