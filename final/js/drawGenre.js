function drawBarChart() {
	isShowing = "bar";
	clearRendere();

	// damit auch der ausgewählte Dot mittig in der Grafik sitzt
	$(".song").removeClass("transform");

	$("#header").text("genre");
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

		TweenLite.to($(this), 5, {
			left: dotData.barX,
			top: dotData.barY,
			height: dotData.barH,
			width: dotData.barW,
			ease: "swing",
		});
	});
}
