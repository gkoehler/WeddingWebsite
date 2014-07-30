/* some source code for the javascript of the web site internet */
$(function(){
	$('[data-scrollto]').click(function(){
		var scrollTo = $(this).attr('data-scrollto');
		$('html, body').animate({
	        scrollTop: $(scrollTo).offset().top
	    }, 500);
	});

	$("a[href^='#']").click(function() {
		var scrollTo = $(this).attr('href');
		$('html, body').animate({
	        scrollTop: $(scrollTo).offset().top
	    }, 500);
	    return false;
	});

	$(document).scroll(function(){
		var scrollAmount = $(document).scrollTop();
		console.log('center ' +- scrollAmount / 4 + 'px');
		$('#bigphoto').css({
			'background-position':'center ' +- scrollAmount / 4 + 'px'
		});
	});

	// reeetinaaaaaaa!
	// works on <img> tags. for background-image, use css replacement.
	// results in a 16mb site... let's probably not do this. :S
	// if (window.devicePixelRatio > 1) {
 //        $('img').each(function(i) {
 //            var lowres = $(this).attr('src');
 //            var highres = lowres.replace(".", "@2x.");
 //            $(this).attr('src', highres);
 //        });

 //    }
});
 