function change_anwesenheit(training, spieler, anmeldung, tr) {	
	//frappe.msgprint(spieler);
	if (tr.style.backgroundColor == "red") {
				frappe.call({
			method: "teamplaner.utils.change_anwesenheit",
			args:{
				'training': training,
				'spieler': spieler,
				'status': "Abwesend"
			},
			callback: function(r)
			{
				
				if (tr.style.backgroundColor == "red") {
					tr.style.backgroundColor = "#50D050";
				} else {
					tr.style.backgroundColor = "red";
				}
			}
		});

	} else {
		frappe.call({
			method: "teamplaner.utils.change_anwesenheit",
			args:{
				'training': training,
				'spieler': spieler,
				'status': "Anwesend"
			},
			callback: function(r)
			{
				
				if (tr.style.backgroundColor == "red") {
					tr.style.backgroundColor = "#50D050";
				} else {
					tr.style.backgroundColor = "red";
				}
			}
		});

	}
}

function show_aufgebot(spiel, ref) {
	frappe.call({
		method: "teamplaner.utils.get_aufgebot",
		args:{
			'spiel': spiel,
			'ref': ref
		},
		callback: function(r)
		{
			var team = r.message;
			var linie_eins = "<center><h4>1. Linie</h4></center><table width='100%;'><tr><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['tor'] + "</td><td style='width:33%;' align='center'></td></tr><tr><td style='width:33%;' align='center'>" + team['eins'][0][0] + "</td><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['eins'][0][1] + "</td></tr><tr><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['eins'][1] + "</td><td style='width:33%;' align='center'></td></tr><tr><td style='width:33%;' align='center'>" + team['eins'][2][0] + "</td><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['eins'][2][1] + "</td></tr></table><hr>";
			var linie_zwei = "<center><h4>2. Linie</h4></center><table width='100%;'><tr><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['tor'] + "</td><td style='width:33%;' align='center'></td></tr><tr><td style='width:33%;' align='center'>" + team['zwei'][0][0] + "</td><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['zwei'][0][1] + "</td></tr><tr><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['zwei'][1] + "</td><td style='width:33%;' align='center'></td></tr><tr><td style='width:33%;' align='center'>" + team['zwei'][2][0] + "</td><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['zwei'][2][1] + "</td></tr></table><hr>";
			var linie_drei = "<center><h4>3. Linie</h4></center><table width='100%;'><tr><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['tor'] + "</td><td style='width:33%;' align='center'></td></tr><tr><td style='width:33%;' align='center'>" + team['drei'][0][0] + "</td><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['drei'][0][1] + "</td></tr><tr><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['drei'][1] + "</td><td style='width:33%;' align='center'></td></tr><tr><td style='width:33%;' align='center'>" + team['drei'][2][0] + "</td><td style='width:33%;' align='center'></td><td style='width:33%;' align='center'>" + team['drei'][2][1] + "</td></tr></table><hr>";
			var reserve = "<center><h4>Reserve</h4></center>";
			var bemerkung = "<center><h4>Bemerkungen</h4></center><br>" + team['bemerkung'];
			for (i=0; i < team['reserve'].length; i++) {
				reserve = reserve + "<center>" + team['reserve'][i][0] + "</center>" + "<br>";
			}
			reserve = reserve + "<hr>";
			var kein_aufgebot = "<center><h4>Kein Aufgebot</h4></center>";
			for (i=0; i < team['kein_aufgebot'].length; i++) {
				kein_aufgebot = kein_aufgebot + "<center>" + team['kein_aufgebot'][i][0] + "</center>" + "<br>";
			}
			kein_aufgebot = kein_aufgebot + "<hr>";
			
			if (team['anzahl_linien'] == '1') {
				frappe.msgprint(linie_eins + reserve + kein_aufgebot + bemerkung, "Aufgebot für Spiel " + ref + " vom " + spiel);
			}
			if (team['anzahl_linien'] == '2') {
				frappe.msgprint(linie_eins + linie_zwei + reserve + kein_aufgebot + bemerkung, "Aufgebot für Spiel " + ref + " vom " + spiel);
			}
			if (team['anzahl_linien'] == '3') {
				frappe.msgprint(linie_eins + linie_zwei + linie_drei + reserve + kein_aufgebot + bemerkung, "Aufgebot für Spiel " + ref + " vom " + spiel);
			}
			
		}
	});
}

function alle_spiele_laden() {
	var acc = document.getElementById("accordion_kurz");
	var btn = document.getElementById("show_all_btn");
	var show = document.getElementById("accordion");
	
	acc.classList.add("hidden");
	btn.classList.add("hidden");
	show.classList.remove("hidden");
}