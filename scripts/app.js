$(function () {
    //nav

    /*var url = window.location.href;
	if(url.indexOf('/')){
		var arr = url.split('//');
		if(arr[1].indexOf('/')){
			var name = arr[1].split('/');
			if(name[1]!=''){
				$('.navbar-nav-my li').each(function(i,el){
					if($(el).attr('nav-name') == name[1]){
						$(this).addClass('active').siblings('li').removeClass('active');
					}else{
						$(el).removeClass('active');
					}
				})
			}else{
				
			}
		}else{
			$('.navbar-nav-my li').removeClass('active');
		}
	}*/
	$('.abus').on('mouseenter',function(){
			$(this).children('.downbox').show();
	})
	$('.abus').on('mouseleave',function(){
		$(this).children('.downbox').hide();
	})	
	// goback
	$('.goack').click(function(){
		$('body,html').stop().animate({'scrollTop':'0'},200);
	});
	$(document).on('scroll',function(){
			var top = $(this).scrollTop(),
				documentTop = $(window).height();
			if(top > documentTop){
				$('.goack').show();
			}else{
				$('.goack').hide();
			}
	})
	// hover
	$('.wd-item a').hover(function(){
			var hover_src = $(this).attr('hover-src');
			$(this).children('img').attr('src',hover_src);
			
	},function(){
		var def_src = $(this).attr('defalut-src');
		$(this).children('img').attr('src',def_src);
	})
    //
    agentHandling();

    $("a[data-editiontype]").click(function(){
        var type = $(this).data("editiontype");
        $.post("/Octopus/FreeTrial/CheckAccountType?accountType=" + type, function(data) {
            if (data.IsSucceed) {
                window.location = data.ReturnUrl;
                return;
            }
            if (data.Message) {
                return alert(data.Message)
            }
            if (data.ReturnUrl) {
                window.location = data.ReturnUrl;
                return;
            }
        });
    });

	$("#formSearch").submit(function(e){
        if(!$(this).children("input[name='query']").val()){
            e.preventDefault();
        }
	});

    $(".send-email").on("click",function () {
        $(".leave-message-form").toggleClass("block-toggle");
    }); 
	
	$("#Attachment").change(function(e){
		$("#fileName").text(this.value);
	});
});

function agentHandling() {
    var agentCode = getQueryString("AgentCode");
    if (!agentCode || agentCode == null) {
        return;
    }

    var agent = $.cookie("AgentCode");//getCookie("AgentCode");
    if (agent||agent=="") {
        $.cookie("AgentCode",null);//removeCookie("AgentCode");
    }
    $.cookie("AgentCode", agentCode, {expires:1,path:'/'});//setCookie("AgentCode", agentCode, 1);
    //alert(getCookie("AgentCode"));
}



//
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires+";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function removeCookie(cname) {
    document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    }
    else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}