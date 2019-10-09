let w = 1200;
let h = 800;

let width = 600;
let height = 800;
let margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style('background-color', '#f8f1d5')
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = {a: 10, b: 14}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(['#A89E6F', '#C2B993'])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
viz.selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", '#f8f1d5')
  .style("stroke-width", "5px")
  .style("opacity", 0.7)
