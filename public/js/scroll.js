function init() {
	$(document).ready(function() {
		var lis = document.getElementById("content_list").getElementsByTagName('li');

		for (var i = 0; i < lis.length; i++) {
			var listItem = lis[i].getElementsByTagName('a')[0];

			$(window).scroll(function() {
				if (isScrolledIntoView(listItem)) {
					$("#top-text").text('s');
				} else {
					// do something when element is not viewable
				}
			});

			listItem.addEventListener("click", function(e) {
				$('html, body').animate({
					scrollTop : $('#content' + e.target.id).offset().top
				}, 600, 'easeInOutQuad');

			});

		}

		function isScrolledIntoView(elem) {
			var docViewTop = $(window).scrollTop();
			//var docViewBottom = docViewTop + $(window).height();

			var distance = $(elem).offset().top;
			//var elemBottom = elemTop + $(elem).height();

			// return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
			return docViewTop >= distance;
		}

	});

}

init();
