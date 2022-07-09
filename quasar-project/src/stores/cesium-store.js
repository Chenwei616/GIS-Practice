import { defineStore } from "pinia";
import axios from "axios";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWE0NDhmMy02N2E3LTQwMDQtYWQ3ZS0yZTAyYWUwZWE3MGUiLCJpZCI6ODY0NDEsImlhdCI6MTY0NzgzMjY4OH0.C3wVahxIwdd_u2qG39R5Aoh9_BMjyMdOxVab63jB7P8";

export const useCesiumStore = defineStore("cesium", {
  state: () => ({
    viewer: null,
    layer: null,
    coordinates: [],
    line: [],
    drawmodel: false,
    center: [],
    flag: 1,
    dataSources: {
      Tsunami: {},
      Earthquake: {},
      Landslide: {},
      Typhoon: {},
      VolcanicEruptions: {},
      Flood: {},
    },
    polygonCoords: null,
    infoBoxStyle: "display:none",
    infoBoxFlag: true,
  }),

  getters: {},

  actions: {
    init(container) {
      this.viewer = new Cesium.Viewer(container, {
        imageryProvider: false,
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        timeline: false,
        navigationHelpButton: false,
      });
      this.viewer._cesiumWidget._creditContainer.style.display = "none";
      this.viewer.extend(Cesium.viewerDragDropMixin);
      this.viewer.useBrowserRecommendedResolution = true;
      this.viewer.scene.skyBox = new Cesium.SkyBox({
        sources: {
          positiveX: "starfield/Right_Tex.jpg",
          negativeX: "starfield/Left_Tex.jpg",
          positiveY: "starfield/Down_Tex.jpg",
          negativeY: "starfield/Up_Tex.jpg",
          positiveZ: "starfield/Front_Tex.jpg",
          negativeZ: "starfield/Back_Tex.jpg",
        },
      });
      this.viewer.scene.postRender.addEventListener(() => {
        var result = this.viewer.camera.pickEllipsoid(
          new Cesium.Cartesian2(
            this.viewer.canvas.clientWidth / 2,
            this.viewer.canvas.clientHeight / 2
          )
        );
        var curPosition =
          Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
        var lon = (curPosition.longitude * 180) / Math.PI;
        var lat = (curPosition.latitude * 180) / Math.PI;
        this.center[0] = lon;
        this.center[1] = lat;
        return this.center;
      });

      var terrainProvider = new Cesium.CesiumTerrainProvider({
        url: Cesium.IonResource.fromAssetId(1),
        requestWaterMask: true,
      });

      // this.viewer.terrainProvider = terrainProvider;

      this.viewer.imageryLayers.addImageryProvider(
        new Cesium.ArcGisMapServerImageryProvider({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
        })
      );

      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          120.08355332298279,
          30.299163390633953,
          300
        ),
        orientation: {
          heading: Cesium.Math.toRadians(15.0),
          pitch: Cesium.Math.toRadians(-45.0),
          roll: 0.0,
        },
      });

      var handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );

      // this.loadOut(this.viewer);
    },

    goBackToInitialPoint() {
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(120, 30, 25000000),
      });
    },

    loadGeojson(geojson) {
      var promise = Cesium.GeoJsonDataSource.load(geojson, {
        stroke: Cesium.Color.WHITE.withAlpha(0.7),
        fill: Cesium.Color.WHITE.withAlpha(0.3),
        strokeWidth: 10,
      });

      return promise;
    },

    addGeoJson(geojson) {
      var promise = Cesium.GeoJsonDataSource.load(geojson, {
        stroke: Cesium.Color.WHITE.withAlpha(0.7),
        fill: Cesium.Color.WHITE.withAlpha(0.3),
        strokeWidth: 10,
      });
      promise.then((dataSource) => {
        const dataSourcePromise = this.viewer.dataSources.add(dataSource);
        return dataSourcePromise;
      });
      return promise;
    },

    flyToCoords(coordinates) {
      let flyDistination = new Cesium.Cartesian3.fromDegrees(
        coordinates[0],
        coordinates[1],
        10000.0
      );
      this.viewer.camera.flyTo({
        destination: flyDistination,
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
          roll: 0.0,
        },
        duration: 3,
      });
    },

    changeCenter(coordinates) {
      let flyDistination = new Cesium.Cartesian3.fromDegrees(
        coordinates[0],
        coordinates[1],
        12500000.0
      );
      this.viewer.camera.flyTo({
        destination: flyDistination,
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-90.0),
          roll: 0.0,
        },
        duration: 1,
      });
    },

    removeAll() {
      this.viewer.dataSources.removeAll();
      this.viewer.entities.removeAll();
    },

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
                var value = "H";
                orangePolygon.description = "<p>" + fname + "</p>";
              }
            }
          }

          viewer.zoomTo(viewer.entities);
          console.log(viewer.entities);
        },
      });
    },
  },
});
