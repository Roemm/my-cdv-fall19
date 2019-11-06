d3.json("births.json").then(gotData);


let w = 900;
let h = 500;
let xpadding = 100;
let ypadding = 50;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;

let china = document.getElementById('chn');
let usa = document.getElementById('usa');


function gotData(incomingData){
  // the following function is defined below
  // it allows for us to NOT WORRY about parsing
  // time strings and creating JS date objects
  // in the following script
  incomingData = fixJSDateObjects(incomingData);
  console.log(incomingData);

  // initital data - USA or CHN
  let data = incomingData[1];
  console.log(data);

  // we can use a  time scale because our data expresses
  // years in the form of JS date objects
  let xDomain = d3.extent(data, function(d){ return d.year });
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);

  let yMax1 = d3.max(incomingData[0], function(d){
    return d.birthsPerThousand;
  })
  let yMax2 = d3.max(incomingData[1], function(d){
    return d.birthsPerThousand;
  })
  let yMax = d3.max([yMax1, yMax2]);
  let yDomain = [0, yMax];
  let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding/2)+",0)")
  ;
  yAxisGroup.call(yAxis);

  let lineMaker = d3.line()
                      .x(function(d){return xScale(d.year)})
                      .y(function(d){return yScale(d.birthsPerThousand)})
                      ;


  let theSituation = viz.datum(data);

  theSituation.append('path')
          .attr('d', lineMaker)
          .attr('fill', 'none')
          .attr('stroke', 'pink')
          .attr('stroke-width', 3)
          ;


}

// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix){
  // timeParser
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function(data){
    return data.map(function(d){
      return {
        "country": d.country,
        "year": timeParse(d.year),
        "birthsPerThousand": d.birthsPerThousand
      }
    })
  });
}


document.getElementById("buttonE").addEventListener("click", shuffleData);
