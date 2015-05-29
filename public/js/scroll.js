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
			if (i === top_element) {
				semiTop = distance;
			}
			if (docViewTop >= (distance - 50)) {
				$("#top-text").text(contentItem.text());
			}
		}

		if (docViewTop >= (semiTop - 50)) {

			var elementOffsetTop = $('#back_top').offset().top;
			var distTop = (elementOffsetTop - docViewTop);
			var elementOffsetLeft = $('#back_top').offset().left;

			$("#content10 #back_top").css("position", "fixed");
			$("#content10 #back_top").css("top", ("#content10").height() + "px");
			$("#content10 #back_top").css("left", ((("#content10").width()) ) + "px");
		} else {

			$("#content10 #back_top").css("position", "absolute");
			$("#content10 #back_top").css("top", "100%");
			$("#content10 #back_top").css("left", "104%");
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

				var elementOffsetTop = $('#back_top').offset().top;
				var distTop = (elementOffsetTop - docViewTop);
				var elementOffsetLeft = $('#back_top').offset().left;

				$("#content10 #back_top").css("position", "fixed");
				$("#content10 #back_top").css("top", distTop + "px");
				$("#content10 #back_top").css("left", elementOffsetLeft + "px");
			} else {

				$("#content10 #back_top").css("position", "absolute");
				$("#content10 #back_top").css("top", "100%");
				$("#content10 #back_top").css("left", "104%");
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
