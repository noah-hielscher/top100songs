function drawMap() {
	isShowing = "map";
	clearRendere();

	// Header und Beschreibung aktualisieren
	$("#header").html("valence <br> & energy");
	$("#discription").html(
		"<strong>Do songs with higher valence also have an equal amount of energy?</strong> In this case, the values for valence and energy are represented in a two-dimensional coordinate system. Valence describes the musical positivity of a song, where high values sound positive. Energy is a measure of intensity and activity in a song, where higher values indicate greater intensity."
	);

	// Jeden Song durchgehen
	$(".song").each(function () {
		let dotData = $(this).data();

		// Hintergrundfarbe setzen
		$(this).css({
			"background-color": dotData.color,
		});

		if ($(this).hasClass("clicked")) {
			// Song-Informationen für Klick-Label
			let clickLabelInputkey =
				"<p class='song-info'>Künstler: " +
				dotData.artist +
				"<br>" +
				"Titel: " +
				dotData.song +
				"<br>" +
				"Jahr: " +
				dotData.year +
				"<br>" +
				"<strong>Valence: " +
				dotData.valence +
				" | " +
				"Energy: " +
				dotData.energy +
				"</strong><br>" +
				"Genre: " +
				dotData.genre +
				" | " +
				"Tanzbarkeit: " +
				dotData.danceability +
				"<br>" +
				"Zum Abspielen klicken</p>";

			clickLabel1.html(clickLabelInputkey);
			clickLabel1.show();
		}

		// Animation für jeden Song
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
