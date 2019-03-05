//top 10 scorer
var sc_spieler = [];
{% for x in top_ten %}sc_spieler.push('{{ x.vorname }} {{ x.nachname }}');{% endfor %}
var sc_tore = [];
{% for x in top_ten %}sc_tore.push({{ x.tor|int }});{% endfor %}
var sc_assits = [];
{% for x in top_ten %}sc_assits.push({{ x.assist|int }});{% endfor %}
var sc_total = [];
{% for x in top_ten %}sc_total.push({{ x.total|int }});{% endfor %}
let scorer_top_ten = new frappe.Chart( "#scorer_top_ten", { // or DOM element
    data: {
      labels: sc_spieler,
      datasets: [
        {
          name: "Tore", chartType: 'bar',
          values: sc_tore
        },
        {
          name: "Assists", chartType: 'bar',
          values: sc_assits
        },
        {
          name: "Total", chartType: 'line',
          values: sc_total
        }
      ]
    },

    title: "Top 10",
    type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
    height: 300,
    colors: ['green', 'light-green', 'light-blue'],

    tooltipOptions: {
      formatTooltipX: d => (d + '').toUpperCase(),
      formatTooltipY: d => d + '',
    }
  });
  
  
 //Spielübersicht
var xx_spiele = [];
{% for x in saisonverlauf %}xx_spiele.push('{{ x.gegner }}');{% endfor %}
var xx_geschossen = [];
{% for x in saisonverlauf %}xx_geschossen.push({{ x.geschossen|int }});{% endfor %}
var xx_bekommen = [];
{% for x in saisonverlauf %}xx_bekommen.push({{ x.bekommen|int }});{% endfor %}
var xx_diff = [];
{% for x in saisonverlauf %}xx_diff.push({{ x.differenz|int }});{% endfor %}
var xx_punkte = [];
{% for x in saisonverlauf %}xx_punkte.push({{ x.punkte|int }});{% endfor %}
let saisonverlauf = new frappe.Chart( "#saisonverlauf", { // or DOM element
    data: {
      labels: xx_spiele,
      datasets: [
        {
          name: "Tore +", chartType: 'bar',
          values: xx_geschossen
        },
        {
          name: "Tore -", chartType: 'bar',
          values: xx_bekommen
        },
        {
          name: "Tor Diff.", chartType: 'line',
          values: xx_diff
        },
        {
          name: "Punkte", chartType: 'line',
          values: xx_punkte
        }
      ]
    },

    title: "Saisonverlauf",
    type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
    height: 300,
    colors: ['green', 'red', 'light-blue', 'light-green'],

    tooltipOptions: {
      formatTooltipX: d => (d + '').toUpperCase(),
      formatTooltipY: d => d + '',
    }
  });
/*   let scorer_top_ten = new frappe.Chart( "#scorer_top_ten", { // or DOM element
    data: {
      labels: ["Philip Buchegger", "Martin Christen", "OK", "OK", "OK"],
      datasets: [
        {
          name: "Tore", chartType: 'bar',
          values: [10, 20, 30, 30, 30]
        },
        {
          name: "Assists", chartType: 'bar',
          values: [40, 10, 30, 30, 30]
        },
        {
          name: "Total", chartType: 'line',
          values: [50, 30, 60, 30, 30]
        }
      ]
    },

    title: "Pro Monat",
    type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
    height: 300,
    colors: ['green', 'light-green', 'light-blue'],

    tooltipOptions: {
      formatTooltipX: d => (d + '').toUpperCase(),
      formatTooltipY: d => d + ' x',
    }
  }); */

  
//console.log({{ saisondaten['saison_von'] }});
//console.log("hallo");

// spieler präsenz all over
let spieler_all_over_chart = new frappe.Chart( "#spieler_all_over", {
    data: {
      labels: ["Anwesend", "Abwesend"],
      datasets: [
        {
          values: [{{ spieler_total_anwesend }}, {{ spieler_total_abwesend }}]
        }
      ],

    },
    title: "Total",
    type: 'percentage',
	colors: ['green', 'red']
  });

// spieler präsenz pro monat
var jan = 0;
var jan_anwesend = 0;
var jan_abwesend = 0;

var feb = 0;
var feb_anwesend = 0;
var feb_abwesend = 0;

var mar = 0;
var mar_anwesend = 0;
var mar_abwesend = 0;

var apr = 0;
var apr_anwesend = 0;
var apr_abwesend = 0;

var mai = 0;
var mai_anwesend = 0;
var mai_abwesend = 0;

var jun = 0;
var jun_anwesend = 0;
var jun_abwesend = 0;

var jul = 0;
var jul_anwesend = 0;
var jul_abwesend = 0;

var aug = 0;
var aug_anwesend = 0;
var aug_abwesend = 0;

var sept = 0;
var sept_anwesend = 0;
var sept_abwesend = 0;

var okt = 0;
var okt_anwesend = 0;
var okt_abwesend = 0;

var nov = 0;
var nov_anwesend = 0;
var nov_abwesend = 0;

var dez = 0;
var dez_anwesend = 0;
var dez_abwesend = 0;


var loop_control = true;
var start_month = 1;
{% for x in spieler_total_pro_monat %}
	{% if x.monat == 1 %}
		jan = {{ x.anzahl }};
		if (loop_control) {
			start_month = 1;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 2 %}
		feb = {{ x.anzahl }};
		if (loop_control) {
			start_month = 2;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 3 %}
		mar = {{ x.anzahl }};
		if (loop_control) {
			start_month = 3;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 4 %}
		apr = {{ x.anzahl }};
		if (loop_control) {
			start_month = 4;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 5 %}
		mai = {{ x.anzahl }};
		if (loop_control) {
			start_month = 5;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 6 %}
		jun = {{ x.anzahl }};
		if (loop_control) {
			start_month = 6;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 7 %}
		jul = {{ x.anzahl }};
		if (loop_control) {
			start_month = 7;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 8 %}
		aug = {{ x.anzahl }};
		if (loop_control) {
			start_month = 8;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 9 %}
		sept = {{ x.anzahl }};
		if (loop_control) {
			start_month = 9;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 10 %}
		okt = {{ x.anzahl }};
		if (loop_control) {
			start_month = 10;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 11 %}
		nov = {{ x.anzahl }};
		if (loop_control) {
			start_month = 11;
			loop_control = false;
		}
	{% endif %}
	{% if x.monat == 12 %}
		dez = {{ x.anzahl }};
		if (loop_control) {
			start_month = 12;
			loop_control = false;
		}
	{% endif %}
{% endfor %}
{% for x in spieler_anwesend_pro_monat %}
	{% if x.monat == 1 %}
		jan_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 2 %}
		feb_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 3 %}
		mar_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 4 %}
		apr_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 5 %}
		mai_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 6 %}
		jun_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 7 %}
		jul_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 8 %}
		aug_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 9 %}
		sept_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 10 %}
		okt_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 11 %}
		nov_anwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 12 %}
		dez_anwesend = {{ x.anzahl }};
	{% endif %}
{% endfor %}
{% for x in spieler_abwesend_pro_monat %}
	{% if x.monat == 1 %}
		jan_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 2 %}
		feb_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 3 %}
		mar_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 4 %}
		apr_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 5 %}
		mai_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 6 %}
		jun_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 7 %}
		jul_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 8 %}
		aug_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 9 %}
		sept_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 10 %}
		okt_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 11 %}
		nov_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 12 %}
		dez_abwesend = {{ x.anzahl }};
	{% endif %}
{% endfor %}
{% for x in spieler_abwesend_pro_monat %}
	{% if x.monat == 1 %}
		jan_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 2 %}
		feb_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 3 %}
		mar_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 4 %}
		apr_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 5 %}
		mai_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 6 %}
		jun_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 7 %}
		jul_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 8 %}
		aug_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 9 %}
		sept_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 10 %}
		okt_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 11 %}
		nov_abwesend = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 12 %}
		dez_abwesend = {{ x.anzahl }};
	{% endif %}
{% endfor %}
var label_data = [];
var values_anwesend = [];
var values_abwesend = [];
var values_trainings = [];
if (start_month == 1) {
	label_data = ["Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"];
	values_anwesend = [jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend];
	values_abwesend = [jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend];
	values_trainings = [jan, feb, mar, apr, mai, jun, jul, aug, sept, okt, nov, dez];
}
if (start_month == 2) {
	label_data = ["Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez", "Jan"];
	values_anwesend = [feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend, jan_anwesend];
	values_abwesend = [feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend, jan_abwesend];
	values_trainings = [feb, mar, apr, mai, jun, jul, aug, sept, okt, nov, dez, jan];
}
if (start_month == 3) {
	label_data = ["März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez", "Jan", "Feb"];
	values_anwesend = [mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend, jan_anwesend, feb_anwesend];
	values_abwesend = [mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend, jan_abwesend, feb_abwesend];
	values_trainings = [mar, apr, mai, jun, jul, aug, sept, okt, nov, dez, jan, feb];
}
if (start_month == 4) {
	label_data = ["Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez", "Jan", "Feb", "März"];
	values_anwesend = [apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend, jan_anwesend, feb_anwesend, mar_anwesend];
	values_abwesend = [apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend, jan_abwesend, feb_abwesend, mar_abwesend];
	values_trainings = [apr, mai, jun, jul, aug, sept, okt, nov, dez, jan, feb, mar];
}
if (start_month == 5) {
	label_data = ["Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez", "Jan", "Feb", "März", "Apr"];
	values_anwesend = [mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend, jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend];
	values_abwesend = [mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend, jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend];
	values_trainings = [mai, jun, jul, aug, sept, okt, nov, dez, jan, feb, mar, apr];
}
if (start_month == 6) {
	label_data = ["Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez", "Jan", "Feb", "März", "Apr", "Mai"];
	values_anwesend = [jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend, jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend];
	values_abwesend = [jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend, jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend];
	values_trainings = [jun, jul, aug, sept, okt, nov, dez, jan, feb, mar, apr, mai];
}
if (start_month == 7) {
	label_data = ["Jul", "Aug", "Sept", "Okt", "Nov", "Dez", "Jan", "Feb", "März", "Apr", "Mai", "Jun"];
	values_anwesend = [jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend, jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend];
	values_abwesend = [jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend, jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend];
	values_trainings = [jul, aug, sept, okt, nov, dez, jan, feb, mar, apr, mai, jun];
}
if (start_month == 8) {
	label_data = ["Aug", "Sept", "Okt", "Nov", "Dez", "Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul"];
	values_anwesend = [aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend, jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend];
	values_abwesend = [aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend, jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend];
	values_trainings = [aug, sept, okt, nov, dez, jan, feb, mar, apr, mai, jun, jul];
}
if (start_month == 9) {
	label_data = ["Sept", "Okt", "Nov", "Dez", "Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug"];
	values_anwesend = [sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend, jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend];
	values_abwesend = [sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend, jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend];
	values_trainings = [sept, okt, nov, dez, jan, feb, mar, apr, mai, jun, jul, aug];
}
if (start_month == 10) {
	label_data = ["Okt", "Nov", "Dez", "Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept"];
	values_anwesend = [okt_anwesend, nov_anwesend, dez_anwesend, jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend];
	values_abwesend = [okt_abwesend, nov_abwesend, dez_abwesend, jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend];
	values_trainings = [okt, nov, dez, jan, feb, mar, apr, mai, jun, jul, aug, sept];
}
if (start_month == 11) {
	label_data = ["Nov", "Dez", "Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt"];
	values_anwesend = [nov_anwesend, dez_anwesend, jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend];
	values_abwesend = [nov_abwesend, dez_abwesend, jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend];
	values_trainings = [nov, dez, jan, feb, mar, apr, mai, jun, jul, aug, sept, okt];
}
if (start_month == 12) {
	label_data = ["Dez", "Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov"];
	values_anwesend = [dez_anwesend, jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend];
	values_abwesend = [dez_abwesend, jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend];
	values_trainings = [dez, jan, feb, mar, apr, mai, jun, jul, aug, sept, okt, nov];
}
let spieler_monat_chart = new frappe.Chart( "#spieler_monat", { // or DOM element
    data: {
      labels: label_data,
      datasets: [
        {
          name: "Anwesend", chartType: 'bar',
          values: values_anwesend
        },
        {
          name: "Abwesend", chartType: 'bar',
          values: values_abwesend
        },
        {
          name: "Trainings", chartType: 'line',
          values: values_trainings
        }
      ]
    },

    title: "Pro Monat",
    type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
    height: 300,
    colors: ['green', 'red', 'light-blue'],

    tooltipOptions: {
      formatTooltipX: d => (d + '').toUpperCase(),
      formatTooltipY: d => d + ' x',
    }
  });
  
  // total präsenz pro monat
var total_jan_training = 0;
var total_jan_anwesend = 0;
var total_jan_abwesend = 0;
var total_spieler_jan = 0;

var total_feb_training = 0;
var total_feb_anwesend = 0;
var total_feb_abwesend = 0;
var total_spieler_feb = 0;

var total_mar_training = 0;
var total_mar_anwesend = 0;
var total_mar_abwesend = 0;
var total_spieler_mar = 0;

var total_apr_training = 0;
var total_apr_anwesend = 0;
var total_apr_abwesend = 0;
var total_spieler_apr = 0;

var total_mai_training = 0;
var total_mai_anwesend = 0;
var total_mai_abwesend = 0;
var total_spieler_mai = 0;

var total_jun_training = 0;
var total_jun_anwesend = 0;
var total_jun_abwesend = 0;
var total_spieler_jun = 0;

var total_jul_training = 0;
var total_jul_anwesend = 0;
var total_jul_abwesend = 0;
var total_spieler_jul = 0;

var total_aug_training = 0;
var total_aug_anwesend = 0;
var total_aug_abwesend = 0;
var total_spieler_aug = 0;

var total_sept_training = 0;
var total_sept_anwesend = 0;
var total_sept_abwesend = 0;
var total_spieler_sept = 0;

var total_okt_training = 0;
var total_okt_anwesend = 0;
var total_okt_abwesend = 0;
var total_spieler_okt = 0;

var total_nov_training = 0;
var total_nov_anwesend = 0;
var total_nov_abwesend = 0;
var total_spieler_nov = 0;

var total_dez_training = 0;
var total_dez_anwesend = 0;
var total_dez_abwesend = 0;
var total_spieler_dez = 0;

{% for x in total_trainings_pro_monat %}
	{% if x.monat == 1 %}
		total_jan_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 2 %}
		total_feb_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 3 %}
		total_mar_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 4 %}
		total_apr_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 5 %}
		total_mai_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 6 %}
		total_jun_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 7 %}
		total_jul_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 8 %}
		total_aug_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 9 %}
		total_sept_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 10 %}
		total_okt_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 11 %}
		total_nov_training = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 12 %}
		total_dez_training = {{ x.anzahl }};
	{% endif %}
{% endfor %}

{% for x in total_anwesend_pro_monat %}
	{% if x.monat == 1 %}
		total_jan_anwesend = {{ x.anzahl }};
		total_spieler_jan = total_spieler_jan + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 2 %}
		total_feb_anwesend = {{ x.anzahl }};
		total_spieler_feb = total_spieler_feb + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 3 %}
		total_mar_anwesend = {{ x.anzahl }};
		total_spieler_mar = total_spieler_mar + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 4 %}
		total_apr_anwesend = {{ x.anzahl }};
		total_spieler_apr = total_spieler_apr + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 5 %}
		total_mai_anwesend = {{ x.anzahl }};
		total_spieler_mai = total_spieler_mai + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 6 %}
		total_jun_anwesend = {{ x.anzahl }};
		total_spieler_jun = total_spieler_jun + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 7 %}
		total_jul_anwesend = {{ x.anzahl }};
		total_spieler_jul = total_spieler_jul + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 8 %}
		total_aug_anwesend = {{ x.anzahl }};
		total_spieler_aug = total_spieler_aug + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 9 %}
		total_sept_anwesend = {{ x.anzahl }};
		total_spieler_sept = total_spieler_sept + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 10 %}
		total_okt_anwesend = {{ x.anzahl }};
		total_spieler_okt = total_spieler_okt + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 11 %}
		total_nov_anwesend = {{ x.anzahl }};
		total_spieler_nov = total_spieler_nov + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 12 %}
		total_dez_anwesend = {{ x.anzahl }};
		total_spieler_dez = total_spieler_dez + {{ x.anzahl }};
	{% endif %}
{% endfor %}

{% for x in total_abwesend_pro_monat %}
	{% if x.monat == 1 %}
		total_jan_abwesend = {{ x.anzahl }};
		total_spieler_jan = total_spieler_jan + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 2 %}
		total_feb_abwesend = {{ x.anzahl }};
		total_spieler_feb = total_spieler_feb + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 3 %}
		total_mar_abwesend = {{ x.anzahl }};
		total_spieler_mar = total_spieler_mar + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 4 %}
		total_apr_abwesend = {{ x.anzahl }};
		total_spieler_apr = total_spieler_apr + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 5 %}
		total_mai_abwesend = {{ x.anzahl }};
		total_spieler_mai = total_spieler_mai + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 6 %}
		total_jun_abwesend = {{ x.anzahl }};
		total_spieler_jun = total_spieler_jun + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 7 %}
		total_jul_abwesend = {{ x.anzahl }};
		total_spieler_jul = total_spieler_jul + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 8 %}
		total_aug_abwesend = {{ x.anzahl }};
		total_spieler_aug = total_spieler_aug + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 9 %}
		total_sept_abwesend = {{ x.anzahl }};
		total_spieler_sept = total_spieler_sept + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 10 %}
		total_okt_abwesend = {{ x.anzahl }};
		total_spieler_okt = total_spieler_okt + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 11 %}
		total_nov_abwesend = {{ x.anzahl }};
		total_spieler_nov = total_spieler_nov + {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 12 %}
		total_dez_abwesend = {{ x.anzahl }};
		total_spieler_dez = total_spieler_dez + {{ x.anzahl }};
	{% endif %}
{% endfor %}


if (total_spieler_jan > 0) {
	var base_jan = 100 / total_spieler_jan;
	total_spieler_jan = total_jan_anwesend / total_jan_training;
	total_jan_anwesend = base_jan * total_jan_anwesend;
	total_jan_abwesend = base_jan * total_jan_abwesend;
}

if (total_spieler_feb > 0) {
	var base_feb = 100 / total_spieler_feb;
	total_spieler_feb = total_feb_anwesend / total_feb_training;
	total_feb_anwesend = base_feb * total_feb_anwesend;
	total_feb_abwesend = base_feb * total_feb_abwesend;
}

if (total_spieler_mar > 0) {
	var base_mar = 100 / total_spieler_mar;
	total_spieler_mar = total_mar_anwesend / total_mar_training;
	total_mar_anwesend = base_mar * total_mar_anwesend;
	total_mar_abwesend = base_mar * total_mar_abwesend;
}

if (total_spieler_apr > 0) {
	var base_apr = 100 / total_spieler_apr;
	total_spieler_apr = total_apr_anwesend / total_apr_training;
	total_apr_anwesend = base_apr * total_apr_anwesend;
	total_apr_abwesend = base_apr * total_apr_abwesend;
}

if (total_spieler_mai > 0) {
	var base_mai = 100 / total_spieler_mai;
	total_spieler_mai = total_mai_anwesend / total_mai_training;
	total_mai_anwesend = base_mai * total_mai_anwesend;
	total_mai_abwesend = base_mai * total_mai_abwesend;
}

if (total_spieler_jun > 0) {
	var base_jun = 100 / total_spieler_jun;
	total_spieler_jun = total_jun_anwesend / total_jun_training;
	total_jun_anwesend = base_jun * total_jun_anwesend;
	total_jun_abwesend = base_jun * total_jun_abwesend;
}

if (total_spieler_jul > 0) {
	var base_jul = 100 / total_spieler_jul;
	total_spieler_jul = total_jul_anwesend / total_jul_training;
	total_jul_anwesend = base_jul * total_jul_anwesend;
	total_jul_abwesend = base_jul * total_jul_abwesend;
}

if (total_spieler_aug > 0) {
	var base_aug = 100 / total_spieler_aug;
	total_spieler_aug = total_aug_anwesend / total_aug_training;
	total_aug_anwesend = base_aug * total_aug_anwesend;
	total_aug_abwesend = base_aug * total_aug_abwesend;
}

if (total_spieler_sept > 0) {
	var base_sept = 100 / total_spieler_sept;
	total_spieler_sept = total_sept_anwesend / total_sept_training;
	total_sept_anwesend = base_sept * total_sept_anwesend;
	total_sept_abwesend = base_sept * total_sept_abwesend;
}

if (total_spieler_okt > 0) {
	var base_okt = 100 / total_spieler_okt;
	total_spieler_okt = total_okt_anwesend / total_okt_training;
	total_okt_anwesend = base_okt * total_okt_anwesend;
	total_okt_abwesend = base_okt * total_okt_abwesend;
}

if (total_spieler_nov > 0) {
	var base_nov = 100 / total_spieler_nov;
	total_spieler_nov = total_nov_anwesend / total_nov_training;
	total_nov_anwesend = base_nov * total_nov_anwesend;
	total_nov_abwesend = base_nov * total_nov_abwesend;
}

if (total_spieler_dez > 0) {
	var base_dez = 100 / total_spieler_dez;
	total_spieler_dez = total_dez_anwesend / total_dez_training;
	total_dez_anwesend = base_dez * total_dez_anwesend;
	total_dez_abwesend = base_dez * total_dez_abwesend;
}


var spieler_schnitt = [];
if (start_month == 1) {
	tot_values_anwesend = [parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2)];
	tot_values_trainings = [total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training, total_jul_training, total_aug_training, total_sept_training, total_okt_training, total_nov_training, total_dez_training];
	tot_spieler_schnitt = [parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez)];
}
if (start_month == 2) {
	tot_values_anwesend = [parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2)]
	tot_values_trainings = [total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training, total_jul_training, total_aug_training, total_sept_training, total_okt_training, total_nov_training, total_dez_training, total_jan_training];
	tot_spieler_schnitt = [parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan)];
}
if (start_month == 3) {
	tot_values_anwesend = [parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2)];
	tot_values_trainings = [total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training, total_jul_training, total_aug_training, total_sept_training, total_okt_training, total_nov_training, total_dez_training];
	tot_spieler_schnitt = [parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb)];
}
if (start_month == 4) {
	tot_values_anwesend = [parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2)];
	tot_values_trainings = [total_apr_training, total_mai_training, total_jun_training, total_jul_training, total_aug_training, total_sept_training, total_okt_training, total_nov_training, total_dez_training, total_jan_training, total_feb_training, total_mar_training];
	tot_spieler_schnitt = [parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar)];
}
if (start_month == 5) {
	tot_values_anwesend = [parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2)];
	tot_values_trainings = [total_mai_training, total_jun_training, total_jul_training, total_aug_training, total_sept_training, total_okt_training, total_nov_training, total_dez_training, total_jan_training, total_feb_training, total_mar_training, total_apr_training];
	tot_spieler_schnitt = [parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr)];
}
if (start_month == 6) {
	tot_values_anwesend = [parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2)];
	tot_values_trainings = [total_jun_training, total_jul_training, total_aug_training, total_sept_training, total_okt_training, total_nov_training, total_dez_training, total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training];
	tot_spieler_schnitt = [parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai)];
}
if (start_month == 7) {
	tot_values_anwesend = [parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2)];
	tot_values_trainings = [total_jul_training, total_aug_training, total_sept_training, total_okt_training, total_nov_training, total_dez_training, total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training];
	tot_spieler_schnitt = [parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun)];
}
if (start_month == 8) {
	tot_values_anwesend = [parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2)];
	tot_values_trainings = [total_aug_training, total_sept_training, total_okt_training, total_nov_training, total_dez_training, total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training, total_jul_training];
	tot_spieler_schnitt = [parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul)];
}
if (start_month == 9) {
	tot_values_anwesend = [parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2)];
	tot_values_trainings = [total_sept_training, total_okt_training, total_nov_training, total_dez_training, total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training, total_jul_training, total_aug_training];
	tot_spieler_schnitt = [parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug)];
}
if (start_month == 10) {
	tot_values_anwesend = [parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2)];
	tot_values_trainings = [total_okt_training, total_nov_training, total_dez_training, total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training, total_jul_training, total_aug_training, total_sept_training];
	tot_spieler_schnitt = [parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept)];
}
if (start_month == 11) {
	tot_values_anwesend = [parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2)];
	tot_values_trainings = [total_nov_training, total_dez_training, total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training, total_jul_training, total_aug_training, total_sept_training, total_okt_training];
	tot_spieler_schnitt = [parseInt(total_spieler_nov), parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt)];
}
if (start_month == 12) {
	tot_values_anwesend = [parseFloat(total_dez_anwesend).toFixed(2), parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2)];
	tot_values_abwesend = [parseFloat(total_dez_abwesend).toFixed(2), parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2)];
	tot_values_trainings = [total_dez_training, total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training, total_jul_training, total_aug_training, total_sept_training, total_okt_training, total_nov_training];
	tot_spieler_schnitt = [parseInt(total_spieler_dez), parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov)];
}


let total_monat_chart = new frappe.Chart( "#total_monat", { // or DOM element
    data: {
      labels: label_data,
      datasets: [
        {
          name: "% Anwesend", chartType: 'bar',
          values: tot_values_anwesend
        },
        {
          name: "% Abwesend", chartType: 'bar',
          values: tot_values_abwesend
        },
        {
          name: "Spieler im Ø", chartType: 'line',
          values: tot_spieler_schnitt
        },
        {
          name: "Trainings", chartType: 'line',
          values: tot_values_trainings
        }
      ]
    },

    title: "Pro Monat",
    type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
    height: 300,
    colors: ['green', 'red', 'blue', 'light-blue'],

    tooltipOptions: {
      formatTooltipX: d => (d + '').toUpperCase(),
      formatTooltipY: d => d + '',
    }
  });