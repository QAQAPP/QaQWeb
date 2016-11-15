var canvas;
var context;
var height = 667;
var width = 375;
var image = document.getElementById("timage");
var ismousedown = false;
var mousex, mousey;
var selected;
var drawOption = function(){
	this.bstring = "BUSINESS";
	this.btop = 40;
	this.bleft = 0;
}
drawOption.prototype.bstring = "";
drawOption.prototype.btop = 0;
drawOption.prototype.bleft = 30;
var drawing;

$(document).ready(function() {
	canvas = document.getElementById("mcanvas");
	context = canvas.getContext("2d");
	image = document.getElementById("timage");
	
	drawing = new drawOption();

	drawCanvas();			


	$('.tc-button').on('click', '.selector', function(event) {
		$('#filechooser').click();
		/* Act on the event */
	});
	$('#filechooser').on('change', function(event) {
		console.log("changed");
		var reader = new FileReader();
        reader.readAsDataURL(document.getElementById("filechooser").files[0]);
		reader.onload = function (e) {
            $('#timage').attr('src', e.target.result);
            drawCanvas();
        };
		/* Act on the event */
	});
	$("#mcanvas").on('mousedown', function(event) {
		ismousedown = true;
		mousex = event.clientX;
		mousey = event.clientY;
		var offsetx = mousex - $("#mcanvas").offset().left;
		var offsety = mousey - $("#mcanvas").offset().top;
		offsetx *= 375/200;
		offsety *= 667/350;
		console.log(offsetx, offsety);
		console.log(offsety<=drawing.btop,
			offsety >= drawing.btop-30,
			offsetx>=drawing.bleft,
			offsetx<= drawing.bleft+context.measureText(drawing.bstring).width
		);
		if (offsety<=drawing.btop 
			&& offsety >= drawing.btop-30
			&& offsetx>=drawing.bleft 
			&& offsetx<= drawing.bleft+context.measureText(drawing.bstring).width)
		{
			console.log("Selected");
			selected = true;
		}
		event.preventDefault();
		/* Act on the event */
	});
	$("#mcanvas").on('mousemove', function(event) {
		var dx = event.clientX- mousex;
		var dy = event.clientY- mousey;
		mousex = event.clientX;
		mousey = event.clientY;
		if (selected){
			drawing.bleft+=dx*350/200;
			drawing.btop+=dy*667/350;
			drawCanvas();
		}
		event.preventDefault();
		/* Act on the event */
	});
	$("#mcanvas").on('mouseup', function(event) {
		ismousedown = false;
		selected = false;
		mousex = event.clientX;
		mousey = event.clientY;
		event.preventDefault();
		/* Act on the event */
	});
	$('#tc-business').on('change', function(event) {
		drawing.bstring = $(this).val();
		drawCanvas();
		/* Act on the event */
	});
});

function drawCanvas (argument) {
	context.clearRect(0,0,width,height);
	context.drawImage(image, 0, 0, width, height); 
	context.font="30px Georgia";
	context.fillStyle = "black";
	context.fillText(drawing.bstring, drawing.bleft, drawing.btop);
}