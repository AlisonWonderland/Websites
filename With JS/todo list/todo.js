


var response = "";

do {
    response = prompt("What would you like to do?");

    if(response == "new"){
        newTodo();
    }
    else if(response == "list"){
        printTodos();
    }
    else if(response == "quit"){
        break;
    }
    else {
        alert("Invalid");
    }
}while(response !== "quit")