window.setTimeout(function() {
    var todoList = [];

    function newTodo() {
        var todo = prompt("Enter a new todo");
        todoList.push(todo);
    }

    function printTodos() {
        if(todoList.length == 0) {
            console.log("No todos in list");
            return;
        }

        console.log("********");
        todoList.forEach(function(todo, index) {
            console.log(index + ': ' + todo);
        });
        console.log("********");
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
        }

        console.log("Todo Removed");
    }

    var response = "";

    do {
        response = prompt("What would you like to do?");

        if(response == "new"){
            newTodo();
        }
        else if(response == "list"){
            printTodos();
        }
        else if(response == "delete"){
            deleteTodo();
        }
        else {
            alert("Invalid");
        }
    }while(response !== "quit")
}, 500);