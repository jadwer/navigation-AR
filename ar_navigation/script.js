let coordinates = {}

$(document).ready(function () {
    getCoordinates();
});

function getCoordinates() {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('source') && searchParams.has('destination')) {
        console.log("parámetro source: " + searchParams.get('source'));
        console.log("parámetro destination: " + searchParams.get('destination'));

        let source = searchParams.get('source');
        let destination = searchParams.get('destination');
        coordinates.source = {
            lat : source.split(';')[0],
            lon : source.split(';')[1]
        };
        coordinates.destination = {
            lat : destination.split(';')[0],
            lon : destination.split(';')[1]
       };

       console.log("Coordenadas del destino, latitud: " + coordinates.destination.lat)
    }
    else {
        alert("No se han proporcionado coordenadas de origen o destino.");
        window.location.href = "/";
    }
}