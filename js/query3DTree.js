function query() {
    for (let i = 0; i < rectangle.length; i++) {
        scene.remove(rectangle[i]);
    }
    for(let i = 0;i<points.length;i++){
        points[i].material.color = new THREE.Color('#000000');
    }
    
    for(let i =0;i<treeNodes.length;i++){
        treeNodes[i].child.circle.fill = '#000000';
    }
    
    for(let i =0;i<ytreeNodes.length;i++){
        ytreeNodes[i].fill = '#000000';
    }

    for(let i =0;i<ztreeNodes.length;i++){
        ztreeNodes[i].fill = '#000000';
    }
    rectangle = [];
    buildRec();

    ytreePlane.clear();
    ztreePlane.clear();
    titleForDia();
    treePlane.update();
    ytreePlane.update();
    ztreePlane.update();
}

function buildRec() {
    let posx1 = parseInt(Math.random()*(100+100+1)-100,10);
    let posy1 = parseInt(Math.random()*(100+1),10);
    let posz1 = parseInt(Math.random()*(100+100+1)-100,10);
    let posx2 = parseInt(Math.random()*(100+100+1)-100,10);
    let posy2 = parseInt(Math.random()*(100+1),10);
    let posz2 = parseInt(Math.random()*(100+100+1)-100,10);


    let geometry = new THREE.SphereGeometry( 1.5, 32, 32 );
    let material = new THREE.MeshBasicMaterial( {color: 'rgb(100, 100, 255)', side:THREE.DoubleSide} );
    let sphere1 = new THREE.Mesh( geometry, material );
    let sphere2 = new THREE.Mesh( geometry, material );
    let sphere3 = new THREE.Mesh( geometry, material );
    let sphere4 = new THREE.Mesh( geometry, material );
    let sphere5 = new THREE.Mesh( geometry, material );
    let sphere6 = new THREE.Mesh( geometry, material );
    let sphere7 = new THREE.Mesh( geometry, material );
    let sphere8 = new THREE.Mesh( geometry, material );
    sphere1.position.set(posx1,posy1 ,posz1);
    sphere2.position.set(posx2,posy1 ,posz1);
    sphere3.position.set(posx1,posy2 ,posz1);
    sphere4.position.set(posx1,posy1 ,posz2);
    sphere5.position.set(posx2,posy2 ,posz2);
    sphere6.position.set(posx1,posy2 ,posz2);
    sphere7.position.set(posx2,posy1 ,posz2);
    sphere8.position.set(posx2,posy2 ,posz1);
    scene.add( sphere1 );
    scene.add( sphere2 );
    scene.add( sphere3 );
    scene.add( sphere4 );
    scene.add( sphere5 );
    scene.add( sphere6 );
    scene.add( sphere7 );
    scene.add( sphere8 );

    rectangle.push(sphere1);
    rectangle.push( sphere2 );
    rectangle.push( sphere3 );
    rectangle.push( sphere4 );
    rectangle.push( sphere5 );
    rectangle.push( sphere6 );
    rectangle.push( sphere7 );
    rectangle.push( sphere8 );

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx1, posy1, posz1) );
    geometry.vertices.push(new THREE.Vector3( posx2,posy1 ,posz1) );
    let line1 = new THREE.Line( geometry, material );
    scene.add(line1);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx1,posy1 ,posz1) );
    geometry.vertices.push(new THREE.Vector3( posx1,posy2 ,posz1) );
    let line2 = new THREE.Line( geometry, material );
    scene.add(line2);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx1,posy1 ,posz1) );
    geometry.vertices.push(new THREE.Vector3( posx1,posy1 ,posz2) );
    let line3 = new THREE.Line( geometry, material );
    scene.add(line3);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx1,posy2 ,posz2) );
    geometry.vertices.push(new THREE.Vector3( posx2,posy2 ,posz2) );
    let line4 = new THREE.Line( geometry, material );
    scene.add(line4);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx2,posy2 ,posz2) );
    geometry.vertices.push(new THREE.Vector3( posx2,posy1 ,posz2) );
    let line5 = new THREE.Line( geometry, material );
    scene.add(line5);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx2,posy2 ,posz2) );
    geometry.vertices.push(new THREE.Vector3( posx2,posy2 ,posz1) );
    let line6 = new THREE.Line( geometry, material );
    scene.add(line6);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx2,posy1 ,posz1) );
    geometry.vertices.push(new THREE.Vector3( posx2,posy2 ,posz1) );
    let line7 = new THREE.Line( geometry, material );
    scene.add(line7);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx2,posy1 ,posz1) );
    geometry.vertices.push(new THREE.Vector3( posx2,posy1 ,posz2) );
    let line8 = new THREE.Line( geometry, material );
    scene.add(line8);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx2,posy2 ,posz1) );
    geometry.vertices.push(new THREE.Vector3( posx1,posy2 ,posz1) );
    let line9 = new THREE.Line( geometry, material );
    scene.add(line9);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx2,posy1 ,posz2) );
    geometry.vertices.push(new THREE.Vector3( posx1,posy1 ,posz2) );
    let line10 = new THREE.Line( geometry, material );
    scene.add(line10);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx1,posy2 ,posz1) );
    geometry.vertices.push(new THREE.Vector3( posx1,posy2 ,posz2) );
    let line11 = new THREE.Line( geometry, material );
    scene.add(line11);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( posx1,posy1 ,posz2) );
    geometry.vertices.push(new THREE.Vector3( posx1,posy2 ,posz2) );
    let line12 = new THREE.Line( geometry, material );
    scene.add(line12);

    rectangle.push(line1);
    rectangle.push( line2 );
    rectangle.push( line3 );
    rectangle.push( line4 );
    rectangle.push( line5 );
    rectangle.push( line6 );
    rectangle.push( line7 );
    rectangle.push( line8 );
    rectangle.push( line9 );
    rectangle.push( line10 );
    rectangle.push( line11 );
    rectangle.push( line12 );

    let lowx,lowy,lowz;
    let highx,highy,highz;
    if(posx1>posx2){
        lowx = posx2;
        highx = posx1;
    }
    else{
        highx = posx2;
        lowx = posx1;
    }
    if(posy1>posy2){
        lowy = posy2;
        highy = posy1;
    }
    else{
        lowy = posy1;
        highy = posy2;
    }
    if(posz1>posz2){
        lowz = posz2;
        highz = posz1;
    }
    else{
        lowz = posz1;
        highz = posz2;
    }

    let range = {low:{lowx,lowy,lowz},high:{highx,highy,highz}};
    query3DTree(tree,range);
    treePlane.update();
}

function query3DTree(root,range) {
    if(root == null)return;
    for(let i =0;i<treeNodes.length;i++){
        if(treeNodes[i].child===root)
            treeNodes[i].child.circle.fill = 'rgb(10, 200, 25)';
    }
    if(root.leftChild == null && root.rightChild == null){
        if(range.low.lowx<root.range[0].position.x && root.range[0].position.x<range.high.highx
            && range.low.lowy<root.range[0].position.y &&root.range[0].position.y <range.high.highy
            && range.low.lowz<root.range[0].position.z &&root.range[0].position.z <range.high.highz) {
            for(let i =0;i<treeNodes.length;i++){
                if(treeNodes[i].child===root)
                    treeNodes[i].child.circle.fill = 'rgb(200, 1, 25)';
            }
            root.range[0].material.color = new THREE.Color("rgb(200, 1, 25)");
            return;
        }
        else
            return;
    }
    if(range.low.lowx<root.range[0].position.x && root.range[root.range.length-1].position.x<range.high.highx) {
        for(let i =0;i<treeNodes.length;i++){
            if(treeNodes[i].child===root)
                treeNodes[i].child.circle.fill = 'rgb(10, 200, 250)';
        }
        queryYtree(root.yTree, range);
    }
    else if(!(range.low.lowx > root.range[root.range.length - 1].position.x) && !(range.high.highx<root.range[0].position.x)) {
        query3DTree(root.leftChild,range);
        query3DTree(root.rightChild,range);
    }
}

function queryYtree(ytree,range) {
    if(ytree == null)return;
    ytree.fill='rgb(10, 200, 25)';
    ytreeNodes.push(ytree);
    if(ytree.leftChild == null && ytree.rightChild == null){
        if(range.low.lowy<ytree.range[0].position.y && ytree.range[0].position.y<range.high.highy
            && range.low.lowz<ytree.range[0].position.z &&ytree.range[0].position.z <range.high.highz) {
            ytree.range[0].material.color = new THREE.Color("rgb(200, 1, 25)");
            ytree.fill='rgb(200, 1, 25)';
            return;
        }
        else
            return;
    }
    if(range.low.lowy<ytree.range[0].position.y && ytree.range[ytree.range.length-1].position.y<range.high.highy) {
        ytree.fill = 'rgb(10, 200, 250)';
        queryZtree(ytree.zTree, range);
    }
    else if(!(range.low.lowy>ytree.range[ytree.range.length-1].position.y) && !(range.high.highy<ytree.range[0].position.y)) {
        queryYtree(ytree.leftChild,range);
        queryYtree(ytree.rightChild,range);
    }
}
function queryZtree(zTree,range) {
    if(zTree == null)return;
    zTree.fill='rgb(10, 200, 25)';
    ztreeNodes.push(zTree);
    if(zTree.leftChild == null && zTree.rightChild == null){
        if(range.low.lowz<zTree.range[0].position.z && zTree.range[0].position.z<range.high.highz) {
            zTree.range[0].material.color = new THREE.Color("rgb(200, 1, 25)");
            zTree.fill='rgb(200, 1, 25)';
            return;
        }
        else
            return;
    }
    if(range.low.lowz<zTree.range[0].position.z && zTree.range[zTree.range.length-1].position.z<range.high.highz) {
        for (let i = 0; i < zTree.range.length; i++) {
            zTree.range[i].material.color = new THREE.Color("rgb(200, 1, 25)");
        }
        colorSubTree(zTree);
    }
    else if(!(range.low.lowz>zTree.range[zTree.range.length-1].position.z) && !(range.high.highz<zTree.range[0].position.z)) {
        queryZtree(zTree.leftChild,range);
        queryZtree(zTree.rightChild,range);
    }
}

function colorSubTree(zTree) {
    if(zTree===null||zTree===undefined)return;
    zTree.fill='rgb(10, 200, 25)';
    if(zTree.leftChild == null && zTree.rightChild == null)
        zTree.fill='rgb(200, 1, 25)';
    ztreeNodes.push(zTree);
    colorSubTree(zTree.leftChild);
    colorSubTree(zTree.rightChild);
}