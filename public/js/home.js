$(document).on({
	ajaxStart : function() {
		$('#cover').css("opacity:1");
		$('#cover').css("z-index:2");
	},
	ajaxStop : function() {
		$('#cover').css("opacity:0");
		$('#cover').css("z-index:-1");
	}
});

$(window).load(function() {
	
	$('#text_card').children().each(function(idx, val) {
		$(this).mouseenter(function(e) {
			$(this).stop();
			$(this).animate({
				boxShadow : "0px 1px 15px rgba(43, 59, 93, 0.29)",

			}, 150);
		});
		$(this).mouseleave(function(e) {
			$(this).stop();
			$(this).animate({
				boxShadow : "0px 1px 2px rgba(43, 59, 93, 0.29)",

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
