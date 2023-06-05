let stage;
let stageHeight;
let stageWidth;
let groupedByContinent;
let toggleViewButton = $("#toggleViewButton");
let isShowing;

let newGnere;
let thisGenre;

let holdTimeout;

let bar;

//Farbe
const colorGenres = [
	"#D2A18D",
	"#E8DAB2",
	"#4F6D7A",
	"#C0D6DF",
	"#D4ABAB",
	"#ACBFA4",
	"#E2E8CE",
	"#947EB0",
	"#CDC392",
	"#D17D90",
	"#D5C6E0",
	"#CCC5B9",
];

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

	let colorIndex = 0;
	for (let genreName in newGnere) {
		let currentGenre = newGnere[genreName];
		console.log(currentGenre);

		//Das jeweilige Genre wird durchgegangen, je nachdem wie lange das Genre.leght ist
		currentGenre.forEach((song, j) => {
			/* Virutelles jQuery-Element erstellen und Klasse song hizufügen. */
			let dot = $("<div></div>");
			dot.addClass("song");

			// Parameter: Map - Ansicht 1
			const area = gmynd.map(song.danceability, 0, 1, 0, 100);
			const mapD = gmynd.circleRadius(area);
			const mapX = gmynd.map(song.valence, 1, 0, 0, stageWidth);
			const mapY = gmynd.map(song.energy, 0, 1, stageHeight, 0);

			//Parameter Barchart - Ansicht 2

			barX = indexX * dotWidth + paddingRender;

			//Parameter Key - Ansicht 3
			keyX = gmynd.map(song.key + song.mode / 2, 0, 12.5, 50, stageWidth);
			keyY = gmynd.map(song.danceability, 1, 0, stageHeight, 0);

			//Farbe der Dots
			let color = colorGenres[colorIndex];
			//Farbe der Keys

			dot.attr("genre", song.newGenre);

			dot.data({
				//Allgemein
				genre: song.newGenre,
				color: color,
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
				//Key
				keyX: keyX,
				keyY: keyY,
			});

			stage.append(dot);

			clickLabel1 = $("#clickLabel1");
			clickLabel2 = $("#clickLabel2");
			resetLabel = $("#resetLabel");

			//Click Label
			dot.click(() => {
				$(".song").removeClass("clicked");

				//Clicklabel Hintergrundfarbe
				clickLabel1.css({
					backgroundColor: color,
				});

				clickLabel1.html(
					"<p class='song-info'>Artist: " +
						song.artist +
						"<br>" +
						"Title: " +
						song.song +
						"<br>" +
						"Year: " +
						song.year +
						"<br>" +
						"Valence: " +
						song.valence +
						"<br>" +
						"Energy: " +
						song.energy +
						"<br>" +
						"Genre: " +
						song.genre +
						"<br>" +
						"press to Open</p>"
				);

				clickLabel1.click(() => {
					let searchQuery = 0;
					let searchUrl = 0;
					openSong();
				});
				//doppelclick - alle im selben Genre eine Farbe
				dot.dblclick(() => {
					//Reset Label
					resetLabel.text("<- Reset View" + " " + song.newGenre);
					resetLabel.css({
						backgroundColor: color,
					});
					resetLabel.click(() => {
						$(".song").removeClass("clicked");
						$(".song").show();
						resetLabel.hide();
						clickLabel1.hide();
					});

					//Welche Eigenschaft hat der angeklickte Dot
					clickedDot = song.newGenre;
					console.log(clickedDot);

					// Durch contitnete durcheterieren
					$(".song").each(function () {
						let thisGenre = $(this).data("genre");

						console.log(thisGenre);
						if (thisGenre == clickedDot) {
							$(this).addClass("song clicked");
						} else {
							$(this).hide();
						}
					});
				});

				function openSong() {
					searchQuery = song.artist + " " + song.song;
					searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
						searchQuery
					)}`;
					window.open(searchUrl);
				}
				//dot doe klasse .song.clicked
				dot.addClass("song clicked");

				clickLabel1.show();
				resetLabel.show();
			});

			//Hold Label
			dot.mousedown(() => {
				//variable die Breite von Clciklabel2
				let labelWidth = clickLabel1.width();
				console.log(labelWidth);

				holdTimeout = setTimeout(() => {
					clickLabel2.css({
						backgroundColor: color,
						left: labelWidth + 50,
					});
					clickLabel2.show();

					clickLabel2.html(
						"<p class='song-info'>Artist: " +
							song.artist +
							"<br>" +
							"Title: " +
							song.song +
							"<br>" +
							"Year: " +
							song.year +
							"<br>" +
							"Valence: " +
							song.valence +
							"<br>" +
							"Energy: " +
							song.energy +
							"<br>" +
							"Genre: " +
							song.genre +
							"<br>" +
							"press to Open</p>"
					);
					console.log("Hold event");
				}, 1000); // Ändern Sie die Zeit (in Millisekunden) nach Bedarf
			});

			dot.mouseup(() => {
				clearTimeout(holdTimeout);
				clickLabel2.hide();
			});

			//Hoover Label
			hoverLabel = $("#hoverLabel");
			dot.mouseover(() => {
				hoverLabel.text(song.song);

				let labely = $(this).data();
				console.log(labely);

				let hooverx;

				if (isShowing === "map") {
					console.log("map");
					labely = mapY - 13;
					hooverx = mapX + 15;
				} else {
					if (isShowing === "bar") {
						console.log("bar");
						labely = barY - 13;
						hooverx = barX + 15;
					} else {
						console.log("key");
						labely = keyY - 10;
						hooverx = keyX + 25;
					}
				}

				//Dot hover effect
				dot.addClass("song hovered");

				//css
				hoverLabel.css({
					left: hooverx,
					top: labely,
					backgroundColor: color,
				});
				hoverLabel.show();
			});

			dot.mouseout(() => {
				/*  Dem gehoverten Element die Klasse "hover" entfernen. */
				// dot.removeClass("hovered");
				$(".song").removeClass("hovered");
				$("#hoverLabel").text("");
			});
			indexX++;

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
		colorIndex++;
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
			5000,
			"swing"
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
			5000,
			"swing"
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
			5000,
			"swing"
		);
	});
}

function toggleView() {
	//Labels entfernen
	$("#clickLabel1").hide();
	$("#clickLabel2").hide();
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
