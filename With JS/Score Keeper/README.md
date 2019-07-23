# Score Keeper
Basic website that updates the score to a game using some javascript behind the scenes to do it.

## What I learned 
* Change events: Events that occur when an input changes through whatever means it can change. Whether
it'd be through typing some input or changing it with a button. As is the case with the input box in this website.
* Storing values from an input box: create a variable to store -> document.querySelector("input"). And then to extract value from variable do: 
```javascript
input_val.value;
```
* .value will return a string, so it will have to be converted to a number if it is going to be assigned to a variable that is supposed to store numbers. Maybe it is going to be compared with another vairable that stores a number using the === operator. If this were the case then there would be an unintended bug in our program.
