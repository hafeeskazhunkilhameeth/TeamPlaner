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