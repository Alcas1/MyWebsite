//maybe I'll try to make functions or
//things easier to read lol
//this was probably the hardest js i've written so far
var ids;
ids = ($('.works_title').attr('id') === "Projects") ? "content" : "exp";

function init() {

	$(window).load(function() {
		var top_element = 10;
		var lis = document.getElementById(ids + "_list").getElementsByTagName('li');
		var semiTop = 0;
		for (var i = top_element; i > (top_element - lis.length); i--) {
			var stringItem = "#" + ids + String(i);
			var contentItem = $(stringItem).find('.' + ids + '_title');
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
			var backTop = $('#' + ids + '_top');
			var elementOffsetTop = backTop.offset().top;
			var distTop = (elementOffsetTop - docViewTop);
			var elementOffsetLeft = backTop.offset().left;
			backTop.css("position", "fixed");
			backTop.css("top", ($(window).height() - 100) + "px");
			backTop.css("left", ($(window).width() - 100) + "px");
		}

		var bt = $('#' + ids + '_top');
		bt.mousedown(function(e) {
			bt.css("background", "#ff1744");
			bt.animate({
				boxShadow : "0px 0px 0px #888888"
			}, 1);

			$('html, body').animate({
				scrollTop : 0
			}, 300, 'easeInOutQuad');
		});

		bt.mouseenter(function(e) {
			bt.css("background", "#ff1744");
			bt.animate({
				boxShadow : "0px 3px 6px #888888"
			}, 1);
		});
		bt.mouseleave(function(e) {
			bt.css("background", "#ff5252");
			bt.animate({
				boxShadow : "0px 3px 6px #888888"
			}, 1);
		});

		bt.mouseup(function(e) {
			// bt.css("background", "#ff5252");
			bt.animate({
				boxShadow : "0px 3px 6px #888888"
			}, 1);

		});

		for (var i = 0; i < lis.length; i++) {
			var listItem = lis[i].getElementsByTagName('a')[0];

			listItem.addEventListener("click", function(e) {

				$('html, body').animate({
					scrollTop : $('#' + ids + e.target.id).offset().top
				}, 600, 'easeInOutQuad');

			});

		}

		$(window).scroll(function() {
			var docViewTop = $(window).scrollTop();

			for (var i = top_element; i > (top_element - lis.length); i--) {
				var stringItem = "#" + ids + String(i);
				var contentItem = $(stringItem).find('.' + ids + '_title');

				var distance = $(stringItem).offset().top;
				if (i === top_element) {
					semiTop = distance;
					if (docViewTop < (semiTop - 150)) {
						$("#top-text").text($('.works_title').attr('id'));
					}

				}
				if (docViewTop >= (distance - 50)) {

					$("#top-text").text(contentItem.text());
				}

			}
			var backTop = $('#' + ids + '_top');

			if (docViewTop >= (semiTop - 50)) {

				//var elementHeight = $("#" + ids + "10").height();
				// var choice = (700)
				backTop.css("position", "fixed");
				backTop.css("top", ($(window).height() - 100) + "px");
				backTop.css("left", ($(window).width() - 100) + "px");

			} else {
				console.log($(window).height());
				//var top_height=$("#content10").offset().top+$(window).height();
				//console.log(top_height);
				backTop.css("position", "absolute");
				backTop.css("top", ($(window).height() - 150) + "px");
				backTop.css("left", ($(window).width() - ($("#" + ids + "10").offset().left) - 100) + "px");
			}

		});

		if (ids === "content") {
			fillImage(1);
			fillImage(2);
			fillImage(3);
			fillImage(4);
			fillImage(5);
		} else {
			fillImage(3);
			fillImage(4);
			fillImage(5);
		}
		//to add more to Document Ready

	});

}

// doesn't work as well as I'd like it with
// medium images but it works so w/e
// this was so awful to write
function fillImage(imageNumber) {
	var fill = false;
	var img = document.getElementById(ids + '_img_small_' + imageNumber);

	img.addEventListener('click', function(event) {

		if (!fill) {
			var jImg = $('#' + ids + '_img_small_' + imageNumber);
			var jCaption = $('#caption_' + imageNumber);
			event.stopPropagation();
			fill = true;
			jImg.css("position", "absolute");
			jCaption.css("position", "absolute");
			var max = (($(window).width() * .8 < $(window).height() * .80) ? $(window).width() * .8 : $(window).height() * .80);
			eTop = jImg.offset().top - $(window).scrollTop();
			eLeft = jImg.offset().left;
			jTop = jCaption.offset().top - $(window).scrollTop();
			jLeft = jCaption.offset().left;
			jImg.css("box-shadow", " 0px 0px 15px #ffffff");
			jImg.css("cursor", "auto"), jImg.css("position", "fixed");
			jImg.css("z-index", "2");
			jCaption.css("color", "#ffffff");
			jCaption.css("position", "fixed");
			jCaption.css("z-index", "2");
			jImg.animate({
				top : eTop,
				left : eLeft
			}, 0);
			$('#sub_text').css("opacity", "1");
			// jCaption.animate({
			// top : jTop,
			// left : jLeft
			// }, 0);
			var ratio = max / jImg.width();
			var nHeight = ratio * jImg.height();
			jImg.animate({
				maxWidth : max,
				width : max,
				marginTop : (-max / 2),
				marginLeft : (-max / 2),
				top : '50%',
				left : '50%'
			}, 300);
			console.log(ratio);
			jCaption.css("font-family", "Raleway");
			jCaption.animate({
				fontSize : "22px",
				marginTop : (((-max / 2) + ((nHeight > max) ? max * 2 : nHeight)) + 50) + "px",
				marginLeft : -50,
				top : '50%',
				left : '50%'
			}, 0);

			shade(open, event);
		}

	}, false);
	var cover = document.getElementById('cover');
	cover.addEventListener('click', function(event) {
		if (open) {
			event.stopPropagation();
			$('#' + ids + '_img_small_' + imageNumber).css("position", "absolute");
			$('#' + ids + '_img_small_' + imageNumber).animate({

			}, 500);

			$('#' + ids + '_img_small_' + imageNumber).removeAttr('style');
			$('#caption_' + imageNumber).removeAttr('style');
			fill = false;
			$('#cover').animate({
				opacity : '0'
			}, 100);
			$('#sub_text').css("opacity", "0");
			cover.style.zIndex = "-1";
			return false;
		}

	}, false);
}

function isScrolledIntoView(elem) {
	var $elem = $(elem);
	var $window = $(window);

	var docViewTop = $window.scrollTop();
	var docViewBottom = docViewTop + $window.height();

	var elemTop = $elem.offset().top;
	var elemBottom = elemTop + $elem.height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
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
