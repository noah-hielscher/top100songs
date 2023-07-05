function drawBarChart() {
	isShowing = "bar";
	clearRendere();

	// Header und Beschreibung aktualisieren
	$("#header").html('genre <br> <span style="opacity: 0;">t</span>');
	$("#discription").html(
		"<strong>Are there genres that dominate? </strong>The stacked bar chart below displays the distribution and weighting of different music genres. A genre is a category into which musical pieces can be classified based on their musical characteristics."
	);

	// Jeden Song durchgehen
	$(".song").each(function () {
		let dotData = $(this).data();

		// Hintergrundfarbe setzen
		$(this).css({
			"background-color": dotData.color,
		});

		if ($(this).hasClass("clicked")) {
			// Animation für geklickte Songs
			TweenLite.to($(this), 5, {
				left: dotData.barX + 6.3,
				top: dotData.barY + 6.3,
				height: dotData.barH,
				width: dotData.barW,
				ease: "swing",
			});

			// Song-Informationen für Klick-Label
			let clickLabelInputGenre =
				"<p class='song-info'>Künstler: " +
				dotData.artist +
				"<br>" +
				"Titel: " +
				dotData.song +
				"<br>" +
				"Jahr: " +
				dotData.year +
				"<br>" +
				"<strong>Genre: " +
				dotData.genre +
				"</strong><br>" +
				"Zum Abspielen klicken</p>";

			clickLabel1.html(clickLabelInputGenre);
			clickLabel1.show();
		} else {
			// Animation für nicht geklickte Songs
			TweenLite.to($(this), 5, {
				left: dotData.barX,
				top: dotData.barY,
				height: dotData.barH,
				width: dotData.barW,
				ease: "swing",
			});
		}
	});
}
