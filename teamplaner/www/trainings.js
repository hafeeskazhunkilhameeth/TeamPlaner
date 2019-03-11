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
	
	acc.parentNode.removeChild(acc);
	btn.classList.add("hidden");
	show.classList.remove("hidden");
}

function add_bemerkung(training) {
	frappe.msgprint('<div class="input-group"><span class="input-group-addon"><i class="fa fa-comment"></i></span><input id="bemerkung" type="text" class="form-control" name="bemerkung" placeholder="Bemerkung"></div><br><button type="button" class="btn btn-primary btn-block" id="' + training + '" onclick="update_bemerkung(this);">Update</button>', "Erfassung Bemerkung");	
}

function update_bemerkung(training) {
	var bemerkung = document.getElementById("bemerkung").value;
	console.log(training.id);
	console.log(bemerkung);
	console.log(frappe.session.user);
	frappe.call({
		method: "teamplaner.utils.update_remark",
		args:{
			'training': training.id,
			'spieler': frappe.session.user,
			'bemerkung': bemerkung
		},
		callback: function(r)
		{
			window.location.reload();
		}
	});
}