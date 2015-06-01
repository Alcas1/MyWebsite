$(window).load(function() {
	
	$('#part4').children().each(function(idx, val) 
	{
		$(this).mouseenter(function(e) {
			
			$(this).animate({
				boxShadow : "0px 2px 12px rgba(0, 0, 0, 0.4)"

			}, 100);
		});
		$(this).mouseleave(function(e) {
			$(this).animate({
				boxShadow : "0px 2px 6px rgba(0, 0, 0, 0.4)"
			}, 100);
		});

	});
});

