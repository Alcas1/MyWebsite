$(document).ready(function() {

	// Array Order
	// Html 5, CSS 3, Javascript, Jquery, Ruby, Sinatra
	//
	// Android, Construct 2

	var web_stars = [4.5, 4, 3.5, 4, 4, 4];
	var backend_stars = [];
	var mobile_stars = [4, 5];

	set_stars(web_stars, 1);

});

function set_stars(stars, type) {
	var star_class;
	if (type === 1) {
		star_class = $('.web .text_card .part_body_card_skill #web_stars');
	}
	star_class.each(function(idx) {

		for (var j = 0; j < stars[idx]; j++) {

			$(this).find('img').eq(j).attr('src', 'imgs/skills/full_star.png');
			// $(this).find('img').eq(j).delay(1000).animate({
				// maxWidth : "30px"
			// }, 300);
			// $(this).find('img').eq(j).animate({
				// maxWidth : "28px"
			// }, 300);

		}
		if (stars[idx] % 1 === 0.5) {

			$(this).find('img').eq(stars[idx] - 0.5).attr('src', 'imgs/skills/half_star.png');
		}
	});

}

