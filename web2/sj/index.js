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
			//$(this).next("ul").toggleClass('openbox');
			$(this).next("p").slideToggle(300);
		});
	});
	
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



