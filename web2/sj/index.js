$(document).ready(function(){
	$("#header").load("cni/header.html", function () {
		//헤더캘린더
		$('.calendar_bxslider').bxSlider({
			mode: 'horizontal',
			speed : 1000,
			auto : true,
			autoControls: true,
			controls : true,
			pager : false,
		  });
	});
	$("#footer").load("cni/footer.html", function () {
		//푸터관련사이트	
		$('.footer_bottom a').click(function () {
			$(this).toggleClass('openbox');
			$(this).next("p").slideToggle(300);
		});
	});

	$(".quickFix").load("cni/quick.html", function () {
		//quickmenu
		$(window).scroll(function () {
			if ($(window).scrollTop() == $(document).height() - $(window).height()) {
				lastPostFunc();
			}
			else {
				lastPostFunc2();
			}
		});
		function lastPostFunc() {
			$('.quickFix').css('margin-bottom', '250px'); //250
		};
		function lastPostFunc2() {
			$('.quickFix').css('margin-bottom', '250px'); //250
		};
	});
	
});

//menu
$(window).on('load resize', function(){	
	// for Tab, Mobile
	if($(window).width() <= 768){
		$('.layerGnb').hide();
		var cntW = $('.layerGnb .wrapCnt').width();

		$('#header .btnToggleMn').on('click', 'a', function(){
			var m_ckHei = $(window).height()-$("#header").height()-5;
			$("#wrap").css({"height":m_ckHei+"px"});
			$('html').addClass('noScroll');
			$('.layerGnb').show();
			$(this).addClass('btnClose');
			$('.layerGnb .wrapCnt').show().css('left' , -cntW).stop().animate({'left': 0}, 250 ,"easeInOutExpo");
			
			$('#gnb .depth2').hide();
			$("#gnb .on").parent().css("display","block");
			$("#gnb .on").parent().parent().parent().css("display","block");
			
			var position = $(".on").offset();
			$('.wrapCnt').animate({scrollTop:position.top},100);			
		});

		$('.layerGnb').on('click', function(e) {
			$("#wrap").css({"height":"auto"});	
			var target = $(e.target);
			if( ! target.closest('.layerGnb .wrapCnt').length){	
		 		$('html').removeClass('noScroll');
		 		$('.layerGnb .wrapCnt').stop().animate({'left': -cntW}, 250 ,"easeInOutExpo");
		 		$('.layerGnb').fadeOut(800);
	 		}
		});
		
		// snb menu
		var gnb = $('#header .gnb li a');
		var depth2 = $('#gnb .depth2');
		var depth3 = $('#header .gnb .depth2 .depth3');
		gnb.off('mouseenter focus');
		depth2.hide();
		depth3.hide();		

		gnb.click(function(){

			$(this).next('.depth2').slideDown('fast');

			if($(this).next().length != '0'){
				$('.wrapCnt').animate({scrollTop: $(this).offset().top},100);
				depth2.hide();	
				depth3.hide();	
				$(this).parent().css("display","block");
				$(this).parent().parent().css("display","block");
				$(this).next("ul").show();
				
				return false;
			}else{
				depth2.hide();
				//return false;
				return true;
			}			
		});
	}

	// for PC
	else{
		var gnb = $('#header .gnb li a');
		var depth2 = $('#header .gnb .depth2');
		var snb = $('#header .gnb .depth2 li a');
		$('.layerGnb').show();

		$('#header .gnb .depth2').css("display","none");

		gnb.on('mouseenter focus' , function(){
			var i = $(this).parent('li').index() + 1;
			gnb.parent().removeClass('active');
			$(this).parent().addClass('active');
			depth2.show();
			$('.bgLayer').show();
		});
		gnb.click(function(){
			return true;
		});

		$('#header').on('mouseleave blur' , function(){
			depth2.removeClass('on').hide();
			$('.bgLayer').hide();
		});
		snb.on('mouseenter focus' , function(){
			$(this).parents('.depth2').addClass('on');
			gnb.parent().removeClass('active');
			$(this).parents('.depth2').parents('li').addClass('active');
		});
		snb.on('mouseleave blur' , function(){
			$(this).parents('.depth2').removeClass('on');
			gnb.parent().removeClass('active');
		});
	}
});

//메인팝업
$(function(){
	$('.bxslider').bxSlider({
	  mode: 'horizontal',
	  speed : 1000,
	  auto : true,
	  autoControls: true,
	  controls : true
	});
});

//캠페인레이어
function layer_View(status){
	eval('$("#layer_View_box").' + status + '();');
	/* 캠페인슬라이더 */
	var swiper = new Swiper('.campaign_swiper', { 
	slidesPerView: 1,
	spaceBetween: 0,
	slidesPerGroup: 1,
	direction: "horizontal",
	loop : true,
	loopFillGroupWithBlank: true,
	pagination: {el: '.campaign-pagination', clickable: true},
	navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
	roundLengths: true,
	// 반응형 >= 1024
	breakpointsInverse: true, 
	breakpoints: {1024: {slidesPerView: 3, spaceBetween: 30, slidesPerGroup: 3}, 640: {slidesPerView: 2, spaceBetween: 30, slidesPerGroup: 2}}
	});
};

//상영일정슬라이더
$(function(){
	var swiper = new Swiper('.schedule_swiper', { 
	slidesPerView: 3,	
	slidesPerGroup: 3,
	/* spaceBetween: 0, */
	direction: "horizontal",
	/* loop : true, */
	autoplay: false,
	navigation: {nextEl: '.schedule-button-next', prevEl: '.schedule-button-prev'},
	roundLengths: true,
	// 반응형 >= 1250
	breakpointsInverse: true, 
	breakpoints: {1041: {slidesPerView: 11, slidesPerGroup: 11}, 
				  767: {slidesPerView: 7, slidesPerGroup: 7}}
	});
});

//미디어슬라이더
$(function(){
	var swiper = new Swiper('.media_swiper', { 
	slidesPerView: 1,
	spaceBetween: 0,
	slidesPerGroup: 1,
	direction: "horizontal",
	loop : true,
	autoplay: false,
	pagination: {el: '.swiper-pagination', type: 'fraction',},
	navigation: {nextEl: '.media-button-next', prevEl: '.media-button-prev'},
	roundLengths: true,
	// 반응형 >= 1250
	breakpointsInverse: true, 
	breakpoints: {1250: {slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4}, 1024: {slidesPerView: 3, spaceBetween: 30, slidesPerGroup: 3}, 640: {slidesPerView: 2, spaceBetween: 30, slidesPerGroup: 2}}
	});
});
