var global_bemerkung_check = false;
var global_btn = '';
var global_open = false;

function change_anwesenheit(training, spieler, anmeldung, btn) {	
	global_btn = btn;
	if (btn.checked == true) {
		frappe.call({
			method: "teamplaner.utils.change_anwesenheit",
			args:{
				'training': training,
				'spieler': spieler,
				'status': "Abwesend"
			},
			callback: function(r)
			{
				var elternElement = document.getElementById(training);
				elternElement.previousSibling.previousSibling.style.backgroundColor = "lightgreen";
				
				frappe.call({
					method: "teamplaner.utils.update_remark",
					args:{
						'training': training,
						'spieler': frappe.session.user,
						'bemerkung': ''
					},
					callback: function(r)
					{
						
					}
				});
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
				var elternElement = document.getElementById(training);
				elternElement.previousSibling.previousSibling.style.backgroundColor = "lightcoral";
				if(global_open == false) {
					zwang_add_bemerkung(training);
				}
				if(global_bemerkung_check == false) {
					$(btn).click();
				} else {
					global_bemerkung_check = true;
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

function zwang_add_bemerkung(training) {
	frappe.msgprint('<div class="input-group"><span class="input-group-addon"><i class="fa fa-comment"></i></span><input id="bemerkung" type="text" class="form-control" name="bemerkung" placeholder="Zwingend erforderliche Bemerkung" required></div><br><button type="button" class="btn btn-primary btn-block" id="' + training + '" onclick="zwang_update_bemerkung(this);">Update</button>', "Begründung Abmeldung");	
}

function zwang_update_bemerkung(training) {
	var bemerkung = training.previousSibling.previousSibling.childNodes[1].value;
	global_open = true;
	if (bemerkung) {
		global_bemerkung_check = true;
		$(global_btn).click();
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
	} else {
		console.log("Fehler");
	}
}

function show_details(training) {
	frappe.call({
		method: "teamplaner.www.trainings.get_details",
		args:{
			'training': training
		},
		callback: function(r)
		{
			var details = r.message;
			if (details) {
				frappe.msgprint(details, "Training Details");
			} else {
				frappe.msgprint("Es wurden noch keine Details durch den Trainer erfasst.", "Training Details");
			}
		}
	});
}