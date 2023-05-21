let stageHeight;
let stageWidth;
let renderer;

let doSize = 10;

$(function () {
	renderer = $("#renderer");
	stageHeight = renderer.innerHeight();
	stageWidth = renderer.innerWidth();

	/* Funktion, um die Daten der Einwohnerzahl und der geografischen 
    Eigenschaften vorzubereiten. */
	prepareData();
	drawMap();
});

function prepareData() {}

function drawMap() {
	/* Ausgabe wieviel Länder auf der Map zu sehen sind. */
	let songCount = songs.length;
	//console.log(songCount + " Lieder im Datensatz");

	/* Land mit der größten Bevölkerungszahl wird ermittelt. */
	const populationMax = gmynd.dataMax(songs, "population");

	//maouse scrollen in console ausgeben
	$(window).on("mousewheel", function (e) {
		console.log(e.originalEvent.wheelDelta);
		let selectedYear = 2000 + e;
	});

	/* Iteration durch alle Datensätze, um den Radius (Bevälkerungsdichte) und
    die x- und y-Position für jedes Land zu ermitteln. */
	songs.forEach((song) => {
		//summe von Dancebility und Energy
		let danceAndeEnergy = song.danceability + song.energy;
		//Mappgen von danceAndeEnergy auf den Screen
		const x = gmynd.map(danceAndeEnergy, 0, 2, 0, stageWidth);

		//const x = gmynd.map(song.speechiness, 0, 0.5, 0, stageWidth);

		//let SpeeAndinstru = song.speechiness + song.instrumentalness;
		//const x = gmynd.map(song.instrumentalness, 0, 0.2, 0, stageWidth);

		let popularityMax = gmynd.dataMax(songs, "popularity");
		//console.log(popularityMax);

		//Mappgen von popularity auf den Screen
		const y = gmynd.map(song.popularity, 0, popularityMax, 0, stageHeight);

		let dotColor;

		let selectedYear = 2000;

		if (song.year == 2010) {
			console.log("2010");
			if (song.speechiness > 0.3) {
				dotColor = "red";
			} else {
				dotColor = "white";
			}
		} else {
			dotColor = "";
		}

		//if (song.speechiness > 0.3) {
		//	dotColor = "red";
		//} else {
		//	dotColor = "white";
		//}

		let dot = $("<div></div>");

		dot.addClass("dot");

		dot.css({
			height: 4,
			width: 4,
			"background-color": dotColor,
			position: "absolute",
			left: x,
			top: y,
			"border-radius": "50%",
		});
		renderer.append(dot);
	});
}
