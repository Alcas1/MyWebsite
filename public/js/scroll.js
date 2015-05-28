function init() {
	
	var lis = document.getElementById("content_list").getElementsByTagName('li');

	for (var i = 0; i < lis.length; i++) {
		
		lis[i].getElementsByTagName('a')[0].addEventListener("click", function(e) {
			$('html, body').animate({
				scrollTop : $('#content'+e.target.id).offset().top
			}, 600, 'easeInOutQuad');

		});

	}

	// .addEventListener('click', function(event) {

}

init();
