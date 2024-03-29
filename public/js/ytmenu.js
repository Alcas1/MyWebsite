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
			var site = checkSite();

			$('.dr-menu ul').children().each(function(idx, val) {
				var config = {
					duration : 300,
					delay : 3
				};
				Waves.attach($(this));
				Waves.init(config);
				if (idx < 9) {
					if (idx === site) {
						if (site !== 6) {
							var el = $(this).first().first();
							el.css("border-right-width", "4px");
							el.css("border-right-color", "#03a9f4");
							el.css("border-right-style", "solid");
							el.css("margin-left", "-1px");
							el.css("font-weight", "700");

							el.mouseenter(function() {
								el.css("border-right-width", "2px");
							}).mouseleave(function() {
								el.css("border-right-width", "4px");
								el.css("margin-left", "-1px");
							});
						}
					}
					if (site === 6) {
						var el = $(this).children('a');
						el.css("width", "197px");
						el.css("margin-left", "-1px");
						if (idx === site) {
							el.css("font-weight", "700");
							el.css("border-right-color", "#03a9f4");
							el.css("border-right-style", "solid");
							el.css("border-right-width", "4px");
							el.mouseenter(function() {
								el.css("border-right-width", "4px");
								el.css("padding-right", "14px");
								el.css("margin-left", "-3px");
							}).mouseleave(function() {
								el.css("border-right-width", "4px");
								el.css("margin-left", "-3px");
							});
						}
					}

				}
			});

			trigger.addEventListener('click', function(event) {
				if (!open) {

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
			return 0;
		} else if (window.location.href.indexOf("skills") > -1) {
			return 1;
		} else if (window.location.href.indexOf("experience") > -1) {
			return 2;
		} else if (window.location.href.indexOf("projects") > -1) {
			return 3;
		} else if (window.location.href.indexOf("music") > -1) {
			return 4;
		} else if (window.location.href.indexOf("mentors") > -1) {
			return 5;
		} else if (window.location.href.indexOf("contact") > -1) {
			return 6;
		} else if (window.location.href.indexOf("JonathanWuResume.pdf") > -1) {
			return 7;
		}

	}

	init();

})();
