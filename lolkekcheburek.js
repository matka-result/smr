<script>
jQuery(function($){
 
	// load more button click event
	$('.misha_comment_loadmore').click( function(){
		var button = $(this);
 
		// decrease the current comment page value
		cpage--;
 
		$.ajax({
			url : ajaxurl, // AJAX handler, declared before
			data : {
				'action': 'cloadmore', // wp_ajax_cloadmore
				'post_id': parent_post_id, // the current post
				'cpage' : cpage, // current comment page
			},
			type : 'POST',
			beforeSend : function ( xhr ) {
				button.text('Loading...'); // preloader here
			},
			success : function( data ){
				if( data ) {
					$('ol.comment-list').append( data );
					button.text('More comments'); 
					 // if the last page, remove the button
					if ( cpage == 1 )
						button.remove();
				} else {
					button.remove();
				}
			}
		});
		return false;
	});
 
});

</script>
