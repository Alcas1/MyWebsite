function init() {
	
	
	
	
	var lis = document.getElementById("content_list").getElementsByTagName('li');

	for (var i = 0; i < lis.length; i++) {

		lis[i].addEventListener("click", function(e) {

			alert(this.innerHTML);
		});

	}

	// .addEventListener('click', function(event) {
	// $('html').animate({
	// scrollTop : $('first').offset().top
	// }, 6000, 'easeOutElastic');

}

init();
