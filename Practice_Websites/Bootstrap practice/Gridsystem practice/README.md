# About 
Website that I created to play with and understand the Bootstrap grid system

## What I learned
* Bootstrap uses 12 columns for the grid system. 
* To use the grid system you must place the rows inside a container class.
* The purpose of the grid system is to lay things out at different browser sizes/device screen sizes. Specifing how many columns each item will take at each size makes the website responsive when the browsers are shrinked or enlarged.
* You can nest grids. To nest, you must include a grid inside of the div of another grid. Ex:
```
<div class="col-md-3">
	<div class="col-md-6"></div>
	<div class="col-md-6"></div>
</div>
```
Now the grid column will consist of two smaller grid columns.