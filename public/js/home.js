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
		var goTo=$(this).attr("href");
		$(this).find('button').click(function(e) {
			$(this).animate({
				backgroundColor : 'rgba(0, 174, 255, 0.3)',
				color : '#F9F9F9'
			}, 0);
			$(this).animate({
				backgroundColor : '#F9F9F9',
				color : '#03a9f4'
			}, 200);
			e.preventDefault();
			setTimeout(function() {
				window.location = goTo;
			}, 200);
		});
		// $(this).find('button').mouseleave(function(e) {
		//
		// $(this).animate({
		// backgroundColor : '#F9F9F9',
		// color:'#03a9f4'
		// }, 200);
		// });
	});
});

