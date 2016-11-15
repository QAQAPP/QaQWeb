$(document).ready(function() {
	$('.start').on('click', function(event) {
		$('.tool-step').removeClass('active');
		$('#editcontent').addClass('active');
		$('.template').css({
			display: 'none'
		});
		$('.editcontent').css({
			display: 'block'
		});
	});
	$('.tool-step').on('click', function(event) {
		$('.tool-step').removeClass('active');
		$(this).addClass('active');
	});
	$('#template').on('click', function(event) {
		$('.template').css({
			display: 'block'
		});
		$('.editcontent').css({
			display: 'none'
		});
	});
	$('#editcontent').on('click', function(event) {
		$('.template').css({
			display: 'none'
		});
		$('.editcontent').css({
			display: 'block'
		});
	});
});