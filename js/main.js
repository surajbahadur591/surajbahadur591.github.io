"use strict";

$(window).load( function() {	
    
//PRELOADER
 $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    
 
    
    if ($('.isotope_items').length) {

    // PORTFOLIO ISOTOPE
     var $container = $('.isotope_items');
     $container.isotope();

    $('.portfolio_filter ul li').on("click", function(){
        $(".portfolio_filter ul li").removeClass("select-cat");
        $(this).addClass("select-cat");				 
        var selector = $(this).attr('data-filter');
        $(".isotope_items").isotope({
            filter: selector,
    });
        return false;
    });

}  
    
     // PAGE ANIMATION
		
		var ascensor = $('#ascensorBuilding').ascensor({
				height: "100%",
				ascensorFloorName:["home", "about", "resume" , "portfolio" , "contact"], direction: [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]]});
			var ascensorInstance = $('#ascensorBuilding').data('ascensor');
			var floorAdded = false;
				
			$(".links-to-floor li").on("click", function(event, index) {
				ascensorInstance.scrollToFloor($(this).index());
			});

			$(".links-to-floor li a:eq("+ ascensor.data("current-floor") +")").addClass("selected");

			ascensor.on("scrollStart", function(event, floor){
				$(".links-to-floor li a").removeClass("selected");
				$(".links-to-floor li a:eq("+floor.to+")").addClass("selected");
			});

			$(".prev").on("click", function() {
				ascensorInstance.prev();
			});
				
			$(".next").on("click", function() {
				ascensorInstance.next();
			});
				
			$(".direction").on("click", function() {
				ascensorInstance.scrollToDirection($(this).data("direction"));
			});	
    

}); // load end 



$(document).ready( function() {	
    
    // SWITCHER OPEN
		$('.color-switcher .open').on("click", function() {
			$('.color-switcher').toggleClass("open-switcher");
		});  
    
    
		// MAGNIFIC POPUP FOR PORTFOLIO PAGE
        if ($('.image-link').length) {
            $('.image-link').magnificPopup({
                type: 'image'
            });
        }

    
    
	//PAGE SLIDER
        if ($('#page-slider').length) {
            $("#page-slider").owlCarousel({
                  navigation : false, // Show next and prev buttons
                  pagination : false,
                  slideSpeed : 300,
                  paginationSpeed : 400,
                  singleItem:true,
                  autoPlay: true
              });
        }
    
       
	//TESTIMONIAL SLIDER
    if ($('#testimonial').length) {
		$("#testimonial").owlCarousel({
			  navigation : false, // Show next and prev buttons
			  pagination : true,
			  slideSpeed : 300,
			  paginationSpeed : 400,
			  singleItem:true,
			  autoPlay: true
		  });
    }
	
		
		// CUSTOM SCROLLBAR
    if ($('.scroll-out').length) {
		$(".scroll-out").mCustomScrollbar({
			   theme:"minimal-dark",
			   autoHideScrollbar: true,
			});	
			
		//SLIDE MENU
		   (function($){
                $(".right-menu").on("click", function(){
                    $("body").hasClass("slidemenu-opened") ? k() : T()
                });
            })(jQuery);
            function T() {
                $("body").addClass("slidemenu-opened")
            }

            function k() {
                $("body").removeClass("slidemenu-opened")
            }
    }
    
    
				
			//CONTACT MAP
        if ($('#map').length) {
				var myOptions = {
				zoom: 14,
				center: new google.maps.LatLng(40.801485408197856, -63.96745953467104), //change the coordinates
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
				mapTypeControl: false
				};
				 
				var map = new google.maps.Map(document.getElementById("map"), myOptions);
				var marker = new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(40.801485408197856, -73.96745953467104) //change the coordinates
				});
				var infowindow = new google.maps.InfoWindow({
					content: "<b>ALBERTO RECOBA</b><br/>2550 Santa Monica Boulevard<br/> Los Angeles"  //add your address
				});
				google.maps.event.addListener(marker, "click", function () {
					infowindow.open(map, marker);
				});
				infowindow.open(map, marker);
        }


		
}); // ready end 


var step = 25;
var scrolling = false;

// Wire up events for the 'scrollUp' link:
$("#scrollUp").bind("click", function(event) {
    event.preventDefault();
    // Animates the scrollTop property by the specified
    // step.
    $(".navout").animate({
        scrollTop: "-=" + step + "px"
    });
}).bind("mouseover", function(event) {
    scrolling = true;
    scrollContent("up");
}).bind("mouseout", function(event) {
    scrolling = false;
});


$("#scrollDown").bind("click", function(event) {
    event.preventDefault();
    $(".navout").animate({
        scrollTop: "+=" + step + "px"
    });
}).bind("mouseover", function(event) {
    scrolling = true;
    scrollContent("down");
}).bind("mouseout", function(event) {
    scrolling = false;
});

function scrollContent(direction) {
    var amount = (direction === "up" ? "-=1px" : "+=1px");
    $(".navout").animate({
        scrollTop: amount
    }, 1, function() {
        if (scrolling) {
            scrollContent(direction);
        }
    });
}




    //WRAPPER PADDING

// function wrap() {
//    if ($(window).width() > 768) {
//    var wheight = $(window).height();
//    var imgheight = $('.profile-image img').height();
//    var wrapperh = $('.wrapper');
//    var sonuc = wheight - imgheight
//            wrapperh.css({
//                "padding-top": sonuc / 2 + "px" ,
//                "padding-bottom": sonuc / 2 + "px"
//            });
//          }
//        }
//        wrap();
//        $(window).resize(wrap);


  
    //SCROLL HEIGHT

        function centerInit() {
            var nbar = $('.navout');
            var profile = $('.left-navbar').height();
            var social = $('.social').height();
            var openm = $('.right-menu').height();
            var contt = $('.controller').height();
            var lih = $('.links-to-floor').width();
            var no = $('.navout').height();

            if ( lih < no) {
            $('.controller').addClass('hidden');  
            }else{
            $('.controller').removeClass('hidden');  
                
            }

            nbar.css({
                "height": profile - social - openm - contt - 80 + "px"
            });
        }

        centerInit();
        $(window).resize(centerInit);

/* Contact Form JS*/
(function($){
   'use strict'; 
   
   $(".contact-form").on('submit', function(e){
        e.preventDefault();
        
        var uri = $(this).attr('action');
        $("#con_submit").val('Wait...');
        var con_name = $("#con_name").val();
        var con_email = $("#con_email").val();
        var con_message = $("#con_message").val();
        
        var required = 0;
        $(".requie", this).each(function() {
            if ($(this).val() == '')
            {
                $(this).addClass('reqError');
                required += 1;
            }
            else
            {
                if ($(this).hasClass('reqError'))
                {
                    $(this).removeClass('reqError');
                    if (required > 0)
                    {
                        required -= 1;
                    }
                }
            }
        });
        if (required === 0)
        {
            $.ajax({
                type: "POST",
                url: 'mail.php',
                data: {con_name: con_name, con_email: con_email, con_message: con_message},
                success: function(data)
                {
                    $(".contact-form input, .contact-form textarea").val('');
                    $("#con_submit").val('Done!');
					$("#con_submit").addClass("ok");
                }
            });
        }
        else
        {
            $("#con_submit").val('Failed!');
        }
   });
   $(".requie").keyup(function() {
        $(this).removeClass('reqError');
    });
   
})(jQuery);
