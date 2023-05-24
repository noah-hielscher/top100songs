let stageHeight;
let stageWidth;
let renderer;

let doSize = 10;

let mouseWheel = 0;

let selectedYear = 2000;

$(function () {
	renderer = $("#renderer");
	stageHeight = renderer.innerHeight();
	stageWidth = renderer.innerWidth();

	/* Funktion, um die Daten der Einwohnerzahl und der geografischen 
    Eigenschaften vorzubereiten. */
	prepareData();
	drawMap();

	//text anzeigen

	//funktion die meine Keyboardeingabe in colsole ausgibt
	$(document).keydown(function (event) {
		//console.log(event.which);
		keyInput = event.which / 40;
		console.log(keyInput);
		selectedYear = selectedYear + keyInput;
		renderer.empty();
		// drawMap();
		console.log(selectedYear);
	});
});

function prepareData() {
	songs.forEach((song) => {
		song.newGenre = song.genre.split(",")[0];
	});
	//Anzahl
	console.log(gmynd.cumulateData(songs, "newGenre"));
	//Eigenschaften
	console.log(gmynd.groupData(songs, "newGenre"));
}

function drawMap() {
	renderer.append(
		"<div><h1>Weisen Songs mit höherer Positivist auch gleichermaßen mehr Energie auf? Und in wie fern ist die “speachiness” interessant und in welchem zusammenhang taucht sie auf</h1></div>"
	);

	/* Ausgabe wieviel Länder auf der Map zu sehen sind. */
	let songCount = songs.length;
	//console.log(songCount + " Lieder im Datensatz");

	/* Land mit der größten Bevölkerungszahl wird ermittelt. */
	const populationMax = gmynd.dataMax(songs, "population");

	//maouse scrollen in console ausgeben

	/* Iteration durch alle Datensätze, um den Radius (Bevälkerungsdichte) und
    die x- und y-Position für jedes Land zu ermitteln. */

	songs.forEach((song) => {
		//summe von Dancebility und Energy
		let danceAndeEnergy = song.danceability + song.energy;
		//Mappgen von danceAndeEnergy auf den Screen
		const x = gmynd.map(song.valence, 0, 1, 0, stageWidth);

		//const x = gmynd.map(song.speechiness, 0, 0.5, 0, stageWidth);

		//let SpeeAndinstru = song.speechiness + song.instrumentalness;
		//const x = gmynd.map(song.instrumentalness, 0, 0.2, 0, stageWidth);

		let popularityMax = gmynd.dataMax(songs, "popularity");
		//console.log(popularityMax);

		//vfunction die den mousscrolling ausgibt

		//Mappgen von popularity auf den Screen
		const y = gmynd.map(song.energy, 1, 0, 0, stageHeight);

		//speachines umdrehen
		let speachInstru = 1 - song.speechiness;

		speachInstru = (speachInstru + song.instrumentalness) / 2;

		let dotColor;

		dotColor = "white";

		if (song.year == selectedYear) {
			if (speachInstru > 0.5) {
				dotColor = "red";
			} else {
				dotColor = "white";
			}
		} else {
			dotColor = "";
		}

		let dot = $("<div></div>");

		dot.addClass("dot");

		dot.css({
			height: doSize,
			width: doSize,
			"background-color": dotColor,
			position: "absolute",
			left: x,
			top: y,
			"border-radius": "50%",
		});

		renderer.append(dot);
	});
}
