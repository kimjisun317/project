$(document).ready(function(){
	$("#header").load("cni/header.html");
	$("#footer").load("cni/footer.html");
	
 });

/* main_slider */
$(function(){
	$('.bxslider').bxSlider({
	  mode: 'horizontal',
	  speed : 1000,
	  auto : true,
	  autoControls: true,
	  controls : true
	});
});

/* layer_campaign */
function layer_View(status){
	eval('$("#layer_View_box").' + status + '();');
	/* campaign_slider */
	var swiper = new Swiper('.campaign_swiper', { 
	slidesPerView: 1,
	spaceBetween: 0,
	slidesPerGroup: 1,
	direction: "horizontal",
	loop : true,
	loopFillGroupWithBlank: true,
	pagination: {el: '.swiper-pagination', clickable: true},
	navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
	roundLengths: true,
	// 반응형 >= 650
	breakpointsInverse: true, 
	breakpoints: {767: {slidesPerView: 3, spaceBetween: 30, slidesPerGroup: 3}, 650: {slidesPerView: 2, spaceBetween: 30, slidesPerGroup: 2}}
	});
};

/* media_slider */
$(function(){
var swiper = new Swiper('.media_swiper', { 
	slidesPerView: 1,
	spaceBetween: 0,
	slidesPerGroup: 1,
	direction: "horizontal",
	loop : true,
	autoplay: false, /* {delay: 2500, disableOnInteraction: false, } */
	pagination: {el: '.swiper-pagination', clickable: true},
	navigation: {nextEl: '.media-button-next', prevEl: '.media-button-prev'},
	roundLengths: true,
	breakpointsInverse: true, 
	breakpoints: {767: {slidesPerView: 4, spaceBetween: 30, slidesPerGroup: 4}, 650: {slidesPerView: 2, spaceBetween: 30, slidesPerGroup: 2}}
});
});



