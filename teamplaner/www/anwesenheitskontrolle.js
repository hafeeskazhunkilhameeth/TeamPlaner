function abwesend_ohne_busse(training, spieler, anmeldung, tr) {	
	var tr = document.getElementById(tr);
	frappe.call({
		method: "teamplaner.utils.change_anwesenheit",
		args:{
			'training': training,
			'spieler': spieler,
			'status': "Anwesend"
		},
		callback: function(r)
		{
			
			tr.style.backgroundColor = "red";
			frappe.msgprint("Status geändert");
			setTimeout(function(){ location.reload(); }, 500);
		}
	});
}

function anwesend_ohne_busse(training, spieler, anmeldung, tr) {	
	var tr = document.getElementById(tr);
	frappe.call({
		method: "teamplaner.utils.change_anwesenheit",
		args:{
			'training': training,
			'spieler': spieler,
			'status': "Abwesend"
		},
		callback: function(r)
		{
			
			tr.style.backgroundColor = "#50D050";
			frappe.msgprint("Status geändert");
			setTimeout(function(){ location.reload(); }, 500);
		}
	});
}

function abwesend_mit_busse(training, spieler, anmeldung, tr) {	
	var tr = document.getElementById(tr);
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
			
			tr.style.backgroundColor = "red";
			frappe.msgprint("Status geändert und Busse ausgelöst");
			setTimeout(function(){ location.reload(); }, 500);
		}
	});
}

function abfrage(training, spieler, anmeldung, tr) {
	var busse_btn_1 = '<center><button style="width: 95px;" class="btn btn-primary" onclick="abwesend_mit_busse('
	var argumente = "'" + training + "', '" + spieler + "', '" + anmeldung + "', '" + tr + "'";
	var busse_btn_2 = ');">Mit Busse</button>';
	var busse_btn_3 = '<button style="width: 95px;" class="btn btn-primary" onclick="abwesend_ohne_busse('
	var busse_btn_4 = ');">Ohne Busse</button></center>';
	frappe.msgprint(busse_btn_1 + argumente + busse_btn_2 + "<br><br>" + busse_btn_3 + argumente + busse_btn_4, "Bussen-Management");
}
function change_anwesenheit(training, spieler, anmeldung, tr) {	
	//frappe.msgprint(spieler);
	var tr = document.getElementById(tr);
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
	
	acc.parentNode.removeChild(acc);
	btn.classList.add("hidden");
	show.classList.remove("hidden");
}