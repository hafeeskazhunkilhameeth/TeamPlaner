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
  document.getElementById(data).classList.remove("col-md-12");
  document.getElementById(data).classList.add("col-md-2");
}

var linie1_count = 0;
function linie1_drop(ev) {
  if (linie1_count > 3) { 
	var addon = document.createElement("div");
	addon.classList.add("div2");
	var textnode = document.createTextNode("Water");
	addon.appendChild(textnode);
	document.getElementById("linie1").appendChild(addon);
  }
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById(data).classList.remove("col-md-2");
  document.getElementById(data).classList.add("col-md-4");
  document.getElementById("linie1").appendChild(document.getElementById(data));
  linie1_count += 1;
  
}
function l1d1_drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById("l1d1").appendChild(document.getElementById(data));
  document.getElementById(data).classList.remove("col-md-2");
  document.getElementById(data).classList.add("col-md-12");
}

function l1d2_drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById("l1d2").appendChild(document.getElementById(data));
  document.getElementById(data).classList.remove("col-md-2");
  document.getElementById(data).classList.add("col-md-12");
}
function l1c_drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById("l1c").appendChild(document.getElementById(data));
  document.getElementById(data).classList.remove("col-md-2");
  document.getElementById(data).classList.add("col-md-12");
}
function l1f1_drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById("l1f1").appendChild(document.getElementById(data));
  document.getElementById(data).classList.remove("col-md-2");
  document.getElementById(data).classList.add("col-md-12");
}
function l1f2_drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById("l1f2").appendChild(document.getElementById(data));
  document.getElementById(data).classList.remove("col-md-2");
  document.getElementById(data).classList.add("col-md-12");
}
function linie2_drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  document.getElementById("linie2").appendChild(document.getElementById(data));
  document.getElementById(data).classList.remove("col-md-2");
  document.getElementById(data).classList.add("col-md-12");
}