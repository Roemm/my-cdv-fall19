let w = 900;
let h = 500;

let col = 10;
let xpadding = 100;
let ypadding = 50;

let viz = d3.select('#container')
  .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('background-color', 'lavender')
;

function setX(datapoint,i){
  return 90 * (i % col)  + 40;
}

function setY(datapoint,i){
  if(i == 0){
    y = 0;
  }
  if (i % col == 0){
    y++;
  }
  return 100 * y - 50;
}

function setTextX(datapoint,i){
  return 90 * (i % col) +20;
}

function setTextY(datapoint,i){
  if(i == 0){
    y = 0;
  }
  if (i % col == 0){
    y++;
  }
  return 100 * y - 30;
}


function gotData(data){
  console.log(data);

  // let xDomain = d3.extent(data, function(d){ console.log(d.publishedAt); return d.publishedAt });
  // let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  // let xAxis = d3.axisBottom(xScale);
  // let xAxisGroup = viz.append("g")
  //     .attr("class", "xaxisgroup")
  //     .attr("transform", "translate(0,"+(h-ypadding)+")")
  // ;
  // xAxisGroup.call(xAxis);
  let circles = viz.append("g").classed("circles", true);

  circles.selectAll('circle').data(data).enter().append('circle')
                                            .attr('cx', setX)
                                            .attr('cy', setY)
                                            .attr('r', 20)
                                            .attr('fill', 'pink')
  ;

  document.getElementById("title").addEventListener("click", title);
  document.getElementById("descrip").addEventListener("click", descrip);

  let textGroup = viz.append("g").classed("textGroup", true);

  textGroup.selectAll('text').data(data).enter()
      .append('text')
      .attr('x', setTextX)
      .attr('y', setTextY)
      .attr('font-size', '5px')
      .style("text-anchor","center")
      .text(function(d){return d.title})
      .call(wrap, 50)
  ;


  function title(){

    textGroup.selectAll('text')
      .transition()
      .duration(1000)
      .text(function(d) {
        return d.title;
      })
      .attr('x', setTextX)
      .attr('y', setTextY)
      .attr('font-size', '5px')
      .style("text-anchor","center")
      .call(wrap, 80)
  }


  function descrip(){

    textGroup.selectAll('text')
      .transition()
      .duration(1000)
      .text(function(d) {
        return d.description;
      })
      .attr('x', setTextX)
      .attr('y', setTextY)
      .attr('font-size', '5px')
      .style("text-anchor","center")
      .call(wrap, 80)

  }

}

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

d3.csv('1.csv').then(gotData);
