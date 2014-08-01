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
 	var base = 'http://api.gavinandmichaela.com/rsvps';
 	// 0. handle errors:
 	var handleError = function(){
 		$('#guestsearch, #guestsearchresults, #attendance, #confirmation, #confirmationdecline').fadeOut(function(){
 			$('#rsvperror').fadeIn();
 		});
 	};
 	$(document).ajaxError(handleError);
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
 					data.num_allowed_array = function() {
 						var ret = [];
 						for (var i = 1; i <= data.num_allowed; i++) {
 							ret.push({'num':i, 'checked':(i==data.num_allowed)});
 						};
 						return ret;
 					};
 					var template = $('#attendancetemplate').html();
 					var rendered = $.mustache(template, data);
 					$('#attendance').html(rendered);
 					// animate in
 					$('#attendance').fadeIn();

 				}
 			});
 		});
 	});

 	// 3. user saves their attendance
 	$('#attendance').on('submit', 'form#attendingform', function(){
 		// validate / gather data
 		var isAttending = ($('[name="attendance-radio"]:checked', this).val() == 'attending');
 		var num_rsvpd = 0;
 		if(isAttending) {
	 		num_rsvpd = $('select[name="num_attending"]').val();
 		}
 		var guestid = $(this).data('guestid');
 		// animate out
 		$('#attendance').fadeOut(function() {
 			// data
 			$.ajax({
 				url:base + '/' + guestid,
 				type:'POST',
 				dataType:'json',
 				data: {'num_rsvpd':num_rsvpd},
 				success: function(data) {
 					if(data.detail) {
 						alert(data.detail);
 						handleError();
 					} else {
 						if(isAttending) {
 							$('#confirmation').fadeIn();
 						} else {
 							$('#confirmationdecline').fadeIn();
 						}
 					}
 				}
 			});
 		});
 		return false;
 	});

 	// 00. start over:
 	var startOver = function() {
 		$('#rsvperror, #guestsearchresults, #attendance, #confirmation, #confirmationdecline').fadeOut(function(){
 			$('#guestsearch').fadeIn();
 		});
 		
 		return false;
 	};
 	$('#RSVP').on('click', 'a.goback', startOver);

});
 