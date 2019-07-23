$(document).ready(function () {

    ymaps.ready(init);

    function init() {
        var json_path = 'js/data.json';
        var result = document.getElementById('result');

        var destinations = {};

        var getContacts = $(function(){
            $.getJSON('js/data.json', function(data) {
                    for(var i=0; i<data.regions.length; i++){
                        var card_titles = document.querySelectorAll(".card__item--title .goto");
                        card_titles[i].innerHTML =data.regions[i].town;
                        var card_address = document.querySelectorAll(".card__item--address");
                        card_address[i].innerHTML =data.regions[i].address;
                    };
            });
        });


        var getDestinations = $(function(){
            $.getJSON('js/data.json', function(data) {
                    for(var i=0; i<data.regions.length; i++){
                        destinations[data.regions[i].town] =  [data.regions[i].lat, data.regions[i].lon];
                    };
            });
        });

        var map = new ymaps.Map("map", {
            center: [59.939762, 30.327654],
            zoom: 16
        });


        $.getJSON(json_path, function (json_arr) {
            var json_array = [];
            for (i=0; i<json_arr.regions.length; i++)
            {
                json_array.push(json_arr.regions[i]);
            }
            console.log(json_array);
            var myGeoObjects = json_array.map(item => { 
                return new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: [item.lat, item.lon],
                    },
                    properties: {
                        clusterCaption: item.address,
                        balloonContentBody: [
                            '<address class = "adress" style="font-style: normal">',
                            '<h3 class = "adress__title">Наш адрес:</h3>',
                            '<p class = "adress__description"><span>Город:</span>' + ' ' + item.town + ' ',
                            '<p class = "adress__description"><span>Адрес: </span>' + ' ' + item.address + ' ',
                            '<p class = "adress__description"><span>Часы работы:</span> ' + ' ' + item.work + ' ',
                            '</address>'
                        ].join('')
                    }
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '../img/pins.svg',
                    iconImageSize: [20, 32],
                });
        });

            var clusterIcons = [
                {
                    href: '../img/pins.svg',
                    size: [50, 50],
                    // Отступ, чтобы центр картинки совпадал с центром кластера.
                    offset: [-25, -25]
                }
                ];

    
            // Создадим кластеризатор после получения и добавления точек
            var clusterer = new ymaps.Clusterer({
                clusterize: false,
                preset: 'islands#invertedDarkGreenClusterIcons',
                clusterIcons: clusterIcons,
                groupByCoordinates: false,
            });
            clusterer.add(myGeoObjects);
            map.geoObjects.add(clusterer);
        });
    

    // куда скакать
         function clickGoto() {

        // город
        var pos = this.textContent;
        result.textContent = pos;

        // переходим по координатам
         map.panTo(destinations[pos], {
            flying: 1
        });

        return false;
    }
    var col = document.getElementsByClassName('goto');
    for (var i = 0, n = col.length; i < n; ++i) {
        col[i].onclick = clickGoto;
        result.textContent = result.textContent + ' ' + i;
    }
    }
});