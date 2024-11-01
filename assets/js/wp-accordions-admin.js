jQuery(document).ready(function($) {
	var id = '1',
		initID  = 'initialize'
		preInitSaved = null;
	
	$('.color-picker').wpColorPicker();
	
	$('.handles').sortable({
		handle: 'span.move'
	});
	
	$('div.exbnda > .block-head > b.expand').unbind();
	
	$(document).on("click", '.block-head > b.expand', function() {
		if ($(this).hasClass("bropped")) {
		$('.options-holder.oppened').slideUp('slow').addClass("cclossed").removeClass("oppened");
		$(this).removeClass("bropped");
		} else {
			$('.options-holder.oppened').slideUp('slow').addClass("cclossed").removeClass("oppened");
			$(this).parent('h2').next('.options-holder').slideDown('slow').addClass("oppened").removeClass("cclossed");
			$('.expand,.expand.bropped').removeClass("bropped");
			$(this).addClass("bropped");
		}
	});
	
	$('#toggle-check').click(function(e){
        $('.ecolabs').slideToggle("normal");
    });
	
	var wrapper = $(".input_fields_wrap .loader-img"), //Fields wrapper
        nx = ajax_object.nx,
        cvv = $('.input_fields_wrap > div:last-child').attr('id');
		if(! cvv ){ var cvv = "0"; };
        var a = cvv.match(/\d+/);
	$(document).on("click", ".add_new_field_button", function(e) { //on add input button click
		var thisbutton = $(this);
		thisbutton.prop("disabled",true);
		e.preventDefault();
		var mm = $('.input_fields_wrap > #total_counter').val();
		if(! mm ){ var mm = "0"; };
        var x = mm.match(/\d+/);
		var ns = $('.input_fields_wrap > div').size();
		x++; //text box id increment
		var data = {
					'action': 'custom_accordion_data',
					'xx': x,
					'name': nx,
		};
		$('.loader-img').fadeIn();
		id = 'accordion_textarea_'+x;
		if( !preInitSaved ) {
			preInitSaved = jQuery.extend(true, {}, tinyMCEPreInit);
			// console.log(preInitSaved);
			preInitSaved.mceInit[initID].selector = '#placeholder';
			preInitSaved.mceInit['placeholder'] = preInitSaved.mceInit[initID];
			delete preInitSaved.mceInit[initID];

			preInitSaved.qtInit[initID].id = 'placeholder';
			preInitSaved.qtInit['placeholder'] = preInitSaved.qtInit[initID];
			delete preInitSaved.qtInit[initID];
		}
		jQuery.post(ajax_object.ajax_url, data, function(data) {
			$('.input_fields_wrap #total_counter').val(parseInt(mm)+1);
			thisbutton.removeAttr("disabled");
			$(wrapper).after(data);
				setTimeout( function() {
					// console.log(tinymce);
					if (typeof tinymce !== 'undefined') {
						rebuild = jQuery.extend(true, {}, preInitSaved);

						rebuild.mceInit['placeholder'].selector = '#' + id;
						rebuild.mceInit[id] = rebuild.mceInit['placeholder'];
						delete rebuild.mceInit['placeholder'];

						rebuild.qtInit['placeholder'].id = id;
						rebuild.qtInit[id] = rebuild.qtInit['placeholder'];
						delete rebuild.qtInit['placeholder'];

						init = rebuild.mceInit[id];

						$wrap = tinymce.$( '#wp-' + id + '-wrap' );

						// if ( ( $wrap.hasClass( 'tmce-active' ) || ! rebuild.qtInit.hasOwnProperty( id ) ) && ! init.wp_skip_init ) {

							tinymce.init( init );

							if ( ! window.wpActiveEditor ) {
								window.wpActiveEditor = id;
							}
							
						// }

						if ( typeof quicktags !== 'undefined' ) {
							
							quicktags( rebuild.qtInit );

							if ( ! window.wpActiveEditor ) {
								window.wpActiveEditor = id;
							}

							QTags( {'id': id } );
							QTags._buttonsInit();
						}
					}
					$('.loader-img').fadeOut();
					// getall();
				}, 1200);   
		});
	});
	$(document).on("click", ".remove_field", function(e) { //user click on remove text
		e.preventDefault();
		if($(this).closest('div').parent().find(".main-block").length > 1){
			$(this).closest('div').remove();
			x++; //text box id increment
		}
	});
	// getall();
});