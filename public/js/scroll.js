function init() {


	

	document.getElementById("content_list").addEventListener("click",function(e) {
        // e.target is our targetted element.
                    // try doing console.log(e.target.nodeName), it will result LI
        if(e.target && e.target.nodeName == "LI") {
            alert(e.target.id + " was clicked");
        }
    });

	// .addEventListener('click', function(event) {
	// $('html').animate({
	// scrollTop : $('first').offset().top
	// }, 6000, 'easeOutElastic');

}

init();
