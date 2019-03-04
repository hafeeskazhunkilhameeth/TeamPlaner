if (window.location.pathname == "/me") {
	var container = document.getElementsByClassName("your-account-info")[0];
	container.classList.remove("hidden-xs");
	container.style.minHeight = "40px";
	container.style.paddingBottom = "0px";
	document.getElementsByClassName("page_content")[0].style.paddingTop = "0px";
	document.getElementsByClassName("page_content")[0].style.paddingBottom = "0px";
	console.log(document.getElementsByClassName("list-unstyled")[1].childNodes[5].classList.add("hidden"));
}

var head = document.getElementsByTagName("head")[0];
var link = document.createElement("link");
link.rel = "apple-touch-icon";
link.sizes = "144x144";
link.href = "assets/teamplaner/image/libracore_ac_114x114.png"
head.appendChild(link);




//<link rel="apple-touch-icon" sizes="144x144" href="assets/teamplaner/image/libracore_ac_114x114.png" />