const coords = document
  .getElementById('map')
  .getAttribute('data-coords')
  .split(',')
  .map((num) => Number(num));

const campgroundTitle =
  document.querySelector('[data-label-title]').textContent;
const campgroundLocation = document.querySelector(
  '[data-label-location]'
).textContent;

const popup = new mapboxgl.Popup({
  offset: 30,
}).setHTML(`<h5>${campgroundTitle}</h5><p>${campgroundLocation}</p>`);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: coords, // starting position [lng, lat]
  zoom: 9, // starting zoom
});
map.addControl(new mapboxgl.NavigationControl(), 'top-left');
const marker = new mapboxgl.Marker()
  .setLngLat(coords)
  .setPopup(popup)
  .addTo(map);
