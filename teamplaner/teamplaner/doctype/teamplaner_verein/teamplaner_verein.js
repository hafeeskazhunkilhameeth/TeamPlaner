// Copyright (c) 2019, libracore and contributors
// For license information, please see license.txt

frappe.ui.form.on('TeamPlaner Verein', {
	refresh: function(frm) {
		var teams = frappe.get_doc("TeamPlaner Verein", frm.doc.name)['__onload'];
		var team_list = '';
		if (teams['team_uebersicht'].length >= 1) {
			for (i=0; i < teams['team_uebersicht'].length; i++) {
				team_list = team_list + teams['team_uebersicht'][i]['title'] + '<br>';
			}
			cur_frm.set_df_property('team_uebersicht','options','<p>' + team_list + '</p>');
		} else {
			cur_frm.set_df_property('team_uebersicht','options','<p>Zu diesem Verein existieren noch keine Teams</p>');
		}
	}
});
