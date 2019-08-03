createCircles();

function createCircles() {
    for(var i = 0; i < 500; ++i) {
        createCircle();
    }
}

function createCircle() {
    new Path.Circle(createPoint(), createRadius()).fillColor = createColor();
}

function createPoint() {
    x = Math.floor(Math.random() * 2000.1);
    y = Math.floor(Math.random() * 2000.1);
    return new Point(x, y);
}

function createRadius() {
    return Math.floor(Math.random() * 40.1);
}

function createColor() {
    var red = Math.floor(Math.random() * 255.1);
    var green = Math.floor(Math.random() * 255.1);
    var blue = Math.floor(Math.random() * 255.1);

    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}