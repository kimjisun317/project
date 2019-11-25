$(document).ready(function(){
	$("#header").load("cni/header.html");
	$("#footer").load("cni/footer.html");
	$("#portfolio").load("cni/portfolio.html", function() {
		tab('#tab',0);
	}); 
	
 });   
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




