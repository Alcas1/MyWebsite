



var YTMenu = (function() {

	function init() {
		
		var fHeight;
		 object.onload=function(){var body = document.body,
    		html = document.documentElement;

			fHeight = Math.max( body.scrollHeight, body.offsetHeight, 
           html.clientHeight, html.scrollHeight, html.offsetHeight );};

		
		
		
		[].slice.call( document.querySelectorAll( '.dr-menu' ) ).forEach( function( el, i ) {

			var trigger = el.querySelector( 'div.dr-trigger' ),
				icon = trigger.querySelector( 'span.dr-icon-menu' ),
				open = false;
	

			trigger.addEventListener( 'click', function( event ) {
				if( !open ) {
					
					el.className += ' dr-menu-open';
					open = true;
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