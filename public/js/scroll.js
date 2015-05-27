function init() {

	var lis = document.getElementById("content_list").getElementsByTagName('li');

	for (var i = 0; i < lis.length; i++) {
		var curI=i;
		lis[i].getElementsByTagName('a')[0].addEventListener("click", function(e) {
			$('html, body').animate({
				scrollTop : $('#content'+curI).offset().top
			}, 500, 'easeInOutQuint');

		});

	}

	// .addEventListener('click', function(event) {

}

init();
