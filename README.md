DelayedImage
============

A simple JS tool to compliment responsive sites through delaying the loading of images until you specifically ask for them.

The idea behind this is that on smaller devices certain containers will be hidden, so why should the images inside them load? Sure you don't have the overhead of drawing them, but you still have the overhead of requesting and downloading them.

## Installation ##

Download the appropriate version for you project:

* *jQuery* - organised as a jQuery plugin, requires jQuery (maybe)
* *Vanilla* - doesn't check if you have jQuery, just runs in vanilla JS
* *Master* - both *jQuery* and *Vanilla*, defaults to *jQuery* if detected

Once you've chosen one, download it to your project's `js` folder and include it in your HTML. It might look something like one of these:

```html
<script type="text/javascript" src="/assets/js/master.delayedimage.js"></script>
<script type="text/javascript" src="/assets/js/jquery.delayedimage.js"></script>
<script type="text/javascript" src="/assets/js/vanilla.delayedimage.js"></script>
```

## Usage ##

Regardless of whether it's running in *jQuery* or *Vanilla* mode, you'll want to do something like this with your `img` tags:

```html
<div class="delayed-image">
    <img data-delayed-image="/assets/images/image.png" alt="I am an image!" width="100%" />
</div>
```

Note that you must specify a container of some sort. Using the `body` is fine, but __DelayedImage__ is not designed to automatically work on all images in the *document*.

Typically, you'll want to make sure your call to __DelayedImage__ is wrapped in some sort of DOM Ready listener.

### Demos ###

Look in the `demos` directory for example usage if you're not sure about anything in these instructions. As you might expect, the `-min.html` files use the minified code from the `js` directory, while the normal `.html` files use the source files - these could come in handy if you want to follow the code through to get an understanding of how it works.

A random version of jQuery that I found on my computer is included in the `js` directory and is used in the *Master* and *jQuery* demo files. I'm pretty sure it's a rather old version, and it's the only version I've tested against.

### Exposure ###

I don't know if it's bad practice or whatever, but I've added a property to `window` to provide an easy way of checking that __DelayedImage__ has loaded, and which mode it is loaded in:

This is set no matter whether you use the *Master*, *jQuery* or *Vanilla* version.

`window.di_mode`: either `"jquery"` or `"vanilla"`

### jQuery ###

*jQuery* mode currently only supports being chained from a jQuery selector call, like so:

```js
$( '.delayed-image' ).delayed();
```
If you use *jQuery* mode version without first including jQuery in your site, you'll get a pretty error message in your browser's console.

### Vanilla ###

In *Vanilla* mode, you simply call `delayed()` from somewhere in your code and it'll run using a default CSS selector of `.delayed-image`. If you want to use your own container selector, simply pass a string:

```js
delayed( '.my-container' )
```

### Configuration ###

In both modes you can pass a configuration object, `options`, to override the default settings. The settings and their default values are as follows:

* *imgSrc*: `"data-delayed-image"`
* *display*: `["none", "hidden"]`
* *ignore*: `false`
* *selector*: `".delayed-image"`

__imgSrc__

Where the images' `src` value is stored for delayed images.

__display__

The CSS `display` states of the containing element that should cause __DelayedImage__ to __NOT__ set `src` on.

If you want to load images even in `none` or `hidden` containers (because you have some fucked up use-case I can't even begin to predict) then you'll need to override this; any random word will do, so long as it's not a valid `display` state.

__ignore__

What if you set the containing element to a visible `display` state, but for some reason there are still images you don't want to load? Set this to a CSS selector for the nested container that should be ignored!

__selector__

The CSS selector for the main containing element.

*Note:* This is not supported in *jQuery* mode.

## To Do ##

* Proper testing and compatibility notes

## License ##

As usual with my work, this project is available under the BSD 3-Clause license. In short, you can do whatever you want with this code as long as:

* I am always recognised as the original author.
* I am not used to advertise any derivative works without prior permission.
* You include a copy of said license and attribution with any and all redistributions of this code, including derivative works.

For more details, read the included LICENSE.md file or read about it on [opensource.org](http://opensource.org/licenses/BSD-3-Clause).