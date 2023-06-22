function drawMap() {
	isShowing = "map";
	clearRendere();
	$("#header").text("valence & energy");
	let header = $(".header h2");
	header.css({
		marginRight: -50,
	});
	$("#discription").html(
		"<strong>Do songs with higher valence also have an equal amount of energy?</strong> In this case, the values for valence and energy are represented in a two-dimensional coordinate system. Valence describes the musical positivity of a song, where high values sound positive. Energy is a measure of intensity and activity in a song, where higher values indicate greater intensity."
	);
	/* jQuery-Objekte (Songs) iterieren (each-Schleife) */
	$(".song").each(function () {
		let dotData = $(this).data();

		/* Hintergrundfarbe als Style setzen. Kann nicht animiert werden. */
		$(this).css({
			"background-color": dotData.color,
		});

		/* Mit Animation:
		Parameter mit den aktuellen werden zu den neuen Werte anmieren. */
		$(this).animate(
			{
				height: dotData.mapH,
				width: dotData.mapW,
				left: dotData.mapX,
				top: dotData.mapY,
				"border-radius": "50%",
			},
			5000,
			"swing"
		);
	});
}
