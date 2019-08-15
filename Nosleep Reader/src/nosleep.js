var modeLogo = document.querySelector(".mode-logo");
var body = document.querySelector("body");
var title = document.querySelector("#title");
var author = document.querySelector("#author");
var points = document.querySelector("#points");
var isSeries = document.querySelector("#is-series")
var story = document.querySelector("#story");
var nextButton = document.querySelectorAll(".next");

var darkMode = '<i class="fas fa-moon"></i>';
var lightMode = '<i class="fas fa-sun"></i>';
var currentMode = "light";
var nextModeHTML = darkMode;

var stories = []; // Holds the links
var currentStory = null; // Link to the .json data of the story
var storyIndex = 0;

init();

async function init() {
    var nosleepURL = "https://www.reddit.com/r/nosleep/.json";
    await fetchNosleep(nosleepURL);
    await fetchPost(stories[storyIndex]); //display the first story on startup
}

// Request 10 stories from 'nosleep'
async function fetchNosleep(url) {
    return fetch(url, {mode: "cors"})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            getTenStories(response);
        });

}

// Add the non-moderator posts to 'stories' array
function getTenStories(response) {
    var i = 0;
    while(stories.length < 10) {
        if(!response.data.children[i].data.stickied) {
            stories.push(response.data.children[i].data.url + ".json");
        }
        ++i;
    }
}

async function fetchPost(url) {
    return fetch(url, {mode: "cors"})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var post = {
                title: response[0].data.children[0].data.title,
                author: response[0].data.children[0].data.author,
                story: decodeEntities(response[0].data.children[0].data.selftext_html),
                upvotes: response[0].data.children[0].data.ups,
                flairText: response[0].data.children[0].data.link_flair_text
            };

            updateContent(post);
            addLinks(response[0].data.children[0].data.url, post.author);
        });
}

// Display the story
function updateContent(post) {
    title.textContent = post.title;
    author.textContent = "By " + "/u/" + post.author;
    story.innerHTML = post.story;
    points.textContent = "Upvotes: " + String(post.upvotes);

    if(post.flairText === "Series") {
        isSeries.textContent = "Part of a series";
    }
    else {
        isSeries.textContent = "A standalone story";
    }
}

function addLinks(url, user) {
    title.setAttribute("href", url);
    author.setAttribute("href", "https://www.reddit.com/user/" + user);
}

// Obtained from https://stackoverflow.com/a/9609450/8637925
var decodeEntities = (function() {
// this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities (str) {
            if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
        }

        return str;
    }

    return decodeHTMLEntities;
})();

// ------------------------------------Event Listeners--------------------------------------
modeLogo.addEventListener("click", function() {
    if(currentMode === "light") {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        currentMode = "dark";
        nextModeHTML = lightMode;
        modeLogo.innerHTML = lightMode;
    }
    else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        currentMode = "light";
        nextModeHTML = darkMode;
        modeLogo.innerHTML = darkMode;
    }
});

for(var i = 0; i < nextButton.length; ++i) {
    nextButton[i].addEventListener("click", function() {
        // Go to the top of the page
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        getNextStory();
    });
}

// Display the next story
async function getNextStory() {
    if(storyIndex < 10) {
        ++storyIndex;
        await fetchPost(stories[storyIndex]);
    }   
}