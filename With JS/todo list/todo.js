var list = document.getElementById("todo-list");

window.setTimeout(function() {
    var todoList = [];
    var todoListHTML = [];

    function newTodo() {
        var todo = prompt("Enter a new todo"); //Change when adding text box
        todoList.push(todo);

        var listNumber = todoListHTML.length + 1;

        var todoHTML = "<li>" + listNumber + ". " + todo + "</li>";
        todoListHTML.push(todoHTML);
    }

    //This function adds a new todo to the website after it was added.
    function printTodo() {
        for(var i = todoListHTML.length - 1; i < todoListHTML.length; ++i) {
            list.innerHTML += todoListHTML[i];
        }
    }

    //This function prints todo again after a todo was deleted
    function printAllTodos() {
        list.innerHTML = "";
        for(var i = 0; i < todoListHTML.length; ++i) {
            list.innerHTML += todoListHTML[i];
        }
    }


    function deleteTodo() {
        index = prompt("Enter index of todo to delete");

        if(todoList.length === 0) {
            console.log("Can't. No items in list.");
            return;
        }

        else if(index < 0 || index >= todoList.length) {
            console.log("Index is invalid");
            return;
        }

        else {
            todoList.splice(index,1);
            todoListHTML.splice(index,1);
            printAllTodos();
        }

        console.log("Todo Removed"); //Delete after adding input text box.
    }

    while(1) {
        var  response = prompt("What would you like to do?");

        if(response == "new"){
            newTodo();
            printTodo();
        }
        else if(response == "delete"){
            deleteTodo();
        }
        else if (response == "quit"){
            break;
        }
        else {
            alert("Invalid");
        }
    }
}, 500);
