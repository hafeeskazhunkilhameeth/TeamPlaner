function activate_btn(_btn) {
	var btn = document.getElementById(_btn);
	btn.disabled = false;
}

function abmelden(training) {
	var bemerkung = document.getElementById("comment" + training).value;
	if (!bemerkung) {
		return
	}
	frappe.call({
		method: "teamplaner.www.trainings.abmelden",
		args:{
			'training': training,
			'bemerkung': bemerkung
		},
		callback: function(r)
		{
			location.reload(true);
		}
	});
}

function anmelden(training) {
	frappe.call({
		method: "teamplaner.www.trainings.anmelden",
		args:{
			'training': training
		},
		callback: function(r)
		{
			location.reload(true);
		}
	});
}

function bemerkung(training) {
	var bemerkung = document.getElementById("bemerkung" + training).value;
	if (!bemerkung) {
		bemerkung = '';
	}
	frappe.call({
		method: "teamplaner.www.trainings.bemerkung",
		args:{
			'training': training,
			'bemerkung': bemerkung
		},
		callback: function(r)
		{
			location.reload(true);
		}
	});
}