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

function alle_trainings_laden() {
	var acc = document.getElementById("accordion_kurz");
	var btn = document.getElementById("show_all_btn");
	var show = document.getElementById("accordion");
	
	acc.classList.add("hidden");
	btn.classList.add("hidden");
	show.classList.remove("hidden");
}