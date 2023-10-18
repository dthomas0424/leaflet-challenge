// Initialize the map
let myMap = L.map('map').setView([37.090248, -95.712935], 5.3);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Define the markerSize based on magnitude.
function markerSize(magnitude) 
{
  return Math.sqrt(magnitude) * 12;
};

// Get earthquake data from geojson.
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, 
      {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: markerSize(feature.properties.mag),
          fillColor: getColor(feature.geometry.coordinates[2]),
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.7
      // create tooltip with magnitude and location   
      }).bindPopup(
          'Magnitude: ' + feature.properties.mag + '<br>' +
          'Location: ' + feature.properties.place + '<br>' +
          'Time ' + feature.properties.time 
        );
      }
    }).addTo(myMap);
  });

// Define a getColor function to set circle marker colors based on earthquake's depth
function getColor(depth) 
{
  return depth >= 80 ? '#154360' :
    depth >= 70 ? '#1a5276' :
    depth >= 60 ? '#1f618d' :
    depth >= 50 ? '#2471a3' :
    depth >= 40 ? '#5499c7' :
    depth >= 30 ? '#7fb3d5' :
    depth >= 20 ? '#a9cce3' :
    depth >= 10 ? '#d4e6f1' :
      '#eaf2f8';
};
