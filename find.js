$(document).ready(function() {
	$("#play").on("click",reFn);
	function reFn() {
       $("#bar_").addClass("bar");
       $("#spinner_").addClass("spinner");
       $("#play").css("background-position","-107px 0px");
   }
})