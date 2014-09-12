/**
 * jquery.delayedimage.js
 *
 * Using a `data` attribute, only load images inside an element if that element is actually visible.
 * Checks that the element's `display` is not 'none' or 'hidden' and then loops all `img` tags at any level inside the element.
 *
 * @author      Dan Bennett <naebeth@googlemail.com>
 * @package     DelayedImage
 * @subpackage  jQuery
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
} else {
    if( "undefined" != window.console ){
        _log = "error";
        if( !console[_log] ) _log = "warn";
        if( !console[_log] ) _log = "log";
        if( !console[_log] ) _log = false;
        if( _log ) console[_log]( "DelayedImageError: You are trying to use the jQuery plugin version of DelayedImage, but jQuery is not available! Please include jQuery in your website, or switch to the vanilla JS version of DelayedImage." );
    }
}