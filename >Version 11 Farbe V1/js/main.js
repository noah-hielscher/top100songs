let stage;
let stageHeight;
let stageWidth;
let groupedByContinent;
let toggleViewButton = $("#toggleViewButton");

//Menübar
let info = $("#info");
let energy = $("#energy");
let genres = $("#genres");
let keys = $("#keys");

let isShowing;

let newGnere;
let thisGenre;

let holdTimeout;

let clickLabelInput1;
let clickLabelInput2;

let bar;

//Farbe
const colorGenres = [
	"#FF0000",
	"#1FD561",
	"#1E53C5",
	"#F89317",
	"#BD3369",
	"#44A3E3",
	"#0A59B8",
	"#D04545",
	"#FF11D6",
	"#FA6841",
	"#912AEC",
	"white",
];

let clickedDot;

$(function () {
	stage = $("#renderer");
	stageHeight = stage.innerHeight();
	stageWidth = stage.innerWidth();

	prepareData();
	createElements();
	// drawMap();
	drawStart();
	//info css clickedMenu
	info.addClass("clickedMenu");

	menubar.hover(menubar());
});

function prepareData() {
	songs.forEach((song) => {
		song.newGenre = song.genre.split(",")[0];
	});

	newGnere = gmynd.groupData(songs, "newGenre");

	return newGnere;
}

function createElements() {
	let indexX = 0;
	//barMax = newGnere Summer aller Songs
	let barMax = songs.length;

	// Hilfsvariable: Map
	const populationMax = gmynd.dataMax(songs, "popularity");

	//Margin
	let marginTop = 200;
	let marginLeft = 50;
	let marginRight = 50;
	let marginBottom = 150;

	//genres
	let dotWidth = 21;
	let paddingRender = 50;
	let gapY = dotWidth;
	let barX = 0;
	let barY = marginTop;
	let maxDotLength = Math.floor((stageWidth - paddingRender * 2) / dotWidth);

	//Dancebility Max
	let danceabilityMax = gmynd.dataMax(songs, "danceability");
	//valence Max
	let valenceMax = gmynd.dataMax(songs, "valence");
	//energie Max
	let energyMax = gmynd.dataMax(songs, "energy");

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
			const area = gmynd.map(
				song.danceability,
				0,
				danceabilityMax,
				0,
				100
			);
			const mapD = gmynd.circleRadius(area);
			const mapX = gmynd.map(
				song.valence,
				valenceMax,
				0,
				0 + marginLeft,
				stageWidth - marginRight
			);
			const mapY = gmynd.map(
				song.energy,
				0,
				energyMax,
				stageHeight - marginBottom,
				0 + marginTop
			);

			//Parameter Barchart - Ansicht 2

			barX = indexX * dotWidth + paddingRender;

			//Parameter Key - Ansicht 3
			keyX = gmynd.map(
				song.key + song.mode / 2,
				0,
				12.5,
				50,
				stageWidth - marginRight
			);
			keyY = gmynd.map(
				song.danceability,
				danceabilityMax,
				0,
				stageHeight - marginBottom,
				0
			);

			//Farbe der Dots
			let color = colorGenres[colorIndex];

			dot.attr("genre", song.newGenre);

			dot.css({
				// 'height': mapD,
				// 'width': mapD,
				left: mapX,
				top: mapY,
			});

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

				//je nach Ansciht unterschiedliche Informationen im Label
				if (isShowing === "map") {
					clickLabelInput1 =
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
						"press to Play</p>";
				} else {
					if (isShowing === "bar") {
						clickLabelInput1 =
							"<p class='song-info'>Artist: " +
							song.artist +
							"<br>" +
							"Title: " +
							song.song +
							"<br>" +
							"Year: " +
							song.year +
							"<br>" +
							"Genre: " +
							song.genre +
							"<br>" +
							"press to Play</p>";
					} else {
						clickLabelInput1 =
							"<p class='song-info'>Artist: " +
							song.artist +
							"<br>" +
							"Title: " +
							song.song +
							"<br>" +
							"Year: " +
							song.year +
							"<br>" +
							"Key: " +
							song.key +
							"<br>" +
							"Dancebility: " +
							song.danceability +
							"<br>" +
							"Genre: " +
							song.genre +
							"<br>" +
							"press to Play</p>";
					}
				}

				clickLabel1.html(clickLabelInput1);

				clickLabel1.click(() => {
					let searchQuery = 0;
					let searchUrl = 0;
					openSong();
				});
				//doppelclick - alle im selben Genre eine Farbe
				dot.dblclick(() => {
					//Bei Doppelclick Farbe entfernen
					$(".song").removeClass("clicked");
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
							// $(this).addClass("song clicked");
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
				if (isShowing === "map") {
					dot.addClass("song clicked transform");
				} else {
					if (isShowing === "bar") {
						dot.addClass("song clicked");
					} else {
						dot.addClass("song clicked transform");
					}
				}
				// dot.addClass("song clicked");

				//"song clicked" css bearbeiten
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
						right: labelWidth + 100,
					});
					clickLabel2.show();

					if (isShowing === "map") {
						clickLabelInput2 =
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
							"press to Play</p>";
					} else {
						if (isShowing === "bar") {
							clickLabelInput2 =
								"<p class='song-info'>Artist: " +
								song.artist +
								"<br>" +
								"Title: " +
								song.song +
								"<br>" +
								"Year: " +
								song.year +
								"<br>" +
								"Genre: " +
								song.genre +
								"<br>" +
								"press to Play</p>";
						} else {
							clickLabelInput2 =
								"<p class='song-info'>Artist: " +
								song.artist +
								"<br>" +
								"Title: " +
								song.song +
								"<br>" +
								"Year: " +
								song.year +
								"<br>" +
								"Key: " +
								song.key +
								"<br>" +
								"Dancebility: " +
								song.danceability +
								"<br>" +
								"Genre: " +
								song.genre +
								"<br>" +
								"press to Play</p>";
						}
					}
					clickLabel2.html(clickLabelInput2);
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

				let dotData = dot.data();

				let hooverx;

				if (isShowing === "map") {
					console.log("map");
					labely = dotData.mapY - 13;
					hooverx = dotData.mapX + 20;
					//Dot hover effect
					dot.addClass("song hovered");
				} else {
					if (isShowing === "bar") {
						labely = dotData.barY - 2;
						hooverx = dotData.barX + 30;
					} else {
						labely = dotData.keyY - 13;
						hooverx = dotData.keyX + 20;
						//Dot hover effect
						dot.addClass("song hovered");
					}
				}

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

		colorIndex++;
	}
}

function drawKey() {
	isShowing = "key";
	clearRendere();
	$("#header").text("key & danceability");
	$(".song").each(function () {
		let dotData = $(this).data();

		/* Klasse transform hinzufügen, damit die Animation richtig positioniert ist. */
		$(".song").addClass("transform");

		$(this).css({
			"background-color": dotData.color,
		});

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
	isShowing = "key";
}

function drawMap() {
	isShowing = "map";
	clearRendere();
	$("#header").text("valence & energy");
	/* jQuery-Objekte (Songs) iterieren (each-Schleife) */
	$(".song").each(function () {
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
				"border-radius": "50%",
			},
			5000,
			"swing"
		);
	});
}

function drawBarChart() {
	isShowing = "bar";
	clearRendere();

	//alle .song.clicked.transform entfernen
	$(".song").removeClass("clicked transform");

	$("#header").text("genre");
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

function drawStart() {
	clearRendere();

	$(".intro").css({
		visibility: "visible",
	});

	$(".header").css({
		visibility: "hidden",
	});
}

function clearRendere() {
	//Labels entfernen
	$("#clickLabel1").hide();
	$("#clickLabel2").hide();
	$(".intro").css({
		visibility: "hidden",
	});
	$(".header").css({
		visibility: "visible",
	});
}

function menubar() {
	info.hover(function () {
		$(this).addClass("hoveredMenu");
		info.click(function () {
			$(".clickedMenu").removeClass("clickedMenu");
			drawStart();
			$(this).addClass("clickedMenu");
		});
	});
	info.mouseleave(function () {
		$(this).removeClass("hoveredMenu");
	});

	energy.hover(function () {
		$(this).addClass("hoveredMenu");
		energy.click(function () {
			$(".clickedMenu").removeClass("clickedMenu");
			drawMap();
			$(this).addClass("clickedMenu");
		});
	});
	energy.mouseleave(function () {
		$(this).removeClass("hoveredMenu");
	});

	genres.hover(function () {
		$(this).addClass("hoveredMenu");
		genres.click(function () {
			$(".clickedMenu").removeClass("clickedMenu");
			drawBarChart();
			$(this).addClass("clickedMenu");
		});
	});
	genres.mouseleave(function () {
		$(this).removeClass("hoveredMenu");
	});

	keys.hover(function () {
		$(this).addClass("hoveredMenu");
		keys.click(function () {
			$(".clickedMenu").removeClass("clickedMenu");
			drawKey();
			$(this).addClass("clickedMenu");
		});
	});
	keys.mouseleave(function () {
		$(this).removeClass("hoveredMenu");
	});
}
