var displayMode = document.querySelector(".mode-logo");
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

displayMode.addEventListener("click", function() {
    if(currentMode === "light") {
        //change css
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        currentMode = "dark";
        nextModeHTML = lightMode;
        displayMode.innerHTML = lightMode;
    }
    else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        currentMode = "light";
        nextModeHTML = darkMode;
        displayMode.innerHTML = darkMode;
    }
});

for(var i = 0; i < nextButton.length; ++i) {
    nextButton[i].addEventListener("click", function() {
        getNextStory();
    });
}

async function getNextStory() {
    if(storyIndex < 10) {
        ++storyIndex;
        await fetchPost(stories[storyIndex]);
    }   
}

init();

async function init() {
    var nosleepURL = "https://www.reddit.com/r/nosleep/.json";
    await fetchNosleep(nosleepURL);
    console.log("url", stories[0]);
    await fetchPost(stories[storyIndex]); //display the first story on startup
}

async function fetchNosleep(url) {
    // fetch subreddit, add .json to url?
    // get the first 10 posts that are not distinguished, put their links in an Array.
    // create an array called current story, when they press next, go to the next button/increment to the next story
    // update html
    return fetch(url, {mode: "cors"})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            getTenStories(response);
        });

}

// Add the posts to 'stories'
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
            // console.log(response[0].data.children[0].data.selftext_html[3]);
        });
        // .catch(function() {
            
        // });
}

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

var decodeEntities = (function() {
// this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities (str) {
            if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            // document.querySelector("body").appendChild(element);
            str = element.textContent;
            // element.textContent = '';
        }

        return str;
    }

    return decodeHTMLEntities;
})();
