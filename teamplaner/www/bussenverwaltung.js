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