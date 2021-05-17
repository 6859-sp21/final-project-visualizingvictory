const flattenName = (name) => {
        return(name.toLowerCase().replace(/\s+/g, '').replace('(','').replace(')',''));
        };
        const shipYards = [
        {
        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-122,37]
        },
        "properties": {
        "name": "Permanente Metals Co Yard"
        }
        },
		{

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-76,39]
        },
        "properties": {
        "name": "Bethlehem-Fairfield Shipyards"
        }
        },
        {
        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-118.2,33.7]
        },
        "properties": {
        "name": "California Shipbuilding Corp"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-122,45]
        },
        "properties": {
        "name": "Oregon Shipbuilding Corp"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-71,43]
        },
        "properties": {
        "name": "New England Shipbuilding Corp"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-95,29.6]
        },
        "properties": {
        "name": "Todd Houston Shipbuilding Corp"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-90,30]
        },
        "properties": {
        "name": "Delta Shipbuilding Co"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-78,34]
        },
        "properties": {
        "name": "North Carolina Shipbuilding Co"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-85.7,30.2]
        },
        "properties": {
        "name": "J A Jones Construction Co (Panama City)"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-81,32]
        },
        "properties": {
        "name": "Southeastern Shipbuilding Corp"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-81.5,31.1]
        },
        "properties": {
        "name": "J A Jones Construction Co (Brunswick)"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-81.6,30.3]
        },
        "properties": {
        "name": "St Johns River Shipbuilding Co"
        }
        },
		{

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-122.6,45.5]
        },
        "properties": {
        "name": "Kaiser Co"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-88,30.6]
        },
        "properties": {
        "name": "Alabama Dry Dock Co"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-122.5,38]
        },
        "properties": {
        "name": "Marinship Corp"
        }
        },
        {

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-71.5,41.7]
        },
        "properties": {
        "name": "Walsh-Kaiser Co"
        }
        },
		
        
		{

        "type": "Feature",
        "geometry": {
        "type": "Point",
        "coordinates": [-88.5,30.18]
        },
        "properties": {
        "name": "Ingalls Shipbuilding"
        }
        }
        ];

		// source: https://www.defense.gov/Explore/Features/story/Article/2293108/significant-events-of-world-war-ii/
		let timelineEvents = [{date: "Jun. 04, 1942", name: "Battle of Midway"},
								{date: "Sep. 08, 1943", name: "Italy Surrenders"},
								{date: "Jun. 06, 1944", name: "D-Day"},
								{date: "Dec. 16, 1944", name: "Battle of the Bulge"},
								{date: "Feb. 19, 1945", name: "Iwo Jima"},
								{date: "Apr. 01, 1945", name: "Invasion of Okinawa"},
								{date: "May 08, 1945", name: "V-E Day"},
								{date: "Aug. 06, 1945", name: "Hiroshima"},
								{date: "Sep. 02, 1945", name: "V-J Day"}];

		let suggestedSearches = ["kamikazied","torpedoed","beached","scrapped","sunk","sank","leyte"];
		let eventDates = [];
		for (let i = 0; i < timelineEvents.length; i++){
			eventDates.push(timelineEvents[i].date);
		}

		const pButton = document.getElementById('playPause');
		pButton.disabled = false;

		const searchButton = document.getElementById('sort');
		searchButton.disabled = true;

		const clearButton = document.getElementById('clear');
		clearButton.disabled = true;

		const suggestButton = document.getElementById('suggestion');
		suggestButton.disabled = true;

		let playStatus = false;
		let scrollStatus = false;

		let slider = d3.selectAll("#dateSlider");
		const sliderJS = document.getElementById('dateSlider');
		sliderJS.disabled = true

		for (let i = 0; i < shipYards.length; i++){
				shipYards[i].properties.shipCount = 0;
				shipYards[i].properties.timeSeries = [];
				shipYards[i].properties.libertyCount = 0;
				shipYards[i].properties.victoryCount = 0;
		}

		function mouseOverShipyard(name){
			d3.selectAll(`#${flattenName(name)}Bar`)
				.attr("fill",selectColor);
				

				d3.select(`#${flattenName(name)}`)
				.attr("fill",selectColor)
				.attr("r","8px");
		}

		function mouseOutShipyard(name){
			d3.selectAll(`#${flattenName(name)}Bar`)
				.attr("fill",shipYardColorOff);
				
				d3.select(`#${flattenName(name)}`)
				.attr("fill",shipYardColorOff)
				.attr("r","4px");
		}

        let unitHeight = 850;
        let unitWidth = 1800;
        let mapHeight = 150;
        let mapWidth = 300;
		let numDates = 1401;
		let timelineHeight = 200;

		const shipYardColorOff = "rgb(87, 247, 237)"//"rgb(16, 230, 144)";
		const selectColor = "rgb(255, 0, 195)";
		const libertyColor = "rgb(0,0,0)";
		const victoryColor = "rgb(45, 186, 66)"
		const months = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
		const highlightColor = "rgb(255,0,0)";

		function numericDate2Written(nDate){
			let pieces = nDate.split("-");
			return(`${months[pieces[1]-1]} ${pieces[2]}, ${pieces[0]}`);
		}

        console.log(shipYards.filter(function(d){ return d.properties.name=="California Shipbuilding Corp"})[0].geometry.coordinates);

        const shipMaker = (x,y) => {
            return(`M ${x-10} ${y-5} l 2 5, l 15 0 l 2 -5 h -5 v -5 h -2 v 5 z`)
        };

		const shipKeyMaker = (x,y) => {
            return(`M ${x-20} ${y-10} l 4 10, l 30 0 l 4 -10 h -10 v -10 h -4 v 10 z`)
        }

        // shipData = d3.csv("allShipsOrdered.csv",function(data){return(data);});
        let shipData = [];

        ////console.log(shipData);

        let unitSVG = d3.selectAll("#unit")
			.append("svg:svg")
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("viewBox", `0 0 ${unitWidth} ${unitHeight}`)
			.classed("svg-content", true);

		let timelineSVG = d3.selectAll("#timeline")
			.append("svg:svg")
			.attr("preserveAspectRatio","xMinYMin meet")
			.attr("viewBox",`0 0 ${numDates} ${timelineHeight}`);
			//.classed("svg-content",true);

		//console.log(timelineSVG);

        const unitMapper = (shipIndex,shipR, numCols, numShips, width) => {
        let spacing = (width-2*shipR)/numCols;
        let y = Math.floor(shipIndex/numCols)*11 + shipR;
        let x = (shipIndex%numCols) * spacing + shipR;
        return([x,y]);
        }

        const data2Text = (shipData) =>{
			let text = `<br/>Name: ${shipData.Name}<br/>    Date Completed: ${shipData.Completed}`
			//fate: ${shipData.Fate}
			return(text);
        }
		const fateParser = (shipData)=>{
				if (shipData.Fate ==""){
					return("Unknown")
				} else{
					return(shipData.Fate)
				}
			}
		const data2SidePanel = (shipData) =>{
			let text = `<br/><br/>Name: ${shipData.Name}<br/>
			Namesake: ${shipData.Namesake}<br/>
			Shipyard: ${shipData.Shipyard}<br/>
			Type: ${shipData.Type}<br/>
			Date Laid Down: ${shipData.Laid_Down}<br/>
			Date Launched: ${shipData.Launched}<br/>
			Date Completed: ${shipData.Completed}<br/>
			Fate: ${fateParser(shipData)}`
			//console.log(shipData.Fate);
			return(text);
		};

		const shipColorFunc = (shipData) =>{
			if (shipData.Type.substring(0,2) == "VC") {
				return victoryColor
			} else {
				return libertyColor
			}
		}

		const shipYard2SidePanel = (shipYard) =>{
			let text = `Name: ${shipYard.properties.name}<br/>
			Ships Built: ${shipYard.properties.shipCount}<br/>
			Liberty Ships Built ${shipYard.properties.libertyCount}<br/>
			Victory Ships Built ${shipYard.properties.victoryCount}`
			return(text);
		}

		function dateParser(date){
			let [year,month,day] = date.split("-");
			return(370*year + 32*month + day)
		}



        d3.csv("combinedShipsOrdered.csv").then(function(data) {
		let searchTarget = "lkjfsdfsdfsdf";
        for (let i =0; i< data.length; i++){
        shipData.push(data[i]);
        };


        for (let i =0; i < shipData.length; i++){
			let [x,y] = unitMapper(i,20,90,shipData.length,unitWidth)
			shipData[i].x = x;
			shipData[i].y = y;
			shipData[i].sequentialID = i;
			shipData[i].highlighted = false;
		};



        let detailDiv = d3.selectAll("#details");
		let dateDiv = d3.selectAll("#date");
		let sidePanel = d3.selectAll("#sidePanel");

		




        // from https://www.d3-graph-gallery.com/graph/backgroundmap_country.html

        let map = unitSVG;

        // Map and projection
        var projection = d3.geoMercator()
        .center([-93,44])                // GPS of location to zoom on
        .scale(600)                       // This is like the zoom
        .translate([ unitWidth/3, 500 ])

        // Load external data and boot
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data){
		let scrollIndex = 0;
        // Filter data
        data.features = data.features.filter(function(d){ return d.properties.name=="USA"});
        //console.log(data.features[0].geometry);
        data.features[0].geometry.coordinates = [data.features[0].geometry.coordinates[5]]

        // Draw the map
        map.selectAll("path.USA")
        .data(data.features)
        .enter()
        .append("path")
        .attr("fill", "rgb(196, 135, 2)")
        .attr("d", d3.geoPath()
        .projection(projection)
        )
        .style("stroke", "none")
        .style("opacity",0.9);


        map.selectAll("circle.shipYard")
			.data(shipYards)
			.enter()
			.append("circle")
			.attr("cx", function(d){return(projection(d.geometry.coordinates)[0])})
			.attr("cy", function(d){return(projection(d.geometry.coordinates)[1])})
			.attr("r", "4px")
			.attr("fill", shipYardColorOff)
			.attr("id",function(d){return(flattenName(d.properties.name))})
			.on('mouseover', function (d, i) {
				mouseOverShipyard(i.properties.name);
				
				////console.log(d3.selectAll(`#${flattenName(i.properties.name)}Bar`));
				})
			.on("mouseout",function (d, i) {
				mouseOutShipyard(flattenName(i.properties.name));
				})
			.on('click',function(d,i){
				sidePanel.html(shipYard2SidePanel(i));
			});



        });


        let graphWidth = 460 ;
		let graphHeight = 300 ;
		let graphXOffset = 2*unitWidth/3;
		let graphYOffset = unitHeight-graphHeight-130;

		// X axis
			// Add X axis
		var x = d3.scaleLinear()
		.domain([0, 650])
		.range([ graphXOffset, graphXOffset + graphWidth]);
		unitSVG.append("g")
		.attr("transform", `translate(0,${graphHeight+graphYOffset})`)
		.call(d3.axisBottom(x))
		.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");

		// Y axis
		var y = d3.scaleBand()
		.range([ 0, graphHeight ])
		.domain(shipYards.map(function(d) { return d.properties.name; }))
		.padding(.1);
		unitSVG.append("g")
		.style("font","18px times")
		.attr("transform", `translate(${graphXOffset},${graphYOffset})`)
		.call(d3.axisLeft(y))

		//Bars
		unitSVG.selectAll("rect.myRect")
		.data(shipYards)
		.enter()
		.append("rect")
		.attr("x", x(0) )
		.attr("y", function(d) { return y(d.properties.name)+graphYOffset; })
		.attr("width", function(d) {return x(d.properties.shipCount) - graphXOffset; })
		.attr("height", y.bandwidth() )
		.attr("fill", shipYardColorOff)
		.attr("id",function(d){return(`${flattenName(d.properties.name)}Bar`)})
		.classed("myRect",true)
		.on('mouseover', function (d, i) {
			mouseOverShipyard(flattenName(i.properties.name));
		})
		.on('mouseout', function (d, i) {
			mouseOutShipyard(flattenName(i.properties.name));
		})
		.on('click',function(d,i){
				sidePanel.html(shipYard2SidePanel(i));
		});



		//console.log(unitSVG.select("#ship1"));
		let dateList = [];
		d3.csv("allDates.csv").then(function(allDates) {


			//console.log(shipYards.length);
			
			
			for (let i =0; i < allDates.length; i++){
				dateList.push(allDates[i].dates);
				////console.log(shipData.filter(function(d){ return d.Completed==dateList[i]}));
				////console.log(numericDate2Written(allDates[i].dates));
				let dateText = numericDate2Written(allDates[i].dates)
				if (dateText.search("Jan. 01,") != -1){

					timelineSVG.append("path")
					.attr("d",`M ${i} 0 v 15`)
					.attr("stroke","black")
					.attr("stroke-width","5");

					timelineSVG.append("text")
					.attr("x", i)
					.attr("y", 35)
					.attr("fill","black")
					.attr("font-size","1.5em")
					.text(dateText.slice(-4));
				};
				if (eventDates.includes(dateText) == true){
					timelineSVG.append("path")
					.attr("d",`M ${i} 0 v 15`)
					.attr("stroke","black")
					.attr("stroke-width","2");

					timelineSVG.append("text")
					.attr("x", i)
					.attr("y", 35)
					.attr("fill","black")
					.attr("font-size","1.1em")
					.text(timelineEvents.filter(event => event.date == dateText)[0].name)
					.attr("transform",`rotate(70, ${i},35)`);
				}
			}
			scrollIndex = dateList.length-1;

		// Color Key
		unitSVG.append("path")
			.attr("d",shipKeyMaker(20,600))
			.style("fill",libertyColor);

		unitSVG.append("text")
			.attr("x",40)
			.attr("y",600)
			.text("Liberty Ship")
			.style("font","24px times");

		unitSVG.append("path")
			.attr("d",shipKeyMaker(20,630))
			.style("fill",victoryColor);
		
		unitSVG.append("text")
			.attr("x",40)
			.attr("y",630)
			.text("Victory Ship")
			.style("font","24px times");
		
		

		const looper = () => {
			let i = 0;          
			//console.log(dateList.length);

			

			function myLoop() {        
				if (playStatus==false){
					setTimeout(function(){
						if (i < dateList.length) {           
							myLoop();    
						}
					},100)
				} else{
					  setTimeout(function() {   
					  ////console.log(dateList[i])
						dateShips = shipData.filter(function(d){ return d.Completed==dateList[i]});
						dateDiv.html(`${numericDate2Written(dateList[i])}`);
				
						for (let j = 0; j < dateShips.length; j++){
							unitSVG
								.data([dateShips[j]])
								.append("path")
								.attr("id", function(d){ return(`ship${d.sequentialID}`)})
								.classed("ship",true)
								.attr("d",function(d){
									let shipYard = shipYards.filter(function(dd){ 
										return dd.properties.name==d.Shipyard})[0];
									let [x,y] = projection(shipYard.geometry.coordinates);
									shipYard.properties.shipCount += 1;
									if (d.Type.substring(0,2) == "VC"){
										shipYard.properties.victoryCount +=1;
									} else{
										shipYard.properties.libertyCount +=1;
									};
									
									return(shipMaker(x,y));
								})
								.style("stroke-width",0)
								.style("fill",function(d){return shipColorFunc(d)})
								.on('click',function(d,i){
									sidePanel.html(data2SidePanel(i));
								})
								.on('mouseover', function (d, i) {
									d3.select(this)
									.style("fill",selectColor);
									d3.select(`#${flattenName(i.Shipyard)}`)
									.attr("fill",selectColor)
									.attr("r","8px");

									detailDiv.html(data2Text(i));
									})
									.on("mouseout",function (d, i) {
									d3.select(this)
									.style("fill",function(i){
										if (i.highlighted == true) {
											return(highlightColor);
										} else{
											return(shipColorFunc(i));
										}
									});
									d3.select(`#${flattenName(i.Shipyard)}`)
									.attr("fill",shipYardColorOff)
									.attr("r","4px");
									detailDiv.html(``);
									});

								unitSVG.select(`#ship${dateShips[j].sequentialID}`)
								.transition()
								.duration(500)
								.attr("d",function(){
									let x = dateShips[j].x;
									let y = dateShips[j].y;
									return(shipMaker(x,y));
						
							});  
						}


						unitSVG.selectAll("rect.myRect")
							.data(shipYards)
							.attr("width", function(d) {d.properties.timeSeries.push(d.properties.shipCount);
								return x(d.properties.shipCount) - graphXOffset; 
							})
						i++;   
						slider.attr("value",i);
						if (i < dateList.length) {           
						  myLoop();             
						} else{
							scrollStatus = true;
							sliderJS.disabled = false;
							searchButton.disabled = false;
							clearButton.disabled = false;
							suggestButton.disabled = false;
							updateTimer();
							
						}
					  }, 30)
				}
			}

			myLoop();
		};

		looper();
		});
		d3.select("#sort").on("click", function(){

			for (i=0; i < shipData.length; i++){
				shipData[i].highlighted = false;
				unitSVG.selectAll(`#ship${shipData[i].sequentialID}`)
				.style("fill",shipColorFunc(shipData[i]));
			};

			let searchTarget = document.getElementById("myVal").value.toLowerCase();
			for (i=0; i < shipData.length; i++){
				if (shipData[i].Fate.toLowerCase().indexOf(searchTarget) != -1) {
					shipData[i].highlighted = true;
					unitSVG.selectAll(`#ship${shipData[i].sequentialID}`)
					.style("fill",highlightColor);
				}
			}
		});

		d3.select("#suggestion").on("click", function(){

			for (i=0; i < shipData.length; i++){
				shipData[i].highlighted = false;
				unitSVG.selectAll(`#ship${shipData[i].sequentialID}`)
				.style("fill",shipColorFunc(shipData[i]));
			};

			let searchIndex = Math.floor(Math.random()*suggestedSearches.length);
			let searchTarget = suggestedSearches[searchIndex];
			document.getElementById("myVal").value = searchTarget;
			for (i=0; i < shipData.length; i++){
				if (shipData[i].Fate.toLowerCase().indexOf(searchTarget) != -1) {
					shipData[i].highlighted = true;
					unitSVG.selectAll(`#ship${shipData[i].sequentialID}`)
					.style("fill",highlightColor);
				}
			}
		});

		d3.select("#clear").on("click", function(){

			document.getElementById("myVal").value = '';
			for (i=0; i < shipData.length; i++){
				shipData[i].highlighted = false;
				unitSVG.selectAll(`#ship${shipData[i].sequentialID}`)
				.style("fill",shipColorFunc(shipData[i]));
			}
		});

		d3.select("#playPause").on("click", function(){
			playStatus = true;
			pButton.disabled = true;
		});

		function dateUpdate(){
			dateDiv.html(`${numericDate2Written(dateList[scrollIndex])}`);
			d3.selectAll("path.ship")
				.style("opacity",function(d){
					if (dateParser(d.Completed)<= dateParser(dateList[scrollIndex])){
						return 1;
					} else {
						return 0.3;
					}
			});

			unitSVG.selectAll("rect.myRect")
				.data(shipYards)
				.transition()
				.duration(10)
				.attr("width", function(d) {return x(d.properties.timeSeries[scrollIndex]) - graphXOffset; 
				});
		}



		slider.on("input",function(){
			scrollIndex = this.value;
			
		});

		function updateTimer(){
			setTimeout(function(){
				dateUpdate();
				updateTimer();
			},30)
			
		};

		
		
		

        });


		
		


