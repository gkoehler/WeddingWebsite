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
 	var base = 'http://127.0.0.1:8000/rsvps';
 	// 0. handle errors:
 	$(document).ajaxError(function(){
 		$('#guestsearch, #guestsearchresults, #attendance, #confirmation, #confirmationdecline').fadeOut(function(){
 			$('#rsvperror').fadeIn();
 		});
 	});
 	// 1. user searches their name:
 	$('#guestsearch form').submit(function() {
 		// validate
 		var searchtext = $('#guestsearch #lastname').val();
		if(searchtext.length == 0) {
			return false;
		}
		// animate out
 		$('#guestsearch').fadeOut(function(){
 			// data
 			$.get(base + '/search/' + encodeURIComponent(searchtext)).done(function(searchResults){
 				var template = $('#guestsearchresultstemplate').html();
	 			var rendered = $.mustache(template, {
	 				people: searchResults
	 			});
	 			$('#guestsearchresults').html(rendered);
	 			// animate in
		 		$('#guestsearchresults').fadeIn();
 			});
 		});
 		return false;
 	});

 	// 2. user selects their name:
 	$('#guestsearchresults').on('click', 'li a', function(){
 		// validate / find what they chose
 		var guestid = $(this).attr('href').substr(1);
 		// animate out
 		$('#guestsearchresults').fadeOut(function(){
 			// data
 			$.ajax({
 				url:base + '/' + guestid,
 				success: function(data){
 					// animate in
 					$('#attendance').fadeIn();
 					console.log(data);

 				}
 			})
 		});
 	});

 	// 00. start over:
 	$('#RSVP').on('click', 'a.goback', function() {
 		$('#rsvperror, #guestsearchresults, #attendance, #confirmation, #confirmationdecline').fadeOut(function(){
 			$('#guestsearch').fadeIn();
 		});
 		
 		return false;
 	});

});
 