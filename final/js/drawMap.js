function drawMap() {
	isShowing = "map";
	clearRendere();
	$("#header").html("valence <br> & energy");

	$("#discription").html(
		"<strong>Do songs with higher valence also have an equal amount of energy?</strong> In this case, the values for valence and energy are represented in a two-dimensional coordinate system. Valence describes the musical positivity of a song, where high values sound positive. Energy is a measure of intensity and activity in a song, where higher values indicate greater intensity."
	);

	$(".song").each(function () {
		let dotData = $(this).data();

		$(this).css({
			"background-color": dotData.color,
		});

		TweenLite.to($(this), 5, {
			height: dotData.mapH,
			width: dotData.mapW,
			left: dotData.mapX,
			top: dotData.mapY,
			"border-radius": "50%",
			ease: "swing", // Easing-Funktion (optional)
			onComplete: function () {
				// Callback-Funktion (optional)
				console.log("Animation abgeschlossen!");
			},
		});
	});
}
