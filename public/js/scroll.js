function init() {
	var stringItem = "#content" + String(i);
	var contentItem = $(stringItem).find('div.content_title');
	var docViewTop = $(window).scrollTop();
	var distance = $(stringItem).offset().top;

	if (docViewTop >= (distance - 50)) {
		$("#top-text").text(contentItem.text());
	}

	$(document).ready(function() {

		var lis = document.getElementById("content_list").getElementsByTagName('li');

		for (var i = 0; i < lis.length; i++) {
			var listItem = lis[i].getElementsByTagName('a')[0];

			listItem.addEventListener("click", function(e) {

				$('html, body').animate({
					scrollTop : $('#content' + e.target.id).offset().top
				}, 600, 'easeInOutQuad');

			});

		}

		$(window).scroll(function() {

			for (var i = 10; i > (10 - lis.length); i--) {
				var stringItem = "#content" + String(i);
				var contentItem = $(stringItem).find('div.content_title');
				var docViewTop = $(window).scrollTop();
				var distance = $(stringItem).offset().top;

				if (docViewTop >= (distance - 50)) {
					$("#top-text").text(contentItem.text());
				}
			}
		});
	});

	// function isScrolledIntoView(elem) {
	//
	// //var docViewBottom = docViewTop + $(window).height();
	// console.log(elem);
	//
	// //var elemBottom = elemTop + $(elem).height();
	//
	// // return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
	// return
	// }

}

init();
