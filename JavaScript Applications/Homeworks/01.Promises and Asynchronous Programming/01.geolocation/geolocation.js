(function() {
    'use strict';

    const locationLoadPromise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => resolve(pos));
    });

    function getLocationCoordinates(position) {
        const coordinates = { lat: position.coords.latitude, long: position.coords.longitude };

        return coordinates;
    }

    function showLocationImage(coordinates) {
        const locationImage = document.getElementById('location-image');

        const { lat, long } = coordinates;

        const src =
            `http://maps.google.com/maps/api/staticmap?center=${lat}, ${long}&zoom=14&size=400x400&sensor=false`;

        locationImage.src = src;
    }

    locationLoadPromise
        .then((pos) => getLocationCoordinates(pos))
        .then((coordinates) => showLocationImage(coordinates))
        .then(() => console.log("map is shown"));

    console.log('this should be logged before the location image is loaded');
})();