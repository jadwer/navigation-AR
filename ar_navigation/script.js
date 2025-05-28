let coordinates = {};

$(document).ready(function () {
  getCoordinates();
  render_elements();
});

function render_elements() {
  $.ajax({
    url: `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates.source.lon}%2C${coordinates.source.lat}%3B${coordinates.destination.lon}%2C${coordinates.destination.lat}?alternatives=true&geometries=polyline&steps=true&language=es&access_token=pk.eyJ1IjoiamFkd2VyIiwiYSI6ImNtYXpwdjgxdzBobnEya3BzcWMxamYwOTgifQ.rWN_YpaDe5xKkQLPv_Vmug`,
    type: "GET",
    success: function (response) {
      console.log(response);

      let images = {
        turn_right: "../assets/ar_right.png",
        turn_left: "../assets/ar_left.png",
        straight: "../assets/ar_straight.png",
      };

      let steps = response.routes[0].legs[0].steps;

      for (let i = 0; i < steps.length; i++) {
        let image;
        let distance = steps[i].distance;
        let instruction = steps[i].maneuver.instruction;

        if (instruction.includes("girar a la derecha")) {
          image = "turn_right";
        } else if (instruction.includes("girar a la izquierda")) {
          image = "turn_left";
        } else if (instruction.includes("continuar recto")) {
          image = "straight";
        }

        if (i > 0) {
          $("#scene_container").append(`
                    <a-entity gps-entity-place="latitude: ${
                      steps[i].maneuver.location[1]
                    }; longitude: ${steps[i].maneuver.location[0]};"> 
                        <a-image
                            name="${instruction}"
                            src="../assets/${images[image]}"
                            look-at="#step_${i - 1}"
                            scale="5 5 5"
                            id="step_${i}"
                            position="0 0 0"
                            >
                        </a-image>
                        <a-entity>
                            <a-text height="50" value="${instruction} (${distance / 1000}m)"></a-text>
                        </a-entity>


                    </a-entity>
                `);
        } else {
          $("#scene_container").append(`
                    <a-entity gps-entity-place="latitude: ${
                      steps[i].maneuver.location[1]
                    }; longitude: ${steps[i].maneuver.location[0]};"> 
                        <a-image
                            name="${instruction}"
                            src="../assets/ar_start.png"
                            look-at="#step_${i + 1}"
                            scale="5 5 5"
                            id="step_${i}"
                            position="0 0 0"
                            >
                        </a-image>
                        <a-entity>
                            <a-text height="50" value="${instruction} (${distance}m)"></a-text>
                        </a-entity>


                    </a-entity>
                `);
        }
      }
    },
  });
}

function getCoordinates() {
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("source") && searchParams.has("destination")) {
    console.log("parámetro source: " + searchParams.get("source"));
    console.log("parámetro destination: " + searchParams.get("destination"));

    let source = searchParams.get("source");
    let destination = searchParams.get("destination");
    coordinates.source = {
      lat: source.split(";")[0],
      lon: source.split(";")[1],
    };
    coordinates.destination = {
      lat: destination.split(";")[0],
      lon: destination.split(";")[1],
    };

    console.log(
      "Coordenadas del destino, latitud: " + coordinates.destination.lat
    );
  } else {
    alert("No se han proporcionado coordenadas de origen o destino.");
    window.location.href = "/";
  }
}
