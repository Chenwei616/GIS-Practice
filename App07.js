
//////////////////////////////////////////////////////////////////////////
// Creating the Viewer
//////////////////////////////////////////////////////////////////////////
var viewer = new Cesium.Viewer('cesiumContainer', {
    animation: false,
    timeline: false,
    vrButton: true
});

var value;

function fillColorFULL(housestateid) {
    // freezeObject(Color.fromCssColorString('#FAEBD7'));
    //debugger;
    var percent = 0.8;
    if (housestateid == '0') {
        return Cesium.Color.fromCssColorString('#019934').withAlpha(percent);//Cesium.ColorMaterialProperty(); //.withAlpha(percent);// "#FE0000";
    }
    else if (housestateid == '4') {
        return Cesium.Color.TRANSPARENT; //Cesium.Color.fromCssColorString('#FE0000');//.withAlpha(percent);// "#FE0000";
    }
    else if (housestateid == '1') {
        return Cesium.Color.fromCssColorString('#019934').withAlpha(percent);//.withAlpha(percent); //"#019934";
    }
    else if (housestateid == '2') {
        return Cesium.Color.fromCssColorString('#FF9934').withAlpha(percent);//.withAlpha(percent); //"#FF9934";
    }
    else if (housestateid == '3') {
        return Cesium.Color.fromCssColorString('#FFFF01').withAlpha(percent);//.withAlpha(percent); //"#FFFF01";
    }
    else if (housestateid == '5') {
        return Cesium.Color.fromCssColorString('#FFFFFF').withAlpha(percent);//.withAlpha(percent); //"#FFFFFF";
    }
    else if (housestateid == '7') {
        return Cesium.Color.fromCssColorString('#3377FF').withAlpha(percent);//.withAlpha(percent); //"#3377FF";
    }
    else if (housestateid == '8') {
        return Cesium.Color.fromCssColorString('#FC537C').withAlpha(percent);//.withAlpha(percent);//"#FC537C";
    }
    else {
        return Cesium.Color.fromCssColorString('#FFFFFF').withAlpha(percent);//.withAlpha(0.5); //"#FFFFFF";
    }
}

function levelSwitch() {
    switch (value) {
        case 'Z':
            viewer.entities.removeAll();
            Cesium.loadJson('../Apps/out.json').then(function (jsonData) {
                var entitylist = jsonData.entitylist;
                for (var i = 0 ; i < jsonData.entitylist.length; i++) {
                    if (entitylist[i].type == 'Z') {
                        for (var j = 0 ; j < entitylist[i].shapeList.length; j++) {
                            points3 = entitylist[i].shapeList[j].coords;
                            flag = entitylist[i].shapeList[j].flag;
                            flr = entitylist[i].shapeList[j].floor;//Math.floor(entitylistij].shapeList[j].coordid / 10);
                            fheight = entitylist[i].shapeList[j].height;
                            fname = entitylist[i].attrInfo.Name;

                            linecolor = Cesium.Color.BLACK;

                            var orangePolygon = viewer.entities.add({
                                name: '幢信息',
                                polygon: {
                                    hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                                    extrudedHeight: flag + fheight,//i+1
                                    height: flag,
                                    material: Cesium.Color["ORANGE"].withAlpha(0.8),
                                    outline: true,
                                    outlineColor: linecolor
                                }
                            });
                            orangePolygon.description = '<p>' + fname + '</p>';
                        }
                    }
                }
                value = "H";
                viewer.zoomTo(viewer.entities);
            });
            break;
        case 'H':
            viewer.entities.removeAll(); Cesium.loadJson('../Apps/out.json').then(function (jsonData) {
                //debugger;
                var entitylist = jsonData.entitylist;
                for (var i = 0 ; i < jsonData.entitylist.length; i++) {
                    if (entitylist[i].type == 'H') {
                        for (var j = 0 ; j < entitylist[i].shapeList.length; j++) {
                            points3 = entitylist[i].shapeList[j].coords;
                            flag = entitylist[i].shapeList[j].flag;
                            flr = entitylist[i].shapeList[j].floor;//Math.floor(entitylistij].shapeList[j].coordid / 10);
                            fheight = entitylist[i].shapeList[j].height;
                            fHuID = entitylist[i].attrInfo.ID;
                            ffunction = entitylist[i].attrInfo.Function;
                            fprofession = entitylist[i].attrInfo.Profession;
                            fmultimedia = entitylist[i].attrInfo.Multimedia;
                            fdescription = entitylist[i].attrInfo.Description;

                            linecolor = Cesium.Color.BLACK;
                            //按属性赋颜色
                            if(ffunction=="走廊") {
                                var orangePolygon = viewer.entities.add({
                                    name: '户信息',
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                                        extrudedHeight: flag + fheight,//i+1
                                        height: flag,
                                        material: Cesium.Color.AQUA.withAlpha(0.8),
                                        outline: true,
                                        outlineColor: linecolor
                                    }
                                });
                            }
                            else if(ffunction =="柱子"){
                                var orangePolygon = viewer.entities.add({
                                    name: '户信息',
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                                        extrudedHeight: flag + fheight,//i+1
                                        height: flag,
                                        material: Cesium.Color.SILVER.withAlpha(0.8),
                                        outline: true,
                                        outlineColor: linecolor
                                    }
                                });
                            }
                            else if(ffunction =="花坛"){
                                var orangePolygon = viewer.entities.add({
                                    name: '户信息',
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                                        extrudedHeight: flag + fheight,//i+1
                                        height: flag,
                                        material: Cesium.Color.GREEN.withAlpha(0.8),
                                        outline: true,
                                        outlineColor: linecolor
                                    }
                                });
                            }
                            else if(ffunction =="教学"){
                                var orangePolygon = viewer.entities.add({
                                    name: '户信息',
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                                        extrudedHeight: flag + fheight,//i+1
                                        height: flag,
                                        material: Cesium.Color.RED.withAlpha(0.8),
                                        outline: true,
                                        outlineColor: linecolor
                                    }
                                });
                            }
                            else if(ffunction =="实验室"){
                                var orangePolygon = viewer.entities.add({
                                    name: '户信息',
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                                        extrudedHeight: flag + fheight,//i+1
                                        height: flag,
                                        material: Cesium.Color.GOLD.withAlpha(0.8),
                                        outline: true,
                                        outlineColor: linecolor
                                    }
                                });
                            }
                            else if(ffunction =="办公室"){
                                var orangePolygon = viewer.entities.add({
                                    name: '户信息',
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                                        extrudedHeight: flag + fheight,//i+1
                                        height: flag,
                                        material: Cesium.Color.MAGENTA.withAlpha(0.8),
                                        outline: true,
                                        outlineColor: linecolor
                                    }
                                });
                            }
                            else if(ffunction =="楼梯"){
                                var orangePolygon = viewer.entities.add({
                                    name: '户信息',
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                                        extrudedHeight: flag + fheight,//i+1
                                        height: flag,
                                        material: Cesium.Color.AQUAMARINE.withAlpha(0.8),
                                        outline: true,
                                        outlineColor: linecolor
                                    }
                                });
                            }
                            else{
                                var orangePolygon = viewer.entities.add({
                                name: '户信息',
                                polygon: {
                                    hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                                    extrudedHeight: flag + fheight,//i+1
                                    height: flag,
                                    material: Cesium.Color.fromRandom().withAlpha(0.8),
                                    outline: true,
                                    outlineColor: linecolor
                                }
                            });
                            }
                            if (ffunction == "走廊") {
                                orangePolygon.description = '<p>走廊编号：' + fHuID + '&nbsp;&nbsp;&nbsp;功能：' + ffunction +'</p>';
                            }
                            else if(ffunction == "栏杆")
                            {
                                orangePolygon.description = '<p>栏杆编号：' + fHuID + '&nbsp;&nbsp;&nbsp;功能：' + ffunction +'</p>';
                            }
                            else if(ffunction == "台阶")
                            {
                                orangePolygon.description = '<p>台阶：' + fHuID + '&nbsp;&nbsp;&nbsp;功能：' + ffunction +'</p>';
                            }
                            else if(ffunction == "天台")
                            {
                                orangePolygon.description = '<p>栏杆编号：' + fHuID + '&nbsp;&nbsp;&nbsp;功能：' + ffunction +'</p>';
                            }
                            else if(ffunction == "楼梯")
                            {
                                orangePolygon.description = '<p>楼梯编号：' + fHuID + '&nbsp;&nbsp;&nbsp;功能：' + ffunction +'</p>';
                            }
                            else {
                                orangePolygon.description = '<p>房间号：' + fHuID + '&nbsp;&nbsp;&nbsp;功能：' + ffunction + '&nbsp;&nbsp;&nbsp;所属专业：' + fprofession + '&nbsp;&nbsp;&nbsp;' + fmultimedia + '&nbsp;&nbsp;&nbsp;' + fdescription + '</p>';
                            }
                        }
                    }
                }
                value = "Z";
                viewer.zoomTo(viewer.entities);
            });
            break;
        default:
            break;
    }
}

var points3 = "";

Cesium.loadJson('../Apps/out.json').then(function (jsonData) {
    //debugger;
    var entitylist = jsonData.entitylist;
    for (var i = 0 ; i < jsonData.entitylist.length; i++) {
        if (entitylist[i].type == 'Z') {
            for (var j = 0 ; j < entitylist[i].shapeList.length; j++) {
                points3 = entitylist[i].shapeList[j].coords;
                flag = entitylist[i].shapeList[j].flag;
                flr = entitylist[i].shapeList[j].floor;//Math.floor(entitylistij].shapeList[j].coordid / 10);
                fheight = entitylist[i].shapeList[j].height;
                fname = entitylist[i].attrInfo.Name;

                linecolor = Cesium.Color.BLACK;

                var orangePolygon = viewer.entities.add({
                    name: '幢信息',
                    polygon: {
                        hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                        extrudedHeight: flag + fheight,//i+1
                        height: flag,
                        material: Cesium.Color["ORANGE"].withAlpha(0.8),
                        outline: true,
                        outlineColor: linecolor
                    }
                });
                value = "H";
                orangePolygon.description = '<p>' + fname + '</p>';
            }
        }
    }

    viewer.zoomTo(viewer.entities);
});
