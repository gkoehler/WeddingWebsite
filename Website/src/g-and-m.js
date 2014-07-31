/* some source code for the javascript of the web site internet */
$(function(){
	$('[data-scrollto]').click(function(){
		var scrollTo = $(this).attr('data-scrollto');
		$('html, body').animate({
	        scrollTop: $(scrollTo).offset().top
	    }, 500);
	});

	$("#topmenu a[href^='#']").click(function() {
		var scrollTo = $(this).attr('href');
		$('html, body').animate({
	        scrollTop: $(scrollTo).offset().top
	    }, 500);
	    return false;
	});

	$(document).scroll(function(){
		var scrollAmount = $(document).scrollTop();
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

 	// RSVP system
 	// 1. user searches their name:
 	$('#guestsearch form').submit(function() {
 		$('#guestsearch').fadeOut(function(){
 			// ajax here for loading those results
 			// $.ajax('url').done(function(data){

 			// })
 			var template = $('#guestsearchresultstemplate').html();
 			var rendered = $.mustache(template, {
 				people: [{
 					id:1,
 					name:'Mr. & Mrs. Joseph Hamilton'
 				},{
 					id:2,
 					name:'Mrs. Lydia Hamilton'
 				},{
 					id:3,
 					name:'Mr. Stephan Hamilton'
 				}]
 			});
 			$('#guestsearchresults').html(rendered);
	 		$('#guestsearchresults').fadeIn();
 		});
 		return false;
 	});

 	// start over:
 	$('#RSVP').on('click', 'a.goback', function() {
 		$('#rsvperror, #guestsearchresults, #attendance, #confirmation, #confirmationdecline').fadeOut(function(){
 			$('#guestsearch').fadeIn();
 		});
 		
 		return false;
 	});

});
 