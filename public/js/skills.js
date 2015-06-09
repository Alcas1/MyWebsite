$(document).on('ready', function() {

	// Array Order
	// Html 5, CSS 3, Javascript, Jquery, Ruby, Sinatra
	//
	// Android, Construct 2

	var web_stars = [4.5, 4, 3.5, 4, 4, 4];
	var backend_stars = [3.5, 3.5, 5, 3, 5];
	var mobile_stars = [4, 5];
	var tools_stars = [5, 4.5, 4];
	var env_stars = [5, 4.5];

	set_stars(web_stars, 1);
	set_stars(backend_stars, 2);
	set_stars(mobile_stars, 3);
	set_stars(tools_stars, 4);
	set_stars(env_stars, 5);

	var top_element = 10;
	var lis = document.getElementById("skills_list").getElementsByTagName('li');
	var semiTop = 0;
	for (var i = 0; i < lis.length; i++) {
		var listItem = lis[i].getElementsByTagName('a')[0];

		listItem.addEventListener("click", function(e) {

			$('html, body').animate({
				scrollTop : $('#skill_' + e.target.id).offset().top - 50
			}, 600, 'easeInOutQuad');

		});

	}

	$(window).scroll(function() {
		var docViewTop = $(window).scrollTop();

		for (var i = top_element; i > (top_element - lis.length); i--) {
			var stringItem = "#skill_" + String(i);
			var contentItem = $(stringItem).find('div.skills_title');

			var distance = $(stringItem).offset().top;
			if (i === top_element) {
				semiTop = distance;
				if (docViewTop < (semiTop - 150)) {
					$("#top-text").text("Skills");
				}

			}
			if (docViewTop >= (distance - 50)) {

				$("#top-text").text(contentItem.text());
			}

		}

	});

});

function set_stars(stars, type) {
	// var mHeight = ((stars.length / 3.0)) * 160;
	// if (stars.length < 3) {
	// mHeight = 160;
	// }
	// $('#skill_' + (11 - type) + ' .skill_card').css("min-height", mHeight + "px");

	var star_class = $('#skill_' + (11 - type) + ' .skill_card .part_body_card_skill #web_stars');
	star_class.each(function(idx) {
		var j;
		for ( j = 0; j < stars[idx] - 0.5; j++) {

			$(this).find('img').eq(j).css("opacity", "0");
			$(this).find('img').eq(j).animate({
				opacity : 1
			}, 100 * j).delay(100 * j).queue(function(next) {
				$(this).attr('src', 'imgs/skills/full_star.png');
				next();
			}).delay(100 * j).animate({
				opacity : 1
			}, 200);

		}
		if (stars[idx] % 1 === 0.5) {
			$(this).find('img').eq(stars[idx] - 0.5).css("opacity", "0");
			$(this).find('img').eq(stars[idx] - 0.5).animate({
				opacity : 1
			}, 100 * j).delay(100 * j).queue(function(next) {
				$(this).attr('src', 'imgs/skills/half_star.png');
				next();
			}).delay(100 * j);
		}

	});
	star_class = $('#skill_' + (11 - type) + ' .skill_card .part_body_card_skill');
	star_class.each(function(idx) {
		if (stars[idx] === 5) {
			$(this).css('boxShadow', "0px 1px 15px #03a9f4");
		}
	});
}

