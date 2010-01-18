javascript:

function theyes_load_js( uri, id ) {
    var script_tag = document.getElementById( id );
    if( script_tag ) {
        script_tag.parentNode.removeChild( script_tag );
    }

    if( typeof( jQuery ) != 'undefined' ) {
        /* To force browser cache update */
        jQuery.get( uri );
    }

    var script  = document.createElement( 'SCRIPT' );
    script.type = 'text/javascript';
    script.src  = uri;
    script.id   = id;
    document.getElementsByTagName('head')[0].appendChild( script );
}

function theyes_average_words_per_line( e ) {
    var word_count = jQuery( e ).text().split( /\b[\s,\.-:;]*/ ).length;
    var line_height = parseInt( $(e).css( 'line-height' ) );
    var line_count = $(e).innerHeight() / line_height;
    return word_count / line_count;
}

function theyes_adjust_fonts( root ) {
    var theyes_c = 0;
    jQuery( 'div, p' ).each( function() {
        $(this).css( 'line-height', '1.3' );
        var avg_words_per_line = theyes_average_words_per_line( this );
        var adjusted = false;
        while( avg_words_per_line > 13 ) {
            adjusted = true;
            var font_size = parseInt( $(this).css( 'font-size' ) ) + 1;
            $(this).css( 'font-size', font_size + 'px' );
            avg_words_per_line = theyes_average_words_per_line( this );
        }
        if( adjusted ) {
            theyes_c++;
        }
    } );
}

( function() {
    theyes_load_js( 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js', 'selfmarks-jquery' );
    theyes_adjust_fonts( document );
} )();
