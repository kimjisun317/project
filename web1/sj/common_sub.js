$(document).ready(function(){
	$("#header").load("/cni/header_sub.html");
	$("#footer").load("/cni/footer.html");
 });

/* menu */
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