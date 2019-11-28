$(document).ready(function(){
	$("#header").load("cni/header.html", function () {
		mobile_menu();
	});
	$("#footer").load("cni/footer.html");
	$("#portfolio").load("cni/portfolio.html", function() {
		tab('#tab',0);
		more();
	}); 
	
	
	
	
 });   

 //포트폴리오_탭메뉴
 function tab(e, num){
	var num = num || 0;
	var menu = $(e).children();
	var con = $(e+'_con').children();
	var select = $(menu).eq(num);
	var i = num;
	select.addClass('on');
	con.eq(num).show();
	menu.click(function(){
	   if(select!==null){
		   select.removeClass("on");
		   con.eq(i).hide();
	   }
	   select = $(this); 
	   i = $(this).index();
	   select.addClass('on');
	   con.eq(i).show();
	});
}

//포트폴리오_loadmore
function more() {
	$('.btn-default').on('click', function (e) {
		e.preventDefault();
		var obj = $(this);
  
		obj.addClass('active');
  
		setTimeout(function () {
		   obj.removeClass('active');
		}, 1500);
  
		// Load portfolio
		if (obj.hasClass('btn-load-portfolio')) {
		   if (!$('.load-portfolio-box').hasClass('open')) {
			  $('.load-portfolio-box').slideToggle(100);
			  setTimeout (function () {
				 $('.load-portfolio-box').addClass('open');
			  }, 700);
		   }
		}
	 });

}



//펼침 레이어
function layer_View(status){
	eval('$("#layer_View_box").' + status + '();');
}

//모바일 메뉴
function mobile_menu() {	
	
	/* var handler = function(e){
		e.preventDefault();
	} */
	
	function wrapWindowByMask(){
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		
		/* 메뉴여백에 배경 있을 경우 
		$('#mask').css({'width':maskWidth,'height':maskHeight});  
		$('#mask').fadeTo("slow",0.6); */

	}

	var allmenuWidth = $(window).width();
	$('.mobile_menu').css({'left' : -allmenuWidth});
	$(".btn_menu.open").click(function(e){
		

		$("body").css("overflow-y","hidden");
		$(".mobile_menu").css("display","block");
		
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			//$('#wrap').css('height','100%');
			e.preventDefault();
			$('#mask').hide();
			$(".mobile_menu").animate({left:-allmenuWidth},200);

		} else {
			$(this).addClass("active");
			e.preventDefault();
			wrapWindowByMask();
			$('#mask').css({'background' : 'none' , "margin-left" : "210px"});
			$(".mobile_menu").animate({left:0},200);
		}

		return false;
	});

	$('.btn_menu.close').click(function(){
		$("body").css("overflow-y","auto"); /*원래 overflow*/
		$(".mobile_menu").animate({left:-allmenuWidth},200);
		$(".mobile_menu").css("display","none");
		$(".btn_menu.open").removeClass("active");
		$('#mask').css({'background' : '#000' , "margin-left" : "0px"});
		$('#mask').hide();
		
		return false;
	});
	
	
	/* 메뉴 여백 클릭할 경우  
	$('#mask').click(function () {  
		$(this).css({'background' : '#000' , "margin-left" : "0px"});
		$(this).hide();
		$("body").css("overflow","auto");
		$(".mobile_menu").animate({left:-allmenuWidth},200);
		$(".mobile_menu").css("display","none");
		$(".btn_menu.open").removeClass("active");
		$(".search_open").removeClass("active");
		$(this).parent().parent().find(".search_area").hide();
		$(window).unbind('touchmove', handler);
	}); */
};