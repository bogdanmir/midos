$( document ).ready(function () {

	$ ('.header_btn').click(function () {
		$('.mean_header').toggleClass('sidetogglemenu');
		$('.mobile_menu').slideToggle();
	});
	function windowsMinHeight() {
		var windowsHeight = $(window).height();
		$(".min_100vh").css({
			"min-height": windowsHeight
		});
		if ($("*").is(".wrap_press")) {
			var windowsHeight = $(window).height() - $(".wrap_footer").height();
			$(".min_100vh").css({
				"min-height": windowsHeight
			});
		}
	};

// for animation homepage
	function ofFset(section) {
		var posElem = section.offset();
		var windowsHeight = $(window).height()
		var whenShow = posElem.top - windowsHeight;

		var winOffcet = $(window).scrollTop();
		if (whenShow > winOffcet) {
			section.removeClass('animated');
		} else{
				section.addClass('animated');
		}
	};
	function varAnimate() {
		if ( $("*").is(".dev_top") ) {
			var section = $('.dev_top .forAnimation');
			ofFset(section);
		}
		if ( $("*").is(".malls") ) {
			var section = $('.malls .forAnimation');
			ofFset(section);
		}
		if ( $("*").is(".vision") && $("*").is(".exper")) {
			var section = $('.vision .forAnimation');
			ofFset(section);
			var section = $('.exper .forAnimation');
			ofFset(section);
		}
	};
	function scrollOpacity (){
		var elem = $(".opacityMove");
		var windowsHeight = $(window).height();
		var windowTopScroll = $(window).scrollTop();
		var posElem = elem.offset().top;
		var opacityToShow = (windowTopScroll+windowsHeight-posElem)/1100*2.1;
		var opacityToHide = 1+(1-((windowTopScroll+windowsHeight-posElem)/1100*2.1));
		if ( ((windowTopScroll+windowsHeight)>posElem)&&((windowTopScroll+windowsHeight/2)<posElem)&&(opacityToShow>0)&&(opacityToShow<0.8) ) {
			elem.css( "opacity", opacityToShow);
		} else if ( ((windowTopScroll+windowsHeight/2)>posElem)&&((windowTopScroll+windowsHeight/4)<posElem) ){
			elem.css( "opacity", "0.8");
		} else if ( ((windowTopScroll+windowsHeight/4)>posElem)&&(opacityToHide>0)&&(opacityToHide<0.8) ){
			elem.css( "opacity", opacityToHide);
		}else if ( ((windowTopScroll+windowsHeight)>posElem)&&((windowTopScroll+windowsHeight)<posElem) ){
			// elem.css( "opacity", "0.8");
		}else{
			// elem.css( "opacity", "0.8");
		}
	}

// END for animation homepage

	if (Modernizr.touchevents) {
		windowsMinHeight();
		// for animation homepage first&second section
		setTimeout(function(){
			var detailSection = $(".opacityMove");
			$(".first_home img").addClass("hiding")
			setTimeout(function(){
				$(".first_home img").replaceWith(detailSection)
				$(".company_details").remove();
				detailSection.addClass("showing")
					setTimeout(function(){
						detailSection.removeClass("showing")
					}, 100);
			}, 1000);
		}, 2000);
		// ENDfor animation homepage first&second section
	} else {

		if( $("*").is(".forAnimation") ) {
			varAnimate();
			$(window).resize(function() {
				varAnimate();
			});
			$(window).scroll(function() {
				varAnimate();
			});
		};
		if( $("*").is(".opacityMove") ) {
			scrollOpacity();
			$(window).resize(function() {
				scrollOpacity();
			});
			$(window).scroll(function() {
				scrollOpacity();
			});
		}
		if( $("*").is(".first_home") ) {
			var winHeight = $(window).height();
			var scrollTop = $(window).scrollTop();
			if (scrollTop>300) {
				console.log("300")
				$('.no-touchevents .home_header img').show("slow");
			}else if (scrollTop<300) {
				console.log("300")
				$('.no-touchevents .home_header img').hide("slow");
			}
			$(window).scroll(function() {
				var winHeight = $(window).height();
				var scrollTop = $(window).scrollTop();
				var offsetTop = $(".first_home img").offset().top;
				var logoHeight = $(".first_home img").height();
				var whenShow = logoHeight+offsetTop;
				if (scrollTop>whenShow) {
					$('.no-touchevents .home_header img').show("slow");
				}else if (scrollTop<whenShow) {
					$('.no-touchevents .home_header img').hide("slow");
				}
			});
		}
	};

// for developments page
	if (Modernizr.touchevents) {
		$(".item_slider").on("click", function(){
			$(this).toggleClass("opened");
		});
		$(".wrap_video video").remove();
	} else { /*if NO touch screen*/
		if( $("*").is(".swiper-container") ) {
			var mySwiper = new Swiper('.swiper-container', {
				direction: 'horizontal',
				initialSlide: 0,
				autoplay: false,
				slidesPerView: 3,
				paginationClickable: true,
				mousewheelControl: true,
				keyboardControl: true,
				nextButton: '.swiper_btn_next',
				prevButton: '.swiper_btn_prev'
			});

				var elemPT = $(".title_div");
				var heighElemPT = $(".title_div").height();
				var heighItem = $(".item_slider").height();
				var paddTop = heighItem-heighElemPT-140;
				var heighText = $(".text_div").css({"height":"auto"}).height();
				var heightLink = $(".link_progect").css({"height":"auto"}).height()

				$(".title_div").css("padding-top", paddTop)
				$(".item_slider").find(".text_div").css({"height": "0"})
				$(".item_slider").find(".link_progect").css({"height": "0"})

				$(".item_slider").on( "mouseenter", function() {
					$(this).find(".text_div").css({"height": heighText})
					$(this).find(".link_progect").css({"height": heightLink})
				});
				$(".item_slider").on( "mouseleave", function() {
					$(this).find(".text_div").css({"height": "0"})
					$(this).find(".link_progect").css({"height": "0"})
				});

			$(".item_slider").on( "mouseenter", function() {
				var currentWidth = $(this).width();
				var calcWidth = currentWidth/100*40 + currentWidth;
				var desiredWidth = calcWidth+ "px";
				var margin = currentWidth/100*20;

				// for hebrew
				if ($("body").css('direction') == "rtl") {
					if($( this ).is( ":first-child" ) ){
						$(this).css({
							"margin-right": 0,
							"margin-left": -margin*2,
							"width": desiredWidth
						})
						$(this).on( "mouseleave", function() {
							$(this).css({
								"margin-left":"0",
								"width": currentWidth
							})
						})
					}
					else if ($( this ).is( ":last-child" ) ){
						$(this).css({
							"margin-right": -margin*2,
							"margin-left": 0,
							"width": desiredWidth
						})
						$(this).on( "mouseleave", function() {
							$(this).css({
								"margin-right":"0",
								"width": currentWidth
							})
						})
					}else{
						$(this).css({
							"margin-left": -margin,
							"margin-right": -margin,
							"width": desiredWidth
						})
						$(this).on( "mouseleave", function() {
							$(this).css({
								"margin-left":"0",
								"margin-right":"0",
								"width": currentWidth
							})
						})
					}
				}
				// END for hebrew

				// For english
				else{
					if($( this ).is( ":first-child" ) ){
						$(this).css({
							"margin-left": 0,
							"margin-right": -margin*2,
							"width": desiredWidth
						})
						$(this).on( "mouseleave", function() {
							$(this).css({
								"margin-right":"0",
								"width": currentWidth
							})
						})
					}else if ($( this ).is( ":last-child" ) ){
						$(this).css({
							"margin-left": -margin*2,
							"margin-right": 0,
							"width": desiredWidth
						})
						$(this).on( "mouseleave", function() {
							$(this).css({
								"margin-left":"0",
								"width": currentWidth
							})
						})
					}else{
						$(this).css({
							"margin-left": -margin,
							"margin-right": -margin,
							"width": desiredWidth
						})
						$(this).on( "mouseleave", function() {
							$(this).css({
								"margin-left":"0",
								"margin-right":"0",
								"width": currentWidth
							})
						})
					}
				};
				// END for english
			});
		}
		$( ".video_bg" ).on("ended", function() {
			var winHeight = $(window).height();
			var scrollTop = $(window).scrollTop();
			if (scrollTop<winHeight) {
				$('html, body').animate({scrollTop: winHeight}, 800);
			}
		});
	};/*END if NO touch screen*/
	if( $("*").is(".dev_progect_swiper") ) {
			var mySwiper = new Swiper('.dev_progect_swiper', {
				direction: 'horizontal',
				initialSlide: 0,
				autoplay: false,
				slidesPerView: 1,
				paginationClickable: true,
				keyboardControl: true,
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev'
			});
		}


//for about page
	//custom Scrollbar
	// $(window).on("load",function(){
	//     $(".content-scroll").mCustomScrollbar();
	// });

	//open description user menu
	$ ('.user-box').click(function () {
		$ ('.user-box').removeClass('descriptionmenu');
		$(this).addClass('descriptionmenu');
	});

	//when personal area is open > click everywhere on screen should close it
	$(document).click(function (event) {  
		if ($(event.target).closest('.user-box').length == 0) {   
			$('.user-box').removeClass('descriptionmenu');  
		} 
	});


var mobileLogoPlayInt = null;
function mobileLogoPlay() { 
	if (window.matchMedia('(max-width: 992px)').matches) {  
		$('.partners-logo').removeClass('active-img');  
		$('.partners-logo').first().addClass('active-img');  
		clearInterval(mobileLogoPlayInt);  
		mobileLogoPlayInt = setInterval(function(){   
			var selectedItem = $('.logo-container').find('.active-img');   
			$('.partners-logo').removeClass('active-img');   
			selectedItem.next().addClass('active-img');   
			if($('.partners-logo').last().hasClass('active-img')){    
				setTimeout(function(){     
					$('.partners-logo').first().addClass('active-img');    
				},2000);   
			}  
		},2000); 
	}else{  
		$('.partners-logo').removeClass('active-img'); 
	};
};
mobileLogoPlay();

$(window).resize(function(){ 
	mobileLogoPlay();
});




//for Malls page
if( $("*").is(".malls-slider-box") ) {
	var mySwiper = new Swiper('.malls-slider-box', {
		direction: 'horizontal',
		mousewheelControl: false,
		keyboardControl: true,
		speed: 800,
		paginationClickable: true,
	    pagination: '.malls-swiper-pagination',
	    nextButton: '.swiper-button-next',    
	    prevButton: '.swiper-button-prev'
	}); 
}



	//prev pagination
	$(".swiper-button-prev").on('mouseover', function() {
	    $(".malls-swiper-pagination").addClass('reset-left-pagination');
	    $(this).addClass('color-arrow');
			$(".reset-left-pagination").on('mouseover', function() {
				$(".malls-swiper-pagination").removeClass('reset-right-pagination');
				$(".swiper-button-next").removeClass('color-arrow');

				$(".malls-swiper-pagination").addClass('reset-left-pagination');
				$(".swiper-button-prev").addClass('color-arrow');
			}).on('mouseout', function() {
				$(".malls-swiper-pagination").removeClass('reset-left-pagination');
				$(".swiper-button-prev").removeClass('color-arrow');
			})
		})
		.on('mouseout', function() {
		    $(".malls-swiper-pagination").removeClass('reset-left-pagination');
		    $(this).removeClass('color-arrow');
		});
	 //next pagination
	$(".swiper-button-next").on('mouseover', function() {
	    $(".malls-swiper-pagination").addClass('reset-right-pagination');
		$(this).addClass('color-arrow');
		$(".reset-right-pagination").on('mouseover', function() {
			$(".malls-swiper-pagination").removeClass('reset-left-pagination');
			$(".swiper-button-prev").removeClass('color-arrow');
			$(".malls-swiper-pagination").addClass('reset-right-pagination');
			$(".swiper-button-next").addClass('color-arrow');
		}).on('mouseout', function() {
			$(".malls-swiper-pagination").removeClass('reset-right-pagination');
			$(".swiper-button-next").removeClass('color-arrow');
		})
	})
	.on('mouseout', function() {
	    // $(".malls-swiper-pagination").addClass("temp");
	    $(".malls-swiper-pagination").removeClass('reset-right-pagination');
	    $(this).removeClass('color-arrow');
	 //  	setTimeout(function(){
		// 	$(".malls-swiper-pagination").removeClass("temp");
		// },300);
	});

 
	function mobileShMarkerGlow () {
		if (window.matchMedia('(max-width: 992px)').matches) {
			$('.marker_box').addClass('active-glow');
				setInterval(function(){
					$('.marker_box').addClass('active-glow');
				    	setTimeout(function(){
				    		$('.marker_box').removeClass('active-glow');
				    	},3000); 
				},6000); 
		}else{
			$('.marker_box').removeClass('active-glow');
		};
	};
	mobileShMarkerGlow();
	$(window).resize(function() {
		mobileShMarkerGlow();
	});

});