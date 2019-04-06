require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/TileLayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/LayerList",
    "esri/widgets/CoordinateConversion",
    "esri/widgets/Search",
    "esri/widgets/Locate"
], function(Map, SceneView, TileLayer, BasemapGallery, LayerList, CoordinateConversion, Search, Locate) {

    var orthoLayer = new TileLayer({
        url: "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
        opacity: 0.7
      });

    var map = new Map({
        basemap: "streets",
        layers: [orthoLayer],
        ground: "world-elevation" // info altitude z
    });

    var view3d = new SceneView({
        container: "viewDiv",       // Reference to the scene div created in step 5
        map: map,                 // Reference to the map object created before the scene
        scale: 50000000,          // Sets the initial scale to 1:50,000,000
        center: [2.294481, 48.858370]  // Sets the center point of view with lon/lat
    });

    // Widget de recherche
    var searchWidget = new Search({
    view: view3d
    });

    // Ajout du widget de recherche
    view3d.ui.add(searchWidget, {
    position: "top-right"
    });

    // Widget des fonds de carte
    var basemapGallery = new BasemapGallery({
    view: view3d
    });

    // Ajout du widget des fonds de carte à la vue 2D
    view3d.ui.add(basemapGallery, {
    position: "top-right"
    });

    // Widget des coordonnées
    var coordinateWidget= new CoordinateConversion({
        view: view3d
    });

    // Ajout du widget des coordonnées
    view3d.ui.add(coordinateWidget, {
        position : "bottom-left"
    });

    // Widget de géolocalisation
    var locateBtn = new Locate({
        view: view3d
      });
      
    //Ajout du widget de géolocalisation en haut à gauche
    view3d.ui.add(locateBtn, {
        position: "top-left"
    });

    // Widget de gestion des couches
    var layerList = new LayerList({
        view: view3d
    });

    // Ajout du widget de gestion des couches en haut à gauche
    view3d.ui.add(layerList, "top-left");

});