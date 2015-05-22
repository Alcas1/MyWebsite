



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
					var fHeight=document.documentElement.scrollHeight;
    				document.getElementById('left_line').style.height=(fHeight-53)+"px";
					shade(open,el,event);
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
	
	function shade(check,el,event)
	{
		var cover=document.getElementById('cover');
		
		if(check)
		{
			cover.style.opacity=".2";
			cover.style.zIndex="2";
			cover.addEventListener('click',function(event)
			{
				
					event.stopPropagation();
					open = false;
					el.className = el.className.replace(/\bdr-menu-open\b/,'');
					cover.style.opacity="0";
					cover.style.zIndex="-1";
					alert("omg");
					return false;
				
				
			},false);
		}
		else
		{
			cover.style.opacity="0";
			cover.style.zIndex="-1";
		}
	}
	
	
	init();

})();