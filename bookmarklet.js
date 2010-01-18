javascript:

var theyes_desired_words_per_line = 13;
var theyes_maximum_font_size = 30; /* pixels */
var theyes_initial_line_height = '1.3'; /* em */

function theyes_average_words_per_line( e ) {
    var word_count = jQuery( e ).text().split( /\b[\s,\.-:;]*/ ).length;
    var line_height = parseInt( $(e).css( 'line-height' ) );
    var line_count = $(e).innerHeight() / line_height;
    return word_count / line_count;
}

function theyes_adjust_fonts() {
    var smallest_new_font_size;
    var unadjusted = [];

    jQuery( 'div,p,font' ).not( ':has(div,p,h1,h2,h3,h4,h5,h6,table)' ).each( function() {
        if( $(this).css( 'line-height' ) == 'normal' ) {
            $(this).css( 'line-height', theyes_initial_line_height );
        }
        var avg_words_per_line = theyes_average_words_per_line( this );
        var font_size;
        var adjusted = false;
        while( avg_words_per_line > theyes_desired_words_per_line ) {
            font_size = parseInt( $(this).css( 'font-size' ) ) + 1;
            if( font_size > theyes_maximum_font_size ) {
                break;
            } else {
                $(this).css( 'font-size', font_size + 'px' );
                avg_words_per_line = theyes_average_words_per_line( this );
                adjusted = true;
            }
        }
        if( ! adjusted ) {
            unadjusted.push( this );
        } else if( font_size && ! smallest_new_font_size || font_size < smallest_new_font_size ) {
            smallest_new_font_size = font_size;
        }
    } );

    if( smallest_new_font_size ) {
        $.each( unadjusted, function() {
            $(this).css( 'font-size', smallest_new_font_size + 'px' );
        } );
    }
}

( function() {

    function getScript( url,success ) {
        var script = document.createElement('script');
        script.src = url;
        var head = document.getElementsByTagName( 'head' )[0],
            done = false;
        script.onload = script.onreadystatechange = function() {
            if(
                ! done && (
                    ! this.readyState
                    || this.readyState == 'loaded'
                    || this.readyState == 'complete'
                )
            ) {
                done = true;
                success();
            }
        };
        head.appendChild( script );
    }

    getScript( 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', function() {
        theyes_adjust_fonts();
    } );

} )();
