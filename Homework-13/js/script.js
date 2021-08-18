const mapWrapper = document.getElementById("map");
const map = new google.maps.Map(mapWrapper, {
    center: { lat: 46.6495511, lng: 32.5377419 },
    zoom: 5,
});


const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: {
        strokeColor: "#000",
    },
});
directionsRenderer.setMap(map);


document.getElementById("submit").addEventListener("click", async () => {
    const addressFor = document.getElementById("for").value;
    const addressTo = document.getElementById("to").value;

    showRoute(addressFor, addressTo);
});




function getRandomNumber(max) {
    return Math.floor(Math.random() * 255);
}

function getRandomColor() {
    const red = getRandomNumber(255);
    const green = getRandomNumber(255);
    const blue = getRandomNumber(255);
    return `rgb(${red}, ${green}, ${blue})`;
};

function showRoute(from, to) {

    directionsService.route(
        {
            origin: from,
            destination: to,
            travelMode: "DRIVING",
        },
        (result, status) => {
            if (status == "OK") {
                directionsRenderer.setDirections(result);
            }
        }
    );
}