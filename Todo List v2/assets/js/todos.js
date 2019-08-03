$("ul").on("click", "li", function() {
    $(this).toggleClass("check-off");
});

$("ul").on("click", "span.trash", function() {
    $(this).parent().fadeOut(400, function() {
        $(this).remove();
    });
});

$("input[type=text]").keypress(function(event) {
    user_input = removeFrontSpaces($(this).val());
    //add new nonempty todo after enter is pressed
    if(event.which === 13 && user_input != '') {
        $("ul").append('<li> <span class="trash"><i class="fas fa-trash"></i></span> ' +  user_input + '</li>');
        $(this).val("");
    }
});

$(".fa-plus").click(function() {
    $("input[type=text]").fadeToggle();
});

function removeFrontSpaces(user_todo) {
    //assume there are no spaces in the front
    var last_space_index = -1;

    for(var i = 0; i < user_todo.length; ++i) {
        if(user_todo[i] === ' ') {
            last_space_index = i;
        }
        else {
            break;
        }
    }

    return user_todo.slice(last_space_index + 1);
}