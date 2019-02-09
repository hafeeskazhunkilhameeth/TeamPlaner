function busse(training, spieler, anmeldung, tr) {	
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
				
				if (r.message == "keine_busse") {
					frappe.msgprint("Status geändert");
				} else {
					frappe.msgprint("Status geändert und Busse ausgelöst");
				}
				
			}
		});
	} else {
		frappe.call({
			method: "teamplaner.utils.change_anwesenheit",
			args:{
				'training': training,
				'spieler': spieler,
				'status': "Anwesend",
				'busse': 'ja'
			},
			callback: function(r)
			{
				
				if (tr.style.backgroundColor == "red") {
					tr.style.backgroundColor = "#50D050";
				} else {
					tr.style.backgroundColor = "red";
				}
				
				if (r.message == "keine_busse") {
					frappe.msgprint("Status geändert");
				} else {
					frappe.msgprint("Status geändert und Busse ausgelöst");
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