var show_variant_images = function(variants_ids) {
  if (typeof(variants_ids) == 'number') {
    variants_ids = [variants_ids]
  }

  console.log( variants_ids.length );

  //If there is only one, just select it without hiding the others.
  if( variants_ids.length == 1 )
  {
    console.log( "just one" );
    $('ul.thumbnails li' ).removeClass( 'selected' );

    //Don't do this if there's not a variant image
    if( $( '.vtmb.tmb-' + variants_ids[ 0 ] ).length > 0 )
      set_main_zoom( '.vtmb.tmb-' + variants_ids[ 0 ] + ' a' );

    return;
  }

  console.log( "many" );
  $('li.vtmb').hide();

  if( variant_options_hash )
  {
    // var valid_variants = [];
    var keys = $.keys( variant_options_hash[ img_key ] );
    var selected_thumbs = []

    for( var i = 0; i < keys.length; i++ )
    {
      var valid_variants = $.keys( variant_options_hash[ img_key ][ keys[ i ] ] );
      // selected_thumbs.push( false );

      var j = 0;
      // while( !selected_thumbs[ i ] )
      while( selected_thumbs.length < i + 1 )
      {
        if( variants_ids.indexOf( valid_variants[ j ] ) != -1 )
        {
          // selected_thumbs[ i ] = valid_variants[ j ];
          selected_thumbs.push( valid_variants[ j ] );
        }

        j++;
      }
    }

    variants_ids = selected_thumbs;

  } else { console.log( "no variants_options_hash" ); }

  $(variants_ids).each(function(index, variant_id){
    $('li.tmb-' + variant_id).show();
    // $( '.tmb-all' ).hide();

    var currentThumb = $('.vtmb.selected');

    // if currently selected thumb does not belong to current variant, nor to common images,
    // hide it and select the first available thumb instead.
    if(!currentThumb.hasClass('vtmb-' + variant_id)) {
      var thumb = $($("ul.thumbnails li.vtmb-" + variant_id + ":first").eq(0));
      if (thumb.length == 0) {
        thumb = $($('ul.thumbnails li:visible').eq(0));
      }
      var newImg = thumb.find('a').attr('href');
      $('ul.thumbnails li').removeClass('selected');
    }

    //Show all if none are visible
    if( $( 'ul.thumbnails li:visible' ).length == 0 )
      show_all_variant_images();

  });
}

var show_all_variant_images = function( options, img_key ) {
  // $('li.vtmb').show();
  if( options )
  {
    $.each( options[ img_key ], function( key, value ){
      var keys = $.keys( value );

      for( var i = 0; i < keys.length - 1; i++ )
      {
        // console.log( '.vtmb.tmb-' + value[ keys[ i ] ].id );
        $( '.vtmb.tmb-' + value[ keys[ i ] ].id ).hide();
      }
    });
  }
}

var init_images = function( options, img_key )
{
  $.each( options[ img_key ], function( key, value ){
    var keys = $.keys( value );

    for( var i = 0; i < keys.length; i++ )
    {
      var ele = '.vtmb.tmb-' + value[ keys[ i ] ].id;
      $( ele ).find( 'a' ).attr( 'data-option', img_key + '-' + key );

      $( ele ).find( 'a' ).on('click', function(){
        console.log( $( this ).attr( 'data-option' ) );
        $( 'button[data-option="' + $( this ).attr( 'data-option' ) + '"]' ).trigger( 'click' );
      });

      if( i < keys.length - 1 )
        $( ele ).hide();
    }
  });
}

var set_main_zoom = function( ele )
{
  $( '#main-image img' ).data( 'elevateZoom' ).swaptheimage( $( ele ).attr( 'href' ), $( ele ).attr( 'data-zoom' ) );
  $( '#thumbnails img' ).removeClass( 'active' );
  $( ele ).find( 'img' ).addClass( 'active' );
}

$( document ).ready( function(){
  $( '#main-image img' ).elevateZoom({
      zoomWindowFadeIn: 100,
      zoomWindowFadeOut: 100,
      lensFadeIn: 100,
      lensFadeOut: 100,
      zoomWindowPosition: 3,
      zoomWindowOffetx: 50,
      zoomWindowHeight: 408,
      zoomWindowWidth: 458,
      borderSize: 1,
    });

  $( '#thumbnails a' ).on('click', function(e){
    set_main_zoom( this );
  });
});
