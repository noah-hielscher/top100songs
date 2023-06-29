function drawBarChart() {
	isShowing = "bar";
	clearRendere();

	// damit auch der ausgewählte Dot mittig in der Grafik sitzt
	// $(".song").removeClass("transform");

	// $("#header").html("genre <br> <span style="opacity: 0;">t</span>");
	$("#header").html('genre <br> <span style="opacity: 0;">t</span>');
	$("#discription").html(
		"<strong>Are there genres that dominate? </strong>The stacked bar chart below displays the distribution and weighting of different music genres. A genre is a category into which musical pieces can be classified based on their musical characteristics."
	);

	/* Gleich siehe drawMap-Funktion */

	$(".song").each(function () {
		let dotData = $(this).data();

		// $(".song").removeClass("transform");
		$(this).css({
			"background-color": dotData.color,
		});

		if ($(this).hasClass("clicked")) {
			TweenLite.to($(this), 5, {
				left: dotData.barX + 6.3,
				top: dotData.barY + 6.3,
				height: dotData.barH,
				width: dotData.barW,
				ease: "swing",
			});

			let clickLabelInputGenre =
				"<p class='song-info'>Artist: " +
				dotData.artist +
				"<br>" +
				"Title: " +
				dotData.song +
				"<br>" +
				"Year: " +
				dotData.year +
				"<br>" +
				"<strong>Genre: " +
				dotData.genre +
				"</strong><br>" +
				"press to Play</p>";

			clickLabel1.html(clickLabelInputGenre);
			clickLabel1.show();
		} else {
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
