function change_anwesenheit(training, spieler, anmeldung) {	
	//frappe.msgprint(spieler);
	frappe.call({
		method: "teamplaner.utils.change_anwesenheit",
		args:{
			'training': training,
			'spieler': spieler,
			'status': anmeldung
		},
		callback: function(r)
		{
			
			frappe.msgprint("Die Änderung wurde übernommen und die Seite in kürze neu geladen.");
			
			setTimeout(function(){ location.reload(); }, 1500);
		}
	});
}