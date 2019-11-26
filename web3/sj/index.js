$(document).ready(function(){
	$("#header").load("cni/header.html");
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
  
		// Load Boats
		if (obj.hasClass('btn-load-boats')) {
		   if (!$('.load-boats-box').hasClass('open')) {
			  $('.load-boats-box').slideToggle(1000);
			  setTimeout (function () {
				 $('.load-boats-box').addClass('open');
			  }, 700);
		   }
		}
  
		// Load Boats
		if (obj.hasClass('btn-load-destination')) {
		   if (!$('.load-destinations-box').hasClass('open')) {
			  $('.load-destinations-box').slideToggle(1000);
			  setTimeout (function () {
				 $('.load-destinations-box').addClass('open');
			  }, 700);
		   }
		}
	 });

	 $(document).ready(function () {
		setTimeout(function () {
		   $('body').addClass('dom-ready');
		}, 300);
	 });
}



//펼침 레이어
function layer_View(status){
	eval('$("#layer_View_box").' + status + '();');
}

