var minutes_display = document.querySelector("#minutes");
var seconds_display = document.querySelector("#seconds");
var hours_display = document.querySelector("#hours");

var start = 0;

var btn = document.querySelector(".btn");

var start_selected = false;
var track_time = 0;

/*
Layout:
1.Hide the start button as well as message in the beginning(maybe timer).
Meanwhile, display activities.(Maybe add title when timer isn't there saying:
'Choose a category to track:')
2. When user clicks category show buttons, message (maybe the timer as well).
3. Let the user choose another activity if they want.
4. Start the timer(hide the activities).
5. Keep track of the time.
6a. When user stops add the event to the calendar.
6b. Let the user enter another activity, back to #1.

Essential: Use the api to login.

notes:add pause button last
*/


btn.addEventListener("click", function(){
    if(!start_selected){
        start = Date.now();
        track_time = setInterval(startTime, 1000);
        start_selected = true;
        btn.textContent = "Stop";
    }
    else {
        clearTimeout(track_time);
        start_selected = false;
    }
});


//Add time variables to store value and upload them
function startTime() {
    var delta = Date.now() - start; // in milliseconds
    if(Math.floor((delta % (1000 * 60)) / 1000) < 10) {
        seconds_display.textContent = '0' +  Math.floor((delta % (1000 * 60)) / 1000); 
    }
    else {
        seconds_display.textContent =  Math.floor((delta % (1000 * 60)) / 1000); 
    }

    if(Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60)) < 10) {
        minutes_display.textContent = '0' + Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    }
    else {
        minutes_display.textContent = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    }

    if(Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60)) < 10) {
        hours_display.textContent = '0' + Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    }
    else {
        hours_display.textContent = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    }
    
}