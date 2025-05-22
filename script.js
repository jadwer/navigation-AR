let latitude = 19.4348,
  longitude = -99.1413;

// Initializing Mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiamFkd2VyIiwiYSI6ImNtYXpwdjgxdzBobnEya3BzcWMxamYwOTgifQ.rWN_YpaDe5xKkQLPv_Vmug";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [longitude, latitude],
  zoom: 16,
});

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  })
);

const language = new MapboxLanguage();
map.addControl(language);

map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric",
    profile: "mapbox/driving",
    language: "es",
    interactive: true,
    controls: {
      inputs: true,
      instructions: true,
    },
  }),
  "top-left"
);
