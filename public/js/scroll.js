function init() {

	$(document).ready(function() {
		var top_element = 10;
		var lis = document.getElementById("content_list").getElementsByTagName('li');
		var semiTop = 0;
		for (var i = top_element; i > (top_element - lis.length); i--) {
			var stringItem = "#content" + String(i);
			var contentItem = $(stringItem).find('div.content_title');
			var docViewTop = $(window).scrollTop();
			var distance = $(stringItem).offset().top;

			if (docViewTop >= (distance - 50)) {
				$("#top-text").text(contentItem.text());
			}
		}
		//var lis = document.getElementById("content_list").getElementsByTagName('li');

		for (var i = 0; i < lis.length; i++) {
			var listItem = lis[i].getElementsByTagName('a')[0];

			listItem.addEventListener("click", function(e) {

				$('html, body').animate({
					scrollTop : $('#content' + e.target.id).offset().top
				}, 600, 'easeInOutQuad');

			});

		}

		$(window).scroll(function() {
			var docViewTop = $(window).scrollTop();

			for (var i = top_element; i > (top_element - lis.length); i--) {
				var stringItem = "#content" + String(i);
				var contentItem = $(stringItem).find('div.content_title');

				var distance = $(stringItem).offset().top;
				if (i === top_element) {
					semiTop = distance;
					if (docViewTop < (semiTop - 150)) {
						$("#top-text").text("Works");
					}

				}
				if (docViewTop >= (distance - 50)) {
					$("#top-text").text(contentItem.text());
				}
			}

			if (docViewTop >= (semiTop - 50)) {
				alert("bello");
				$("#top_back").css("position", "fixed");
			} else {
				alert("other bello");
				$("#top_back").css("position", "absolute");
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
