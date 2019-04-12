## Examen JavaScript du 12 avril 2019

[OpenLayers](https://openlayers.org/)

1. Télécharger **examenJS_20190412.zip**, dézipper l'archive puis ouvrir le dossier 'OpenLayers' dans Visual Studio Code

2. Modifier 'index.html' *ligne 28* en indiquant votre nom et prénom : **NOM Prénom**

3. Ajouter les contrôles ([ol.control](https://geoadmin.github.io/ol3/apidoc/ol.control.html)) suivants à la carte :<br>
  - [ol.control.ZoomSlider](https://geoadmin.github.io/ol3/apidoc/ol.control.ZoomSlider.html)
  - [ol.control.ZoomToExtent](https://geoadmin.github.io/ol3/apidoc/ol.control.ZoomToExtent.html) ([exemple](http://tsauerwein.github.io/ol3/mapbox-gl-js/examples/navigation-controls.html?q=extent)) et spécifier une etendue <br>
    ! Attention ! la carte est en __WGS84 Web Mercator (EPSG:3857)__
    
4. Ajouter les rasters [__World_Topo_Map__](https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer), [__World_Street_Map__](https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer) et [__World_Imagery__](https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer) (*ArcGIS REST Services*) : <br>
[ol.layer.Tile](https://geoadmin.github.io/ol3/apidoc/ol.layer.Tile.html) : specifier l'étendue dans laquelle vous souhaitez faire apparaitre les tuiles du service raster correspondant.

5. Visibilité des couches : ajouter les cases à cocher correspondantes aux rasters Esri pour gérer leur visibilité
  - Ajouter les composants HTML representant les cases à cocher et lier l'evenement ```onclick``` à la fonction *setVisibility()* déjà existante
  - Modifier le script en ajoutant les instructions necessaires à la fonction ```setVisibility(checkbox)``` pour gérer la visibilité des couches

6. Offrir à l'utilisateur la possibilité de dessiner sur la carte ([exemple](http://tsauerwein.github.io/ol3/mapbox-gl-js/examples/draw-features.html))
  - [ol.interaction.Draw](https://geoadmin.github.io/ol3/apidoc/ol.interaction.Draw.html)

7. Compresser votre dossier 'OpenLayers', renommer l'archive en indiquant votre nom et prénom ainsi que la date du jour : *nom_prenom-20190412.zip*

8. Déposer l'archive sur [Drive](https://drive.google.com/open?id=1mLUapWgcPOXprp40ABNg7QkcANyh-gI1), par [m@il](mailto:martin.delsinne@gmail.com) ou sur ma clé USB

<h4>MERCI</h4>
