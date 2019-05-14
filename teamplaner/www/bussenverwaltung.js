function fetch_bussen_details() {
		var busse = document.getElementById("busse").value.split("&%&")[0];
		var betrag = document.getElementById("busse").value.split("&%&")[1];
		var training = document.getElementById("busse").value.split("&%&")[2];
		var spiel = document.getElementById("busse").value.split("&%&")[3];
		if (busse != "leer") {
			document.getElementById("betrag").value = betrag;
			document.getElementById("comment").value = busse;
			if ((training == '1') && (spiel == '1')) {
				document.getElementById("training").checked = true;
				document.getElementById("spiel").checked = true;
			}
			if ((training == '0') && (spiel == '0')) {
				document.getElementById("training").checked = false;
				document.getElementById("spiel").checked = false;
			}
			if ((training == '1') && (spiel == '0')) {
				document.getElementById("training").checked = true;
				document.getElementById("spiel").checked = false;
			}
			if ((training == '0') && (spiel == '1')) {
				document.getElementById("training").checked = false;
				document.getElementById("spiel").checked = true;
			}
		} else {
			document.getElementById("betrag").value = "";
			document.getElementById("comment").value = "";
			document.getElementById("training").checked = false;
			document.getElementById("spiel").checked = false;
		}
}

function add_busse() {
	var betrag = document.getElementById("betrag").value;
	var beschreibung = document.getElementById("comment").value;
	var busse = document.getElementById("busse").value;
	var training = 0;
	if (document.getElementById("training").checked == true) {
		training = 1;
	}
	var spiel = 0;
	if (document.getElementById("spiel").checked == true) {
		spiel = 1;
	}
	//console.log(busse);
	var spieler = document.getElementById("spieler").value;
	if ((spieler != "leer") && (busse != "leer")) {
		frappe.call({
			method: "teamplaner.www.bussenverwaltung.add_busse",
			args:{
				'betrag': betrag,
				'beschreibung': beschreibung,
				'training': training,
				'spiel': spiel,
				'spieler': spieler
			},
			callback: function(r)
			{
				frappe.msgprint("Die Busse wurde erfasst");
				document.getElementById("spieler").value = "leer";
				document.getElementById("busse").value = "leer";
				document.getElementById("training").checked = false;
				document.getElementById("spiel").checked = false;
				document.getElementById("comment").value = "";
				document.getElementById("betrag").value = "";
				setTimeout(function(){ location.reload(); }, 1000);
			}
		});
	} else {
		frappe.msgprint("Bitte zuerst einen Spieler und eine Busse auswählen!");
	}
}

function bussen_laden() {
	var spieler = document.getElementById("spieler").value;
	if (spieler != "leer") {
		frappe.call({
			method: "teamplaner.www.bussenverwaltung.get_spieler_bussen",
			args:{
				'spieler': spieler
			},
			callback: function(r)
			{
				var myNode = document.getElementById("bussen_table");
				while (myNode.firstChild) {
					myNode.removeChild(myNode.firstChild);
				}
				if (r.message) {
					for (i=0; i<r.message.length; i++) {
						var tr = document.createElement("tr");
						
						var spiel_td = document.createElement("td");
						var training_td = document.createElement("td");
						var betrag_td = document.createElement("td");
						var bemerkung_td = document.createElement("td");
						var btn_td = document.createElement("td");
						
						spiel_td.style.width = "10%";
						training_td.style.width = "10%";
						betrag_td.style.width = "20%";
						bemerkung_td.style.width = "40%";
						btn_td.style.width = "20%";
						
						var div_check_spiel = document.createElement("div");
						var check_check_spiel = document.createElement("input");
						check_check_spiel.type = "checkbox";
						check_check_spiel.disabled = true;
						if (r.message[i].spiel == 1) {
							check_check_spiel.checked = true;
						} else {
							check_check_spiel.checked = false;
						}
						div_check_spiel.appendChild(check_check_spiel);
						
						var div_check_training = document.createElement("div");
						var check_check_training = document.createElement("input");
						check_check_training.type = "checkbox";
						check_check_training.disabled = true;
						if (r.message[i].training == 1) {
							check_check_training.checked = true;
						} else {
							check_check_training.checked = false;
						}
						div_check_training.appendChild(check_check_training);
						
						var betrag_node = document.createTextNode(r.message[i].betrag);
						var bemerkung_node = document.createTextNode(r.message[i].bemerkung);
						
						var btn = document.createElement("button");
						btn.dataset.referenz = r.message[i].name;
						btn.onclick = function() {
							remove_busse(this);
						};
						btn.classList.add("btn");
						btn.classList.add("btn-warning");
						var btn_node = document.createTextNode("Busse entfernen");
						btn.appendChild(btn_node);
						
						
						
						spiel_td.appendChild(div_check_spiel);
						training_td.appendChild(div_check_training);
						betrag_td.appendChild(betrag_node);
						bemerkung_td.appendChild(bemerkung_node);
						btn_td.appendChild(btn);
						
						tr.appendChild(spiel_td);
						tr.appendChild(training_td);
						tr.appendChild(betrag_td);
						tr.appendChild(bemerkung_td);
						tr.appendChild(btn);
						
						var element = document.getElementById("bussen_table");
						element.appendChild(tr);
					}
				}
			}
		});
	} else {
		var myNode = document.getElementById("bussen_table");
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
	}
}

function remove_busse(busse) {
	busse = busse.dataset.referenz;
	frappe.call({
		method: "teamplaner.www.bussenverwaltung.remove_busse",
		args:{
			'busse': busse
		},
		callback: function(r)
		{
			bussen_laden();
			frappe.msgprint("Die Busse wurde entfernt");
		}
	});
}