var colors = create_colors_list(6);

var squares = document.getElementsByClassName("square");
var correct_color = pick_color();
var correct_color_display = document.getElementById("correct-color-display");
var message_display = document.getElementById("message");
var h1 = document.querySelector("h1");
var reset_button = document.getElementById("reset-colors");
var easy_botton = document.getElementById("easy");
var hard_botton = document.getElementById("hard");

var easy_selected = false;
var hard_selected = true;

correct_color_display.innerHTML = correct_color.toUpperCase();

reset_button.addEventListener("click", function() {
    message_display.textContent = "";
    if(easy_selected) {
        colors = create_colors_list(3);
    }
    else {
        colors = create_colors_list(6);
    }
    correct_color = pick_color();
    correct_color_display.innerHTML = correct_color.toUpperCase();
    for(var i = 0; i < squares.length; ++i) {
        //Add colors to squares
        squares[i].style.backgroundColor = colors[i]; 
    }
    h1.style.backgroundColor = "#232323";
    reset_button.textContent = "New Colors";
    
});

easy_botton.addEventListener("click", function() {
    if(!easy_selected) {
        easy_botton.classList.add("selected");
        hard_botton.classList.remove("selected");
        colors = create_colors_list(3);
        correct_color = pick_color();
        correct_color_display.innerHTML = correct_color.toUpperCase();

        //Hide the bottom row of squares
        for(i = 3; i < squares.length; ++i) {
            squares[i].style.visibility = "hidden";
        }

        for(var i = 0; i < squares.length; ++i) {
            //Add colors to squares
            squares[i].style.backgroundColor = colors[i]; 
        }
        
        h1.style.backgroundColor = "#232323";
        reset_button.textContent = "New Colors";
        
        easy_selected = true;
        hard_selected = false;
    }
});

hard_botton.addEventListener("click", function() {
    if(!hard_selected) {
        hard_botton.classList.add("selected");
        easy_botton.classList.remove("selected");
        colors = create_colors_list(6);
        correct_color = pick_color();
        correct_color_display.innerHTML = correct_color.toUpperCase();

        //Unhide the bottom row if needed
        for(i = 3; i < squares.length; ++i) {
            squares[i].style.visibility = "visible";
        }

        for(var i = 0; i < squares.length; ++i) {
            //Add colors to squares
            squares[i].style.backgroundColor = colors[i]; 
        }

        h1.style.backgroundColor = "#232323";
        reset_button.textContent = "New Colors";

        easy_selected = false;
        hard_selected = true;
    }
});

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
            this.style.visibility = "hidden";
            message_display.textContent = "Try again.";
        }
    });
}

function change_to_correct_color(num_squares) {
    for(var i = 0; i < num_squares; ++i) {
        squares[i].style.backgroundColor = correct_color;
        squares[i].style.visibility = "visible";
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
    console.log(rgb); //Keeping this to see the rgb values when the colors complement each other well.

    return rgb;
}