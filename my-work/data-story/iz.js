let width = 1200;
let height = 600;


let viz = d3.select("#container").append("svg")
    .style("width", width)
    .style("height", height)
;

let col = 10;
let xpadding = 20;
let ypadding = 50;

function setX(datapoint,i){
  return 120 * (i % col)  + 30;
}

function setY(datapoint,i){
  if(i == 0){
    y = 0;
  }
  if (i % col == 0){
    y++;
  }
  return 110 * y - 80;
}

function setTextX(datapoint,i){
  return 120 * (i % col) +10;
}

function setTextY(datapoint,i){
  if(i == 0){
    y = 0;
  }
  if (i % col == 0){
    y++;
  }
  return 110 * y - 60;
}

d3.csv('datasets/izone_videos.csv').then(function(data){

  console.log(data);

  let myScale = d3.scaleLinear();

  myScale
  .domain([0, data[0].viewCount])
  .range([5, 30]);



  let box = d3.select("body").append("div")
    .attr("class", "videoBox")
    .style("opacity", 0)
  ;

  let circles = viz.append("g").classed("circles", true);

  circles.selectAll('circle').data(data).enter().append('circle')
                    .attr('cx', d3.randomUniform(xpadding, width/2))
                    .attr('cy', d3.randomUniform(height/8, height*3/4))
                    .attr('r', function(d){return myScale(d.viewCount)})
                    .attr('fill', 'pink')
                    .on("mouseover",function(d) {
                        d3.select(this)
                          .style("opacity", .9)
                        ;
                        d3.select(this)
                          .transition()
                          .attr("r", function(d){return myScale(d.viewCount)*1.3})
                        ;
                        box.transition()
                            .duration(200)
                            .style("opacity", .9)
                        ;
                        box.html("Video Title: " + d.Title + "</br>" + "View: " + d.viewCount)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px")
                        ;

                    })
                    .on("mouseout",function(d){
                      d3.select(this)
                        .style("opacity", 1)
                      ;
                      d3.select(this)
                        .transition()
                        .attr("r", function(d){return myScale(d.viewCount)})
                      ;
                      box.transition()
                          .duration(500)
                          .style("opacity", 0)
                      ;
                    })
                  ;



                  });


  // document.getElementById("title").addEventListener("click", title);
  // document.getElementById("descrip").addEventListener("click", descrip);

  // let textGroup = viz.append("g").classed("textGroup", true);
  //
  // textGroup.selectAll('text').data(data).enter()
  //     .append('text')
  //     .attr('x', setTextX)
  //     .attr('y', setTextY)
  //     .attr('font-size', '8px')
  //     .style("text-anchor","center")
  //     .text(function(d){ return d.Title})
  //     .call(wrap, 80)
  // ;


  // function title(){
  //
  //   textGroup.selectAll('text')
  //     .transition()
  //     .duration(1000)
  //     .text(function(d) {
  //       return d.Title;
  //     })
  //     .attr('x', setTextX)
  //     .attr('y', setTextY)
  //     .attr('font-size', '10px')
  //     .style("text-anchor","center")
  //     .call(wrap, 80)
  // }
  //
  //
  // function descrip(){
  //
  //   textGroup.selectAll('text')
  //     .transition()
  //     .duration(1000)
  //     .text(function(d) {
  //       return d.description;
  //     })
  //     .attr('x', setTextX)
  //     .attr('y', setTextY)
  //     .attr('font-size', '1px')
  //     .style("text-anchor","center")
  //     .call(wrap, 100)
  //
  // }


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
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").style("color", "#fefefe").text(word);
      }
    }
  });
}

var modal = document.getElementById("myModal");
var abt = document.getElementById("about");
var span = document.getElementsByClassName("close")[0];

abt.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
