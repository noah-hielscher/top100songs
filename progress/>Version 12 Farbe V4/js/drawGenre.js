function drawBarChart() {
	isShowing = "bar";
	clearRendere();

	//alle .song.clicked.transform entfernen
	$(".song").removeClass("clicked transform");

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

		$(this).animate(
			{
				left: dotData.barX,
				top: dotData.barY,
				height: dotData.barH,
				width: dotData.barW,
			},
			5000,
			"swing"
		);
	});
}
