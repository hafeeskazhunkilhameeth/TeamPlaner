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


{% for x in spieler_total_pro_monat %}
	{% if x.monat == 1 %}
		jan = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 2 %}
		feb = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 3 %}
		mar = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 4 %}
		apr = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 5 %}
		mai = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 6 %}
		jun = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 7 %}
		jul = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 8 %}
		aug = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 9 %}
		sept = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 10 %}
		okt = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 11 %}
		nov = {{ x.anzahl }};
	{% endif %}
	{% if x.monat == 12 %}
		dez = {{ x.anzahl }};
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
let spieler_monat_chart = new frappe.Chart( "#spieler_monat", { // or DOM element
    data: {
      labels: ["Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"],
      datasets: [
        {
          name: "Anwesend", chartType: 'bar',
          values: [jan_anwesend, feb_anwesend, mar_anwesend, apr_anwesend, mai_anwesend, jun_anwesend, jul_anwesend, aug_anwesend, sept_anwesend, okt_anwesend, nov_anwesend, dez_anwesend]
        },
        {
          name: "Abwesend", chartType: 'bar',
          values: [jan_abwesend, feb_abwesend, mar_abwesend, apr_abwesend, mai_abwesend, jun_abwesend, jul_abwesend, aug_abwesend, sept_abwesend, okt_abwesend, nov_abwesend, dez_abwesend]
        },
        {
          name: "Trainings", chartType: 'line',
          values: [jan, feb, mar, apr, mai, jun, jul, aug, sept, okt, nov, dez]
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


let total_monat_chart = new frappe.Chart( "#total_monat", { // or DOM element
    data: {
      labels: ["Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sept", "Okt", "Nov", "Dez"],
      datasets: [
        {
          name: "% Anwesend", chartType: 'bar',
          values: [parseFloat(total_jan_anwesend).toFixed(2), parseFloat(total_feb_anwesend).toFixed(2), parseFloat(total_mar_anwesend).toFixed(2), parseFloat(total_apr_anwesend).toFixed(2), parseFloat(total_mai_anwesend).toFixed(2), parseFloat(total_jun_anwesend).toFixed(2), parseFloat(total_jul_anwesend).toFixed(2), parseFloat(total_aug_anwesend).toFixed(2), parseFloat(total_sept_anwesend).toFixed(2), parseFloat(total_okt_anwesend).toFixed(2), parseFloat(total_nov_anwesend).toFixed(2), parseFloat(total_dez_anwesend).toFixed(2)]
        },
        {
          name: "% Abwesend", chartType: 'bar',
          values: [parseFloat(total_jan_abwesend).toFixed(2), parseFloat(total_feb_abwesend).toFixed(2), parseFloat(total_mar_abwesend).toFixed(2), parseFloat(total_apr_abwesend).toFixed(2), parseFloat(total_mai_abwesend).toFixed(2), parseFloat(total_jun_abwesend).toFixed(2), parseFloat(total_jul_abwesend).toFixed(2), parseFloat(total_aug_abwesend).toFixed(2), parseFloat(total_sept_abwesend).toFixed(2), parseFloat(total_okt_abwesend).toFixed(2), parseFloat(total_nov_abwesend).toFixed(2), parseFloat(total_dez_abwesend).toFixed(2)]
        },
        {
          name: "Spieler im Ø", chartType: 'line',
          values: [parseInt(total_spieler_jan), parseInt(total_spieler_feb), parseInt(total_spieler_mar), parseInt(total_spieler_apr), parseInt(total_spieler_mai), parseInt(total_spieler_jun), parseInt(total_spieler_jul), parseInt(total_spieler_aug), parseInt(total_spieler_sept), parseInt(total_spieler_okt), parseInt(total_spieler_nov), parseInt(total_spieler_dez)]
        },
        {
          name: "Trainings", chartType: 'line',
          values: [total_jan_training, total_feb_training, total_mar_training, total_apr_training, total_mai_training, total_jun_training, total_jul_training, total_aug_training, total_sept_training, total_okt_training, total_nov_training, total_dez_training]
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