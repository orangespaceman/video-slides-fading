# Full-screen Video Slideshow (fading transitions)

Proof-of-concept full-screen slideshow with mixed video and image content

Uses [bigvideo](http://dfcb.github.io/BigVideo.js/) for full-screen videos


## Installation

Clone the repo

Install components via bower:

```
bower install
```

Open *index.html* in a browser


## Controls

You can use the up/down/left/right arrow keys to control the slideshow, or the back/forward buttons in the browser


## Customisation

To change slide content, just edit the HTML

All slideshow images and videos are stored in the `content` directory

It will work best if you take an initial screengrab of the first frame for each video and use that as the initial background image


## Issues

 - Uses a webkit-specific CSS animation on the button focus
 - Doesn't assist with image/video preloading
 - Relies on browser support for different video formats
 - No video controls - e.g. play/pause, rewind
 - No text overlay
 - Slideshow doesn't revert to the start from the last slide