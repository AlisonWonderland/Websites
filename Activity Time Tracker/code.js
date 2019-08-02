var minutes_display = document.querySelector("#minutes");
var seconds_display = document.querySelector("#seconds");
var hours_display = document.querySelector("#hours");

var start_time = 0;
var start_selected = false;
var track_time = 0;

var time = {
    seconds: 0,
    minutes: 0,
    hours: 0
};

var message_display = document.querySelector("#message");
var message_text = message_display.textContent;
var btn = document.querySelector(".btn");

var activities = document.querySelectorAll(".activity");

/*
Layout:
1.Hide the start button as well as message in the beginning(maybe timer).
Meanwhile, display activities.(Maybe add title when timer isn't there saying:
'Choose a category to track:')
DONE
2. When user clicks category show buttons, message (maybe the timer as well).
3. Let the user choose another activity if they want.
4. Start the timer(hide the activities).
5. Keep track of the time.
6a. When user stops add the event to the calendar.
6b. Let the user enter another activity, back to #1.

Essential: Use the api to login.

notes:add pause button last
*/

// init();

// function init() {
//     message.classList.toggle("hide");
//     btn.classList.toggle("hide");
// }

for(var i = 0; i < activities.length; ++i) {
    activities[i].addEventListener("click", function() {
        unhideInstructions();
        editMessage(this.textContent);
    });
}

function editMessage(activity_name) {
    message_display.textContent = message_text + " " + activity_name;
}

btn.addEventListener("click", function(){
    if(!start_selected){
        //put this in its own function: startSetup()
        start_time = Date.now();
        track_time = setInterval(startTime, 1000);
        start_selected = true;
        message_display.classList.add("hide");
        hideActivities();
        btn.textContent = "Stop";
    }
    else {
        //Put in stopSetup()
        clearTimeout(track_time);
        start_selected = false;
        unhideActivities();
        btn.textContent = "Start";
        //We want to clear the message and button/(the instructions)
        hideInstructions();
    }
});

//Add time variables to store value and upload them
function startTime() {
    var delta = Date.now() - start_time; // in milliseconds
    time.seconds = Math.floor((delta % (1000 * 60)) / 1000);
    time.minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    time.hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if(time.seconds < 10) {
        seconds_display.textContent = '0' +  time.seconds; 
    }
    else {
        seconds_display.textContent =  time.seconds; 
    }

    if(time.minutes < 10) {
        minutes_display.textContent = '0' + time.minutes;
    }
    else {
        minutes_display.textContent = time.minutes;
    }

    if(time.hours < 10) {
        hours_display.textContent = '0' + time.hours;
    }
    else {
        hours_display.textContent = time.hours;
    }
}

function hideActivities() {
    for(var i = 0; i < activities.length; ++i) {
        activities[i].classList.add("hide");
    }
}

function unhideActivities() {
    for(var i = 0; i < activities.length; ++i) {
        activities[i].classList.remove("hide");
    }
}

function hideInstructions() {
    message_display.classList.add("hide");
    btn.classList.add("hide");
}

function unhideInstructions() {
    message_display.classList.remove("hide");
    btn.classList.remove("hide");
}