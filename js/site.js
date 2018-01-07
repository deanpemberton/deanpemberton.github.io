---
---

var JekyllMaps = function () {
  console.info( 'Jekyll Maps :)' );
  this.map;
  this.data = {[
      {% for post in site.posts %}{
        'type': 'Feature',
        'properties': {
          {% for p in post.properties %}
          '{{ p.key }}': '{{ p.value }}',{% endfor %}
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [
            {{ post.lng }},
            {{ post.lat }}
          ]
        }
      },{% endfor %}
    ]
  };

  this._createMap();
}

JekyllMaps.prototype._createMap = function() {
  this.map = L.map( 'map' ).setView( [0, 0], 1 );
  L.tileLayer( '{{ site.map-tileset }}', {
    attribution: '{{ site.map-credits }}'
  }).addTo( this.map );
  

   gpsMarker = new L.geoJson(this.data, {
       onEachFeature: function(feature, layer) {
          if (feature.properties && feature.properties.name) {
              layer.bindPopup(feature.properties.name, {closeButton: false, offset: L.point(0, -20)});
              layer.on('mouseover', function() { layer.openPopup(); });
               layer.on('mouseout', function() { layer.closePopup(); });
           }
      },
        pointToLayer: function (feature, latlng) {
           return L.circleMarker(latlng);
       }
   });
  
   this.addLayer(gpsMarker);
   this.fitBounds(gpsMarker.getBounds(), {padding: [0, 0]});
  
  //this.geojson = L.geoJson(gpsMarker ).addTo( this.map );
  //this.map.fitBounds(this.geojson.getBounds());
}