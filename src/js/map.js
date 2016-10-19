/*map*/

    var map;
    var markers = [];  
    function initialize() {

        map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 6,
            center: new google.maps.LatLng(49.26780455063753,31.322021484375),
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

        var iconBase = '/';
        var icons = {

            'Киев': {
                name: 'Киев',
                center: {lat: 50.454558, lng: 30.655230}
                //icon: iconBase + 'img/icons/pointer_cafe.png'
            },

            'Одесса': {
                name: 'Одесса',
                center: {lat: 46.4841143, lng: 30.7388449}
                //icon: iconBase + 'img/icons/pointer_hotel.png'
            }
        };

        function addMarker(feature) {
            var marker = new google.maps.Marker({
                position: feature.position,
                icon: iconBase + 'img/icons/pointer_hotel.png',
                //icon: icons[feature.type].icon,
                map: map
            });
            markers.push({
                marker: marker,
                type: feature.type,
                center: icons[feature.type].center

            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });
            var infowindow = new google.maps.InfoWindow({
                content: feature.content,
                maxWidth: 300
            });
        }


        var features = [
            {
                position: new google.maps.LatLng(50.454558, 30.655230),
                address:'Киев, ул. Вискозная, 17',
                type: 'Киев',
                content:'Киев, ул. Вискозная, 17'
            },
            {
                position: new google.maps.LatLng(50.476156, 30.529014),
                address:'Киев, ул. Электриков, 26',
                type: 'Киев',
                content:'Киев, ул. Электриков, 26'
            },
            {
                position: new google.maps.LatLng(50.451651, 30.412809),
                address:'Киев, ул. Радищева, 3',
                type: 'Киев',
                content:'Киев, ул. Радищева, 3'
            },
            {
                position: new google.maps.LatLng(46.489977, 30.675964),
                address:'Одесса, Ленинградское шоссе, 2',
                type: 'Одесса',
                content:'Одесса, Ленинградское шоссе, 2'
            },
            {
                position: new google.maps.LatLng(46.4841143, 30.7388449),
                address:'Одесса, улица Дерибасовская',
                type: 'Одесса',
                content:'Одесса, улица Дерибасовская'
            }

        ];

        var countt = {};
        for (var i = 0, feature; feature = features[i]; i++) {
            if (countt.hasOwnProperty(feature.type)){
                countt[feature.type] = countt[feature.type] + 1;
            } else {
                countt[feature.type] = 1;
            }
            addMarker(feature);
        }


        var legend = document.getElementById('legend');
        var select_city = document.createElement('select');
        select_city.onchange = function() {
            selectToggleType(this);
        };
        select_city.innerHTML += '<option value="all_ukraine">Все рестораны</option>';
        for (var key in icons) {

            var type = icons[key];
            var name = type.name;
            var icon = type.icon;
            select_city.innerHTML += '<option value="'+name+'">' + name +'</option>';
            i++;
        }
        legend.appendChild(select_city);



    }


    function selectToggleType(input) {
        var datatype = input.value;
        var obl=[];

        if (datatype != 'all_ukraine') {
            obl.push(datatype);

        } else {
            for(var i=0; i<markers.length; i++) {
                obl.push(markers[i].type);

            }
        }

        for(var i=0; i<markers.length; i++) {

            if (datatype == 'all_ukraine') {
                map.setZoom(6);
                map.setCenter({lat: 49.26780455063753, lng: 31.322021484375});
                if ((obl.indexOf(markers[i].type) != -1)) {
                    markers[i].marker.setMap(map);

                } else {
                    markers[i].marker.setMap(null);
                }
            } else {


                if ((obl.indexOf(markers[i].type) != -1)) {
                    markers[i].marker.setMap(map);
                    map.setCenter(markers[i].center);
                    map.setZoom(10);

                } else {
                    markers[i].marker.setMap(null);
                }
            }


        }

    }

    google.maps.event.addDomListener(window, 'load', initialize);




