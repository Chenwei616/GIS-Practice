import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    value: "Z",
  }),

  getters: {},

  actions: {
    loadOut(viewer) {
      $.ajax({
        url: "out.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
          console.log(data);

          var orangePolygon;

          var entitylist = data.entitylist;
          for (var i = 0; i < data.entitylist.length; i++) {
            if (entitylist[i].type == "Z") {
              for (var j = 0; j < entitylist[i].shapeList.length; j++) {
                var points3 = entitylist[i].shapeList[j].coords;
                var flag = entitylist[i].shapeList[j].flag;
                var flr = entitylist[i].shapeList[j].floor; //Math.floor(entitylistij].shapeList[j].coordid / 10);
                var fheight = entitylist[i].shapeList[j].height;
                var fname = entitylist[i].attrInfo.Name;

                var linecolor = Cesium.Color.BLACK;

                orangePolygon = viewer.entities.add({
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

          viewer.zoomTo(viewer.entities);
          console.log(viewer.entities);
        },
      });
      this.value = "H";
    },

    levelSwitch(viewer) {
      switch (this.value) {
        case "Z":
          viewer.entities.removeAll();

          $.ajax({
            url: "out.json",
            type: "GET",
            dataType: "json",
            success: function (jsonData) {
              var entitylist = jsonData.entitylist;
              for (var i = 0; i < jsonData.entitylist.length; i++) {
                if (entitylist[i].type == "Z") {
                  for (var j = 0; j < entitylist[i].shapeList.length; j++) {
                    var points3 = entitylist[i].shapeList[j].coords;
                    var flag = entitylist[i].shapeList[j].flag;
                    var flr = entitylist[i].shapeList[j].floor; //Math.floor(entitylistij].shapeList[j].coordid / 10);
                    var fheight = entitylist[i].shapeList[j].height;
                    var fname = entitylist[i].attrInfo.Name;

                    var linecolor = Cesium.Color.BLACK;

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
              viewer.zoomTo(viewer.entities);
            },
          });
          this.value = "H";
          break;
        case "H":
          viewer.entities.removeAll();

          $.ajax({
            url: "out.json",
            type: "GET",
            dataType: "json",
            success: function (jsonData) {
              var entitylist = jsonData.entitylist;
              for (var i = 0; i < jsonData.entitylist.length; i++) {
                if (entitylist[i].type == "H") {
                  for (var j = 0; j < entitylist[i].shapeList.length; j++) {
                    var points3 = entitylist[i].shapeList[j].coords;
                    var flag = entitylist[i].shapeList[j].flag;
                    var flr = entitylist[i].shapeList[j].floor; //Math.floor(entitylistij].shapeList[j].coordid / 10);
                    var fheight = entitylist[i].shapeList[j].height;
                    var fHuID = entitylist[i].attrInfo.ID;
                    var ffunction = entitylist[i].attrInfo.Function;
                    var fprofession = entitylist[i].attrInfo.Profession;
                    var fmultimedia = entitylist[i].attrInfo.Multimedia;
                    var fdescription = entitylist[i].attrInfo.Description;

                    var linecolor = Cesium.Color.BLACK;
                    //按属性赋颜色
                    if (ffunction == "走廊") {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.AQUA.withAlpha(0.8),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    } else if (ffunction == "柱子") {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.SILVER.withAlpha(0.8),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    } else if (ffunction == "花坛") {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.GREEN.withAlpha(0.8),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    } else if (ffunction == "教学") {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.RED.withAlpha(0.8),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    } else if (ffunction == "实验室") {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.GOLD.withAlpha(0.8),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    } else if (ffunction == "办公室") {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.MAGENTA.withAlpha(0.8),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    } else if (ffunction == "楼梯") {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.AQUAMARINE.withAlpha(0.8),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    } else if (ffunction == "校徽") {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.BLUE.withAlpha(0.8),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    } else {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.fromRandom().withAlpha(0.8),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    }
                    if (ffunction == "走廊") {
                      orangePolygon.description =
                        "<p>走廊编号：" +
                        fHuID +
                        "&nbsp;&nbsp;&nbsp;功能：" +
                        ffunction +
                        "</p>";
                    } else if (ffunction == "栏杆") {
                      orangePolygon.description =
                        "<p>栏杆编号：" +
                        fHuID +
                        "&nbsp;&nbsp;&nbsp;功能：" +
                        ffunction +
                        "</p>";
                    } else if (ffunction == "台阶") {
                      orangePolygon.description =
                        "<p>台阶：" +
                        fHuID +
                        "&nbsp;&nbsp;&nbsp;功能：" +
                        ffunction +
                        "</p>";
                    } else if (ffunction == "天台") {
                      orangePolygon.description =
                        "<p>栏杆编号：" +
                        fHuID +
                        "&nbsp;&nbsp;&nbsp;功能：" +
                        ffunction +
                        "</p>";
                    } else if (ffunction == "楼梯") {
                      orangePolygon.description =
                        "<p>楼梯编号：" +
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
              viewer.zoomTo(viewer.entities);
            },
          });
          this.value = "O";
          break;
        case "O":
          viewer.entities.removeAll();
          $.ajax({
            url: "out.json",
            type: "GET",
            dataType: "json",
            success: function (jsonData) {
              //debugger;
              var entitylist = jsonData.entitylist;
              for (var i = 0; i < jsonData.entitylist.length; i++) {
                if (entitylist[i].type == "H") {
                  for (var j = 0; j < entitylist[i].shapeList.length; j++) {
                    var points3 = entitylist[i].shapeList[j].coords;
                    var flag = entitylist[i].shapeList[j].flag;
                    var flr = entitylist[i].shapeList[j].floor; //Math.floor(entitylistij].shapeList[j].coordid / 10);
                    var fheight = entitylist[i].shapeList[j].height;
                    var fHuID = entitylist[i].attrInfo.ID;
                    var ffunction = entitylist[i].attrInfo.Function;
                    var fprofession = entitylist[i].attrInfo.Profession;
                    var fmultimedia = entitylist[i].attrInfo.Multimedia;
                    var fdescription = entitylist[i].attrInfo.Description;

                    var linecolor = Cesium.Color.WHITE;
                    //按属性赋颜色
                    if (ffunction) {
                      var orangePolygon = viewer.entities.add({
                        name: "户信息",
                        polygon: {
                          hierarchy:
                            Cesium.Cartesian3.fromDegreesArray(points3),
                          extrudedHeight: flag + fheight, //i+1
                          height: flag,
                          material: Cesium.Color.WHITE.withAlpha(0),
                          outline: true,
                          outlineColor: linecolor,
                        },
                      });
                    }

                    if (
                      ffunction == "走廊" ||
                      "栏杆" ||
                      "花坛" ||
                      "台阶" ||
                      "楼梯"
                    ) {
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
              viewer.zoomTo(viewer.entities);
            },
          });
          this.value = "Z";
          break;
        default:
          break;
      }
    },
  },
});
