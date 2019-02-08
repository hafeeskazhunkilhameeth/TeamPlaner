frappe.listview_settings['TeamPlaner Training'] = {
    onload: function(listview) {
        listview.page.add_menu_item( __("Wöchentliche Training Massenanlage"), function() {
            massenanlage();
        });
    }
}

function massenanlage() {
	var d = new frappe.ui.Dialog({
		title: __('Trainings Massenanlage'),
		fields: [
			{'fieldname': 'von', 'fieldtype': 'Time', 'label': 'Von'},
			{'fieldname': 'bis', 'fieldtype': 'Time', 'label': 'Bis'},
			{'fieldname': 'start', 'fieldtype': 'Date', 'default': frappe.datetime.nowdate(), 'label': 'Start Datum'},
			{'fieldname': 'anz', 'fieldtype': 'Int', 'label': 'Anzahl Anlagen'},
			{'fieldname': 'team', 'fieldtype': 'Link', 'options': 'TeamPlaner Team', 'label': 'Team'},
			{'fieldname': 'ort', 'fieldtype': 'Data', 'label': 'Ort'}
		],
		primary_action: function(){
			d.hide();
			if (d.get_values().von && d.get_values().bis && d.get_values().start && d.get_values().anz && d.get_values().team && d.get_values().ort) {
				console.log(d.get_values());
				frappe.call({
					"method": "teamplaner.teamplaner.doctype.teamplaner_training.teamplaner_training.massenanlage",
					"args": {
							"von": d.get_values().von,
							"bis": d.get_values().bis,
							"start": d.get_values().start,
							"anz": d.get_values().anz,
							"team": d.get_values().team,
							"ort": d.get_values().ort
					},
					"callback": function(response) {
						frappe.msgprint("Alle " + d.get_values().anz + " Trainings wurden angelegt");	
					}
				});
			} else {
				frappe.throw("Bitte alle Daten angeben!");
			}
		},
		primary_action_label: __('Start Anlage')
	});
	d.show();
}
