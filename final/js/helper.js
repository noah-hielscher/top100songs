function drawStart() {
	clearRendere();

	$(".intro").css({
		visibility: "visible",
	});

	$(".header").css({
		visibility: "hidden",
	});
}

function clearRendere() {
	//Labels entfernen
	$("#clickLabel1").hide();

	$("#clickLabel2").hide();
	$(".intro").css({
		visibility: "hidden",
	});
	$(".header").css({
		visibility: "visible",
	});
}

function menubar() {
	info.hover(function () {
		$(this).addClass("hoveredMenu");
		info.click(function () {
			$(".clickedMenu").removeClass("clickedMenu");
			drawStart();
			$(this).addClass("clickedMenu");
		});
	});
	info.mouseleave(function () {
		$(this).removeClass("hoveredMenu");
	});

	energy.hover(function () {
		$(this).addClass("hoveredMenu");
		energy.click(function () {
			$(".clickedMenu").removeClass("clickedMenu");
			drawMap();
			$(this).addClass("clickedMenu");
		});
	});
	energy.mouseleave(function () {
		$(this).removeClass("hoveredMenu");
	});

	genres.hover(function () {
		$(this).addClass("hoveredMenu");
		genres.click(function () {
			$(".clickedMenu").removeClass("clickedMenu");
			drawBarChart();
			$(this).addClass("clickedMenu");
		});
	});
	genres.mouseleave(function () {
		$(this).removeClass("hoveredMenu");
	});

	keys.hover(function () {
		$(this).addClass("hoveredMenu");
		keys.click(function () {
			$(".clickedMenu").removeClass("clickedMenu");
			drawKey();
			$(this).addClass("clickedMenu");
		});
	});
	keys.mouseleave(function () {
		$(this).removeClass("hoveredMenu");
	});
}
