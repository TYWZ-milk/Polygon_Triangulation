let indexOftreeNodes = 0;
function nextStepBT() {
    if(indexOftreeNodes<treeNodes.length) {
        drawNode(treeNodes[indexOftreeNodes].child, treeNodes[indexOftreeNodes].parent, treeNodes[indexOftreeNodes].addX, treeNodes[indexOftreeNodes].addY);
        titleForDia();
        document.getElementById("startBuild").disabled = true;
        indexOftreeNodes++;
    }
}
function finishDraw() {
    treePlane.clear();
    titleForDia();
    treePlane.update();
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
    if(sortedX.length===1)
        return {value: sortedX[0].translation.x,leftChild: null, rightChild: null,range:sortedX};
    else {
        let med = sortedX.length % 2 === 0 ? (sortedX[sortedX.length / 2].translation.x + sortedX[sortedX.length / 2 - 1].translation.x) / 2 : sortedX[sortedX.length / 2 - 0.5].translation.x;
        let leftP = sortedX.slice(0, sortedX.length / 2);
        let rightP = sortedX.slice(sortedX.length / 2);
        let vleft = Build2DRangeTree(leftP);
        let vright = Build2DRangeTree(rightP);
        return {leftChild: vleft, rightChild: vright, value: med, range:sortedX};
    }
}

