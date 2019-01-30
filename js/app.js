$(function(){
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
	
})
