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

    for(let i =0;i<ytreeNodes.length;i++){
        ytreeNodes[i].fill = '#000000';
    }

    rectangle = [];
    queryR = true;
    ytreePlane.clear();
    titleForDia();
    treePlane.update();
    ytreePlane.update();
    two.update();
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

    let lowx,lowy;
    let highx,highy;
    if(rectangle[0].translation.x>rectangle[1].translation.x){
        lowx = rectangle[1].translation.x;
        highx = rectangle[0].translation.x;
    }
    else{
        highx = rectangle[1].translation.x;
        lowx = rectangle[0].translation.x;
    }
    if(rectangle[0].translation.y>rectangle[1].translation.y){
        lowy = rectangle[1].translation.y;
        highy = rectangle[0].translation.y;
    }
    else{
        lowy = rectangle[0].translation.y;
        highy = rectangle[1].translation.y;
    }
    let range = {lowx:lowx,highx:highx,lowy:lowy,highy:highy};
    queryintree(tree,range);
    treePlane.update();
}

function queryintree(root,range) {
    if(root == null)return;
    for(let i =0;i<treeNodes.length;i++){
        if(treeNodes[i].child===root)
            treeNodes[i].child.circle.fill = 'rgb(10, 200, 25)';
    }
    if(root.leftChild == null && root.rightChild == null){
        if(range.lowx<root.range[0].translation.x && root.range[0].translation.x<range.highx
            && range.lowy<root.range[0].translation.y &&root.range[0].translation.y <range.highy) {
            for(let i =0;i<treeNodes.length;i++){
                if(treeNodes[i].child===root)
                    treeNodes[i].child.circle.fill = 'rgb(200, 1, 25)';
            }
            root.range[0].fill = 'rgb(200, 1, 25)';
            return;
        }
        else
            return;
    }
    if(range.lowx<root.range[0].translation.x && root.range[root.range.length-1].translation.x<range.highx) {
        for(let i =0;i<treeNodes.length;i++){
            if(treeNodes[i].child===root)
                treeNodes[i].child.circle.fill = 'rgb(10, 200, 250)';
        }
        queryYtree(root.yTree, range);
    }
    else if(!(range.lowx > root.range[root.range.length - 1].translation.x) && !(range.highx<root.range[0].translation.x)) {
        queryintree(root.leftChild,range);
        queryintree(root.rightChild,range);
    }

}
function queryYtree(ytree,range) {
    if(ytree == null)return;
    ytree.fill='rgb(10, 200, 25)';
    ytreeNodes.push(ytree);
    if(ytree.leftChild == null && ytree.rightChild == null){
        if(range.lowx<ytree.range[0].translation.x && ytree.range[0].translation.x<range.highx
            && range.lowy<ytree.range[0].translation.y &&ytree.range[0].translation.y <range.highy) {
            ytree.range[0].fill = 'rgb(200, 1, 25)';
            ytree.fill='rgb(200, 1, 25)';
            return;
        }
        else
            return;
    }
    if(range.lowy<ytree.range[0].translation.y && ytree.range[ytree.range.length-1].translation.y<range.highy) {
        for (let i = 0; i < ytree.range.length; i++) {
            ytree.range[i].fill = 'rgb(200, 1, 25)';
        }
        colorSubTree(ytree);
    }
    else if(!(range.lowy>ytree.range[ytree.range.length-1].translation.y) && !(range.highy<ytree.range[0].translation.y)) {
        queryYtree(ytree.leftChild,range);
        queryYtree(ytree.rightChild,range);
    }
}

function colorSubTree(ytree) {
    if(ytree===null||ytree===undefined)return;
    ytree.fill='rgb(10, 200, 25)';
    if(ytree.leftChild == null && ytree.rightChild == null)
        ytree.fill='rgb(200, 1, 25)';
    ytreeNodes.push(ytree);
    colorSubTree(ytree.leftChild);
    colorSubTree(ytree.rightChild);
}