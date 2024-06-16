// 
// BobbyNishimura.com Routines
// 
// 
var curPage = $(location).attr('href'); 
var wHeight = $(window).height();
var wWidth = $(window).width();
var curPArr = curPage.split("/");
curPArr = (curPArr[curPArr.length -1]).split(".");
var thisPage = curPArr[0];
var pages = ["index", "about", "web", "photo", "contact"];
var thisOff = 55;
var staticNav = '';
var curTop = 0;
var scrollOff = 70;
var counter = 0;
var animation = false;
var scrollers = $(".kanji, #about, .vignette, .stamp");
var homeimg = '/img/gallery/skyline.jpg';
var contactimg = '/img/gallery/ducks.jpg';
var photoimg = '/img/gallery/bokeh.jpg';
var webimg = '/img/gallery/clouds+txt.jpg';
var aboutimg = '/img/gallery/mountainBg.jpg';
var isMobile = jQuery.browser.mobile;
$(document).ready(function(){
	App.init();
});


var App = (function () {
	
	function init() {	
		
		for (var i = 0; i < pages.length; i++) {
			thisPage = (thisPage.indexOf(pages[i]) != -1) ? pages[i] : thisPage;
		}
		
		// hightlight active page in navbar
		$(".navbar-nav > li > a[href='" + thisPage + "']").addClass("active");
		
		$(".container img").each(function(index, element) {
			//console.log($(element).attr("src"));
			 $(element).attr("data-src",$(element).attr("src"));
			 $(element).attr("src", "");
            $(element).addClass("lazy");
				
        });
		
		
		initClasses();
		if (initFades() == true) {				
			//enalbe lazy image loading
			$("img.lazy").lazy({
				effect: 'fadeIn',
				effectTime: 1500,
				delay: 100
			});
			
			
			// toggle navBar on Mobile
			//if (isMobile) {
				$("#toggleNav").click(function(e) {
					var isActive = $(this).attr("data-toggle");
				   if (isActive == "true") {
						$(".navbar-nav").fadeOut();
						$("#toggleNav").attr("data-toggle", "false");
					} else {
						$(".navbar-nav").fadeIn();
						$("#toggleNav").attr("data-toggle", "true");
					}
					//console.log (isActive);
				});
			//}
		}
		
		
		
		//console.log(curPage);
		if (thisPage.indexOf("photo") != -1) {
			staticNav = $("#staticNav").offset().top;
			thisOff = 80;
		} else {
			staticNav = $("#topCont").offset().top;
			thisOff = 87;
		}
		
		
		if (!isMobile) {
			curTop = $(window).scrollTop();
			var jumbTop = parseInt($(".jumbotron").css("height"))+scrollOff-98;
	
			if (curTop >= (staticNav + thisOff)) {  // approx 600 in test   
				navClassAdd();
				scrollers.css({
					"transform": "translate3d(0px," + (jumbTop *-1) + "px,0px)"
				});
			} else {
				navClassRemove();
				// hardware accellearted scrolling
				scrollers.css({
					"transform": "translate3d(0px," + curTop *-1 + "px,0px)"
				});
			}
			
			
			// on window scroll 
			$( window ).scroll(function() {
				window.requestAnimationFrame(updateS);
	
				curTop = $(window).scrollTop();
				jumbTop = parseInt($(".jumbotron").css("height"))-scrollOff-98;
	
				if (curTop >= (staticNav - thisOff)) {  // approx 600 in test   
					navClassAdd();		
					scrollers.css({
						"transform": "translate3d(0px," + ((jumbTop*-1)) + "px,0px)"
					});	
					//console.log("with classes: " + (jumbTop*-1));
				} else {
					navClassRemove();
					// hardware accellearted scrolling
					scrollers.css({
						"transform": "translate3d(0px," + curTop *(-1) + "px,0px)"
					});
				}
				
				
			});
		}
		
		$(".vignette").css({
			height: $(".imageHolder").height()
		});
		
		if(!isMobile) {
			$( window ).resize(function() {
				curTop = $(window).scrollTop();
				if (curTop >= (staticNav - thisOff)) {  // approx 600 in test   
					navClassAdd();
				} else {
					navClassRemove();
				}
				scrollers.css({
					height: $(".imageHolder").height()
				});
			});
		}
	
	}

	function debug() {
		//var curTop = $(window).scrollTop();
		//console.log(curTop);
		animation = (animation == false) ? true : false;
		console.log(animation);
	}


	return {
		init: init,
		debug: debug
	}
}());




function navClassAdd () {
	var jumbTop = parseInt($(".jumbotron").height());
	if (thisPage == "photo")	$("#staticNav").addClass("staticNav");
	$(".jumbotron").addClass("staticJumbotron");
	$("#topCont").addClass("addTop");
	$(".staticJumbotron").css("top",(jumbTop*-1) + scrollOff);
	if (thisPage == "photo") {
		$(".addTop").css("margin-top",jumbTop + scrollOff);
	} else {
		$(".addTop").css("margin-top",jumbTop + 10);
	}
}

function navClassRemove () {
	$(".addTop").css("margin-top","-110px");
	$(".staticJumbotron").css("top","0px");
	if (thisPage == "photo") {
		$(".addTop").css("margin-top","0px");
		$("#staticNav").removeClass("staticNav");
	}
	$(".jumbotron").removeClass("staticJumbotron");
	$("#topCont").removeClass("addTop");
}
function map() {
  var myPos = new google.maps.LatLng(33.9559033, -118.3045919);

  // Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#ABFD9E" },
        { saturation: -75 },
		 { lightness: -5 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 500 },
		 { saturation: -10 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 10,
    center: myPos,
	disableDefaultUI: true,
	panControl: true,
	panControlOptions: {
		position: google.maps.ControlPosition.RIGHT_TOP
	},
	zoomControl: true,
	zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
	  position: google.maps.ControlPosition.RIGHT_TOP
    },
	mapTypeControl: false,
	scaleControl: true,
	scaleControlOptions: {
		position: google.maps.ControlPosition.RIGHT_TOP
	},
	streetViewControl: false,
	overviewMapControl: false,
	scrollwheel: false,
	navigationControl: false,
	mapTypeControl: false,
	scaleControl: false,
	draggable: false,
    mapTypeControlOptions: {
		
		mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
	}
  };
  var map = new google.maps.Map(document.getElementById('mapper'),
    mapOptions);
  // To add the marker to the map, use the 'map' property
  var marker = new google.maps.Marker({
	position: myPos,
	map: map,
	title:"Los Angeles, CA"
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}

function initClasses() {
	// parallax magic
	$("#topbanner").addClass("img-holder");
	switch (thisPage) {
		case "about":
			$('body').addClass("bricks");
			//$('#topbanner').addClass('about');
			if (!isMobile) {
				$("#topbanner").attr('data-image',aboutimg);
				$('.img-holder').imageScroll({
					coverRatio: 0.85,
					mediaWidth: 1600,
				   mediaHeight: 820,
					touch: false
				});
				var holderH = $(".imageHolder").height();
				$("#about").css({
					height: holderH,
					"padding-top": holderH/2
				});
			} else {
				$("#topbanner").css('background-image',"url(" + aboutimg + ")");
				$("#topCont").delay(250).css('margin-top', '200px');
				$(".navbar-right").addClass("mobileNav");
				//$("footer").addClass('mobFoot');
			}
			
			$(".navbar a, #about p").css({
				"text-shadow": "0px 1px 0px rgba(0,0,0,1)"
			});
			$( window ).resize(function() {
				var holderH = $(".imageHolder").height();
				$("#about").css({
					height: holderH,
					"padding-top": holderH/2
				});
			});
			break;
		case "web":
			$('body').addClass("wall");
			//$('#topbanner').addClass('web');
			if(!isMobile) {
				$("#topbanner").attr('data-image',webimg);
				$('.img-holder').imageScroll({
					coverRatio: 0.85,
					mediaWidth: 1600,
				   mediaHeight: 750,
					touch: false
				});
			} else {
				$("#topbanner").css('background-image',"url(" + webimg + ")");
				//$("footer").addClass('mobFoot');
				$(".navbar-right").addClass("mobileNav");
			}
			break;
		case "photo":
			$('body').addClass("wallpaper");
			//$('#topbanner').addClass('photo');
			if(!isMobile) {
				$("#topbanner").attr('data-image',photoimg);
				
				$('.img-holder').imageScroll({
					coverRatio: 0.85,
					mediaWidth: 1600,
				   mediaHeight: 840,
					touch: false
				});
			} else {
				$("#topbanner").css('background-image',"url(" + photoimg + ")");
				$("#topCont").delay(250).css('margin-top', '400px');
				$(".navbar-right").addClass("mobileNav");
				
			}

			$('a[name*="anchor"]').click(function () {
				var targ = $(this).html().toString();
				var dest = $("div[name=" + targ + "]");
				var top = dest.offset().top - 150;
				$('html,body').animate({scrollTop: top}, 1000, 'easeOutCirc', function () {});
				//console.log(top);
			});
			
			$( window ).ready(function(e) {
				$(".kanji").delay(10).css({
					top: wHeight/2
				});
			});
			
			$( window ).resize(function() {
				wHeight = $(window).height();
				$(".kanji").css({
					top: wHeight/2
				});
				$('.img-holder, .vignette').css({
					"margin-bottom": "0px",
					"height": wHeight
				});
			});
			
			
			// enable image gallery
			$('a[data-fluidbox]').each(function(index, element) {
				$(element).fluidbox();
			});
			
			
			
			// make videos into dynamic iframes
			
			$(".poster img").click(function(e) {
				var output = '';
				var src = $(this).attr("data-videosrc");
				switch (src) {
					case "vimeo":
						 output ='<iframe src="//player.vimeo.com/video/' + $(this).attr("data-videoid") + '?title=0&amp;byline=0&amp;portrait=0&amp;color=ff0000&amp;autoplay=1" width="100%" height="563" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
						 break;
					case "youtube":
						output = '<iframe width="100%" height="563" src="//www.youtube.com/embed/' + $(this).attr("data-videoid") + '" frameborder="0" allowfullscreen></iframe>';
						break;
					default:
						output = $(this).parent().html();
						alert('not a valid video');
				}
				console.log(src);
				$(this).parent().html(output);
			});
			
			
			break;
		case "contact":
			$('body').addClass("wall");
			//$('#topbanner').addClass('contact');
			if (!isMobile) {
				$("#topbanner").attr('data-image',contactimg);
				$('.img-holder').imageScroll({
					coverRatio: 0.80,
					mediaWidth: 1600,
				   mediaHeight: 708,
				   holderMinHeight: 300,
					touch: false
				});
			} else {
				$("#topbanner").css('background-image',"url(" + contactimg + ")");
				$(".navbar-right").addClass("mobileNav");
			}
			
			map();
			break;
		case "index":
		case "":
			$('body').addClass("bricks");
			//$('#topbanner').addClass('home');
			if (!isMobile) {
				$("#topbanner").attr('data-image',homeimg);
				$('.img-holder').imageScroll({
					holderMinHeight: wHeight,
					touch: false
				});
			} else {
				$("#topbanner").css({
					'background-image':"url(" + homeimg + ")"
				});
				$(".jumbotron").attr("id","homebg");
				$("body").attr("id","resetmargin");
				$("#toggleNav").hide();
				$(".navbar-header").css({
					"background":"transparent !important",
				    "height": "0px"
				});
 			//$("footer").addClass('mobFoot');
				$("footer").hide();
			}

			$('.img-holder, .vignette').css({
				"margin-bottom": "0px",
				"height": wHeight
			});
			$( window ).ready(function(e) {
				$("#home-brand, #main-nav").delay(10).css({
					top: wHeight/2
				});
			});
			$("#home-brand, #main-nav").delay(500).css({
				top: wHeight/2
			});
			
			$( window ).resize(function() {
				wHeight = $(window).height();
				$("#home-brand, #main-nav").css({
					top: wHeight/2
				});
				$('.img-holder, .vignette').css({
					"margin-bottom": "0px",
					"height": wHeight
				});
			});
			
			$(".navbar-brand").attr("id","home-brand");
			$(".navbar-nav").addClass("home-nav");
			break;
		default:
			if (!isMobile) {
				$("#topbanner").attr('data-image',homeimg);
				$('.img-holder').imageScroll({
					holderMinHeight: wHeight,
					touch: false
				});
			} else {
				$("#topbanner").css({
					'background-image':"url(" + homeimg + ")"
				});
				$(".jumbotron").attr("id","homebg");
				$("body").attr("id","resetmargin");
				$("#toggleNav").hide();
				$(".navbar-header").css({
					"background":"transparent !important",
				    "height": "0px"
				});
 			//$("footer").addClass('mobFoot');
				$("footer").hide();
			}

			$('.img-holder, .vignette').css({
				"margin-bottom": "0px",
				"height": wHeight
			});
			$( window ).ready(function(e) {
				$("#home-brand, #main-nav").delay(10).css({
					top: wHeight/2
				});
			})
			console.log("error identifying page: " + thisPage); 
			break;
	}

	/*$('.img-holder').imageScroll({
	//            image: null,
	//            imageAttribute: 'image',
	//            container: $('body'),
	//            speed: 0.2,
	//            coverRatio: 0.75,
	//            holderClass: 'imageHolder',
	//            holderMinHeight: 200,
	//            extraHeight: 0,
	//            mediaWidth: 1600,
	//            mediaHeight: 900,
	//            parallax: true,
	//            touch: false
	});*/
}

function initFades() {
	switch (thisPage) {
		case "about":
			$("#about p > span").hide();
			
			$("body").fadeIn("slow", function() {
				$("#topbanner > div").delay(50).fadeIn("slow");
				$("#about p > span").each(function(i, e) {
					$(e).delay((i * 50) + 450).fadeIn("slow");
				});
				if (!isMobile) {
					$(".navbar-brand, #main-nav > li > a").delay(300).fadeIn("slow");
				} else {
					$(".navbar-nav").hide();
					$(".navbar-brand, #main-nav > li > a").delay(300).fadeIn("slow");
				}
			});
			return true;
			break;
		case "photo":
			$("body").fadeIn("slow", function() {
				$("#topbanner > div").delay(50).fadeIn("slow");
				
				if (!isMobile) {
					$(".navbar-brand, #main-nav > li > a").delay(300).fadeIn("slow");
				} else {
					$(".navbar-nav").hide();
					$(".navbar-brand, #main-nav > li > a").delay(300).fadeIn("slow");
				}
			});
			return true;
			break;
		case "web":
		case "contact":
			$("body").fadeIn("slow", function() {
				$(".stamp").delay(150).fadeIn("slow");
				if (!isMobile) {
					$(".navbar-brand, #main-nav > li > a").delay(300).fadeIn("slow");
				} else {
					$(".navbar-nav").hide();
					$(".navbar-brand, #main-nav > li > a").delay(300).fadeIn("slow");
				}
			});
			return true;
			break;
		case "index":
		case "":
			$("body").fadeIn("slow", function() {
				$(".stamp").delay(125).slideDown("slow", "easeOutCubic");
				$(".navbar-brand").delay(325).fadeIn("slow");
				$("#main-nav > li > a").each(function(index, element) {
				  $(element).delay(100*(index) + 450).fadeIn("slow");
				});
			});
			if (!isMobile) {
				$( window ).scroll(function() {
					curTop = $(window).scrollTop();
					
					// hardware accellearted scrolling
					$(".navbar > div").css({
						"transform": "translate3d(-0.01px," + curTop *(-1) + "px,0px)"
					});
				});
			}
			return false;
			break;
		default:
			$("body").fadeIn("slow", function() {
				$(".container").delay(125).slideDown("slow", "easeOutCubic");
				$(".navbar-brand").delay(325).fadeIn("slow");
				$("#main-nav > li > a").each(function(index, element) {
				  $(element).delay(100*(index) + 450).fadeIn("slow");
				});
			});
			if (!isMobile) {
				$( window ).scroll(function() {
					curTop = $(window).scrollTop();
					
					// hardware accellearted scrolling
					$(".navbar > div").css({
						"transform": "translate3d(-0.01px," + curTop *(-1) + "px,0px)"
					});
				});
			}
			return false;
			break;
	}
}


var latestKnownScrollY = 0;

function onScroll() {
	latestKnownScrollY = window.scrollY;
}
function updateS() {
	if (animation) {
		// force new frames to render
		// off by default as scrolling looks best without itx
		window.requestAnimationFrame(updateS);		
		onScroll();
		//console.log(counter);
		//counter++;
	}
	

	var currentScrollY = latestKnownScrollY;

	// read offset of DOM elements
	// and compare to the currentScrollY value
	// then apply some CSS classes
	// to the visible items
	curTop = $(window).scrollTop();
	jumbTop = parseInt($(".jumbotron").css("height"))-scrollOff-98;

	if (!isMobile) {
		if (curTop >= (staticNav - thisOff)) {  // approx 600 in test   
			navClassAdd();		
			scrollers.css({
				"transform": "translate3d(0px," + ((jumbTop*-1)) + "px,0px)"
			});	
			//console.log("with classes: " + (jumbTop*-1));
		} else {
			navClassRemove();
			// hardware accellearted scrolling
			scrollers.css({
				"transform": "translate3d(0px," + curTop *(-1) + "px,0px)"
			});
		}
	}

}