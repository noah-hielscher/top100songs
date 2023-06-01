let stage;
let stageHeight;
let stageWidth;
let groupedByContinent;
let toggleViewButton = $("#toggleViewButton");
let isShowing;

let newGnere;
let thisGenre;

let bar;

let clickedDot;

$(function () {
	stage = $("#renderer");
	stageHeight = stage.innerHeight();
	stageWidth = stage.innerWidth();

	prepareData();
	createElements();
	// drawMap();
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
	let indexX = 0;
	//barMax = newGnere Summer aller Songs
	let barMax = songs.length;

	// Hilfsvariable: Map
	const populationMax = gmynd.dataMax(songs, "popularity");

	//Geht durch die Genres Durch für die Balken

	let dotWidth = 27;
	let paddingRender = 10;
	let gapY = dotWidth;
	let barX = 0;
	let barY = paddingRender;
	let maxDotLength = Math.floor((stageWidth - paddingRender * 2) / dotWidth);

	for (let genreName in newGnere) {
		let currentGenre = newGnere[genreName];
		// console.log(currentGenre.length);
		// console.log(currentGenre);
		// console.log("Hallo");
		// console.log(barY);
		// console.log(barX);

		//Das jeweilige Genre wird durchgegangen, je nachdem wie lange das Genre.leght ist
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

			barX = indexX * dotWidth + paddingRender;

			//Parameter Key - Ansicht 3
			keyX = gmynd.map(song.key + song.mode / 2, 0, 12.5, 50, stageWidth);
			keyY = gmynd.map(song.danceability, 1, 0, stageHeight, 0);

			//für jedes Genre eine neue Farbe
			// color = "red";

			let color;

			if (song.newGenre == "pop") {
				color = "rgba(83, 183, 89,0.3)";
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

			dot.attr("genre", song.newGenre);

			dot.data({
				genre: song.newGenre,
				//Barchart
				barX: barX,
				barY: barY,
				barH: dotWidth,
				barW: dotWidth,
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

				let labely;
				let hooverx;
				//je nach Ansicht das Hoover andere Kordinaten
				if (isShowing === "map") {
					console.log("map");
					labely = mapY - 10;
					hooverx = mapX + 25;
				} else {
					if (isShowing === "bar") {
						console.log("bar");
						labely = barY - 10;
						hooverx = barX + 25;
					} else {
						console.log("key");
						labely = keyY - 10;
						hooverx = keyX + 25;
					}
				}

				// let labely = mapY - 10;
				// hooverx = mapX + 25;

				//css
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
			indexX++;

			console.log(indexX);
			//parameter Ansicht 2
			if (maxDotLength === indexX) {
				barY = barY + gapY;
				barX = 0;
				indexX = 0;
			}
		});

		// Genre nächste Zeile
		// barX = 0;
		// indexX = 0;
		// barY = barY + gapY;
	}

	// indexX++;
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
