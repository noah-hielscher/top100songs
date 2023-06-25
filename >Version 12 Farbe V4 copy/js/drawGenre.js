//GSAP (TweenLite) top/left/width/height
var tests = {
	gsap: {
		milliseconds: false,
		wrapDot: function (dot) {
			return dot; //kein Wrapper erforderlich
		},
		tween: function (dot, top, left, duration) {
			TweenLite.to(dot, duration, {
				css: {
					left: left,
					top: top,
					width: 32,
					height: 32,
				},
				ease: Cubic.easeIn,
				overwrite: "none",
			});
		},
		stop: function (dot) {
			TweenLite.killTweensOf(dot);
		},
		nativeSize: 10,
	},
};

function drawBarChart(duration) {
	isShowing = "bar";
	clearRendere();

	// Alle .song.clicked.transform entfernen
	$(".song").removeClass("clicked transform");
	let header = $(".header h2");
	header.css({
		marginRight: -100,
	});

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

		// GSAP-Tween verwenden, um Animation durchzuführen
		tests.gsap.tween(this, dotData.barY, dotData.barX, duration);
	});
}
