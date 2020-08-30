'use strict'

function initMap() {
    var uluru = {lat: 49.263071, lng: 17.831878};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        // icon: 'img path'
    });

}
