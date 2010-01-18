javascript:

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
        while( avg_words_per_line > 13 ) {
            adjusted = true;
            var font_size = parseInt( $(this).css( 'font-size' ) ) + 1;
            if( font_size > 20 ) {
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
  var el=document.createElement('div'),
      b=document.getElementsByTagName('body')[0];
      otherlib=false,
      msg='';
  el.style.position='fixed';
  el.style.height='32px';
  el.style.width='220px';
  el.style.marginLeft='-110px';
  el.style.top='0';
  el.style.left='50%';
  el.style.padding='5px 10px 5px 10px';
  el.style.zIndex = 1001;
  el.style.fontSize='12px';
  el.style.color='#222';
  el.style.backgroundColor='#f99';

  if(typeof jQuery!='undefined') {
    msg='This page already using jQuery v'+jQuery.fn.jquery;
    return showMsg();
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
    if (typeof jQuery=='undefined') {
      msg='Sorry, but jQuery wasn\'t able to load';
      showMsg()
    } else {
      msg='This page is now jQuerified with v' + jQuery.fn.jquery;
      if (otherlib) {msg+=' and noConflict(). Use $jq(), not $().';}
      /* showMsg() */
    }
    theyes_adjust_fonts( document );
  });
  function showMsg() {
    el.innerHTML=msg;
    b.appendChild(el);
    window.setTimeout(function() {
      if (typeof jQuery=='undefined') {
        b.removeChild(el);
      } else {
        jQuery(el).fadeOut('slow',function() {
          jQuery(this).remove();
        });
        if (otherlib) {
          $jq=jQuery.noConflict();
        }
      }
    } ,2500);
  }

} )();

