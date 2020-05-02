$(window).on('load',function(){

    //Checkbox & Radio
    if($('.form-checkbox').length > 0){
        checkBox_Ck();//checkbox
    }
    if($('.form-radio').length > 0){
        radioBtn_Ck();//radio
    }
    if($('.form-radio-category').length > 0){
        radioBtnCate_Ck();//radio
    }

    //사이드 바
    $('.area-header .btn-navigation button').on('click',function(){
        $('body').addClass('active-sidebar');
    });
    $('.btn-sidebar-close button').on('click',function(){
        $('body').removeClass('active-sidebar');
    });

    //일반 탭
    $('.box-tab-head button').on('click',function(){
        tabType1($(this))
    });

    //서브 탭
    $('.box-tab-sub-head button').on('click',function(){
        tabType2($(this))
    });

    //헤더 카테고리 레이어
    $('.area-header .title button').on('click',function(){
        categoryArea($(this))
    });

    //아코디언
    $('.ui-accordion dt').on('click',function(){
        AccordionUI($(this))
    });

    //상품상세보기
    $('.product-moreview button').on('click',function(){
        if($('.product-moreview').hasClass('on') != 1){
            $('.product-moreview button').parent().addClass('on')
            $(this).closest('.contain-product2').height('auto');
        }else{
            $('.product-moreview button').parent().removeClass('on')
            $(this).closest('.contain-product2').height('210');
        }
    });

    //도움말 팝업
    if($('.box-help').length > 0){
        $('.btn-help button').on('click',function(){
            var thisClass = $(this).attr('class')
            var compNum = $(window).width() - $(this).offset().left
            var posX = $(this).offset().left - 7
            var posR = compNum - 20
            var posY = $(this).offset().top + 22
            console.log(posX)
            $('.box-help').hide()
            if(posX > $(window).width()/2){
                $('.box-help.' + thisClass).addClass('rtl');
                $('.box-help.' + thisClass).css({
                    'display':'block',
                    'left': 'auto',
                    'right':posR,
                    'top':posY,
                });
            }else{
                $('.box-help.' + thisClass).css({
                    'display':'block',
                    'left':posX,
                    'right':'auto',
                    'top':posY,
                });
            }
            return false
        });
        $(document).on('click',function(e){
            if(e.target.className =="btn-help"){return false}
            $('.box-help').hide();
        });
    }

    //팝업 위치
    if($('.layer-popup2').length > 0){
        posPopup()
    }else{}

    //팝업 닫기
    $('.layer-popup1 .btn-close').on('click',function(){
        closePopup1($(this));
    });
    $('.layer-popup2 .btn-close').on('click',function(){
        closePopup2($(this));
    });

    //SNS 공유
    $('.btn-share button').on('click',function(){
        $('.layer-popup2.infor1').addClass('active');
        posPopup()
        scrollDisable()
    })

    //footer-사업자정보확인 팝업 
    $(".business_popup button").on("click", function () {
		$('.business_popup_box').toggleClass('active');
    });

    //제품 인기순 등 정렬 팝업
    $('.box-category-more > button').on("click", function () {
        $('.box-category-inner').toggleClass('active');
    });

    //댓글 수정/삭제 팝업
    $('.box-comment-more > button').each(function(i){
        $(this).on("click", function(e){
            e.preventDefault();
            $(".box-comment-inner").eq(i).toggleClass("active");
        });
    });

});

var curentScrollTop = 0;
$(window).on('scroll',function(event){
    scrollAction()
});

$(window).on('resize',function(event){

})

function checkBox_Ck(){//체크박스
    var objCheckbox = $('.form-checkbox');
    objCheckbox.each(function(){
        if($(this).find('input[type=checkbox]').is(':checked')){
            $(this).addClass('checked')
        }
    });
    objCheckbox.on('click', function(){
        if($(this).find('input[type=checkbox]').is(':checked')){
            $(this).addClass('checked');
            $(this).find('input[type=checkbox]').attr('checked',true);
        }else{
            $(this).removeClass('checked');
            $(this).find('input[type=checkbox]').attr('checked',false);
        }
    });
}

function radioBtn_Ck(){//라디오
    $('.form-radio').on('click',function(){
        sameName = $(this).find('input').attr('name');
        $('input:radio[name="' + sameName + '"]').parent().removeClass('checked')
        $('input:radio[name="' + sameName + '"]').attr('checked', false)
        $(this).addClass('checked');
        $(this).find('input').attr('checked', true)
    });
}

function radioBtnCate_Ck(){//라디오-카테고리
    $('.form-radio-category').on('click',function(){
        sameName = $(this).find('input').attr('name');
        $('input:radio[name="' + sameName + '"]').parent().removeClass('checked')
        $('input:radio[name="' + sameName + '"]').attr('checked', false)
        $(this).addClass('checked');
        $(this).find('input').attr('checked', true)
    });
}

function scrollAction(){//스크롤 시 헤더 가리기
    if($(window).scrollTop() < 0 || $(window).scrollTop() < curentScrollTop || $(window).scrollTop() == $(document).innerHeight() - $(window).height()){
        $('body').removeClass('active');
        curentScrollTop = $(window).scrollTop();
    }else{
        if($(window).scrollTop() != 0){
            $('body').addClass('active');
        }else{
            $('body').removeClass('active');
        }
        curentScrollTop = $(window).scrollTop();
    }
}

function categoryArea(actBtn){//카테고리 서브 레이어
    if($('.area-category').hasClass('on') != 1){
        actBtn.addClass('on')
        $('.area-category').addClass('on');
        $('.area-category').css({'height':$('.area-category .area-inner').height() + 41})
    }else{
        actBtn.removeClass('on')
        $('.area-category').removeClass('on');
        $('.area-category').css({'height':0})
    }
}

function AccordionUI(curruntTag){//아코디언 UI
    vHeight = curruntTag.siblings('dd').find('>div').height() + 45
    if(curruntTag.parent().hasClass('on') == 0){
        $('.ui-accordion dl').removeClass('on');
        $('.ui-accordion dd').css({'height':'0'})
        curruntTag.parent().addClass('on');
        curruntTag.siblings('dd').css({'height':vHeight})
    }else{
        curruntTag.parent().removeClass('on');
        curruntTag.siblings('dd').css({'height':'0'})
    }
}

function tabType1(tabTag1){//탭
    var tabNum1 = tabTag1.parent().index() + 1 ;
    $('.box-tab-head button').parent().removeClass('on');
    tabTag1.parent().addClass('on');
    tabTag1.closest('.box-tab-head').siblings('.box-tab-body').removeClass('on')
    tabTag1.closest('.box-tab-head').siblings('.box-tab-body.tab' + tabNum1).addClass('on')
    $('html, body').animate({scrollTop: tabTag1.offset().top}, 500);


}

function tabType2(tabTag2){//서브 탭
    var tabNum2 = tabTag2.parent().index() + 1 ;
    $('.box-tab-sub-head button').parent().removeClass('on');
    tabTag2.parent().addClass('on');
    tabTag2.closest('.box-tab-sub-head').siblings('.box-tab-sub-body').removeClass('on')
    tabTag2.closest('.box-tab-sub-head').siblings('.box-tab-sub-body.subtab' + tabNum2).addClass('on')
    $('html, body').animate({scrollTop: tabTag2.offset().top}, 500);
}

//팝업 위치
function posPopup(){
    $('.layer-popup2').each(function(){
        var winHeight = $(window).height() / 2
        var popPopY = winHeight - 30 - $(this).find('.layer-inner').height() / 2
        $(this).find('.layer-inner').css({'top':popPopY});
    });
}

function closePopup1(popup1){//팝업 닫기
    popup1.closest('.layer-popup1').removeClass('active');
    scrollAble()
}

function closePopup2(popup2){//팝업 닫기
    popup2.closest('.layer-popup2').removeClass('active');
    scrollAble()
}

function scrollDisable(){//본문 스크롤 막기
    $('body').addClass('scrollDisable').on('scroll touchmove mousewheel', function(e){
        e.preventDefault();
    });
}
function scrollAble(){//본문 스크롤 풀기
    $('body').removeClass('scrollDisable').off('scroll touchmove mousewheel');
}