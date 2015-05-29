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
			$("#content10 #back_top").css("top", ($(window).height() - 100) + "px");
			$("#content10 #back_top").css("left", ($(window).width() - 100) + "px");
		}
		//var lis = document.getElementById("content_list").getElementsByTagName('li');

		document.getElementById('back_top').addEventListener("click", function(e) {

			$('html, body').animate({
				scrollTop : 0
			}, 300, 'easeInOutQuad');
		});

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

				var elementHeight = $('#content10').height();
				// var choice = (700)
				$("#content10 #back_top").css("position", "fixed");
				$("#content10 #back_top").css("top", ($(window).height() - 100) + "px");
				$("#content10 #back_top").css("left", ($(window).width() - 100) + "px");

			} else {
				//var top_height=$("#content10").offset().top+$(window).height();
				//console.log(top_height);
				$("#content10 #back_top").css("position", "absolute");
				$("#content10 #back_top").css("top", ($(window).height() - 150) + "px");
				$("#content10 #back_top").css("left", ($(window).width() - ($("#content10").offset().left) - 100) + "px");
			}

		});

		var fill = false;
		var img = document.getElementById('content_img_small');
		img.addEventListener('click', function(event) {

			if (!fill) {
				event.stopPropagation();
				fill = true;
				$('#mylogo').animate({
					postition:fixed,
					top : '20%',
					left : '10%'
				});
			}

		}, false);

		// var cover = document.getElementById('cover');
		// cover.addEventListener('click', function(event) {
		// if (open) {
		// event.stopPropagation();
		// open = false;
		// el.className = el.className.replace(/\bdr-menu-open\b/, '');
		// cover.style.opacity = "0";
		// cover.style.zIndex = "-1";
		// return false;
		// }
		//
		// }, false);

		//to add more to Document Ready

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
