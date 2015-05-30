jQuery.fn.center = function() {
	this.css("position", "fixed");
	this.css("top", ($(window).height() / 2) - (this.outerHeight() / 2));
	this.css("left", ($(window).maxWidth() / 2) - (this.outerWidth() / 2));

	return this;
};

window.onload = (function() {

	function init() {

		[].slice.call(document.querySelectorAll('.dr-menu')).forEach(function(el, i) {

			var trigger = el.querySelector('div.dr-trigger'), icon = trigger.querySelector('span.dr-icon-menu'), open = false;

			trigger.addEventListener('click', function(event) {
				if (!open) {
					checkSite();
					el.className += ' dr-menu-open';
					open = true;
					var B = document.body, H = document.documentElement, height;

					if ( typeof document.height !== 'undefined') {
						height = document.height;
					} else {
						height = Math.max(B.scrollHeight, B.offsetHeight, H.clientHeight, H.scrollHeight, H.offsetHeight);
					}
					var fHeight = height;
					document.getElementById('left_line').style.height = (fHeight - 54) + "px";
					shade(open, el, event);
				}
			}, false);

			icon.addEventListener('click', function(event) {
				if (open) {
					event.stopPropagation();
					open = false;
					el.className = el.className.replace(/\bdr-menu-open\b/, '');
					shade(open);
					return false;
				}
			}, false);
			var cover = document.getElementById('cover');
			cover.addEventListener('click', function(event) {
				if (open) {
					event.stopPropagation();
					open = false;
					el.className = el.className.replace(/\bdr-menu-open\b/, '');
					cover.style.opacity = "0";
					cover.style.zIndex = "-1";
					return false;
				}

			}, false);

		});

	}

	function shade(check, el, event) {
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

			cover.style.opacity = ".5";
			cover.style.zIndex = "2";
		} else {

			cover.style.opacity = "0";
			cover.style.zIndex = "-1";
		}
	}

	function checkSite() {
		if (window.location.href.indexOf("about") > -1) {
			alert("1");
			return 1;
		}

	}

	init();

})();
