// JavaScript source code
// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

let figureCaptions = ["The Liberty Ship John Brown",
						"The Sinking of the Arizona at Pearl Harbor",
						"Harriet Tubman and Nathan Bedford Forrest, the first grand wizard of the KKK, both had liberty ships bearing their name",
						"Rosie would have been a welder if she'd built liberty ships",
						"The Schenectady was one of several Liberty ships to experience catastrophic cracking",
						"Constance Tipper solved the mystery of low-temperature embrittlement in steels used on Liberty Ships",
						"The Red Oak Victory is the only surviving Victory Ship",
						"Aside from helping build the Hoover Damn and over 1,000 ships, Henry Kaiser also started Kaiser Permanente to provide healthcare for his workers and their families",
						"American service members in Paris, celebrating the end of the war"]

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
	// 1. update height of step elements
	var stepH = Math.floor(window.innerHeight * 0.75);
	step.style("height", stepH + "px");

	var figureHeight = window.innerHeight / 2;
	var figureMarginTop = (window.innerHeight - figureHeight) / 2;

	figure
	.style("height", figureHeight + "px")
	.style("top", figureMarginTop + "px");

	// 3. tell scrollama to update new element dimensions
	scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
	//console.log(response);
	// response = { element, direction, index }

	// add color to current step only
	step.classed("is-active", function(d, i) {
		return i === response.index;
	});

	// update graphic based on step
	d3.selectAll(".scroller-image")
		.transition()
		.style("opacity",0);

	d3.selectAll(`#scroller-image${response.index+1}`)
		.transition()
		.style("opacity",1);

	document.getElementById("main-caption").innerHTML =	`Figure ${response.index+1}: ${figureCaptions[response.index]}`;
	//console.log(document.getElementById("main-caption"));
	//console.log("hello");
}

function setupStickyfill() {
	d3.selectAll(".sticky").each(function() {
		Stickyfill.add(this);
	});
}

function init() {
setupStickyfill();

	// 1. force a resize on load to ensure proper dimensions are sent to scrollama
	handleResize();

	// 2. setup the scroller passing options
	// 		this will also initialize trigger observations
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller
	.setup({
		step: "#scrolly article .step",
		offset: 0.33,
		debug: false
	})
	.onStepEnter(handleStepEnter);

	// setup resize event
	window.addEventListener("resize", handleResize);
}

// kick things off
init();