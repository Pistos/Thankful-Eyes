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

function theyes_word_count( el ) {
    return jQuery(el).text().split( /\b[\s,\.-:;]*/ ).length;
}

function theyes_adjust_fonts( root ) {
    var theyes_c = 0;
    jQuery( 'div, p' ).each( function() {
        $(this).css( 'line-height', '1.3' );
        var word_count = theyes_word_count( this );
        var line_height = parseInt( $(this).css( 'line-height' ) );
        var line_count = $(this).innerHeight() / line_height;
        var avg_words_per_line = word_count / line_count;

        while( avg_words_per_line > 12 ) {
            var font_size = parseInt( $(this).css( 'font-size' ) ) + 1;
            $(this).css( 'font-size', font_size + 'px' );
            line_height = parseInt( $(this).css( 'line-height' ) );
            line_count = $(this).innerHeight() / line_height;
            avg_words_per_line = word_count / line_count;
        }
    } );
}

( function() {
    theyes_load_js( 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js', 'selfmarks-jquery' );
    theyes_adjust_fonts( document );
} )();
