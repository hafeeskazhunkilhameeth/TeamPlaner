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


function update_score(ref) {
	var spiel = ref.split("#")[0];
	var spieler = ref.split("#")[1];
	var tor = parseInt(document.getElementById(spiel + "-" + spieler + "-" + "tor").value);
	var assist = parseInt(document.getElementById(spiel + "-" + spieler + "-" + "assist").value);
	var total = tor + assist;
	//console.log(spiel + " // " + spieler + " // " + tor + " // " + assist + " // " + total);
	
	frappe.call({
		method: "teamplaner.www.scorerboard.update_scorer",
		args:{
			'spiel': spiel,
			'mail': spieler,
			'tor': tor,
			'assist': assist,
			'total': total
		},
		callback: function(r)
		{
			frappe.msgprint("Das Score wurde eingetragen");
			document.getElementById("spiel").value = "Bitte Spiel auswählen";
			setTimeout(function(){ location.reload(); }, 1000);
		}
	});
}

function show_spiel_tabelle(spiel) {
	var spiel = spiel.value;
	var alle_tr = document.getElementsByTagName("tr");
	for (i=0; i < alle_tr.length; i++) {
		alle_tr[i].classList.add("hidden");
	}
	document.getElementById("tr_header").classList.remove("hidden");
	var tr = document.getElementsByClassName(spiel);
	for (i=0; i < tr.length; i++) {
		tr[i].classList.remove("hidden");
	}
}