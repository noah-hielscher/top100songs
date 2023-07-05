function drawKey() {
	isShowing = "key";
	clearRendere();

	// Header und Beschreibung aktualisieren
	$("#header").html("key & <br> danceability");
	$("#discription").html(
		"<strong>Are there any keys that are particularly danceable?</strong> The graphic displays the distribution of songs based on their key and the intensity of danceability. The key indicates the tonal system in which a song is written. Danceability refers to the suitability of a music track for dancing, including tempo, rhythm stability, beat strength, and overall regularity."
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
				"<strong>Tonart: " +
				dotData.key +
				" | " +
				"Tanzbarkeit: " +
				dotData.danceability +
				"</strong><br>" +
				"Genre: " +
				dotData.genre +
				"<br>" +
				"Zum Abspielen klicken</p>";

			clickLabel1.html(clickLabelInputkey);
			clickLabel1.show();
		}

		// Animation für jeden Song
		TweenLite.to($(this), 5, {
			height: 5,
			width: 5,
			left: dotData.keyX,
			top: dotData.keyY,
			"border-radius": "50%",
			ease: "swing",
		});
	});

	isShowing = "key";
}
