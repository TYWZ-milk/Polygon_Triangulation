function query() {
    for (let i = 0; i < rectangle.length; i++) {
        if(rectangle[i].radius!==undefined)
            rectangle[i].radius = 0;
        if(rectangle[i].linewidth!==undefined)
            rectangle[i].linewidth = 0;
    }
    for(let i = 0;i<points.length;i++){
        points[i].fill = '#000000';
    }

    for(let i =0;i<treeNodes.length;i++){
        treeNodes[i].child.circle.fill = '#000000';
    }

    for(let i =0;i<queryNodes.length;i++){
        queryNodes[i].node.circle.fill = '#000000';
    }

    indexOfqueryNodes = 0;
    queryNodes = [];
    rectangle = [];
    queryR = true;
    titleForDia();
    treePlane.update();
    two.update();
}
let indexOfqueryNodes = 0;
function nextStepQ() {
    if(indexOfqueryNodes<queryNodes.length) {
        if(queryNodes[indexOfqueryNodes].state==="visited")
            queryNodes[indexOfqueryNodes].node.circle.fill = 'rgb(10, 200, 25)';
        else if(queryNodes[indexOfqueryNodes].state==="leaf")
            queryNodes[indexOfqueryNodes].node.circle.fill = 'rgb(200, 1, 25)';
        indexOfqueryNodes++;
    }

    treePlane.update();
}

function drawRec() {
    let circle = two.makeCircle(rectangle[0].translation.x, rectangle[1].translation.y, 5);
    circle.fill = 'rgb(100, 100, 255)';
    circle.linewidth = 0;
    rectangle.push(circle);

    circle = two.makeCircle(rectangle[1].translation.x, rectangle[0].translation.y, 5);
    circle.fill = 'rgb(100, 100, 255)';
    circle.linewidth = 0;
    rectangle.push(circle);

    let line = two.makeLine(rectangle[0].translation.x, rectangle[0].translation.y, rectangle[0].translation.x, rectangle[1].translation.y);
    line.stroke = 'rgb(100, 100, 255)';
    line.linewidth = 1;
    rectangle.push(line);

    line = two.makeLine(rectangle[0].translation.x, rectangle[0].translation.y, rectangle[1].translation.x, rectangle[0].translation.y);
    line.stroke = 'rgb(100, 100, 255)';
    line.linewidth = 1;
    rectangle.push(line);

    line = two.makeLine(rectangle[1].translation.x, rectangle[1].translation.y, rectangle[1].translation.x, rectangle[0].translation.y);
    line.stroke = 'rgb(100, 100, 255)';
    line.linewidth = 1;
    rectangle.push(line);

    line = two.makeLine(rectangle[0].translation.x, rectangle[1].translation.y, rectangle[1].translation.x, rectangle[1].translation.y);
    line.stroke = 'rgb(100, 100, 255)';
    line.linewidth = 1;
    rectangle.push(line);

    let lowx,highx;
    if(rectangle[0].translation.x>rectangle[1].translation.x){
        lowx = rectangle[1].translation.x;
        highx = rectangle[0].translation.x;
    }
    else{
        highx = rectangle[1].translation.x;
        lowx = rectangle[0].translation.x;
    }

    let range = {lowx:lowx,highx:highx};
    queryintree(tree,range);
    treePlane.update();
}

function queryintree(root,range) {
    if(root == null)return;
    for(let i =0;i<treeNodes.length;i++){
        if(treeNodes[i].child===root) {
            queryNodes.push({node:treeNodes[i].child,state:"visited"});
        }
    }
    if(root.leftChild == null && root.rightChild == null){
        if(range.lowx<root.range[0].translation.x && root.range[0].translation.x<range.highx) {
            for(let i =0;i<treeNodes.length;i++){
                if(treeNodes[i].child===root) {
                    queryNodes[queryNodes.length-1].state="leaf";
                }
            }
            root.range[0].fill = 'rgb(200, 1, 25)';
            return;
        }
        else
            return;
    }

    else if(!(range.lowx > root.range[root.range.length - 1].translation.x) && !(range.highx<root.range[0].translation.x)) {
        queryintree(root.leftChild,range);
        queryintree(root.rightChild,range);
    }

}

