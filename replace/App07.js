//////////////////////////////////////////////////////////////////////////
// Creating the Viewer
//////////////////////////////////////////////////////////////////////////
var viewer = new Cesium.Viewer("cesiumContainer", {
    animation: false,
    timeline: false,
    vrButton: true,
  });
  
  var value;
  
  function fillColorFULL(housestateid) {
    // freezeObject(Color.fromCssColorString('#FAEBD7'));
    //debugger;
    var percent = 0.8;
    if (housestateid == "0") {
      return Cesium.Color.fromCssColorString("#019934").withAlpha(percent); //Cesium.ColorMaterialProperty(); //.withAlpha(percent);// "#FE0000";
    } else if (housestateid == "4") {
      return Cesium.Color.TRANSPARENT; //Cesium.Color.fromCssColorString('#FE0000');//.withAlpha(percent);// "#FE0000";
    } else if (housestateid == "1") {
      return Cesium.Color.fromCssColorString("#019934").withAlpha(percent); //.withAlpha(percent); //"#019934";
    } else if (housestateid == "2") {
      return Cesium.Color.fromCssColorString("#FF9934").withAlpha(percent); //.withAlpha(percent); //"#FF9934";
    } else if (housestateid == "3") {
      return Cesium.Color.fromCssColorString("#FFFF01").withAlpha(percent); //.withAlpha(percent); //"#FFFF01";
    } else if (housestateid == "5") {
      return Cesium.Color.fromCssColorString("#FFFFFF").withAlpha(percent); //.withAlpha(percent); //"#FFFFFF";
    } else if (housestateid == "7") {
      return Cesium.Color.fromCssColorString("#3377FF").withAlpha(percent); //.withAlpha(percent); //"#3377FF";
    } else if (housestateid == "8") {
      return Cesium.Color.fromCssColorString("#FC537C").withAlpha(percent); //.withAlpha(percent);//"#FC537C";
    } else {
      return Cesium.Color.fromCssColorString("#FFFFFF").withAlpha(percent); //.withAlpha(0.5); //"#FFFFFF";
    }
  }
  
  function levelSwitch() {
    switch (value) {
      case "Z":
        viewer.entities.removeAll();
        Cesium.loadJson("../Apps/out.json").then(function (jsonData) {
          var entitylist = jsonData.entitylist;
          for (var i = 0; i < jsonData.entitylist.length; i++) {
            if (entitylist[i].type == "Z") {
              for (var j = 0; j < entitylist[i].shapeList.length; j++) {
                points3 = entitylist[i].shapeList[j].coords;
                flag = entitylist[i].shapeList[j].flag;
                flr = entitylist[i].shapeList[j].floor; //Math.floor(entitylistij].shapeList[j].coordid / 10);
                fheight = entitylist[i].shapeList[j].height;
                fname = entitylist[i].attrInfo.Name;
  
                linecolor = Cesium.Color.BLACK;
  
                var orangePolygon = viewer.entities.add({
                  name: "幢信息",
                  polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                    extrudedHeight: flag + fheight, //i+1
                    height: flag,
                    material: Cesium.Color["ORANGE"].withAlpha(0.8),
                    outline: true,
                    outlineColor: linecolor,
                  },
                });
                orangePolygon.description = "<p>" + fname + "</p>";
              }
            }
          }
          value = "H";
          viewer.zoomTo(viewer.entities);
        });
        break;
      case "H":
        viewer.entities.removeAll();
        Cesium.loadJson("../Apps/out.json").then(function (jsonData) {
          //debugger;
          var entitylist = jsonData.entitylist;
          for (var i = 0; i < jsonData.entitylist.length; i++) {
            if (entitylist[i].type == "H") {
              for (var j = 0; j < entitylist[i].shapeList.length; j++) {
                points3 = entitylist[i].shapeList[j].coords;
                flag = entitylist[i].shapeList[j].flag;
                flr = entitylist[i].shapeList[j].floor; //Math.floor(entitylistij].shapeList[j].coordid / 10);
                fheight = entitylist[i].shapeList[j].height;
                fHuID = entitylist[i].attrInfo.ID;
                ffunction = entitylist[i].attrInfo.Function;
                fprofession = entitylist[i].attrInfo.Profession;
                fmultimedia = entitylist[i].attrInfo.Multimedia;
                fdescription = entitylist[i].attrInfo.Description;
  
                linecolor = Cesium.Color.BLACK;
                //按属性赋颜色
                if (ffunction == "走廊") {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.AQUA.withAlpha(0.8),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });
                } else if (ffunction == "柱子") {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.SILVER.withAlpha(0.8),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });
                } else if (ffunction == "花坛") {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.GREEN.withAlpha(0.8),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });
                } else if (ffunction == "实验室") {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.RED.withAlpha(0.8),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });
                } else if (ffunction == "教学"||"教室") {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.GOLD.withAlpha(0.8),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });
                } else if (ffunction == "办公室") {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.MAGENTA.withAlpha(0.8),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });
                } else if (ffunction == "楼梯") {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.AQUAMARINE.withAlpha(0.8),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });
                } else if (ffunction == "停车场") {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.SLATEGRAY.withAlpha(0.8),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });}
                  else if(ffunction =="台阶"){
                    var orangePolygon = viewer.entities.add({
                        name: '户信息',
                        polygon: {
                            hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                            extrudedHeight: flag + fheight,//i+1
                            height: flag,
                            material: Cesium.Color.YELLOW.withAlpha(0.8),
                            outline: true,
                            outlineColor: linecolor
                        }
                    });
                }
                else if(ffunction =="厕所"){
                    var orangePolygon = viewer.entities.add({
                        name: '户信息',
                        polygon: {
                            hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                            extrudedHeight: flag + fheight,//i+1
                            height: flag,
                            material: Cesium.Color.ROSYBROWN.withAlpha(0.8),
                            outline: true,
                            outlineColor: linecolor
                        }
                    });
                }
                else if(ffunction =="校徽"){
                    var orangePolygon = viewer.entities.add({
                        name: '户信息',
                        polygon: {
                            hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                            extrudedHeight: flag + fheight,//i+1
                            height: flag,
                            material: Cesium.Color.BLUE.withAlpha(0.8),
                            outline: true,
                            outlineColor: linecolor
                        }
                    });
                }
                 else {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.fromRandom().withAlpha(0.8),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });
                }
                if (ffunction == "走廊" || "栏杆" || "花坛" || "台阶" || "楼梯") {
                  orangePolygon.description =
                    "<p>编号：" +
                    fHuID +
                    "&nbsp;&nbsp;&nbsp;功能：" +
                    ffunction +
                    "</p>";
                } else {
                  orangePolygon.description =
                    "<p>房间号：" +
                    fHuID +
                    "&nbsp;&nbsp;&nbsp;功能：" +
                    ffunction +
                    "&nbsp;&nbsp;&nbsp;所属专业：" +
                    fprofession +
                    "&nbsp;&nbsp;&nbsp;" +
                    fmultimedia +
                    "&nbsp;&nbsp;&nbsp;" +
                    fdescription +
                    "</p>";
                }
              }
            }
          }
          value = "O";
          viewer.zoomTo(viewer.entities);
        });
        break;
      case "O":
        viewer.entities.removeAll();
        Cesium.loadJson("../Apps/out.json").then(function (jsonData) {
          //debugger;
          var entitylist = jsonData.entitylist;
          for (var i = 0; i < jsonData.entitylist.length; i++) {
            if (entitylist[i].type == "H") {
              for (var j = 0; j < entitylist[i].shapeList.length; j++) {
                points3 = entitylist[i].shapeList[j].coords;
                flag = entitylist[i].shapeList[j].flag;
                flr = entitylist[i].shapeList[j].floor; //Math.floor(entitylistij].shapeList[j].coordid / 10);
                fheight = entitylist[i].shapeList[j].height;
                fHuID = entitylist[i].attrInfo.ID;
                ffunction = entitylist[i].attrInfo.Function;
                fprofession = entitylist[i].attrInfo.Profession;
                fmultimedia = entitylist[i].attrInfo.Multimedia;
                fdescription = entitylist[i].attrInfo.Description;
  
                linecolor = Cesium.Color.WHITE;
                //按属性赋颜色
                if (ffunction) {
                  var orangePolygon = viewer.entities.add({
                    name: "户信息",
                    polygon: {
                      hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
                      extrudedHeight: flag + fheight, //i+1
                      height: flag,
                      material: Cesium.Color.WHITE.withAlpha(0),
                      outline: true,
                      outlineColor: linecolor,
                    },
                    ID: fHuID,
                    function: ffunction,
                  });
                }
  
                if (ffunction == "走廊" || "栏杆" || "花坛" || "台阶" || "楼梯") {
                  orangePolygon.description =
                    "<p>编号：" +
                    fHuID +
                    "&nbsp;&nbsp;&nbsp;功能：" +
                    ffunction +
                    "</p>";
                } else {
                  orangePolygon.description =
                    "<p>房间号：" +
                    fHuID +
                    "&nbsp;&nbsp;&nbsp;功能：" +
                    ffunction +
                    "&nbsp;&nbsp;&nbsp;所属专业：" +
                    fprofession +
                    "&nbsp;&nbsp;&nbsp;" +
                    fmultimedia +
                    "&nbsp;&nbsp;&nbsp;" +
                    fdescription +
                    "</p>";
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
  
  Cesium.loadJson("../Apps/out.json").then(function (jsonData) {
    //debugger;
    var entitylist = jsonData.entitylist;
    for (var i = 0; i < jsonData.entitylist.length; i++) {
      if (entitylist[i].type == "Z") {
        for (var j = 0; j < entitylist[i].shapeList.length; j++) {
          points3 = entitylist[i].shapeList[j].coords;
          flag = entitylist[i].shapeList[j].flag;
          flr = entitylist[i].shapeList[j].floor; //Math.floor(entitylistij].shapeList[j].coordid / 10);
          fheight = entitylist[i].shapeList[j].height;
          fname = entitylist[i].attrInfo.Name;
  
          linecolor = Cesium.Color.BLACK;
  
          var orangePolygon = viewer.entities.add({
            name: "幢信息",
            polygon: {
              hierarchy: Cesium.Cartesian3.fromDegreesArray(points3),
              extrudedHeight: flag + fheight, //i+1
              height: flag,
              material: Cesium.Color["ORANGE"].withAlpha(0.8),
              outline: true,
              outlineColor: linecolor,
            },
          });
          value = "H";
          orangePolygon.description = "<p>" + fname + "</p>";
        }
      }
    }
  
    viewer.zoomTo(viewer.entities);
  });
  
  viewer.scene.skyBox = new Cesium.SkyBox({
    sources: {
      positiveX: "../Source/Assets/starfield/Right_Tex.jpg",
      negativeX: "../Source/Assets/starfield/Left_Tex.jpg",
      positiveY: "../Source/Assets/starfield/Down_Tex.jpg",
      negativeY: "../Source/Assets/starfield/Up_Tex.jpg",
      positiveZ: "../Source/Assets/starfield/Front_Tex.jpg",
      negativeZ: "../Source/Assets/starfield/Back_Tex.jpg",
    },
  });
  
  var lastEle;
  var lastMaterial;
  var lastEles = [];
  var lastMats;
  function searchTarget() {
    if (lastEle) {
      lastEle.polygon.material = lastMaterial;
    }
    if (lastEles) {
      for (var i = 0; i < lastEles.length; i++) {
        lastEles[i].polygon.material = lastMats;
      }
      lastEles = [];
    }
    var ele = document.getElementById("input");
    var entities = viewer.entities.values;
    var target;
    var flag = 1;
    for (var i = 0; i < entities.length; i++) {
      if (entities[i].ID == ele.value) {
        target = entities[i];
        flag = 0;
        break;
      }
    }
    if (flag) {
      alert("请输入正确的房间号！");
      return;
    }
    lastEle = target;
    lastMaterial = target.polygon.material;
    target.polygon.material = Cesium.Color["YELLOW"];
    viewer.zoomTo(target);
  }
  
  function searchByFunction() {
    if (lastEles) {
      for (var i = 0; i < lastEles.length; i++) {
        lastEles[i].polygon.material = lastMats;
      }
      lastEles = [];
    }
    if (lastEle) {
      lastEle.polygon.material = lastMaterial;
    }
    var ele = document.getElementById("select");
    var entities = viewer.entities.values;
    var index = ele.selectedIndex;
    var value = ele.options[index].value;
    var eles = [];
    for (var i = 0; i < entities.length; i++) {
      if (entities[i].function == value) {
        eles.push(entities[i]);
        lastMats = entities[i].polygon.material;
        entities[i].polygon.material = Cesium.Color["YELLOW"];
      }
    }
    lastEles = eles;
  }
  
//拖动面板
window.onload = function(){
  var addDataPanel = document.getElementById("aaa");
  // alert(addDataPanel);
  // 判断鼠标位置是否在边框区
  function isMouseOnBuffer(mouseX, mouseY, bufferX, bufferY, x1, y1, x2, y2) {
    if ((Math.abs(mouseX - x1) < bufferX || Math.abs(mouseX - x2) < bufferX) || (Math.abs(mouseY - y1) < bufferY || Math.abs(mouseY - y2) < bufferY)) {
      return true;
    } else {
      return false;
    }
  }
  // 判断鼠标位置是否在边框区
  function isMouseOnBuffer(mouseX, mouseY, bufferX, bufferY, x1, y1, x2, y2) {
    if ((Math.abs(mouseX - x1) < bufferX || Math.abs(mouseX - x2) < bufferX) || (Math.abs(mouseY - y1) < bufferY || Math.abs(mouseY - y2) < bufferY)) {
      return true;
    } else {
      return false;
    }
  }

// 鼠标在被拖拽元素上按下时开始准备拖拽
  addDataPanel.onmousedown = function (e) {
    let ex1 = e.clientX, ey1 = e.clientY; // 鼠标的水平和垂直坐标
    let boxLeft = addDataPanel.offsetLeft, boxTop = addDataPanel.offsetTop;
  
    let boxRight = boxLeft + addDataPanel.offsetWidth, boxBottom = boxTop + addDataPanel.offsetHeight;
    let bufferX = 20, bufferY = 30; // addDataPanel面板边框的水平和垂直容差
    // 若鼠标不在边框附近，不触发拖拽
    if (!isMouseOnBuffer(ex1, ey1, bufferX, bufferY, boxLeft, boxTop, boxRight, boxBottom)) {
      return;
    }

    // 每次移动鼠标，根据鼠标的位置重新设置被拖拽元素的位置
    document.onmousemove = function (e) {
      addDataPanel.style.left = boxLeft + e.clientX - ex1 + 'px';
      addDataPanel.style.top = boxTop + e.clientY - ey1 + 'px';
    }
    // 鼠标松开时，停止拖拽
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
}

  