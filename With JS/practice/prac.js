function kebabToSnake(kebab) {
    snake = "";
    lastIndex = 0;
    for(var i = 0; i < kebab.length; ++i) {
        if(kebab.charAt(i) === "-") {
            snake += kebab.slice(lastIndex, i) + "_"
            lastIndex = i+1;
        }
    }
    snake += kebab.slice(lastIndex, kebab.length-lastIndex);
    return snake;
}

while(1){
    var response = prompt("Enter kebab case string");
    alert(kebabToSnake(response));
}