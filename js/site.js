---
---

var JekyllMaps = function () {
  console.info( 'Jekyll Maps :)' );
  this.map;
  this.data = {
    type: 'FeatureCollection',
    features: [
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
    
    var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
    
  this.map = L.map( 'map' ).setView( [0, 0], 1 );
  L.tileLayer( '{{ site.map-tileset }}', {
    attribution: '{{ site.map-credits }}'
  }).addTo( this.map );
  
 this.geojson =  L.geoJSON(this.data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);
  
//  this.geojson = L.geoJson( this.data ).addTo( this.map );
  this.map.fitBounds(this.geojson.getBounds());
}