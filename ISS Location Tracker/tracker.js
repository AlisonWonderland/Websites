//move code here
var mymap = L.map('mapid').setView([51.505, -0.09], 4.5);
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=nmxK8s89ZRurAw06URQt', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
            maxZoom: 18
        }).addTo(mymap);

        var iss_icon = L.icon({
            iconUrl: 'images/ISS-sm.png',
            iconSize: [80, 95]
        });

        var marker = L.marker([51.5, -0.09], {icon: iss_icon}).addTo(mymap);
        var circle = L.circle([51.508, -0.11], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500000
        }).addTo(mymap);
        
        moveISS();

        function moveISS () {
            $.getJSON('http://api.open-notify.org/iss-now.json', function(data) {
                var lat = data['iss_position']['latitude'];
                var lon = data['iss_position']['longitude'];
                var trail = L.circle([lat, lon], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 1.0,
                    radius: 50000
                }).addTo(mymap);

                //add marker and circle here to create a path

                // See leaflet docs for setting up icons and map layers
                // The update to the map is done here:
                // iss.setLatLng([lat, lon]);
                // isscirc([lat,lon])
                marker.setLatLng([lat, lon]);
                circle.setLatLng([lat, lon]);
                mymap.panTo([lat, lon], animate=true);
            });
            setTimeout(moveISS, 5000); 
        }