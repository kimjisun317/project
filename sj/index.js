
$(document).ready(function() {
	var $body = $("body");
	if($body.outerWidth() > 1024){
		main63();
		setHeight();
	}
	
	

	/* $(window).resize(function() {		
		setHeight();		
	}); */ //이부분 없애야 하는지 헷갈림, 도메인올리고 노트북, 모바일로 봤을 때 확인해보고 문제없으면 삭제

	
	
});



// 메인높이값세팅
function setHeight(){
	var wH = $(window).innerHeight();
	$(".idx_content").css("height",wH);
}





//63빌딩 index 장면전환
function main63(){
	var brand = $('.index');
	var wrap = $(brand).find('ul.idx_content');
	var depth1 = $(brand).find('ul.idx_content > li');
	var total = $(depth1).size()-1;
	var idx;
	var spd = 950;
	var eft = 'easeInOutQuint';
	var idxWrap = $('#wrap');

	// setting
	idx = 0;
	depth1.eq(0).css('top','0')
	// depth1.eq(0).find('.cont').css('top','0')
	depth1.each(function(index){
		$(this).css('zIndex',''+(total-index)+'')
	})

	fullPage();
	function fullPage(){//mousewheel
		var wheeling = true;
		$(".idx_content").on('wheel',function(event){
			var wheelCk = 0;
			if(event.originalEvent.deltaY > 0){ //마우스휠의 스크롤여부 확인
				wheelCk = -1 //마우스휠을 아래로할 경우 -1
			}else{
				wheelCk = 1 // 마우스휠이 0보다 위면(즉,마이너스) 1
			}

			if(depth1.is(":animated")){
				return false; //함수가 종료되고 값(false)를 호출한 곳으로 돌려줌
			}else{
				var pidx = idx;
				if(wheelCk >= 0){ //0보다 크거나 같다 = 마우스휠을 안움직이거나 더 위로 할 경우
					if($(idxWrap).hasClass('scroll')){
						if($(window).scrollTop() == 0 ){ //스크롤의 현재위치가 0과 같다면
							$(idxWrap).removeClass('scroll')
						}
						wheeling = false;

						setTimeout(function() {
							wheeling = true;
						},100); //0.1초만에 트루로 다시바꿈
					}else{
						if (wheeling == true) {
							sectionUp();
						}
					}
				}else{ // 마우스휠이 아래로 내려올 경우 = -1일때
					sectionDown();
					if(pidx == 3){
						$(idxWrap).addClass('scroll');
					}
				}
			}
			depth1.eq(idx).addClass('active').siblings('li').removeClass('active');
			$('.ind span').eq(idx).siblings('span').removeClass('active') //롤링아이콘
			$('.ind span').eq(idx).addClass('active')
		})
	}

	function sectionUp(){//mousewheel UP
		var preIdx = idx;
		if(idx <= 0){
			idx = 0;
			return false;
		}else{
			idx--;
		}
		$(depth1).eq(preIdx).stop(true,false).animate({'top':'60%'},spd,eft);
		$(depth1).eq(idx).stop(true,false).animate({'top':'0%'},spd,eft);
		$(depth1).eq(idx).find('.section_wrap').stop(true,false).animate({'top':'0%'},spd,eft);
	}

	function sectionDown(){//mousewheel DOWN
		var preIdx = idx;
		if(idx >= total){
			idx = total;
			return false;
		}else{
			idx++;
		}
		$(depth1).eq(preIdx).stop(true,false).animate({'top':'-100%'},spd,eft);
		$(depth1).eq(preIdx).find('.section_wrap').stop(true,false).animate({'top':'60%'},spd,eft);
		$(depth1).eq(idx).stop(true,false).animate({'top':'0%'},spd,eft);
	}

	clickNav();
	function clickNav(){ //인디게이터 클릭 애니메이션
		$(".ind").on("click", "span", function(e) {
			var preIdx = idx;
			idx = $(this).index();

			var $this = $(this),
				 section = $(".idx_content li");

			$this.addClass("active").siblings().removeClass("active");

			if(preIdx > idx){//Up
				$(".idx_content li:gt("+idx+")").stop(true,false).animate({'top':'60%'},spd,eft);
				section.eq(idx).addClass('active').stop(true,false).animate({'top':'0%'},spd,eft).siblings().removeClass("active");
				section.eq(idx).find('.section_wrap').stop(true,false).animate({'top':'0%'},spd,eft);
				$(".index_wrap").removeClass("scroll");
				console.log('up');
			}else{//Down
				$(".idx_content li:lt("+idx+")").stop(true,false).animate({'top':'-100%'},spd,eft);
				$(".idx_content li:lt("+idx+")").find('.cont').stop(true,false).animate({'top':'60%'},spd,eft);
				section.eq(idx).addClass('active').stop(true,false).animate({'top':'0%'},spd,eft).siblings().removeClass("active");
				section.eq(idx).find('.section_wrap').stop(true,false).animate({'top':'0%'},spd,eft);
				console.log('down');
			}
		});
	}
}

