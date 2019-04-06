require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/TileLayer",
  "esri/widgets/BasemapGallery",
  "esri/widgets/LayerList",
  "esri/widgets/CoordinateConversion",
  "esri/widgets/Search",
  "esri/widgets/Locate",
  "esri/widgets/Print"
], function(Map, MapView, TileLayer, BasemapGallery, LayerList, CoordinateConversion, Search, Locate, Print) {

  var orthoLayer = new TileLayer({
    url: "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
    opacity: 0.7
  });

  var map = new Map({
    basemap: "streets",
    layers: [orthoLayer]
  });

  var view2d = new MapView({
    container: "viewDiv",   // Reference to the scene div created in step 5
    map: map,             // Reference to the map object created before the scene
    zoom: 7,              // Sets zoom level based on level of detail (LOD)
    center: [2.294481, 48.858370]      // Sets center point of view using longitude,latitude
  });

  // Widget de recherche
  var searchWidget = new Search({
    view: view2d
  });

  // Ajout du widget de recherche
  view2d.ui.add(searchWidget, {
    position: "top-right"
  });

  // Widget des fonds de carte
  var basemapGallery = new BasemapGallery({
    view: view2d
  });

  // Ajout du widget des fonds de carte à la vue 2D
  view2d.ui.add(basemapGallery, {
    position: "top-right"
  });

  // Widget des coordonnées
  var coordinateWidget= new CoordinateConversion({
    view: view2d
  });

  // Ajout du widget des coordonnées
  view2d.ui.add(coordinateWidget, {
    position : "bottom-left"
  });

  // Widget de géolocalisation
  var locateBtn = new Locate({
    view: view2d
  });
    
  // Ajout du widget de géolocalisation en haut à gauche
  view2d.ui.add(locateBtn, {
      position: "top-left"
  });

  // Widget de gestion des couches
  var layerList = new LayerList({
    view: view2d
  });

  // Ajout du widget de gestion des couches en haut à gauche
  view2d.ui.add(layerList, "top-left");

  // Widget d'impression
  var print = new Print({
    view: view2d,
    // Print Service
    printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
  });

  // Ajout du widget d'impression en haut à gauche
  view2d.ui.add(print, "top-left");

});