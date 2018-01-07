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
  this.map = L.map( 'map' ).setView( [0, 0], 1 );
  L.tileLayer( '{{ site.map-tileset }}', {
    attribution: '{{ site.map-credits }}'
  }).addTo( this.map );
  this.geojson = L.geoJson( this.data,if (feature.properties && feature.properties.name) {
                layer.bindPopup(feature.properties.name, {closeButton: false, offset: L.point(0, -20)});
                layer.on('mouseover', function() { layer.openPopup(); });
                layer.on('mouseout', function() { layer.closePopup(); });
            } ).addTo( this.map );
  this.map.fitBounds(this.geojson.getBounds());
}