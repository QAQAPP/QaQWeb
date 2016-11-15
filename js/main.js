function resizebackground(){
	var h = $(window).height() - 90;
	$(".body-background").css({
		height: h+"px",
	}); 
}
jQuery(document).ready(function($) {
	resizebackground();
	$(window).resize(function(){
		resizebackground();
	})
	$(".blur-mask").css({
		height: $(window).height() + "px",
	});
	$('.header-signin').on('click', function(event) {
		event.preventDefault();
		$('.blur-mask').css({
			display: 'block'
		});
		$('.sign-in').css({
			display: 'block',
			opacity: '1'
		})
	});
	$('.si-close').on('click', function(event) {
		event.preventDefault();
		$('.blur-mask').css({
			display: 'none',
		})
		$('.sign-in').css({
			display: 'none',
			opacity: '0'
		})
	});
	$('#si-cancel').on('click', function(event) {
		event.preventDefault();
		$('.blur-mask').css({
			display: 'none',
		})
		$('.sign-in').css({
			display: 'none',
			opacity: '0'
		})
	});
	$("#si-signin").on('click', function(event) {
		var email = $('#email').val();
		var password = $('#password').val();
		var successed = true;
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
			successed = false;
			var errorCode = error.code;
			var errorMessage = error.message;
			// alert(errorMessage);
			$("#si-message").html("Invalid e-mail address or password");
		}).then(function(){
			if (successed == true){
			alert("Login as " + email);
				$('.blur-mask').css({
				display: 'none',
			})
			$('.sign-in').css({
				display: 'none',
				opacity: '0'
			})
			}
		});
		/* Act on the event */
	});
});