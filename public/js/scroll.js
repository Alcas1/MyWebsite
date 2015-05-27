function init() {


	

	var $savedList = $("#content_list ul li");
	$.each($savedList, function() {
		$savedList.append("<a href='#saved-route'>" + omg + "</a>");
	});
	$savedList.delegate("li", "click", function(e) {
		alert("omg");
	});

	// .addEventListener('click', function(event) {
	// $('html').animate({
	// scrollTop : $('first').offset().top
	// }, 6000, 'easeOutElastic');

}

init();
