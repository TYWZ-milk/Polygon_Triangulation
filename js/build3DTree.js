function build3DTree() {
    treePlane.clear();
    ytreePlane.clear();
    titleForDia();
    treePlane.update();
    ytreePlane.update();
    let sortedX = points.concat();
    sortedX.sort(function (a,b) {
        return a.position.x-b.position.x;
    });
    tree = Build3DRangeTree(sortedX);
    Traverse3DTree(tree,1,null,300,50);
    nextStep3DBT();
    // DrawTree(tree);
}
let indexOftreeNodes = 0;
function nextStep3DBT() {
    if(indexOftreeNodes<treeNodes.length) {
        drawNode(treeNodes[indexOftreeNodes].child, treeNodes[indexOftreeNodes].parent, treeNodes[indexOftreeNodes].addX, treeNodes[indexOftreeNodes].addY);
        indexOftreeNodes++;
        document.getElementById("startBuild").disabled = true;
    }
}
let midRange;
function drawNode(tree,root,addX,addY) {
    if(tree == null)return;

    let circle = treePlane.makeCircle(addX, addY, 5);
    circle.fill= '#000000';
    circle.linewidth = 0;
    treePlane.update();

    circle._renderer.elem.addEventListener('mouseover', function() {
        for(let i =0;i<tree.range.length;i++){
            tree.range[i].geometry= new THREE.SphereGeometry(4,32,32);
        }
        let geo = new THREE.PlaneGeometry(200,200,20,20);
        let lowPlane = new THREE.Mesh(geo,new THREE.MeshBasicMaterial({
            color:'rgb(255,135,1)',side:THREE.DoubleSide
        }));
        lowPlane.position.x = tree.range[0].position.x-4;
        lowPlane.rotateY(Math.PI/2);
        scene.add(lowPlane);

        let highPlane = new THREE.Mesh(geo,new THREE.MeshBasicMaterial({
            color:'rgb(255,135,1)',side:THREE.DoubleSide
        }));
        highPlane.position.x = tree.range[tree.range.length-1].position.x+4;
        highPlane.rotateY(Math.PI/2);
        scene.add(highPlane);

        midRange = {low:lowPlane,high:highPlane};

        treePlane.update();
    }, false);

    circle._renderer.elem.addEventListener('click', function() {
        ytreePlane.clear();
        drawYtree(tree.yTree,null,300,50,1);
        titleForDia();
        ytreePlane.update();
    }, false);

    circle._renderer.elem.addEventListener('mouseout', function() {
        for(let i =0;i<tree.range.length;i++){
            tree.range[i].geometry= new THREE.SphereGeometry(1.5,32,32);
        }

        scene.remove(midRange.low);
        scene.remove(midRange.high);
        treePlane.update();
    }, false);
    tree.circle = circle;

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

function drawYtree(Ytree,root,addX,addY,level) {
    if(Ytree == null)return;
    let circle = ytreePlane.makeCircle(addX, addY, 5);
    if(Ytree.fill===undefined)
        circle.fill= '#000000';
    else
        circle.fill = Ytree.fill;
    circle.linewidth = 0;
    ytreePlane.update();
    circle._renderer.elem.addEventListener('mouseover', function() {
        for(let i =0;i<Ytree.range.length;i++){
            Ytree.range[i].geometry= new THREE.SphereGeometry(4,32,32);
        }
        let geo = new THREE.PlaneGeometry(200,200,20,20);
        let lowPlane = new THREE.Mesh(geo,new THREE.MeshBasicMaterial({
            color:'rgb(255,135,1)',side:THREE.DoubleSide
        }));
        lowPlane.position.y = Ytree.range[0].position.y-4;
        lowPlane.rotateX(Math.PI/2);
        scene.add(lowPlane);

        let highPlane = new THREE.Mesh(geo,new THREE.MeshBasicMaterial({
            color:'rgb(255,135,1)',side:THREE.DoubleSide
        }));
        highPlane.position.y = Ytree.range[Ytree.range.length-1].position.y+4;
        highPlane.rotateX(Math.PI/2);
        scene.add(highPlane);

        midRange = {low:lowPlane,high:highPlane};

        ytreePlane.update();
    }, false);

    circle._renderer.elem.addEventListener('click', function() {
        ztreePlane.clear();
        drawZtree(Ytree.zTree,null,300,50,1);
        titleForDia();
        ztreePlane.update();
    }, false);

    circle._renderer.elem.addEventListener('mouseout', function() {
        for(let i =0;i<Ytree.range.length;i++){
            Ytree.range[i].geometry= new THREE.SphereGeometry(1.5,32,32);
        }
        scene.remove(midRange.low);
        scene.remove(midRange.high);
        ytreePlane.update();
    }, false);
    drawYtree(Ytree.leftChild,circle,addX-points.length*15/level,addY+50,level+1);
    drawYtree(Ytree.rightChild,circle,addX+points.length*15/level,addY+50,level+1);

    if(root!=null) {
        let line = ytreePlane.makeLine(circle.translation.x, circle.translation.y, root.translation.x, root.translation.y,);
        line.stroke = '#000000';
        line.linewidth = 1;
    }
}

function drawZtree(tree,root,addX,addY,level) {
    if(tree == null)return;
    let circle = ztreePlane.makeCircle(addX, addY, 5);
    if(tree.fill===undefined)
        circle.fill= '#000000';
    else
        circle.fill = tree.fill;
    circle.linewidth = 0;
    ztreePlane.update();
    circle._renderer.elem.addEventListener('mouseover', function() {
        for(let i =0;i<tree.range.length;i++){
            tree.range[i].geometry= new THREE.SphereGeometry(4,32,32);
        }
        let geo = new THREE.PlaneGeometry(200,200,20,20);
        let lowPlane = new THREE.Mesh(geo,new THREE.MeshBasicMaterial({
            color:'rgb(255,135,1)',side:THREE.DoubleSide
        }));
        lowPlane.position.z = tree.range[0].position.z-4;
        scene.add(lowPlane);

        let highPlane = new THREE.Mesh(geo,new THREE.MeshBasicMaterial({
            color:'rgb(255,135,1)',side:THREE.DoubleSide
        }));
        highPlane.position.z = tree.range[tree.range.length-1].position.z+4;
        scene.add(highPlane);

        midRange = {low:lowPlane,high:highPlane};

        ztreePlane.update();
    }, false);

    circle._renderer.elem.addEventListener('mouseout', function() {
        for(let i =0;i<tree.range.length;i++){
            tree.range[i].geometry= new THREE.SphereGeometry(1.5,32,32);
        }
        scene.remove(midRange.low);
        scene.remove(midRange.high);
        ztreePlane.update();
    }, false);
    drawZtree(tree.leftChild,circle,addX-points.length*15/level,addY+50,level+1);
    drawZtree(tree.rightChild,circle,addX+points.length*15/level,addY+50,level+1);

    if(root!=null) {
        let line = ztreePlane.makeLine(circle.translation.x, circle.translation.y, root.translation.x, root.translation.y,);
        line.stroke = '#000000';
        line.linewidth = 1;
    }
}

function Traverse3DTree(tree,level,root,addX,addY) {
    if(tree==null)return;
    let element = {child:tree,parent:root,level:level,addX:addX,addY:addY};
    treeNodes.push(element);
    Traverse3DTree(tree.leftChild,level+1,element,addX-points.length*15/level,addY+50);
    Traverse3DTree(tree.rightChild,level+1,element,addX+points.length*15/level,addY+50);

}

function Build3DRangeTree(sortedX) {
    let sortedY = sortedX.concat();
    sortedY.sort(function (a,b) {
        return a.position.y-b.position.y;
    });
    let Ytree = BuildYtree(sortedY);

    if(sortedX.length===1)
        return {value: sortedX[0].position.x,leftChild: null, rightChild: null,range:sortedX,yTree:Ytree};
    else {
        let med = sortedX.length % 2 === 0 ? (sortedX[sortedX.length / 2].position.x + sortedX[sortedX.length / 2 - 1].position.x) / 2 : sortedX[sortedX.length / 2 - 0.5].position.x;
        let leftP = sortedX.slice(0, sortedX.length / 2);
        let rightP = sortedX.slice(sortedX.length / 2);
        let vleft = Build3DRangeTree(leftP);
        let vright = Build3DRangeTree(rightP);
        return {leftChild: vleft, rightChild: vright, value: med, range:sortedX,yTree:Ytree};
    }
}

function BuildYtree(sortedY) {
    let sortedZ = sortedY.concat();
    sortedZ.sort(function (a,b) {
        return a.position.z-b.position.z;
    });
    let Ztree = BuildZtree(sortedZ);

    if(sortedY.length===1)
        return {value: sortedY[0].position.y,leftChild: null, rightChild: null,range:sortedY,zTree:Ztree};
    else {
        let med = sortedY.length % 2 === 0 ? (sortedY[sortedY.length / 2].position.y + sortedY[sortedY.length / 2 - 1].position.y) / 2 : sortedY[sortedY.length / 2 - 0.5].position.y;
        let leftP = sortedY.slice(0, sortedY.length / 2);
        let rightP = sortedY.slice(sortedY.length / 2);
        let vleft = BuildYtree(leftP);
        let vright = BuildYtree(rightP);
        return {leftChild: vleft, rightChild: vright, value: med, range:sortedY,zTree:Ztree};
    }
}

function BuildZtree(sortedZ) {
    if(sortedZ.length === 1)
        return {value:sortedZ[0].position.z,point:sortedZ[0],range:sortedZ};
    else{
        let med = sortedZ.length % 2 === 0 ? (sortedZ[sortedZ.length / 2].position.z + sortedZ[sortedZ.length / 2 - 1].position.z) / 2 : sortedZ[sortedZ.length / 2 - 0.5].position.z;
        let leftP = sortedZ.slice(0, sortedZ.length / 2);
        let rightP = sortedZ.slice(sortedZ.length / 2);
        let vleft = BuildZtree(leftP);
        let vright = BuildZtree(rightP);
        return {leftChild: vleft, rightChild: vright, value: med, range:sortedZ};
    }
}
