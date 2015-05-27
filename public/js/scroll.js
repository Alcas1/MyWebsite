function init() {


	

	var $savedList = $("#content_list");
	$.each(all_objects, function() {
		$savedList.append("<li><a href='#saved-route'>" + this.text + "</a></li>");
	});
	$savedList.delegate("li", "click", function(e) {
		alert($(this).text());
	});

	// .addEventListener('click', function(event) {
	// $('html').animate({
	// scrollTop : $('first').offset().top
	// }, 6000, 'easeOutElastic');

}

init();
