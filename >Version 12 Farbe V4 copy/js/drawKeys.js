function drawKey() {
	isShowing = "key";
	clearRendere();
	$("#header").text("key & danceability");

	$("#discription").html(
		"<strong>Are there any keys that are particularly danceable?</strong> The graphic displays the distribution of songs based on their key and the intensity of danceability. The key indicates the tonal system in which a song is written. Danceability refers to the suitability of a music track for dancing, including tempo, rhythm stability, beat strength, and overall regularity."
	);
	$(".song").each(function () {
		let dotData = $(this).data();

		/* Klasse transform hinzufügen, damit die Animation richtig positioniert ist. */
		$(".song").addClass("transform");

		$(this).css({
			"background-color": dotData.color,
		});

		$(this).animate(
			{
				height: 5,
				width: 5,
				left: dotData.keyX,
				top: dotData.keyY,
				/* Kreis: deshalb Border-Radius 50% */
				"border-radius": "50%",
			},
			5000,
			"swing"
		);
	});
	isShowing = "key";
}
