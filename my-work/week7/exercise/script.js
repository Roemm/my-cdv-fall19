let w = 1200;
let h = 800;

// for convenience
let datafile = "data.json";

// function to retrieve only the data points
// belonging to one step in time:
function getName(data, name){
  return data.filter(function(datapoint){
    if(datapoint.name == name){
      return true;
    }else{
      return false;
    }
  });
}

// creating the svg that holds everything else
// we do this outside the gotData function to
// keeps things clean
let viz = d3.select("#container")
  .append('svg')
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "darkcyan")
;

let buttonA = document.getElementById('buttonA');
let buttonB = document.getElementById('buttonB');
let buttonC = document.getElementById('buttonC');


function gotData(incomingData){

  let defaultData = getName(incomingData, "A");
  console.log(defaultData);

  //create axis
  let xDomain = d3.extent(defaultData, function(datapoint){
    return datapoint.x;
  });
  console.log(xDomain);

  let yDomain = d3.extent(defaultData, function(datapoint){
    return datapoint.y;
  })
  console.log(yDomain);

  // general padding of our visualization
  let padding = 80;
  // scale to map from min and max of our x values to the
  // boundaries (minus padding) of our svg:
  let xScale = d3.scaleLinear().domain(xDomain).range([padding, w-padding]);

  // create axis for this scale
  let xAxis = d3.axisBottom(xScale);
  // create a groyp to gold the axis elements
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  // tell d3 to fill the group with the axis elements
  xAxisGroup.call(xAxis);
  // position the axis at the bottom of the svg
  xAxisGroup.attr("transform", "translate(0, "+ (h-padding) +")");

  // note how we flip the orientation (in the range) of our y scale
  // to make sure that low y values are at the bottom of the graph
  let yScale = d3.scaleLinear().domain(yDomain).range([h-padding, padding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+padding+",0)");

  let vizgroup = viz.append('g').attr('class', 'vizgroup');

  drawGraph("A");

  buttonA.addEventListener('click', function(){
    drawGraph("A");
  });

  buttonB.addEventListener('click', function(){
    drawGraph("B");
  });

  buttonC.addEventListener('click', function(){
    drawGraph("C");
  });

  function drawGraph(name){

    let updatedData = getName(incomingData, name);
    console.log(updatedData);

    //update the x and y axis
    xDomain = d3.extent(updatedData, function(datapoint){
      return datapoint.x;
    });
    xScale.domain(xDomain);
    xAxisGroup.call(xAxis);

    yDomain = d3.extent(updatedData, function(datapoint){
      return datapoint.y;
    });
    yScale.domain(yDomain);
    yAxisGroup.call(yAxis);


    let datagroups = vizgroup.selectAll(".datagroup").data(updatedData, function(d){
      return d.step
    });

    let incomingDataGroups = datagroups.enter()
      .append("g")
      .attr("class", "datagroup")
    ;

    incomingDataGroups.append("circle")
        .attr("r", 5)
        .attr("fill", "white")
    ;

    incomingDataGroups.attr("transform", function(d, i){
      return "translate("+ xScale(d.x) + ", " + yScale(d.y) + ")"
    });

    //clear all the datagroups before updating
    datagroups.exit().remove();

    datagroups.transition().attr("transform", function(d, i){
      return "translate("+ xScale(d.x) + ", " + yScale(d.y) + ")"
    });

  }

}





d3.json(datafile).then(gotData);
