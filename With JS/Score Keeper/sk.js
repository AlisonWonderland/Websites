var p1_button = document.querySelector("#p1");
var p2_button = document.querySelector("#p2");
var reset_button = document.querySelector("#reset");
var p1_display = document.querySelector("#p1_display");
var p2_display = document.querySelector("#p2_display");
var num_input = document.querySelector("input"); 
var winning_score_display = document.querySelector("#winning_score"); 
var p1_score = 0;
var p2_score = 0;
var game_over = false;
var winning_score = 5;

p1_button.addEventListener("click", function() {
    if(!game_over) {
        ++p1_score;
        if(p1_score === winning_score) {
            p1_display.classList.add("winner");
            game_over = true;
        }
        p1_display.textContent = p1_score;
    }
});

p2_button.addEventListener("click", function() {
    if(!game_over) {
        ++p2_score;
        if(p2_score === winning_score) {
            p2_display.classList.add("winner");
            game_over = true;
        }
        p2_display.textContent = p2_score;
    }
});

reset_button.addEventListener("click", function() {
    reset();
});

function reset() {
    p1_score = 0;
    p2_score = 0;
    p1_display.textContent = p1_score;
    p2_display.textContent = p2_score;
    game_over = false;
    p1_display.classList.remove("winner");
    p2_display.classList.remove("winner");
}

num_input.addEventListener("change", function() {
    if(this.value > 0) {
        winning_score_display.textContent = this.value;
        winning_score = Number(this.value);
        reset();
    }
});