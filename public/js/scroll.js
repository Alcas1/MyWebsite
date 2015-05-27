function init() {

	var lis = document.getElementById("content_list").getElementsByTagName('li');

	for (var i = 0; i < lis.length; i++) {

		lis[i].getElementsByTagName('a')[0].addEventListener("click", function(e) {

			//alert(this.innerHTML);
			
			$('html, body').animate({
				scrollTop : $('#content'+i).offset().top
			}, 6000, 'easeOutElastic');

		});

	}

	// .addEventListener('click', function(event) {

}

init();
