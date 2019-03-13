function wunsch_speichern() {
	var dl = document.getElementById("dl").value;
	var dr = document.getElementById("dr").value;
	var c = document.getElementById("c").value;
	var ol = document.getElementById("ol").value;
	var or = document.getElementById("or").value;
	var bemerkung = document.getElementById("comment").value;
	
	if (dl == "Bitte Defense Links auswählen" || dr == "Bitte Defense Rechts auswählen" || c == "Bitte Center/Top auswählen" || ol == "Bitte Offense Links auswählen" || or == "Bitte Offense Rechts auswählen") {
		frappe.msgprint("Bitte alle Positionen besetzen!", "Fehler");
	} else {
		frappe.call({
			method: "teamplaner.www.wunsch.save_block",
			args:{
				'dl': dl,
				'dr': dr,
				'c': c,
				'ol': ol,
				'_or': or,
				'bemerkung': bemerkung
			},
			callback: function(r)
			{
				frappe.msgprint("Dein Wunsch-Block wurde gespeichert.");
				document.getElementById("dl").value = "Bitte Defense Links auswählen";
				document.getElementById("dr").value = "Bitte Defense Rechts auswählen";
				document.getElementById("c").value = "Bitte Center/Top auswählen";
				document.getElementById("ol").value = "Bitte Offense Links auswählen";
				document.getElementById("or").value = "Bitte Offense Rechts auswählen";
				document.getElementById("comment").value = "";
			}
		});
	}
}