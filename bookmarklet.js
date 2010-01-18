javascript:

var theyes_desired_words_per_line = 13;
var theyes_maximum_font_size = 30 /* pixels */;

function theyes_average_words_per_line( e ) {
    var word_count = jQuery( e ).text().split( /\b[\s,\.-:;]*/ ).length;
    var line_height = parseInt( $(e).css( 'line-height' ) );
    var line_count = $(e).innerHeight() / line_height;
    return word_count / line_count;
}

function theyes_adjust_fonts( root ) {
    var theyes_c = 0;
    jQuery( 'div, p, font' ).each( function() {
        $(this).css( 'line-height', '1.3' );
        var avg_words_per_line = theyes_average_words_per_line( this );
        var adjusted = false;
        while( avg_words_per_line > theyes_desired_words_per_line ) {
            adjusted = true;
            var font_size = parseInt( $(this).css( 'font-size' ) ) + 1;
            if( font_size > theyes_maximum_font_size ) {
                break;
            } else {
                $(this).css( 'font-size', font_size + 'px' );
                avg_words_per_line = theyes_average_words_per_line( this );
            }
        }
        if( adjusted ) {
            theyes_c++;
        }
    } );
}

( function() {
  if(typeof jQuery!='undefined') {
  } else if (typeof $=='function') {
    otherlib=true;
  }

  function getScript(url,success){
    var script=document.createElement('script');
    script.src=url;
    var head=document.getElementsByTagName('head')[0],
        done=false;
    script.onload=script.onreadystatechange = function(){
      if ( !done && (!this.readyState
           || this.readyState == 'loaded'
           || this.readyState == 'complete') ) {
        done=true;
        success();
      }
    };
    head.appendChild(script);
  }
  getScript('http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function() {
    theyes_adjust_fonts( document );
  });

} )();

