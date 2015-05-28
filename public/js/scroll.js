function init() {
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
				var listItem = (stringItem);
				console.log(stringItem);
				var docViewTop = $(window).scrollTop();
				var distance = $(elem).offset().top;

				if (docViewTop >= distance) {
					$("#top-text").text(listItem.text);
				} else {
					// do something when element is not viewable
				}
			}
		});
	});
	}

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

});

}

init();
