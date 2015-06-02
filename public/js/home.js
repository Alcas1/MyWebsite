$(window).load(function() {

	$('#part4').children().each(function(idx, val) {
		$(this).mouseenter(function(e) {

			$(this).animate({
				boxShadow : "0px 0px 20px rgba(0, 0, 0, 0.4)"

			}, 200);
		});
		$(this).mouseleave(function(e) {
			$(this).animate({
				boxShadow : "0px 2px 6px rgba(0, 0, 0, 0.4)"
			}, 200);
		});

	});

	$('#part4').children().find('#button_bar').children().each(function(idx, val) {
		// var goTo=$(this).attr("href");
		// $(this).find('button').click(function(e) {
		// $(this).animate({
		// backgroundColor : 'rgba(0, 174, 255, 0.3)',
		// color : '#F9F9F9'
		// }, 0);
		// $(this).animate({
		// backgroundColor : '#F9F9F9',
		// color : '#03a9f4'
		// }, 200);
		// e.preventDefault();
		// setTimeout(function() {
		// window.location = goTo;
		// }, 200);
		// });
		var config = {
			duration : 250,
			delay : 0
		};
		Waves.attach($(this).find('button'));
		//Waves.attach('.float-icon-light', ['waves-circle', 'waves-float', 'waves-light']);
		Waves.init();
	});

});
function fillButton(el) {
	var parent, ink, d, x, y;
	el.click(function(e) {
		parent = $(this).parent();
		//create .ink element if it doesn't exist
		if (parent.find(".ink").length == 0)
			parent.prepend("<span class='ink'></span>");

		ink = parent.find(".ink");
		//incase of quick double clicks stop the previous animation
		ink.removeClass("animate");

		//set size of .ink
		if (!ink.height() && !ink.width()) {
			//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
			d = Math.max(parent.outerWidth(), parent.outerHeight());
			ink.css({
				height : d,
				width : d
			});
		}

		//get click coordinates
		//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
		x = e.pageX - parent.offset().left - ink.width() / 2;
		y = e.pageY - parent.offset().top - ink.height() / 2;

		//set the position and add class .animate
		ink.css({
			top : y + 'px',
			left : x + 'px'
		}).addClass("animate");
	});

}
