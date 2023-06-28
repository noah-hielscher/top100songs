function drawKey() {
	isShowing = "key";
	clearRendere();
	$("#header").html("key & <br> danceability");

	$("#discription").html(
		"<strong>Are there any keys that are particularly danceable?</strong> The graphic displays the distribution of songs based on their key and the intensity of danceability. The key indicates the tonal system in which a song is written. Danceability refers to the suitability of a music track for dancing, including tempo, rhythm stability, beat strength, and overall regularity."
	);

	$(".song").each(function () {
		let dotData = $(this).data();

		/* Klasse transform hinzufügen, damit die Animation richtig positioniert ist. */
		// $(".song").addClass("transform");

		$(this).css({
			"background-color": dotData.color,
		});

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
