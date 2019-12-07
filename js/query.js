function query() {
    queryR = true;
}
function drawRec() {
    let circle = two.makeCircle(rectangle[0].translation.x, rectangle[1].translation.y, 5);
    circle.fill = 'rgb(100, 100, 255)';
    circle.linewidth = 0;

    circle = two.makeCircle(rectangle[1].translation.x, rectangle[0].translation.y, 5);
    circle.fill = 'rgb(100, 100, 255)';
    circle.linewidth = 0;

    let line = two.makeLine(rectangle[0].translation.x, rectangle[0].translation.y, rectangle[0].translation.x, rectangle[1].translation.y);
    line.stroke = 'rgb(100, 100, 255)';
    line.linewidth = 1;

    line = two.makeLine(rectangle[0].translation.x, rectangle[0].translation.y, rectangle[1].translation.x, rectangle[0].translation.y);
    line.stroke = 'rgb(100, 100, 255)';
    line.linewidth = 1;

    line = two.makeLine(rectangle[1].translation.x, rectangle[1].translation.y, rectangle[1].translation.x, rectangle[0].translation.y);
    line.stroke = 'rgb(100, 100, 255)';
    line.linewidth = 1;

    line = two.makeLine(rectangle[0].translation.x, rectangle[1].translation.y, rectangle[1].translation.x, rectangle[1].translation.y);
    line.stroke = 'rgb(100, 100, 255)';
    line.linewidth = 1;
}