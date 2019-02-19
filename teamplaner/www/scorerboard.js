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

    title: "Top 10 von {{ frappe.utils.get_datetime(saisondaten.saison_von).strftime('%d.%m.%Y') }} bis {{ frappe.utils.get_datetime(saisondaten.saison_bis).strftime('%d.%m.%Y') }}",
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
	remove_all_resultate();
	var spiel = spiel.value;
	if (spiel != "leer") {
		frappe.call({
			method: "teamplaner.www.scorerboard.get_resultat",
			args:{
				'spiel': spiel
			},
			callback: function(r)
			{
				//console.log(r.message);
				var resultate = r.message;
				for (i=0; i < resultate.length; i++) {
					var input_form = document.getElementById("resultate");
					
					var title = document.createElement("h4");
					var title_txt = document.createTextNode("Spiel " + (i + 1));
					title.appendChild(title_txt);
					
					var input_div = document.createElement("div");
					input_div.classList.add("input-group");
					
					//heim
					var input_span_heim = document.createElement("span");
					input_span_heim.classList.add("input-group-addon");
					
					var input_span_txt = document.createTextNode(resultate[i]['heim']);
					input_span_heim.appendChild(input_span_txt);
					
					var input_input_heim = document.createElement("input");
					input_input_heim.type = "text";
					input_input_heim.classList.add("form-control");
					input_input_heim.id = "spiel-" + (i + 1) + "-heim";
					input_input_heim.value = resultate[i]['score_heim'];
					
					//gast
					var input_span_gast = document.createElement("span");
					input_span_gast.classList.add("input-group-addon");
					
					var input_span_txt = document.createTextNode(resultate[i]['gegner']);
					input_span_gast.appendChild(input_span_txt);
					
					var input_input_gast = document.createElement("input");
					input_input_gast.type = "text";
					input_input_gast.classList.add("form-control");
					input_input_gast.id = "spiel-" + (i + 1) + "-gast";
					input_input_gast.value = resultate[i]['score_gegner'];
					
					input_form.appendChild(title);
					input_div.appendChild(input_span_heim);
					input_div.appendChild(input_input_heim);
					input_div.appendChild(input_span_gast);
					input_div.appendChild(input_input_gast);
					input_form.appendChild(input_div);
					
				}
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
		});
	} else {
		var alle_tr = document.getElementsByTagName("tr");
		for (i=0; i < alle_tr.length; i++) {
			alle_tr[i].classList.add("hidden");
		}
	}
}

function update_score_alle() {
	var spiel = document.getElementById("spiel").value;
	try {
		var spiel_eins_heim = document.getElementById("spiel-1-heim").value;
	} catch {
		var spiel_eins_heim = 0;
	}
	try {
		var spiel_eins_gast = document.getElementById("spiel-1-gast").value;
	} catch {
		var spiel_eins_gast = 0;
	}
	try {
		var spiel_zwei_heim = document.getElementById("spiel-2-heim").value;
	} catch {
		var spiel_zwei_heim = 0;
	}
	try {
		var spiel_zwei_gast = document.getElementById("spiel-2-gast").value;
	} catch {
		var spiel_zwei_gast = 0;
	}
	console.log(spiel);
	if (spiel == "leer") {
		frappe.msgprint("Bitte zuerst ein Spiel auswählen");
	} else {
		frappe.show_message("Bitte warten");
		var scores = [];
		//console.log(spiel);
		alle_tr = document.getElementsByClassName(spiel);
		//console.log(alle_tr);
		for (i=0; i < alle_tr.length; i++) {
			var spieler_score = [];
			spieler_score.push(alle_tr[i].dataset.mail);
			spieler_score.push(parseInt(alle_tr[i].childNodes[3].childNodes[1].childNodes[1].value));
			spieler_score.push(parseInt(alle_tr[i].childNodes[5].childNodes[1].childNodes[1].value));
			scores.push(spieler_score);
		}
		//console.log(scores);
		frappe.call({
			method: "teamplaner.www.scorerboard.update_scorer_alle",
			args:{
				'spiel': spiel,
				'spieler': scores,
				'sh': spiel_eins_heim,
				'sg': spiel_eins_gast,
				'ssh': spiel_zwei_heim,
				'ssg': spiel_zwei_gast
			},
			callback: function(r)
			{
				if (r.message == "OK") {
					document.getElementById("spiel").value = "leer";
					location.reload();
				} else {
					document.getElementById("spiel").value = "leer";
					frappe.show_message("UUPS! - ERROR", "fa fa-times");
				}
			}
		});
	}
}

function remove_all_resultate() {
	var myNode = document.getElementById("resultate");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
}