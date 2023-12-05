/* Customizer JS Upsale*/
( function( api ) {

	api.sectionConstructor['dual_upsell'] = api.Section.extend( {

		// No events for this type of section.
		attachEvents: function () {},

		// Always make the section active.
		isContextuallyActive: function () {
			return true;
		}
	} );

} )( wp.customize );


jQuery(document).ready(function($){


    // Tygoraphy
	$('#_customize-input-dual_heading_font').change(function(){

		var currentfont = this.value;

		var data = {
            'action': 'dual_customizer_font_weight',
            'currentfont': currentfont,
            '_wpnonce': dual_customizer.ajax_nonce,
        };
 
        $.post( ajaxurl, data, function(response) {

            if( response ){

                $('#_customize-input-dual_heading_weight').empty();
                $('#_customize-input-dual_heading_weight').html(response);

            }

        });

	});	

	// Archive Layout Image Control
    $('.dual-radio-image-buttenset').each(function(){
        
        id = $(this).attr('id');
        $( '[id='+id+']' ).buttonset();
    });

});