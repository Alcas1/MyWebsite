



var YTMenu = (function() {

	function init() {
		
		[].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {

			var trigger = el.querySelector( 'div.dr-trigger' ),
				icon = trigger.querySelector( 'span.dr-icon-menu' ),
				open = false;
	

			trigger.addEventListener( 'click', function( event ) {
				if( !open ) {
					shade(open);
					el.className += ' dr-menu-open';
					open = true;
				}
			}, false );

			icon.addEventListener( 'click', function( event ) {
				if( open ) {
					shade(open);
					event.stopPropagation();
					open = false;
					el.className = el.className.replace(/\bdr-menu-open\b/,'');
					return false;
				}
			}, false );
			
			
		} );

	}
	
	function shade(check)
	{
		var cover=document.getElementsByClassName("cover");
		if(!check)
		{
			cover.style.opacity=.2;
		}
		else
		{
			cover.style.opacity=0;
		}
	}
	
	
	
	shade();
	init();

})();