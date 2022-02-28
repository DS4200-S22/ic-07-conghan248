/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 


const svg3 = d3
.select("#csv-scatter")
.append("svg")
.attr("width", width-margin.left-margin.right)
.attr("height", height - margin.top - margin.bottom)
.attr("viewBox", [0, 0, width, height]);

//setup the hard-coded-bar to become hover using opacity
const tooltip3 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip3") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// mouseover1 event handler
const mouseover3 = function(event, d) {
  tooltip3.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// mousemover1 event handler
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// mouseleave1 event handler
const mouseleave3 = function(event, d) { 
  tooltip3.style("opacity", 0);
}

// load the database into js
d3.csv("data/scatter.csv").then((data3) => {

    // find max Y2 from data1
    let maxY3 = d3.max(data3, function(d) { return d.score;});
    let maxX3 = d3.max(data3, function(d) {return d.day;});
  
    let yScale3 = d3.scaleLinear()
                    .domain([0,maxY3])
                    .range([height-margin.bottom,margin.top]); 
  
    // map  data values (domain for the scale function) to our pixel values (range for the scale function) 
    let xScale3 = d3.scaleLinear()
                    .domain([0,maxX3])
                    .range([margin.left, width - margin.right]);
    
    // Add y axis to svg1 
    svg3.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(yScale3)) 
         .attr("font-size", '20px'); 
  
  // Add x axis to svg1 
  svg3.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale3))  
      .attr("font-size", '20px'); 
  
  // add event lisenter
  svg3.selectAll(".circle") 
      .data(data3) 
      .enter()  
      .append("circle") 
       .attr("class", "bar") 
       .attr("x", (d,i) => xScale3(i)) 
       .attr("y", (d) => yScale3(d.score)) 
       .attr("height", (d) => xScale3(d.day))
       .attr("width", xScale3.bandwidth()) 
       .on("mouseover", mouseover3) 
       .on("mousemove", mousemove3)
       .on("mouseleave", mouseleave3);
});
