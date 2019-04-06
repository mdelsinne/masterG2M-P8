/**
 * 15/03/2019 - G2M P8
 * JavaScript 
 */
 
// Raster OpenStreetMap
var osm = new ol.layer.Tile({
  source: new ol.source.OSM()
});

// Control position X/Y
var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position')
});

// Map OpenLayers
const map = new ol.Map({
  target: 'map', // nom de la <div> HTML
  controls: ol.control.defaults().extend([
    new ol.control.OverviewMap({className: "ol-overviewmap"}), // Mini-map
    new ol.control.FullScreen(), // Plein-ecran
    new ol.control.ScaleLine(), // Echelle
    mousePositionControl // X,Y
  ]),
  interactions: ol.interaction.defaults().extend([
    new ol.interaction.DragRotateAndZoom()
  ]),
  layers: [osm], // Couches de la carte
  view: new ol.View({ // Vue initiale
    center: ol.proj.fromLonLat([2.294481, 48.858370]), // Paris WGS84
    zoom: 6
  })
});

var drawEnable = false;
// Mon évènement click sur la carte
map.on('click', function(event){
    // Récupérer l'entité ol.Feature
    var feature = map.forEachFeatureAtPixel(event.pixel,
      function(feature, layer) {
        if (layer != drawLayer) {
          return feature;
        } else {
          return null
        }
    });
    if (feature && !drawEnable) { // Si une entité retournée et outil de dessin inactif
      var coordinates = feature.getGeometry().getCoordinates();
      popup.setPosition(coordinates); // Position de la popup
      //Contenu de la popup
      document.getElementById('popup-content').innerHTML = "<p style='margin:0'>"+feature.get('description').replace(/\n/g,'<br>')+"</p>";
      // Ajout des coordonnées EPSG:3857 dans la popup
      let x = coordinates[0].toFixed(2);
      let y = coordinates[1].toFixed(2);
      document.getElementById('popup-content').innerHTML += "<br><p style='margin:0'><b>x : "+x.toString()+", y : "+y.toString()+"</b></p>";
    } else {
      if (document.getElementById('popup') != null) { // popup ouverte
        closePopup();
      }
    }
});

// Control zoom slider
var zoomslider = new ol.control.ZoomSlider();
map.addControl(zoomslider);

// Control zoom étendue initiale
var zoomToExtent = new ol.control.ZoomToExtent({
  extent: [134987.79195151184,6175929.419557666,428505.98056670104,6319172.410564141]
});
map.addControl(zoomToExtent);

/**
 * IGN : Service WMTS
 * Retourne des images précalculées (tuiles) suivant une grille prédéfinies 
 */
var resolutions = [];
var matrixIds = [];
var proj3857 = ol.proj.get('EPSG:3857');
var maxResolution = ol.extent.getWidth(proj3857.getExtent()) / 256;

for (var i = 0; i < 18; i++) {
  matrixIds[i] = i.toString();
  resolutions[i] = maxResolution / Math.pow(2, i);
}

var raster_ign = new ol.layer.Tile({
  source: new ol.source.WMTS({
    url: 'https://wxs.ign.fr/pratique/geoportail/wmts',
    layer: 'GEOGRAPHICALGRIDSYSTEMS.MAPS',
    matrixSet: 'PM',
    format: 'image/jpeg',
    projection: 'EPSG:3857',
    tileGrid: new ol.tilegrid.WMTS({
      origin: [-20037508, 20037508],
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'normal',
    attributions: '<a href="http://www.geoportail.fr/" target="_blank">' +
          '<img src="https://api.ign.fr/geoportail/api/js/latest/' +
          'theme/geoportal/img/logo_gp.gif"></a>'
  }),
  visible : false
});

map.addLayer(raster_ign); // ajout de la couche « WMTS » à la carte

/**
 * ESRI : Service REST
 * Raster tuilé publié en tant que service ArcGIS
 */
var ortho_esri =  new ol.layer.Tile({
  extent: [134987.79195151184,6175929.419557666,428505.98056670104,6319172.410564141],
  source: new ol.source.TileArcGISRest({
    url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
  }),
  opacity: 0.7
})

map.addLayer(ortho_esri); // ajout de la couche « Tiled ArcGIS MapServer » à la carte

/**
 * Visibilité des couches
 * @param checkbox 
 */
function setVisibility(checkbox) {  

  map.getLayers().forEach(function(layer) {
    switch (checkbox.id) {
      case 'cbOSM':
      if (layer == osm) 
        layer.setVisible(checkbox.checked);
      break;
      case 'cbWMTS':
        if (layer == raster_ign) 
          layer.setVisible(checkbox.checked);
      break;
      case 'cbTileArcGISRest':
        if (layer == ortho_esri)
          layer.setVisible(checkbox.checked);
      break;
      case 'cbVector':
      if (layer == vectorLayer)
        layer.setVisible(checkbox.checked);
      break;
    }
  });
}

/**
 * Widget dessin
 */
var typeSelect = document.getElementById('type');

// Couche dessin
var source = new ol.source.Vector({wrapX: false});
var drawLayer = new ol.layer.Vector({
  source: source
});
map.addLayer(drawLayer);

var draw;
function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
    drawEnable = true;
    draw = new ol.interaction.Draw({
      source: source,
      type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
    });
    map.addInteraction(draw);
  } else {
    drawEnable = false;
  }
}

/**
 * Handle change event.
 */
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();

/**
 * 18/03/2019
 * LES BASES DU JAVASCRIPT
 */

// ES6 (2015) : let pour déclarer une variable (var fonctionne toujours)
let maVariable = "Hello World";
console.log(maVariable); // String

maVariable = true; // Affectation d’une nouvelle valeur 'true' de type booléen
console.log(maVariable); // Boolean

maVariable = 0; // Affectation d’un Entier
while (maVariable <= 5) { // Boucle while, avec opérateur
  console.log(maVariable); // Integer
  maVariable++; // Incrémentation
}

// Création d'un objet JS -- C'est comme un .json !
maVariable = {
  nom : "toto", // propriété 'nom', valeur '"toto"' : string
  age : 40, // propriété 'age', valeur '40' : integer
  locataire : true // propriété 'locataire', valeur 'true' : bool
}
console.log(maVariable); // Object

// Affectation d'une nouvelle propriété à l'objet
maVariable.profession = "Apiculteur";
console.log(maVariable); // mon objet + ma propriété

maVariable.adresse = { // Affectation d’un objet comme propriété de ma variable
  street: "2, Rue Voltaire", // propriété 'street' : string
  city: "44000 Nantes", // propriété 'city' : string
  coordinate : { // propriété 'coordinate' : objet
    x: -1.5628,
    y: 47.2130
  }
}
console.log(maVariable);

/**
 * Déclaration d'une fonction nommée maFonction
 */
function maFonction() {
  // Instructions de la fonction
  console.log("Instructions à exécuter");
}
maFonction(); // Appel de ma fonction

for (let i=0;i<=5;i++) { // Boucle for
  maFonction(); // Appel de ma fonction
}

/**
 * Déclaration d'une autre fonction avec paramètres
 * @param {description param1} param1 
 * @param {description param2} param2 
 * @param {description param3} param3
 */
function maFonctionAvecParams(param1, param2, param3) {
  // Instructions pouvant utiliser param1, param2, ...
  return "Nom : "+param1+"\nAge : "+param2+"\nProfession : "+param3; // valeur String retournée 
};
console.log(maFonctionAvecParams(maVariable.nom, maVariable.age,  maVariable.profession)); // appel de ma fonction avec params qui retourne un string

// Affectation d'une fonction à l'objet --appelé aussi Method !
maVariable.getDescription = function(){
  // this indique qu’il s’agit de la propriété appartenant à l’objet stocké dans maVariable
  return "Nom : "+this.nom+"\nAge : "+this.age+"\nProfession : "+this.profession; // valeur String retournée 
};
console.log(maVariable);
console.log(maVariable.getDescription());

// Afficher la description dans <p> dont l'identifiant est 'description' 
document.getElementById("description").textContent = maVariable.getDescription();

// Reinit de ma variable --null
maVariable = null;
console.log(maVariable); // null

// Ma classe JS nommée Person
class Person {

  // 4 propriétés de l'objet initialisées par le constructeur
  constructor(nom, age, locataire, profession, adresse) {
    this.nom = nom; 
    this.age = age;
    this.locataire = locataire;
    this.profession = profession;
    this.adresse = adresse;
  }

  // Fonction disponible pour un objet Person
  getDescription() {
    return "Nom : "+this.nom+"\nAge : "+this.age+"\nProfession : "+this.profession;
  }

  // Autre fonction disponible pour un objet Person -- avec 3 paramètres en entrée
  setAdresse(paramStreet, paramCity, paramCoord) {
    // La fonction ajoute la propriété 'adresse' à l'objet instancié depuis la classe Person
    this.adresse = { // les valeurs de l'objet sont initialisés depuis les paramètres en entrée
      street: paramStreet,
      city: paramCity,
      coordinate : ol.proj.fromLonLat([paramCoord.x,paramCoord.y]) // La method fromLonLat attend un objet ol.coordinate(Array.<number>) en paramètre obligatoire 
    }
  }

};

// Instanciation d'un nouvel objet Person
maVariable = new Person("toto", 40, true, "Apiculteur");
console.log(maVariable);
// var autreVariable = new Person(NOM_string, AGE_integer, LOCATAIRE_boolean, PROFESSION_string)
// console.log(autreVariable);

// Utiliser la fonction setAdresse pour initialiser la propriété 'adresse'
// de mon objet instance de Person stocké dans maVariable
maVariable.setAdresse(
  "2, Rue Voltaire",
  "44000 Nantes", 
  {x: -1.5628,y: 47.2130}
);
console.log(maVariable);

// Déclaration d'un tableaux [...]
var monTableau = [
  // 1 er élément
  new Person("Pierre", 38, false, "Artisan",{
	  street:"7, rue Victor Hugo", city:"93100 Montreuil", coordinate:{x:2.439568,y:48.859413}
  }), // virgule comme séparateur
  // 2nd élément
  new Person("Paul", 31, true, "Médecin",{
	  street:"169, rue de Bellevue", city:"92700 Colombes", coordinate:{x:2.236667,y:48.919502} 
  }) // pas de virgule car dernier
]

console.log(monTableau);
console.log(monTableau.length); // nombre d'élément

// Ajouter un élément : push
monTableau.push(new Person("Jack", 54, true, "Technicien",
  { // propriété adresse de mon objet
    street:"37, avenue Carnot", 
    city:"94230 Cachan", 
    coordinate:{
      x:2.327411,
      y:48.798287
    }
  }
));

console.log(monTableau);
console.log(monTableau.length);

// Accèder à un élément
console.log(monTableau[1].getDescription());
monTableau[1].nom = "Paule"; // modifier une valeur
console.log(monTableau[1].getDescription());

/** myArray.shift(); // Retire le premier élément */
/** myArray.pop(); // Retire le dernier élément */

// Parcourir le tableau, boucle for
for (var i=0;i<monTableau.length;i++) {
  console.log( "indice : "+i.toString()+" nom : "+monTableau[i].nom);
}

// Parcourir les éléments du tableau
for (var i=0;i<monTableau.length;i++) {
  if (monTableau[i].locataire == true && monTableau[i].age < 40) {
    console.log("locataire de moins de 40 ans : \n" + monTableau[i].getDescription());
  } else if (monTableau[i].locataire == true) {
    console.log("locataire de plus de 40 ans : \n" + monTableau[i].getDescription());
  } else {
    console.log("propriétaire : \n" + monTableau[i].getDescription());
  }
}

/**
 * Exercice pratique - OpenLayers : Ajouter un point
 */

 // Création de mon entité, c'est un objet de type ol.Feature initialisé avec une geom et une description
var feature = new ol.Feature({ 
  geometry: new ol.geom.Point(maVariable.adresse.coordinate),
  description : maVariable.getDescription(),
  adresse : maVariable.adresse
});

/**
 * Création d'un style 'Icon'
 * @type {module:ol/style/Icon~Options}
 */
var iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: 'data/icon.png' // mon icône
  })
});
feature.setStyle(iconStyle); // Affectation du style à l’entité point

// Création d'une couche vecteur
var vectorLayer = new ol.layer.Vector({ 
  source: new ol.source.Vector({ // Source de ma couche vecteur
    features: [feature] // tableau d'entités 
  })
});
map.addLayer(vectorLayer); // Ajouter la couche vecteur à la carte -- method 'addLayer()'
map.getView().setCenter(maVariable.adresse.coordinate); // Centrer
map.getView().setZoom(9); // Zoom

// Ajouter des entités à la couche vecteurs
monTableau.forEach(function(element) { // <Array>.forEach (ES6) : parcours du tableau

  // Créer une nouvelle entité pour chaque élément du tableau
  var feature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat(
      [element.adresse.coordinate.x,element.adresse.coordinate.y]
    )),
    description : element.getDescription(),
    adresse : element.adresse
  })

  // Appliquer le style
  feature.setStyle(iconStyle);

  // Ajouter l'entité à la source de la couche
  vectorLayer.getSource().addFeature(feature);

})

/**
 * Création d'un objet ol.Overlay pour ancrer la popup sur la carte.
 */
var popup = new ol.Overlay({
  element: document.getElementById('popup') // <div>
});
map.addOverlay(popup);

 // Fermer la popup
 function closePopup() {  
  popup.setPosition(undefined); // masquer la popup
}



