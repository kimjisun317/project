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

//펼침 레이어
function layer_View(status){
	eval('$("#layer_View_box").' + status + '();');
}