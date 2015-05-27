function init() {

	var id = document.getElementById('first');
	$('html body').animate({
		scrollTop : $("#" + id).offset().top
	}, 6000, 'easeOutElastic');

}

init();
