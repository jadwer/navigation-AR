let latitude, longitude, destination;

$(document).ready(function () {
  // Initialize geolocation
  initGeolocation();
});

$(function () {
  $('#navigate-button').click(function () {
    if (destination?.lat === undefined || destination?.lng === undefined) {
      alert("Por favor, selecciona un destino en el mapa.");
      return;
    } else {
      window.location.href = `ar_navigation/?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`;
    }
  });
}
);
// <div><a href="/home"><p>Volver al inicio</p></a></div>

function initGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert(
      "Lo sentimos, tu navegador no es compatible con los servicios de geolocalización."
    );
  }
}

function success(position) {
  console.log(position);
     latitude = 19.4558356;
     longitude = -99.095859;
  //latitude = position.coords.latitude;
  //longitude = position.coords.longitude;

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

  map.on("click", function (event) {
    console.log( event);

    destination = event.lngLat;
  })
}

function error(PositionError) {
  switch (PositionError.code) {
    case PositionError.PERMISSION_DENIED:
      alert("Por favor, permite el acceso a tu ubicación.");
      break;
    case PositionError.POSITION_UNAVAILABLE:
      alert("La ubicación no está disponible.");
      break;
    case PositionError.TIMEOUT:
      alert("La solicitud de geolocalización ha expirado.");
      break;
    case PositionError.UNKNOWN_ERROR:
      alert("Ha ocurrido un error desconocido.");
      break;
  }

}
