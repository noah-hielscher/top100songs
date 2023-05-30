let stage;
let stageHeight;
let stageWidth;
let groupedByContinent;
let toggleViewButton = $("#toggleViewButton");
let isShowing;

let newGnere;
let thisGenre;

let clickedDot;

$(function () {
	stage = $("#renderer");
	stageHeight = stage.innerHeight();
	stageWidth = stage.innerWidth();

	prepareData();
	createElements();
	drawMap();

	toggleViewButton.click(toggleView);
});

function prepareData() {
	songs.forEach((song) => {
		song.newGenre = song.genre.split(",")[0];
	});
	//Anzahl
	// console.log(gmynd.cumulateData(songs, "newGenre"));

	// newGnerea = gmynd.cumulateData(songs, "newGenre");
	// console.log(newGnerea);

	//Eigenschaften
	// console.log(gmynd.groupData(songs, "newGenre"));

	newGnere = gmynd.groupData(songs, "newGenre");

	return newGnere;
}

function createElements() {
	let indexSongs = 0;
	//barMax = newGnere Summer aller Songs
	let barMax = songs.length;

	// Hilfsvariable: Map
	const populationMax = gmynd.dataMax(songs, "popularity");

	//Geht durch die Genres Durch für die Balken

	let barY = 0;
	let barX = 0;
	for (let genreName in newGnere) {
		let currentGenre = newGnere[genreName];
		// console.log(currentGenre.length);
		// console.log(currentGenre);
		// console.log("Hallo");
		// console.log(barY);
		// console.log(barX);
		currentGenre.forEach((song, j) => {
			// Paramter: Bar-Chart
			let genreLength = newGnere[genreName].count;
			// console.log(genreLength);

			/* Virutelles jQuery-Element erstellen und Klasse song hizufügen. */
			let dot = $("<div></div>");
			dot.addClass("song");

			// Parameter: Map - Ansicht 1
			const area = gmynd.map(song.danceability, 0, 1, 0, 100);
			const mapD = gmynd.circleRadius(area);
			// const mapD = 10;
			const mapX = gmynd.map(song.valence, 0, 1, 0, stageWidth);
			const mapY = gmynd.map(song.energy, 1, 0, stageHeight, 0);

			//Parameter Barchart - Ansicht 2
			barX = indexSongs * 10 + 10 / 2;

			//Parameter Key - Ansicht 3
			keyX = gmynd.map(song.key, 0, 12, 0, stageWidth);
			keyY = gmynd.map(song.danceability, 1, 0, stageHeight, 0);

			//für jedes Genre eine neue Farbe
			// color = "red";

			let color;

			if (song.newGenre == "pop") {
				color = "rgba(51, 102, 204, 0.3)";
			} else {
				if (song.newGenre == "rock") {
					color = "rgb(51, 102, 104, 0.3)";
				} else {
					if (song.newGenre == "metal") {
						color = "rgb(51, 102, 4, 0.3)";
					} else {
						color = "rgb(55, 255, 255, 0.3)";
					}
				}
			}

			dot.data({
				genre: song.newGenre,
				//Barchart
				barX: barX,
				barY: barY,
				barH: 10,
				barW: 10,
				//Map
				mapX: mapX,
				mapY: mapY,
				mapH: mapD,
				mapW: mapD,
				color: color,
				//Key
				keyX: keyX,
				keyY: keyY,
			});

			stage.append(dot);

			//wenn click dann link öffnen

			clickLabel = $("#clickLabel");
			dot.click(() => {
				console.log("click");
				// /*  Dem geklickten Element den Text "Ländername: Einwohnerzahl" hinterlegen. */
				clickLabel.text(
					"Artist: " +
						song.artist +
						"  " +
						"Title: " +
						song.song +
						"  " +
						"Year: " +
						song.year +
						"  " +
						"Valence: " +
						song.valence +
						"  " +
						"Energy: " +
						song.energy +
						"  " +
						song.genre +
						"  " +
						"press to Open"
				);

				clickLabel.click(() => {
					searchQuery = 0;
					searchUrl = 0;
					openSong();
				});

				function openSong() {
					const searchQuery = song.artist + " " + song.song; // Beispiel-Suchbefehl
					const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
						searchQuery
					)}`;
					window.open(searchUrl);
				}

				clickLabel.show();
			});

			//Hoover Label

			hoverLabel = $("#hoverLabel");
			dot.mouseover(() => {
				/*  Dem geklickten Element den Text "Ländername: Einwohnerzahl" hinterlegen. */
				hoverLabel.text(song.artist);

				//oftonal display: none auf : block setzen

				let labely = mapY - 10;

				hooverx = mapX + 25;
				hoverLabel.css({
					left: hooverx,
					top: labely,
				});
				hoverLabel.show();
			});

			dot.mouseout(() => {
				/*  Dem gehoverten Element die Klasse "hover" entfernen. */
				dot.removeClass("hover");

				/*  Dem gehoverten Element den Text "Ländernamen" löschen. */
				$("#hoverLabel").text("");
			});
			indexSongs++;
		});
		//parameter Ansicht 2
		barY = barY + 100;
	}

	// indexSongs++;
}

function drawKey() {
	isShowing = "key";

	/* jQuery-Objekte (Länder) iterieren (each-Schleife) */
	$(".song").each(function () {
		/*  Für das jeweile Land an der aktuellen Position in der Schleife (each-Schleife) 
            das Daten-Objekt auslesen und in einer Variable speichern. */
		let dotData = $(this).data();

		/* Hintergrundfarbe als Style setzen. Kann nicht animiert werden. */
		$(this).css({
			"background-color": dotData.color,
		});

		/* Mit Animation:
        Parameter mit den aktuellen werden zu den neuen Werte anmieren. */
		$(this).animate(
			{
				height: dotData.mapH,
				width: dotData.mapW,
				left: dotData.keyX,
				top: dotData.keyY,
				/* Kreis: deshalb Border-Radius 50% */
				"border-radius": "50%",
			},
			3000
		);
	});
}

function drawMap() {
	isShowing = "map";

	/* jQuery-Objekte (Songs) iterieren (each-Schleife) */
	$(".song").each(function () {
		/*  Für das jeweilen Song an der aktuellen Position in der Schleife (each-Schleife) 
            das Daten-Objekt auslesen und in einer Variable speichern. */
		let dotData = $(this).data();

		/* Hintergrundfarbe als Style setzen. Kann nicht animiert werden. */
		$(this).css({
			"background-color": dotData.color,
		});

		/* Mit Animation:
        Parameter mit den aktuellen werden zu den neuen Werte anmieren. */
		$(this).animate(
			{
				height: dotData.mapH,
				width: dotData.mapW,
				left: dotData.mapX,
				top: dotData.mapY,
				/* Kreis: deshalb Border-Radius 50% */
				"border-radius": "50%",
			},
			3000
		);
	});
}

function drawBarChart() {
	isShowing = "bar";

	/* Gleich siehe drawMap-Funktion */
	$(".song").each(function () {
		let dotData = $(this).data();

		/* Hintergrundfarbe als Style setzen. Kann nicht animiert werden. */
		$(this).css({
			"background-color": dotData.color,
		});

		$(this).animate(
			{
				height: dotData.barH,
				width: dotData.barW,
				left: dotData.barX,
				top: dotData.barY,
			},
			3000
		);
	});
}

function toggleView() {
	$("#clickLabel").removeClass("active");
	//verschiedene Ansichten

	switch (isShowing) {
		case "map":
			drawBarChart();
			break;
		case "bar":
			drawKey();
			break;
		case "key":
			drawMap();
			break;
		default:
			break;
	}
}
