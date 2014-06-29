/* some source code for the javascript of the web site internet */

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