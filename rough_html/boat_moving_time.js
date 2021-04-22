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
        "coordinates": [-122.6,45.5]
        },
        "properties": {
        "name": "Kaiser Co"
        }
        }
        ];
        let unitHeight = 800;
        let unitWidth = 1500;
        let mapHeight = 150;
        let mapWidth = 300;

        console.log(shipYards.filter(function(d){ return d.properties.name=="California Shipbuilding Corp"})[0].geometry.coordinates);

        const shipMaker = (x,y) => {
            return(`M ${x-10} ${y-5} l 2 5, l 15 0 l 2 -5 h -5 v -5 h -2 v 5 z`)
        }

        // shipData = d3.csv("allShipsOrdered.csv",function(data){return(data);});
        let shipData = [];

        //console.log(shipData);

        let unitSVG = d3.selectAll("#unit")
        .append("svg:svg")
        .attr("height",unitHeight)
        .attr("width",unitWidth);

        const unitMapper = (shipIndex,shipR, numCols, numShips, width) => {
        let spacing = (width-2*shipR)/numCols;
        let y = Math.floor(shipIndex/numCols)*12 + shipR;
        let x = (shipIndex%numCols) * spacing + shipR;
        return([x,y]);
        }

        const data2Text = (shipData) =>{
        let text = `name: ${shipData.Name}    date completed: ${shipData.Completed}    fate: ${shipData.Fate}`
        return(text);
        }



        d3.csv("allShipsOrdered.csv").then(function(data) {
        for (let i =0; i< data.length; i++){
        shipData.push(data[i]);
        };


        for (let i =0; i < shipData.length; i++){
        let [x,y] = unitMapper(i,20,70,shipData.length,unitWidth)
        shipData[i].x = x;
        shipData[i].y = y;
		shipData[i].sequentialID = i;
        };

        detailDiv = d3.selectAll("#details");




        // from https://www.d3-graph-gallery.com/graph/backgroundmap_country.html

        let map = unitSVG;

        // Map and projection
        var projection = d3.geoMercator()
        .center([-93,44])                // GPS of location to zoom on
        .scale(350)                       // This is like the zoom
        .translate([ unitWidth/2, 530 ])

        // Load external data and boot
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data){

        // Filter data
        data.features = data.features.filter(function(d){ return d.properties.name=="USA"});
        console.log(data.features[0].geometry);
        data.features[0].geometry.coordinates = [data.features[0].geometry.coordinates[5]]

        // Draw the map
        map.selectAll("path.USA")
        .data(data.features)
        .enter()
        .append("path")
        .attr("fill", "grey")
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
        .attr("fill", "blue")
        .attr("id",function(d){return(flattenName(d.properties.name))});



        });


        let ships = unitSVG.selectAll("path.ship")
        .data(shipData)
        .enter()
        .append("path")
		.attr("id", function(d){ return(`ship${d.sequentialID}`)})
        .attr("d",function(d){
            let [x,y] = projection(shipYards.filter(function(dd){ 
                return dd.properties.name==d.Shipyard})[0]
                    .geometry.coordinates)
            return(shipMaker(x,y));
        })
        .style("stroke-width",0)
        .style("fill","rgb(255,0,0)")



		console.log(unitSVG.select("#ship1"));

		

		

		const looper = new Promise(function(resolve,reject) {
		  let i = 0;                  

			function myLoop() {         
			  setTimeout(function() {   
				unitSVG.select(`#ship${i}`)
				.transition()
				.duration(3000)
				.attr("d",function(){
					let x = shipData[i].x;
					let y = shipData[i].y;
					return(shipMaker(x,y));
				});  
				i++;                    
				if (i < shipData.length) {           
				  myLoop();             
				}                       
			  }, 3)
			}

			myLoop();
			resolve();
		})
		looper.then(function() {
			ships
			.data(shipData)
			.on('mouseover', function (d, i) {
			d3.select(this).transition()
			.duration('50')
			.style("fill","rgb(0,0,255)");
			console.log(i);
			d3.select(`#${flattenName(i.Shipyard)}`)
			.attr("fill","rgb(255,255,255)");

			detailDiv.html(data2Text(i));
			})
			.on("mouseout",function (d, i) {
			d3.select(this).transition()
			.duration('50')
			.style("fill","rgb(255,0,0)");
			d3.select(`#${flattenName(i.Shipyard)}`)
			.attr("fill","rgb(0,0,255)");
			detailDiv.html(``);
		});
		});

        });

		


