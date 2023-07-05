function drawStart() {
	clearRendere();

	// Intro sichtbar machen
	$(".intro").css({
		visibility: "visible",
	});

	// Header ausblenden
	$(".header").css({
		visibility: "hidden",
	});
}

function clearRendere() {
	// Klick-Label 2 ausblenden
	$("#clickLabel2").hide();

	// Intro ausblenden
	$(".intro").css({
		visibility: "hidden",
	});

	// Header sichtbar machen
	$(".header").css({
		visibility: "visible",
	});
}

function menubar() {
	// Info-Menüpunkt
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

	// Energy-Menüpunkt
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

	// Genres-Menüpunkt
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

	// Keys-Menüpunkt
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
