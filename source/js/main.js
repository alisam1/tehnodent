"use strict";

/* Search */
$(document).ready(function ($) {
jQuery(".content_toggle").click(function(){
    $('.content_more').slideToggle(700);
    return false;
});
});


/*Mobile menu*/

document.querySelector('.open-menu').addEventListener('click', () => {
    document.querySelector('.menu_mobile').classList.add('active');
    document.querySelector('.close-menu').classList.add('close-menu-active');
  })
 
  document.querySelector('.close-menu').addEventListener('click', () => {
    document.querySelector('.menu_mobile').classList.remove('active');
    document.querySelector('.close-menu').classList.remove('close-menu-active')
})



/* Sidebar */
$('.sidebar__submenu label').on('click', function(e) {
    e.preventDefault();

    // Add the correct active class
    if($(this).closest('.sidebar__submenu ul').hasClass('active')) {
        // Remove active classes
        $('.sidebar__submenu ul').removeClass('active');
    } else {
        // Remove active classes
        $('.sidebar__submenu ul').removeClass('active');

        // Add the active class
        $(this).closest('.sidebar__submenu ul').removeClass('active');
    }

    // Show the content
    var $content = $(this).next();
    $content.slideToggle(100);
    $('.sidebar__submenu ul').not($content).slideUp('fast');
});


/* Height */

$(document).ready(function ($) {
$('.card').matchHeight({
 property: 'height'
  });
});


  /* Map */

 document.addEventListener("DOMContentLoaded", function() {
  	eventMaps();
    mapSpb();
  });

  function eventMaps() {

  	var card = document.querySelectorAll(".card");
  	var spb = card[0];
  	var msk = card[1];

  	if(spb) {
  		spb.addEventListener("click", mapSpb, false);
  	}
  	if(msk) {
  		msk.addEventListener("click", mapMsk, false);
  	}
  }


  var mapInit = {
  	"spb": [59.939762, 30.327654],
  	"msk": [55.786824, 37.632592],
  	newMap: function(id,coordinates) {
  		var map = new ymaps.Map(id, {
  			center: mapInit[coordinates],
  			zoom: 16,
  		});

  		return map;
  	},
  	createPlacemark: function(map,coordinates) {
  		var placemark = new ymaps.Placemark(
  			mapInit[coordinates],
  			{
  				hintContent: 'Филиал в г.Санкт-Петербурге'
  			},
  			{
  				iconImageHref: 'https://c.radikal.ru/c31/1906/b0/ea9e8d82e630.png',
  				iconImageSize: [30, 30],
  				iconImageOffset: [-6, -10]
  			}

  		);
  		map.geoObjects.add(placemark);
  	},
  	removeMap: function(id) {
  		document.querySelector(id).innerHTML = "";
  },
  }
  function mapSpb(){
  	mapInit.removeMap("#map");
  	var wrapMap = document.querySelector("#map");
  	if(wrapMap) {
  		ymaps.ready(init.bind(null, "map", "spb"));
  	}

  	function init(id, coordinates){
  		var map = mapInit.newMap(id, coordinates);
  		mapInit.createPlacemark(map, coordinates);
  	}
  }
  function mapMsk(){
  	var wrapMap = document.querySelector("#map");
  	if(wrapMap) {
  		ymaps.ready(init.bind(null, "map", "msk"));
  	}

  	function init(id, coordinates){
  		mapInit.removeMap("#map");
  		var map = mapInit.newMap(id, coordinates);
  		mapInit.createPlacemark(map, coordinates);
  	}
  }

/* Slider */

$(document).ready(function ($) {

jQuery('.multiple-items').slick({
  slidesToShow: 4,
slidesToScroll: 1,
autoplay: false,
arrows:true,
dots: false,
adaptiveHeight: true,


// slider responsive
responsive: [
{
  breakpoint: 1279,
    settings: {
        slidesToShow: 3,
        arrows:true,
        centerPadding: '20px',
        autoplay: false,
        adaptiveHeight: true,
        dots: false,
    }
},
{
    breakpoint: 1121,
    settings: {
        slidesToShow: 3,
        arrows:false,
        autoplay: false,
        adaptiveHeight: true,
        dots: true,
    }
},

{
    breakpoint: 768,
    settings: {
        slidesToShow: 1,
        dots: true,
        arrows:false,
        autoplay:false,
        adaptiveHeight: true,
    }
},
{
    breakpoint: 480,
    settings: {
        slidesToShow: 1,
        dots: true,
        arrows:false,
        autoplay:false,
        adaptiveHeight: true,

    }
}
]

});
});

/* Form */

$(document).ready(function ($) {

$('.popup-with-form').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',
      callbacks: {
          beforeOpen: function() {
              if($(window).width() < 700) {
                  this.st.focus = false;
              } else {
                  this.st.focus = '#name';
              }
          }
      }
  });
});

/* Zoom */
$(document).ready(function ($) {
jQuery('.test-popup-link').magnificPopup({
type: 'image'
});
});

/* Main slider */

$(document).ready(function ($) {
$('.one-time').slick({
  dots: true,
  dotsClass: 'slick-dots',
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true,

});
});

/* Videos */

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

var onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', {
        videoId: 'ORcsHhMEqpQ',
        playerVars: {
            'autoplay': 0,
            'rel': 0,
            'showinfo': 0
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

var p = document.getElementById ("player");
$(p).hide();

var onPlayerStateChange = function (event) {
    if (event.data == YT.PlayerState.ENDED) {
        $('.start-video').fadeIn('normal');
    }
}

jQuery(document).on('click', '.start-video', function () {
    $(this).hide();
    $("#player").show();
    $("#thumbnail_container").hide();
    player.playVideo();
});
