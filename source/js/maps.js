$(document).ready(function () {

    ymaps.ready(init);

    function init() {
        var json_path = 'js/data.json';
        var result = document.getElementById('result');

        var destinations = {
            'Москва': [55.755814, 37.617635],
            'Санкт-Петербург': [59.939762, 30.327654],
            'Екатеринбург': [56.836671, 60.595612]
        };

        var map = new ymaps.Map("map", {
            center: [55.755814, 37.617635],
            zoom: 16,
            controls: []
        });


        $.getJSON(json_path, function (json_arr) {
            var myGeoObjects = json_arr.map(item => {
                return new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: [item.lat, item.lon],
                    },
                    properties: {
                        clusterCaption: item.address,
                        balloonContentBody: [
                            '<address style="font-style: normal">',
                            '<h3>Данные</h3>',
                            '<b>Город: </b> ' + item.town + '<br>',
                            '<b>Адрес: </b> ' + item.address + '<br>',
                            '<b>Часы работы: </b> ' + item.work + '<br>',
                            '</address>'
                        ].join('')
                    }
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '../img/pins.svg',
                    iconImageSize: [20, 32],
                });
        })
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
                preset: 'islands#invertedDarkGreenClusterIcons',
                clusterIcons: clusterIcons,
            });
            clusterer.add(myGeoObjects);
            map.geoObjects.add(clusterer);
            map.setBounds(clusterer.getBounds(), {
                checkZoomRange: true
            });
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