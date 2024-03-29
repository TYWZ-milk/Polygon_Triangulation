let indexOftreeNodes = 0;
function nextStepBT() {
    if(indexOftreeNodes<treeNodes.length) {
        drawNode(treeNodes[indexOftreeNodes].child, treeNodes[indexOftreeNodes].parent, treeNodes[indexOftreeNodes].addX, treeNodes[indexOftreeNodes].addY);
        if(treeNodes[indexOftreeNodes].child.yTree!==null || treeNodes[indexOftreeNodes].child.yTree!==undefined) {
            ytreePlane.clear();
            drawYtree(treeNodes[indexOftreeNodes].child.yTree, null, 300, 50, 1);
        }
        else{
            ytreePlane.clear();
        }
        titleForDia();
        ytreePlane.update();
        document.getElementById("startBuild").disabled = true;
        indexOftreeNodes++;
    }
}
function finishDraw() {
    treePlane.clear();
    ytreePlane.clear();
    titleForDia();
    treePlane.update();
    ytreePlane.update();
    let sortedX = points.concat();
    sortedX.sort(function (a,b) {
        return a.translation.x-b.translation.x;
    });
    tree = Build2DRangeTree(sortedX);
    TraverseTree(tree,1,null,300,50);
    nextStepBT();
    // DrawTree(tree);
}
let midLine;
let midRange;
function DrawTree(tree) {
    drawNode(tree,null,300,50);
    treePlane.update();
}

function drawNode(tree,root,addX,addY) {
    if(tree == null)return;

    let circle = treePlane.makeCircle(addX, addY, 5);
    circle.fill= '#000000';
    circle.linewidth = 0;
    treePlane.update();

    circle._renderer.elem.addEventListener('mouseover', function() {
        for(let i =0;i<tree.range.length;i++){
            tree.range[i].radius = 10;
        }
        let line = two.makeLine(tree.value, 700, tree.value,0 );
        line.stroke = '#000000';
        line.linewidth = 1;
        midLine = line;

        let lowLine = two.makeLine(tree.range[0].translation.x-1, 700, tree.range[0].translation.x-1,0 );
        lowLine.stroke = 'rgb(255,135,1)';
        lowLine.linewidth = 1;

        let highLine = two.makeLine(tree.range[tree.range.length-1].translation.x+1, 700, tree.range[tree.range.length-1].translation.x+1,0 );
        highLine.stroke = 'rgb(255,135,1)';
        highLine.linewidth = 1;

        midRange = {low:lowLine,high:highLine};

        treePlane.update();
        two.update();
    }, false);

    circle._renderer.elem.addEventListener('click', function() {
        ytreePlane.clear();
        drawYtree(tree.yTree,null,300,50,1);
        titleForDia();
        ytreePlane.update();
    }, false);

    circle._renderer.elem.addEventListener('mouseout', function() {
        for(let i =0;i<tree.range.length;i++){
            tree.range[i].radius = 5;
        }
        midLine.linewidth = 0;
        midRange.low.linewidth = 0;
        midRange.high.linewidth = 0;
        treePlane.update();
        two.update();
    }, false);
    tree.circle = circle;
    // drawNode(tree.leftChild,circle,addX-points.length*15/level,addY+50,level+1);
    // drawNode(tree.rightChild,circle,addX+points.length*15/level,addY+50,level+1);

    if(root!=null) {
        let endpoint;
        for(let i =0;i<treeNodes.length;i++){
            if(treeNodes[i]===root)
                endpoint = treeNodes[i];
        }
        let line = treePlane.makeLine(circle.translation.x, circle.translation.y, endpoint.addX, endpoint.addY);
        line.stroke = '#000000';
        line.linewidth = 1;
        treePlane.update();
    }
}

function TraverseTree(tree,level,root,addX,addY) {
    if(tree==null)return;
    let element = {child:tree,parent:root,level:level,addX:addX,addY:addY};
    treeNodes.push(element);
    TraverseTree(tree.leftChild,level+1,element,addX-points.length*15/level,addY+50);
    TraverseTree(tree.rightChild,level+1,element,addX+points.length*15/level,addY+50);

}

function Build2DRangeTree(sortedX) {
    let sortedY = sortedX.concat();
    sortedY.sort(function (a,b) {
        return a.translation.y-b.translation.y;
    });
    let Ytree = BuildYtree(sortedY);

    if(sortedX.length===1)
        return {value: sortedX[0].translation.x,leftChild: null, rightChild: null,range:sortedX,yTree:Ytree};
    else {
        let med = sortedX.length % 2 === 0 ? (sortedX[sortedX.length / 2].translation.x + sortedX[sortedX.length / 2 - 1].translation.x) / 2 : sortedX[sortedX.length / 2 - 0.5].translation.x;
        let leftP = sortedX.slice(0, sortedX.length / 2);
        let rightP = sortedX.slice(sortedX.length / 2);
        let vleft = Build2DRangeTree(leftP);
        let vright = Build2DRangeTree(rightP);
        return {leftChild: vleft, rightChild: vright, value: med, range:sortedX,yTree:Ytree};
    }
}

function BuildYtree(sortedY) {
    if(sortedY.length === 1)
        return {value:sortedY[0].translation.y,point:sortedY[0],range:sortedY};
    else{
        let med = sortedY.length % 2 === 0 ? (sortedY[sortedY.length / 2].translation.y + sortedY[sortedY.length / 2 - 1].translation.y) / 2 : sortedY[sortedY.length / 2 - 0.5].translation.y;
        let leftP = sortedY.slice(0, sortedY.length / 2);
        let rightP = sortedY.slice(sortedY.length / 2);
        let vleft = BuildYtree(leftP);
        let vright = BuildYtree(rightP);
        return {leftChild: vleft, rightChild: vright, value: med, range:sortedY};
    }
}

function drawYtree(tree,root,addX,addY,level) {
    if(tree == null)return;
    let circle = ytreePlane.makeCircle(addX, addY, 5);
    if(tree.circle===undefined)
        circle.fill= '#000000';
    else
        circle.fill = tree.circle.fill;
    circle.linewidth = 0;
    ytreePlane.update();
    circle._renderer.elem.addEventListener('mouseover', function() {
        for(let i =0;i<tree.range.length;i++){
            tree.range[i].radius = 10;
        }
        let line = two.makeLine(0, tree.value, 800,tree.value );
        line.stroke = '#000000';
        line.linewidth = 1;
        midLine = line;

        let lowLine = two.makeLine( 0, tree.range[0].translation.y-1,800,tree.range[0].translation.y-1 );
        lowLine.stroke = 'rgb(255,135,1)';
        lowLine.linewidth = 1;

        let highLine =two.makeLine( 0, tree.range[tree.range.length-1].translation.y+1,800,tree.range[tree.range.length-1].translation.y+1 );
        highLine.stroke = 'rgb(255,135,1)';
        highLine.linewidth = 1;

        midRange = {low:lowLine,high:highLine};

        ytreePlane.update();
        two.update();
    }, false);

    circle._renderer.elem.addEventListener('mouseout', function() {
        for(let i =0;i<tree.range.length;i++){
            tree.range[i].radius = 5;
        }
        midLine.linewidth = 0;
        midRange.low.linewidth = 0;
        midRange.high.linewidth = 0;
        ytreePlane.update();
        two.update();
    }, false);
    tree.circle = circle;
    drawYtree(tree.leftChild,circle,addX-points.length*15/level,addY+50,level+1);
    drawYtree(tree.rightChild,circle,addX+points.length*15/level,addY+50,level+1);

    if(root!=null) {
        let line = ytreePlane.makeLine(circle.translation.x, circle.translation.y, root.translation.x, root.translation.y,);
        line.stroke = '#000000';
        line.linewidth = 1;
        ytreePlane.update();
    }
}