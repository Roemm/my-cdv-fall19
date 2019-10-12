let w = 1200;
let h = 800;

let width = 600;
let height = 800;
let margin = 40;

let bordercolor='#E8E1D3';
let containerColor = '#DFD1B5';

let svgPhone = '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 23.0.4, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 34 77.5" style="enable-background:new 0 0 34 77.5;" xml:space="preserve"><style type="text/css">.st0{fill:#E8E1D3;}</style><title>Phone3</title><g><g><path class="st0" d="M30,0H4C1.8,0,0,1.8,0,4v54c0,2.2,1.8,4,4,4h26c2.2,0,4-1.8,4-4V4C34,1.8,32.2,0,30,0z M32,58c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V4c0-1.1,0.9-2,2-2h26c1.1,0,2,0.9,2,2V58z"/><circle class="st0" cx="11" cy="6" r="1"/><path class="st0" d="M20,5h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6c0.6,0,1-0.4,1-1S20.6,5,20,5z"/><path class="st0" d="M17,49c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S19.2,49,17,49z M17,55c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,55,17,55z"/></g></g></svg>'
let svgNoPhone = '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 23.0.4, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 47 76.2" style="enable-background:new 0 0 47 76.2;" xml:space="preserve"><style type="text/css">.st0{fill:#E8E1D3;}</style><title>No phone5</title><g><g><path class="st0" d="M7,43c0.6,0,1-0.4,1-1V4c0-1.1,0.9-2,2-2h26c1.1,0,2,0.9,2,2v7c0,0.6,0.4,1,1,1s1-0.4,1-1V4c0-2.2-1.8-4-4-4H10C7.8,0,6,1.8,6,4v38C6,42.6,6.4,43,7,43z"/><circle class="st0" cx="17" cy="6" r="1"/><path class="st0" d="M20,5c-0.6,0-1,0.4-1,1s0.4,1,1,1h6c0.6,0,1-0.4,1-1s-0.4-1-1-1H20z"/><path class="st0" d="M46.7,9.3c-0.4-0.4-1-0.4-1.4,0l-45,45c-0.4,0.4-0.5,1-0.1,1.4s1,0.5,1.4,0.1c0,0,0.1-0.1,0.1-0.1L6,51.4V57c0,2.2,1.8,4,4,4h26c2.2,0,4-1.8,4-4V18c0-0.2-0.1-0.3-0.1-0.5l6.8-6.8C47.1,10.3,47.1,9.7,46.7,9.3C46.7,9.3,46.7,9.3,46.7,9.3zM38,57c0,1.1-0.9,2-2,2H10c-1.1,0-2-0.9-2-2v-7c0-0.2-0.1-0.3-0.1-0.5L38,19.4V57z"/></g></g></svg>'

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr('class', 'frame')
    .style('background-color', containerColor)
  .append("g")
    .attr('class', 'pie')
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
;

// Create dummy data
var data = {a: 10, b: 14}

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(['#5E4F30', '#ABA08A'])

var icon = d3.scaleOrdinal()
  .domain(data)
  .range([svgPhone, svgNoPhone])
;

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
viz.selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', arcGenerator)
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", bordercolor)
  .style("stroke-width", "5px")
  // .style("opacity", 0.7)
;

let icons = viz.selectAll('icon')
  .data(data_ready)
  .enter()
  .append("g")
    .attr("class", "icons")
    .html(function(d){ return (icon(d.data.key))})
    .attr("transform", function(d) {
      let iconX = arcGenerator.centroid(d)[0]-65;
      let iconY = arcGenerator.centroid(d)[1]-100;
      return "translate(" + iconX  +', ' + iconY + "), scale(0.1)" ;  })

;

let formatDecimal = d3.format(".2%");

viz.selectAll('text')
  .data(data_ready)
  .enter()
  .append('text')
    .attr('id', 'intro')
    .text(function(d){ return formatDecimal(d.data.value/24)})
    .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
    .style("text-anchor", "middle")
    .style("font-size", 30)
    .style('fill', bordercolor)
    .style('font-family', "'Ruda', sans-serif")
;



var intro = d3.select(".frame").append("g")
    .attr("class","intro")
    .attr("transform", "translate(" + width + "," + 0 + ")")
;

intro.append("text")
  .text('Introduction')
    .attr('id', 'title')
    .attr('fill', '#5E584C')
    .style('font-size', 50)
    .attr("x",10)
    .attr("y",70)
    .style("text-anchor","center")
;

intro.append("text")
  .text('This project is visualizing how many times I picked up my phone every two hours. I recorded the data from 8 a.m to midnight for 6 days, from Wednesday to the next Monday.')
    .attr('fill', '#5E584C')
    .style('font-size', 25)
    .attr("x",10)
    .attr("y",90)
    .style("text-anchor","center")
    .call(wrap, 500)
;

intro.append("text")
  .text('For the cover page, I created crescent moon shapes to represent how many times I picked up my phone--the more I picked up my phone, the fuller the moon is. Each row represents one day while each column represents one period time (8-10, 10-12, etc.)')
    .attr('fill', '#5E584C')
    .style('font-size', 25)
    .attr("x",10)
    .attr("y",260)
    .style("text-anchor","center")
    .call(wrap, 500)
;

intro.append("text")
  .text('The second page is a stacked area map which is meant to show when I picked up the phone relatively more often throughout the day. The "times" is stacked on each other day by day and thus visualizes the overall tendency.')
    .attr('fill', '#5E584C')
    .style('font-size', 25)
    .attr("x",10)
    .attr("y",500)
    .style("text-anchor","center")
    .call(wrap, 500)
;

intro.append("text")
  .text('The pie chart on the left is just to show a weekly average percentage data of the time I spend on the phone.')
    .attr('fill', '#5E584C')
    .style('font-size', 25)
    .attr("x",10)
    .attr("y",700)
    .style("text-anchor","center")
    .call(wrap, 500)
;


function wrap(text, width) {
  text.each(function() {
    let text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.5, // ems
      x = text.attr("x"),
      y = text.attr("y"),
      dy = 1.1,
      tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
