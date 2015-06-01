function init() {

	var el = $('#part_body_card');

	el.mouseenter(function(e) {
		alert("omg");
		el.animate({
			boxShadow : "box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.4)"

		}, 100);
	});
	el.mouseleave(function(e) {
		el.animate({
			boxShadow : "box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.4)"
		}, 100);
	});

};
