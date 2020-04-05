(function($){


    var win_sTop = $(window).scrollTop();
        if( win_sTop > 0){
            $('header').addClass('fixed');
        }else{

            $('header').removeClass('fixed');
        }


    $(window).scroll(function(){
        var win_sTop = $(window).scrollTop();

        if( win_sTop > 0){
            $('header').addClass('fixed');
        }else if( win_sTop == 0){

            $('header').removeClass('fixed');
        }else{

            $('header').removeClass('fixed');
        }
    });

    $(document).on('click', '.depth h3 a', function(e){ 
        e.preventDefault();
        
        var $this = $(this);
        $this.parents('h3').next('ul').slideToggle();

    });


    $(document).on('click', '.footTop .group_company h3', function(){
        var $this = $(this);
        $this.find('ol').slideToggle().toggleClass('target_html');


    });

  

    $(window).resize(function(){

       



        var winW = $(window).width();
        var subTop = $('.sub_top');
        var subTop_h = winW * 0.45;//0.45;
        //console.log(winW)
        if( winW < 743){
            subTop.height(subTop_h+'px');
            header_Active();

        }else if(winW < 920 ){ // 2019-09-23 수정 수치조정
            header_Active();
            subTop.height('344px')  ;
        }else if(winW < 1900 && $('body').hasClass('mobile') ){
        	header_Active();
            subTop.height('344px')  ;
        }else{

            subTop.height('344px')  ;
            $('header .hdInner .menu').removeClass('on active');
            $(document).off('click', 'header .hdInner .menu');
            $('header').removeClass('active');
            $('.m_allmenu').stop().slideUp();
            $('html,body').css({
                "overflow": "visible",
                "width": "auto",
                "height": "auto"
            });
            
        }
        mobileChk();


    }).resize();

    function mobileChk(){

// 2019-09-23 수정 시작
     var filter = "win16|win32|win64|mac|macintel|iPad"; 
        if ( navigator.platform ) {
            if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) { //mobile alert('mobile 접속'); 
                    header_Active(); 
                    $('body').removeClass();
                    $('body').addClass('mobile')

            } else { 
                console.log('pc 접속');
                $('body').removeClass();
                $('body').addClass('pc')

            }
        }
// 2019-09-23 수정 끝
   }

    mobileChk();


})(jQuery);

function header_Active(){ 
    $(document).off('click', 'header .hdInner .menu');
    $(document).on('click', 'header .hdInner .menu', function(e){  
        e.preventDefault(); // 2019-09-23 이벤트 막음
        if($(this).hasClass('on')){
            $(this).removeClass('on active')
            $('header').removeClass('active');
            $('.m_allmenu').stop().slideUp();
            $('header').removeClass('fixed');
           
            $('html,body').css({
                "overflow": "visible",
                "width": "auto",
                "height": "auto"
            })

        }else{
            $(this).addClass('on active')
            $('header').addClass('active');
            $('.m_allmenu').stop().slideDown();
            $('html,body').css({
                "overflow": "hidden",
                "width": "100%",
                "height": "100%"
            })
        }
    });
    $(document).off('click', '#header .m_allmenu dl dt a');
    $(document).on('click','#header .m_allmenu dl dt a', function(e){
        e.preventDefault();
        var $this = $(this);
        if($this.parents('dt').next('dd').css('display') == 'none'){
            $('header.active dt').removeClass('on');
            $('header.active dd').slideUp();
            $this.addClass('on');
            $this.parents('dt').next('dd').stop().slideDown();
        }else{
            $('header.active dt').removeClass('on');
            $('header.active dd').slideUp();

        }
        

    })
}
  


/********************************************************************************************
 * 태그생성 공통함수
 ********************************************************************************************/
function createTag (option) {
   var $el = $("<" + option["tag"] + ">");
   delete option.tag;
   $.each(option, function (attr, val) {
      if (attr != "option") {
         $el.attr(attr, val);
      }
   });
   return $el;
}
/********************************************************************************************
 * AJAX 공통 함수
 ********************************************************************************************/
function fnAjax(paramMethod, paramUrl, paramJsonData, paramCallbackFunction, isFileUpload){
    var queryStringJsonData = {};
   var ajaxParam = {
      "dataType" : "json" 
      , "type" : paramMethod
      , "contentType" : "application/json"
      , "async" : true
      , "url" : paramUrl 
      , "cache" : false
      , "beforeSend" : function(){
    	  $("#bg").show();
    	  $(".loding").show();
      }
      , "complete" : function() {
    	  var keepBg = sessionStorage.getItem("keepBg");
    	  keepBg = (typeof(keepBg) == "undefined" || keepBg == null) ? 'false' : keepBg.toString();
    	  keepBg = (keepBg === 'true');
          if (!keepBg) {
          	$("#bg").hide();
          } 
          sessionStorage.setItem("keepBg", false);
    	  $(".loding").hide();
      }
      , "success" : function(result) {
         if(result != null && result.accessToken != null){
              sessionStorage.setItem("accessToken", result.accessToken);
         }
         paramCallbackFunction(result);
      }
      , "error" : function(request,status,error) {
         if (request.responseJSON === undefined) {
            if ((request.readyState == 4 || request.readyState == 0) && request.status == 0) {
               alert("ERR_CONNECTION_REFUSED");
             } else {
               alert("INTERNAL_SERVER_ERROR");
            }
         } else {
            var exception = request.responseJSON.data;
            if (exception.code == "401.fail" || exception.code == "403.authorization") {
               // 인증 실패 or 요청에 대한 인가 실패
               alert(exception.message);
            } else if (exception.code == "401.fail.prtsorder") {
            	alert(exception.message);
            	fnMovePage(gServerContextPath + "/fr/prtsorder/prtsorder_login_form");
            } else if (exception.code == "401.fail.psb") {
            	alert(exception.message);
            	fnMovePage(gServerContextPath + "/fr/psb/psb_login_form");
            } else if (exception.code == "401.fail.acution") {
            	alert(exception.message);
            	fnMovePage(gServerContextPath + "/fr/auction/acution_login_form");
            } else if (exception.code == "401.fail.recruit") {
            	alert(exception.message);
            	fnMovePage(gServerContextPath + "/fr/recruit/recruit_join_form");
            } else if (exception.code == "401.fail.partner") {
            	alert(exception.message);
            	fnMovePage(gServerContextPath + "/fr/partner/partner_login_form");
            } else if(exception.code == "403.expiration" || exception.code == "403.duplicationLogin") {
               // 세션 만료 or 중복 로그인
               sessionStorage.clear();
               alert(exception.message);
               fnMovePage(gServerContextPath + "/bo/logout");
            } else if(exception.code == "400" && exception.field != null) {
               // 서버 유효성 검증 실패 시 실패한 필드 전달
               alert(exception.message + "\n( 유효성 검증 오류 필드 : " + exception.field + " = [" + exception.rejectedValue + "] )");
            } else {
               alert(exception.message);
            }
         }
      }
   };
   if (isFileUpload) {
      var formData = new FormData();
      $.each(paramJsonData["files"], function (col, val) {
         formData.append(col, val);
      });
      delete paramJsonData.files;
      formData.append("data", new Blob([JSON.stringify(paramJsonData)], {type : "application/json"}));
      delete ajaxParam.dataType;
      ajaxParam.data = formData;
      ajaxParam.processData = false;
      ajaxParam.contentType = false;
      ajaxParam.headers = {"Content-Type":undefined, "Accept":"application/json"};
   } else {
      // HTTP 메서드가 GET인 경우 : json data ==> query string
        // HTTP 메서드가 GET이 아닌 경우 : json data ==> request body
      if (paramMethod == "GET") {
         if (paramJsonData != null) {
            queryStringJsonData = paramJsonData;
         }
      } else {
         ajaxParam.data = JSON.stringify(paramJsonData);
      }
   }
    // CSRF token 추가
   queryStringJsonData["csrfToken"] = $("#form-navigation input[name='csrfToken']").val();
    // access token 추가
    if(sessionStorage.getItem("accessToken")){
       queryStringJsonData["accessToken"] = sessionStorage.getItem("accessToken");
    }
    // URL에 query string 추가
    if(!$.isEmptyObject(queryStringJsonData)){
       ajaxParam.url = ajaxParam.url + "?" + $.param(queryStringJsonData);
    }
    //ajax 비동기 통신 요청
    $.ajax(ajaxParam);
}
/********************************************************************************************
 * 화면 이동 함수
 ********************************************************************************************/
function fnMovePage(paramPage, param){
    if (typeof(param) != "undefined") {
       $.each(param, function (name, value) {
          $("#form-navigation").append(createTag({"tag":"input", "type":"hidden", "name":name, "value":value}));
       });
    }
    $("#form-navigation").attr({"action":paramPage, "target":"_self"});
   $("#form-navigation").submit();
}
function fnWindowOpen (paramPage, target, option) {
	option = typeof(option) == "undefined" ? "" : option;
	target = typeof(target) == "undefined" ? "" : target;
	window.open("", target, option);
	$("#form-navigation").attr({"action":paramPage, "target":target});
	$("#form-navigation").submit();
}

/********************************************************************************************
 * 페이징 처리
 ********************************************************************************************/
function fnSetPagenation (paramObjPagination, paramTotalCount, paramPageLimit, paramFunctionSearch, isMobileAppend) {
	if (paramTotalCount > 0) {
	   if (typeof(isMobileAppend) == "undefined") {
		   isMobileAppend = true;
	   }
	   
	   $(paramObjPagination).find('.page-item').remove();
	   var pageOffset = $(paramObjPagination).closest('.paging').data('page-offset');
	   var currentPage = parseInt(pageOffset/paramPageLimit)+1;
	   var lastPage = Math.ceil(paramTotalCount/paramPageLimit);
	   var startPage = parseInt(pageOffset/(paramPageLimit*10))*10+1;
	   var $pagePrevImg = createTag({'tag':'img', src:gServerContextPath + '/resources/fr/img/common/page_prev.png', 'alt':'이전'});
	   var $pageNextImg = createTag({'tag':'img', src:gServerContextPath + '/resources/fr/img/common/page_next.png', 'alt':'다음'});
        
	   /********************************************************************************************
	    * PC
	    *******************************************************************************************/
	   $pagePrevImg.clone().appendTo(paramObjPagination).wrap('<li class="page_prev page-item" data-page="' + currentPage + '"><a href="javascript:;"></a></li>');
	   for (var i = startPage; i < startPage + 10 && i <= lastPage; i++) {
		   var $pageItem = $('<li class="page-item num" data-page="' + i + '"><a href="javascript:;">'+i+'</a></li>').appendTo(paramObjPagination);
		   if (i == currentPage) {
			   $($pageItem).addClass("on");
		   }
	   }
	   $pageNextImg.clone().appendTo(paramObjPagination).wrap('<li class="page_next page-item" data-page="' + currentPage + '"><a href="javascript:;"></a></li>');
	   // PC 페이지 클릭 시
	   $(paramObjPagination).find('.page-item').on('click', function(e) {
		   var $this = $(this);
		   var page = parseInt($this.data('page'));
		   if ($this.hasClass('page_prev') && page > 1) {
			   pageOffset = (page - 2) * paramPageLimit;
			   $(paramObjPagination).closest('.paging').data("page-offset", pageOffset);
			   paramFunctionSearch();
		   } else if ($this.hasClass('page_next') && page < lastPage) {
			   pageOffset = page * paramPageLimit;
			   $(paramObjPagination).closest('.paging').data("page-offset", pageOffset);
			   paramFunctionSearch();
           } else {
        	   pageOffset = (parseInt($(this).data("page"))-1)*paramPageLimit;
        	   $(paramObjPagination).closest('.paging').data("page-offset", pageOffset);
        	   paramFunctionSearch();
           }
	   });
	   if (isMobileAppend) {
		   /********************************************************************************************
		    * MOBILE
		    *******************************************************************************************/
		   var $mobileObjPagination = $(paramObjPagination).closest('div.paging');
		   $mobileObjPagination.find("div.m_paging").remove();
		   $('<div class="m_paging m_ver"></div>').appendTo($mobileObjPagination);
		   $pagePrevImg.clone().appendTo($mobileObjPagination.find('.m_paging')).wrap('<div class="page_prev page-item" data-page="' + currentPage + '"><a href="javascript:;"></a></div>');
		   $('<div class="num"><span class="current">' + currentPage + '</span> / ' + lastPage + '</div>').appendTo($mobileObjPagination.find('.m_paging'));
		   $pageNextImg.clone().appendTo($mobileObjPagination.find('.m_paging')).wrap('<div class="page_next page-item" data-page="' + currentPage + '"><a href="javascript:;"></a></div>');
		   // 모바일 페이지 클릭 시
		   $mobileObjPagination.find("div.m_paging .page-item").click(function(){
			   var $this = $(this);
			   var page = parseInt($this.data('page'));
			   if ($this.hasClass('page_prev') && page > 1) {
				   pageOffset = (page - 2) * paramPageLimit;
				   $mobileObjPagination.data("page-offset", pageOffset);
				   paramFunctionSearch();
			   } else if ($this.hasClass('page_next') && page < lastPage) {
				   pageOffset = page * paramPageLimit;
				   $mobileObjPagination.data("page-offset", pageOffset);
				   paramFunctionSearch();
			   }
		   });
        }
	} else {
		$(paramObjPagination).find(".page-item").remove();
		$(paramObjPagination).closest('div.paging').find(".m_paging").remove();
	}
}

/********************************************************************************************
 * 파일다운로드 공통 함수
 ********************************************************************************************/
function fileDownload (form, fileName, work) {
	var $form = $(form);
	$form.find("input").not("input[name='csrfToken']").remove();
	$form.append(createTag({"tag":"input", "type":"hidden", "name":"work", "value":work}));
	$form.append(createTag({"tag":"input", "type":"hidden", "name":"fileName", "value":fileName}));
	$form.attr({"action":"/fr/download", "target":"_self", "method":"post"}).submit();
}
/********************************************************************************************
 * 유틸성 공통함수
 ********************************************************************************************/
var StringUtil = {
	setComma : function (x, t) {
		if (typeof(t) == "undefined") {
			if (x == "") {
				return "0";
			} else if (x == null) {
				return "0";
			}
		}
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	, removeComma : function (x) {
		return x.toString().replace(/,/g, "");
	}
	, numberOnly : function (obj, e, isComma) {
    	if (!(e.keyCode >= 37 && e.keyCode <= 40)) {
	    	var $this = $(obj);
	    	
	    	var value = $this.val().replace(/[^0-9]/g, "");
	    	
	    	if (typeof(isComma) != "undefined") {
	    		if (isComma) {
	    			$this.val(StringUtil.setComma(value, true));
	    		} else {
	    			$this.val(value);
	    		}
	    	} else {
	    		$this.val(value);
	    	}
    	}
	}
	, numberDot : function (obj, e) {
    	if (!(e.keyCode >= 37 && e.keyCode <= 40)) {
	    	var $this = $(obj);
	        $this.val($this.val().replace(/[^\.0-9]/g, ""));
    	}
	}
	, phoneFomatter : function (num, type){
		if (isNaN(num)) {
			return num;
		}
	    var formatNum = "";
	    if (num.length == 11) {
	        if (type == 0) {
	            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
	        } else {
	            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
	        }
	    } else if(num.length == 8) {
	        formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
	    } else {
	        if (num.indexOf("02") == 0) {
	            if (type == 0) {
	                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-****-$3");
	            } else {
	                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
	            }
	        } else {
	            if (type==0) {
	                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3");
	            } else {
	                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
	            }
	        }
	    }
	    return formatNum;
	}
	, formatDate : function(regdt, f){
        var yyyy = regdt.substring(0, 4);
        var yy = regdt.substring(2, 4);
        var MM = regdt.substring(4, 6);
        var dd = regdt.substring(6, 8);
        var hh = regdt.substring(8, 10);
        var mm = regdt.substring(10, 12);
        var ss = regdt.substring(12, 14);

        return f.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/gi, function($1) {
            switch ($1) {
                case "yyyy": return yyyy;
                case "yy": return yy.zf(2);
                case "MM": return MM.zf(2);
                case "dd": return dd.zf(2);
                case "hh": return hh.zf(2);
                case "mm": return mm.zf(2);
                case "ss": return ss.zf(2);
                default: return $1;
            }
        });
    }
	, getString : function (str, defaultStr) {
		if (str == "null" || str == "undefined" || typeof(str) == "undefined" || str == null) {
			if (typeof(defaultStr) != "undefined") {
				return defaultStr;
			} else {
				return "";
			}
		} else {
			return str.toString();
		}
	}
	, convertDateFormat : function (dateStr, gubun) {
	    var yyyyMMdd = String(dateStr);
	    var sYear = yyyyMMdd.substring(0,4);
	    var sMonth = yyyyMMdd.substring(4,6);
	    var sDate = yyyyMMdd.substring(6,8);
	    return sYear + gubun + sMonth + gubun + sDate;
	}
	, removeWhiteSpace : function (obj) {
		var $this = $(obj);
		$this.val($this.val().replace(/ /gi, ""));
	}
};

var Debuging = {
	object : function (object, isConsole, index) {
		index = (typeof(index) == "undefined") ? "" : "(index : " + index + ") "; 
		$.each(object, function (col, val) {
			if (isConsole) {
				console.log(col + ":" + val);
			} else {
				alert(col + ":" + val);
			}
    	});
	}
	, array : function (arry, isConsole) {
		$.each(arry, function (i, row) {
			Debuging.object(row, isConsole, i);
    	});
	}
}

/********************************************************************************************
* input 입력 시 공백 사용 못하게
*********************************************************************************************/
function noSpaceForm(obj) { 
    var str_space = /\s/;
    if(str_space.exec(obj.value)) {
        alert("해당 항목에는 공백을 사용할수 없습니다.\n공백은 자동적으로 제거 됩니다.");
        obj.focus();
        obj.value = obj.value.replace(' ','');
        return;
    }
}

$(document).on("keyup input", ".phoneNumber", function() { 
	$(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-") ); 
});

function fnPhoneNumber(data){
	if (typeof(data) != "undefined") {
		return data.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-");
	} else {
		$('.phoneNumber').each( function() {
			$(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-") );
		});
	}
}