const coords = document
  .getElementById('map')
  .getAttribute('data-coords')
  .split(',')
  .map((num) => Number(num));

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: coords, // starting position [lng, lat]
  zoom: 9, // starting zoom
});
const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
