/**
 * master.delayedimage.js
 *
 * Using a `data` attribute, only load images inside an element if that element is actually visible.
 * Checks that the element's `display` is not 'none' or 'hidden' and then loops all `img` tags at any level inside the element.
 *
 * @author      Dan Bennett <naebeth@googlemail.com>
 * @package     DelayedImage
 * @subpackage  master
 * @version     1.0.0
 * @link        https://gist.github.com/dan-bennett/9c6e1f4483ce75293ca6
 * @license     http://opensource.org/licenses/BSD-3-Clause BSD 3-clause
 */

if( typeof jQuery != 'undefined' ){
    window.di_mode = "jquery";
    (function( $ ) {
        $.fn.delayed = function( options ){
            var settings = $.extend({
                imgSrc: "data-delayed-image",
                display: ["none", "hidden"],
                ignore: false
            }, options );

            // based on http://stackoverflow.com/a/9422931
            var helpers = {
                searchObj: function( needle, haystack ){
                    for( var key in haystack ) {
                        if( haystack[key] === needle ){
                            return true;
                        }
                    }
                    return false;
                }
            };

            var results = {
                containers: 0,
                images: 0,
                ignoreContainers: ( ( settings.ignore ) ? $( settings.ignore ).length : 0 ),
                ignoreImages: 0,
                nonDelayedImages: 0
            }
            if( settings.ignore ) settings.ignore = $( settings.ignore + " img" );

            return this.each( function( i, v ){
                v = $(v);
                if( !helpers.searchObj( v.css( 'display' ), settings.display ) ){
                    v.find('img').each( function( j, img ){
                        if( settings.ignore === false || !helpers.searchObj( img, settings.ignore ) ){
                            img = $( img );
                            if( "" != img.attr( settings.imgSrc ) ){
                                results.images++;
                                img.attr( 'src', img.attr( settings.imgSrc ) );
                            } else {
                                results.nonDelayedImages++;
                            }
                        } else {
                            results.ignoreImages++;
                        }
                    });
                }
                results.containers++;
            });
        };
    }( jQuery ));

    if( "undefined" != window.console ){
        _log = "log";
        if( !console[_log] ) _log = false;
        if( _log ) console[_log]( "DelayedImage: jQuery detected, working in plugin mode." );
    }
} else {
    window.di_mode = "vanilla";
    var delayed = function( selector, options ){
        if( "object" === typeof selector ) options = selector;
        if( "object" != typeof options ) options = {};
        if( "string" === typeof selector ) options.selector = selector;

        var settings = {};
        settings.selector = ( ( "string" === typeof options.selector ) ? options.selector : ".delayed-image" );
        settings.imgSrc = ( ( "string" === typeof options.imgSrc ) ? options.imgSrc : "data-delayed-image" );
        settings.display = ( ( "string" === typeof options.display ) ? [options.display] : ( ( "object" === typeof options.display ) ? options.display : ["none", "hidden"] ) );
        settings.ignore = ( ( "string" === typeof options.ignore ) ? options.ignore : false );

        // based on http://stackoverflow.com/a/9422931
        var helpers = {
            searchObj: function( needle, haystack ){
                for( var key in haystack ) {
                    if( haystack[key] === needle ){
                        return true;
                    }
                }
                return false;
            }
        };

        var results = {
            containers: 0,
            images: 0,
            ignoreContainers: ( ( settings.ignore ) ? document.querySelectorAll( settings.ignore ).length : 0 ),
            ignoreImages: 0,
            nonDelayedImages: 0
        }
        settings.ignore = ( ( settings.ignore ) ? document.querySelectorAll( settings.ignore + " img" ) : false);

        var conts = document.querySelectorAll( settings.selector );
        results.containers = conts.length;
        for (var c = results.containers - 1; c >= 0; c--) {
            if( settings.display.indexOf( window.getComputedStyle(conts[c],null).getPropertyValue("display") ) < 0 ){
                var imgs = conts[c].querySelectorAll('img');
                for (var i = imgs.length - 1; i >= 0; i--) {
                    if( !settings.ignore || !helpers.searchObj( imgs[i], settings.ignore ) ){
                        var imgEl = imgs[i];
                        if( null != typeof imgEl.getAttribute( settings.imgSrc ) && '' != imgEl.getAttribute( settings.imgSrc ) ){
                            results.images++;
                            imgEl.setAttribute( 'src', imgEl.getAttribute( settings.imgSrc ) );
                        } else {
                            results.nonDelayedImages++;
                        }
                    } else {
                        results.ignoreImages++;
                    }
                }
            }
        }

        return results;
    };

    if( "undefined" != window.console ){
        _log = "log";
        if( !console[_log] ) _log = false;
        if( _log ) console[_log]( "DelayedImage: jQuery not detected, defaulting to vanilla mode." );
    }
}