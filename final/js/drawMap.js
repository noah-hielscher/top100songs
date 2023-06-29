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

		// "<p class='song-info'> Artist: " +
		// song.artist +
		// "<br>" +
		// "Title: " +
		// song.song +
		// "<br>" +
		// "Year: " +
		// song.year +
		// "<br>" +
		// "<strong> Valence: " +
		// song.valence +
		// " | " +
		// "Energy: " +
		// song.energy +
		// "</strong><br>" +
		// "Genre: " +
		// song.genre +
		// " | " +
		// "Danceability: " +
		// song.danceability +
		// "<br>" +
		// "press to Play</p>";

		if ($(this).hasClass("clicked")) {
			let clickLabelInputkey =
				"<p class='song-info'> Artist: " +
				dotData.artist +
				"<br>" +
				"Title: " +
				dotData.song +
				"<br>" +
				"Year: " +
				dotData.year +
				"<br>" +
				"<strong> Valence: " +
				dotData.valence +
				" | " +
				"Energy: " +
				dotData.energy +
				"</strong><br>" +
				"Genre: " +
				dotData.genre +
				" | " +
				"Danceability: " +
				dotData.danceability +
				"<br>" +
				"press to Play</p>";

			clickLabel1.html(clickLabelInputkey);
			clickLabel1.show();
		}

		TweenLite.to($(this), 5, {
			height: dotData.mapH,
			width: dotData.mapW,
			left: dotData.mapX,
			top: dotData.mapY,
			"border-radius": "50%",
			ease: "swing",
		});
	});
}
