function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function reserve_drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById("reserve").appendChild(document.getElementById(data));
}

var linie1_count = 0;
function linie1_drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById(data).classList.remove("col-md-3");
  document.getElementById(data).classList.add("col-md-4");
  document.getElementById("linie1").appendChild(document.getElementById(data));
  linie1_count += 1;
  if (linie1_count > 3) { frappe.msgprint("Du hast mehr als 3 Stürmer eingetragen!");}
}
function linie2_drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById("linie2").appendChild(document.getElementById(data));
}