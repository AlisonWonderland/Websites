# Weather app
A basic web app that shows the current temperature and other weather info for the city that you enter in the text box.

Note: Due to the use of URL objects this website won't run on IE browsers.

## What I learned
* IMPORTANT ONE: Changing the innerHTML of an element object will erase any reference to the elements that are inside. Self explanatory. But, this means that any variables storing references to these deleted objects must be reinitialized after resetting the innerHTML. An example is in the request.onload callback function:
```javascript
request.onload = function() {
        if(request.status === 200) {
            var data = JSON.parse(this.response);
            weather_tile.innerHTML = init_tile_html;
            //Needed after setting the innerHTML
            reinitializeVariables();
            ...
```
* How to use/connect to API's using XMLHttpRequest
* Arrow functions
* Promises