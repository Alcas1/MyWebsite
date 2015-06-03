$(window).load(function() {

	$('#text_card').children().each(function(idx, val) {
		$(this).mouseenter(function(e) {
			$(this).stop();
			$(this).animate({
				boxShadow : "0px 0px 20px rgba(0, 0, 0, 0.4)"
				
			}, 150);
		});
		$(this).mouseleave(function(e) {
			$(this).stop();
			$(this).animate({
				boxShadow : "0px 2px 6px rgba(0, 0, 0, 0.4)"
			}, 150);
		});

	});
	
	$('#text_card').children().find('#button_bar').children().each(function(idx, val) {
		var config = {
			duration : 300,
			delay : 3
		};
		Waves.attach($(this).find('button'));
		Waves.init(config);
	});

});