let y = 0;
let col = 8;
let w = 1200;
let h = 800;
let margin = { top: 0, right: w/6, bottom: h/4, left: w/6 };

let border=12;
let bordercolor='#E8E1D3';
let backcolor = '#9E9480';
let containerColor = '#DFD1B5';

//create svg
let viz = d3.select('#container')
  .style('background-color', backcolor)
  .append('svg')
    .attr('width', w*2/3)
    .attr('height', h*3.5/6)
    .attr('id', 'viz')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("background-color", containerColor)
  ;

//set the position of each element
//so that it is positioned in a grid
function setX(datapoint,i){
  return 100 * (i % col)  + 55;
}

function setX2(datapoint,i){
  // console.log(datapoint.time *10);
  return 100 * (i % col) + 65 + datapoint.time*1.2;
}


function setY(datapoint,i){
  if(i == 0){
    y = 0;
  }
  if (i % col == 0){
    y++;
  }
  return 75 * y - 30;
}


//decide the color of the shape based on what day it is
function getColor(datapoint){
  if (datapoint.date == 'Wed') {
    return '#CCC6BA';
  }else if (datapoint.date == 'Thu') {
    return '#3D5578';
  }else if(datapoint.date == 'Fri'){
    return '#A6A197';
  }else if(datapoint.date == 'Sat'){
    return '#5F779C';
  }else if(datapoint.date == 'Sun'){
    return '#918367';
  }else if(datapoint.date == 'Mon'){
    return '#9FAFC4';
  }
}


function gotData(incomingData){
  console.log(incomingData);

  //create groupelements
  let groupelements = viz.selectAll(".datagroup").data(incomingData)
  .enter()
    .append("g")
    .attr("class", "datagroup")
  ;

  //append the first circle
  groupelements.append("circle")
    .attr("cx", setX)
    .attr("cy", setY)
    .attr("r", 30)
    .attr('fill', getColor)
    // .attr('fill-opacity', getOpa)
  ;

  //append the second circle to create the moon shape
  groupelements.append("circle")
    .attr("cx", setX2)
    .attr("cy", setY)
    .attr("r", 25)
    .attr('fill', containerColor)
    // .attr('stroke', 'black')
    // .attr('stroke-width', 2)
  ;

  //append a frame
  var borderPath = viz.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", h*3.5/6)
    .attr("width", w*2/3)
    .style("stroke", bordercolor)
    .style("fill", "none")
    .style("stroke-width", border);
}


d3.json("data.json").then(gotData);
