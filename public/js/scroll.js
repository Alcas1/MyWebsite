
//maybe I'll try to make functions or 
//things easier to read lol
//this was probably the hardest js i've written so far


function init() {

	$(document).load(function() {
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
		
		var bt=$("#back_top");
		bt.mousedown(function(e) {
			bt.css("background", "#ff1744");
			bt.animate({
				boxShadow : "0px 0px 0px #888888"
			}, 1);

			$('html, body').animate({
			scrollTop : 0
			}, 300, 'easeInOutQuad');
		});
		
		bt.mouseenter(function(e){
			bt.css("background", "#ff1744");
			bt.animate({
				boxShadow : "0px 3px 6px #888888"
			}, 1);
		});
		bt.mouseleave(function(e){
			bt.css("background", "#ff5252");
			bt.animate({
				boxShadow : "0px 3px 6px #888888"
			}, 1);
		});

		bt.mouseup(function(e) {
			bt.css("background", "#ff5252");
			bt.animate({
				boxShadow : "0px 3px 6px #888888"
			}, 1);

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

		fillImage(1);
		fillImage(2);
		fillImage(3);

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

function fillImage(imageNumber) {
	var fill = false;
	var img = document.getElementById('content_img_small_' + imageNumber);
	img.addEventListener('click', function(event) {

		if (!fill) {
			var jImg = $('#content_img_small_' + imageNumber);
			event.stopPropagation();
			fill = true;
			jImg.css("position", "absolute");
			var max = (($(window).width() * .8 < $(window).height() * .8) ? $(window).width() * .8 : $(window).height() * .8);
			eTop = jImg.offset().top - $(window).scrollTop();
			eLeft = jImg.offset().left;
			jImg.css("box-shadow", " 0px 0px 15px #ffffff");
			jImg.css("cursor", "auto"), jImg.css("position", "fixed");
			jImg.css("z-index", "2");
			jImg.animate({
				top : eTop,
				left : eLeft
			}, 0);

			jImg.animate({
				maxWidth : max,
				width : max,
				marginTop : (-max / 2),
				marginLeft : (-max / 2),
				top : '50%',
				left : '50%'
			}, 300);

			shade(open, event);
		}

	}, false);
	var cover = document.getElementById('cover');
	cover.addEventListener('click', function(event) {
		if (open) {
			event.stopPropagation();
			$('#content_img_small_' + imageNumber).css("position", "absolute");
			$('#content_img_small_' + imageNumber).animate({

			}, 500);

			$('#content_img_small_' + imageNumber).removeAttr('style');

			fill = false;
			$('#cover').animate({
				opacity : '0'
			}, 100);
			// cover.style.opacity = "0";
			cover.style.zIndex = "-1";
			return false;
		}

	}, false);
}

function shade(check, event) {
	var B = document.body, H = document.documentElement, height;
	if ( typeof document.height !== 'undefined') {
		height = document.height;
	} else {
		height = Math.max(B.scrollHeight, B.offsetHeight, H.clientHeight, H.scrollHeight, H.offsetHeight);
	}
	var fHeight = height;
	var cover = document.getElementById('cover');
	cover.style.height = (fHeight) + "px";
	if (check) {
		$('#cover').animate({
			opacity : '.5'
		}, 300);

		//
		// cover.style.opacity = ".5";
		cover.style.zIndex = "2";
	} else {
		$('#cover').animate({
			opacity : '0'
		}, 150);
		// cover.style.opacity = "0";
		cover.style.zIndex = "-1";
	}
}

init();
