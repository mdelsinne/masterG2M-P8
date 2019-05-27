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
  - Ajouter les composants HTML representant les cases à cocher et lier l'événement ```onclick``` à la fonction *setVisibility()* déjà existante
  - Modifier le script en ajoutant les instructions necessaires à la fonction ```setVisibility(checkbox)``` pour gérer la visibilité des couches

6. Offrir à l'utilisateur la possibilité de dessiner sur la carte ([exemple](http://tsauerwein.github.io/ol3/mapbox-gl-js/examples/draw-features.html))
  - [ol.interaction.Draw](https://geoadmin.github.io/ol3/apidoc/ol.interaction.Draw.html)

7. Compresser votre dossier 'OpenLayers', renommer l'archive en indiquant votre nom et prénom ainsi que la date du jour : *nom_prenom-20190412.zip*

8. Déposer l'archive sur [Drive](https://drive.google.com/open?id=1mLUapWgcPOXprp40ABNg7QkcANyh-gI1), par [m@il(martin.delsinne@gfi.fr)](mailto:martin.delsinne@gfi.fr) ou sur ma clé USB

<h4>MERCI</h4>

## Résultat :
ABBAS L	Lubna - *ABBAS04122019.zip* | **note : 19/20**
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. La variable 'drawEnable' dans script.js est inutile car non exploitée

AUBRY M	- *AUBRY_Marlene.zip* | **note : 17/20**
. Le slider de zoom est au dessus du bouton 'ZoomToExtent' ce qui rend celui-ci inexploitable !
. Aucun moyen de déselectionner un outil de dessin après sélection de la liste de choix

BABACAR G - *Babacar_Gueye.zip* | **note : 16/20**
. Les dessins n'apparaissent pas (uniquement le tracé), il manque la couche vecteur correspondante aux dessins sur la carte (*script.js*) : map.addLayer(vector);
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. Aucun moyen de déselectionner un outil de dessin après sélection dans la liste de choix

BELHADJ W - *BELHADJ_wiem-20190412.zip* | **note : 19/20**
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. La variable 'drawEnable' dans *script.js* est inutile car non exploitée

BERAUD M - *beraud_maite_12042019.zip* | **note : 19/20**
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. La variable 'drawEnable' dans *script.js* est inutile car non exploitée

COMPAORE Y G - *COMPAORE_Y_Giscard_20190412.zip* | **note : 19/20**
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. La variable 'drawEnable' dans *script.js* est inutile car non exploitée

DHIMNI S - *Safouane DHIMNI.zip* | **note : 19/20**	
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. La couche vecteur corresondant aux dessins est en dessous des rasters Esri (vu ensemble)

KONE L - *LACINA KONE.rar* | **note : 18/20**
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. Imposible de masquer le raster World_Street_Map (*index.html*) : La case à cocher du raster World_Street_Map porte le même id que la case à cocher du raster World_Imagery
. La variable 'drawEnable' dans *script.js* est inutile car non exploitée

MENDY O	- *examenJS_20190412_OdetteMENDY.7z* **note : 19/20**	
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend l'utilisation laborieuse du slider à un zoom proche
. La variable 'drawEnable' dans *script.js* est inutile car non exploitée

ROBARD O - *examenJS_20190412 ornella robard.zip* | **note : 15/20**
. Les dessins ne fonctionnent pas ! (*script.js*) : erreur critique, les instructions des fonctionnalités de dessin sont placées de manière incorrecte dans la fonction 'setVisibility(checkbox)'
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. Les cases à cocher correspondantes aux rasters Esri ne sont pas sélectionnées à l'initialisation alors que les couches sont visibles sur la carte (*script.js*) : la propriété visible n'est pas bien placée, elle concerne l'objet ol.layer.Tile et non ol.source.TileArcGISRest
. La variable 'drawEnable' dans *script.js* est inutile car non exploitée
. Le raster World_Topo_Map est déclarée deux fois

SBOUAI R - *Raouani_SBOUAI_12_04_2019.zip* | **note : 19/20**	
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. La variable 'drawEnable' dans *script.js* est inutile car non exploitée

SOUHONET A - *SOUHONET Ahissé Gnako Othniel.zip* | **note : 17/20**
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend son utilisation laborieuse à un zoom proche
. Les cases à cocher correspondantes aux rasters Esri ne sont pas sélectionnées à l'initialisation alors que les couches sont visibles sur la carte
. Imposible de masquer le raster World_Street_Map (*index.html*) : La case à cocher du raster World_Street_Map porte le même id que la case à cocher du raster World_Imagery
. La variable 'drawEnable' dans *script.js* est inutile car non exploitée

TAYEB M	- *Manel-Tayeb-20190412.zip* | **note : 18/20**	
. Le bouton 'ZoomToExtent' est au dessus du slider de zoom ce qui rend l'utilisation laborieuse du slider à un zoom proche
. Aucun moyen de déselectionner un outil de dessin après sélection dans la liste de choix
. La variable 'drawEnable' dans *script.js* est inutile car non exploitée
			
      
	moyenne : 	18
