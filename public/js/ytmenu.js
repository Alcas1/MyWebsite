



var YTMenu = (function() {

	function init() {
		
		
		[].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {

			var trigger = el.querySelector( 'div.dr-trigger' ),
				icon = trigger.querySelector( 'span.dr-icon-menu' ),
				open = false;
	

			trigger.addEventListener( 'click', function( event ) {
				if( !open ) {
					
					el.className += ' dr-menu-open';
					open = true;
					var body = document.body,
    				html = document.documentElement;

					var fHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
					document.getElementById('left_line').style.height=fHeight;
					shade(open);
				}
			}, false );

			icon.addEventListener( 'click', function( event ) {
				if( open ) {
					event.stopPropagation();
					open = false;
					el.className = el.className.replace(/\bdr-menu-open\b/,'');
					shade(open);
					return false;
				}
			}, false );
			
			
		} );

	}
	
	function shade(check)
	{
		var cover=document.getElementById('cover');
		
		if(check)
		{
			cover.style.opacity=".2";

		}
		else
		{
			cover.style.opacity="0";
		}
	}
	
	
	init();

})();