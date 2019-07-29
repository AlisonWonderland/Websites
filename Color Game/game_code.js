"use strict";
var colors = create_colors_list(6);
var easy_selected = false;
var hard_selected = true;

var squares = document.getElementsByClassName("square");
var correct_color = pick_color();
var correct_color_display = document.getElementById("correct-color-display");
var message_display = document.getElementById("message");
var h1 = document.querySelector("h1");
var reset_button = document.getElementById("reset-colors");
var easy_botton = document.getElementById("easy");
var hard_botton = document.getElementById("hard");

init();

reset_button.addEventListener("click", function() {
    reset();
});

easy_botton.addEventListener("click", function() {
    if(!easy_selected) {
        easy_botton.classList.add("selected");
        hard_botton.classList.remove("selected");
        easy_selected = true;
        hard_selected = false;
        reset();
    }
});

hard_botton.addEventListener("click", function() {
    if(!hard_selected) {
        hard_botton.classList.add("selected");
        easy_botton.classList.remove("selected");
        easy_selected = false;
        hard_selected = true;
        reset();
    }
});

function init() {
    correct_color_display.innerHTML = correct_color;
    //Game code
    for(var i = 0; i < squares.length; ++i) {
        //Add colors to squares
        squares[i].style.backgroundColor = colors[i]; 

        //Check if square is the right one
        squares[i].addEventListener("click", function() {
            var clickColor = this.style.backgroundColor;
            //Changes that happen when we guess correctly
            if(clickColor === correct_color) {
                message_display.textContent = "Correct!";
                h1.style.backgroundColor = correct_color;
                reset_button.textContent = "Play again?";
                if(easy_selected) {  
                    change_to_correct_color(3);
                }
                else {
                    change_to_correct_color(6);
                }
            }
            //Changes that happen when we guess incorrectly
            else {
                this.style.backgroundColor = "#232323"; 
                message_display.textContent = "Try again.";
            }
        });
    }
}

function reset() {
    message_display.textContent = "";

    if(easy_selected) {
        colors = create_colors_list(3);
    }
    else {
        colors = create_colors_list(6);
    }

    correct_color = pick_color();
    correct_color_display.innerHTML = correct_color;

    //Paint squares
    for(var i = 0; i < colors.length; ++i) {
        squares[i].style.backgroundColor = colors[i];
    }

    //Make squares visible depending on difficulty mode
    if(easy_selected) {
        //Hide the bottom row of squares
        for(var i = 3; i < squares.length; ++i) {
            squares[i].style.display = "none";
        }
    }
    else {
        //Unhide the bottom row of squares
        for(var i = 3; i < squares.length; ++i) {
            squares[i].style.display = "block";
        }
    }
    h1.style.backgroundColor = "steelblue";
    reset_button.textContent = "New Colors";
}

//Paints all squares to the correct color when you win.
function change_to_correct_color(num_squares) {
    for(var i = 0; i < num_squares; ++i) {
        squares[i].style.backgroundColor = correct_color;
    }
}

function pick_color() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function create_colors_list(num_colors) {
    var color_list = [];

    for(var i = 0; i < num_colors; ++i) {
        color_list.push(create_color());
    }

    return color_list;
}

function create_color() {
    var r = Math.floor(Math.random() * 255 + 1);
    var g = Math.floor(Math.random() * 255 + 1);
    var b = Math.floor(Math.random() * 255 + 1);

    var rgb = "rgb(" + r + ", " + g + ", " + b + ")";

    return rgb;
}