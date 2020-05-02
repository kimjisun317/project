//스와이프 탭 - Swiper
if($('div[class^="box-tab-"].swiper-container').length > 0){
    var tebSwiper = new Swiper('div[class^="box-tab-"].swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
    });
}else{}

//제품 상세이미지 - Swiper
if($('.box-image-product1.swiper-container').length > 0){
    var productSwiper = new Swiper('.box-image-product1.swiper-container', {
        pagination: {
            el: '.box-image-product1 .swiper-pagination',
            type: 'fraction',
        }
    });
}else{}

//베스트 후기 - Swiper
if($('.box-latter-best.swiper-container').length > 0){
    var letterBestSwiper = new Swiper('.box-latter-best.swiper-container', {
        centeredSlides: true,
        pagination: {
            el: '.box-latter-best .swiper-pagination',
            type: 'fraction',
        }
    });
}else{}

//다른고객이 본 상품 - Swiper
if($('.box-othercustomer.swiper-container').length > 0){
    var othderCustomerSwiper = new Swiper('.box-othercustomer.swiper-container', {
        slidesPerView: 2,
        spaceBetween: 15,
        navigation: {
            nextEl: '.box-othercustomer.swiper-container .swiper-button-next',
            prevEl: '.box-othercustomer.swiper-container .swiper-button-prev',
        },
    });
}else{}

//전시매장 팝업존 - Swiper
if($('.box-popup-store.swiper-container').length > 0){
    var storeSwiper = new Swiper('.box-popup-store.swiper-container', {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination', 
            clickable: true,
        }
    });        
}else{}

//전시매장 팝업존 - 재생/중지
$('.btn-play').on('click', function(){
    $(this).siblings().removeClass('on');
    $(this).addClass('on');
    storeSwiper.autoplay.start();
    return false;
});
$('.btn-stop').on('click', function(){
    $(this).siblings().removeClass('on');
    $(this).addClass('on');
    storeSwiper.autoplay.stop();
    return false;
});

//전시매장 카테고리 - Swiper
if($('.box-store-category.swiper-container').length > 0){
    var tebSwiper = new Swiper('.box-store-category.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
    });
}else{}




