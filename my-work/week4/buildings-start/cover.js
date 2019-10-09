let y = 0;
let col = 8;

//set the position of each element
//so that it is positioned in a grid
function setX(datapoint,i){
  return 150 * (i % col) + 80;
}

function setX2(datapoint,i){
  // console.log(datapoint.time *10);
  return 150 * (i % col) + 95 + datapoint.time*10;
}


function setY(datapoint,i){
  if(i == 0){
    y = 0;
  }
  if (i % col == 0){
    y++;
  }
  return 130 * y - 60;
}


//decide the color of the shape based on what day it is
function getColor(datapoint){
  if (datapoint.date == 'Wed') {
    return '#A89E6F';
  }else if (datapoint.date == 'Thu') {
    return '#F7DE71';
  }else if(datapoint.date == 'Fri'){
    return '#757059';
  }else if(datapoint.date == 'Sat'){
    return '#C2B993';
  }else if(datapoint.date == 'Sun'){
    return '#898F33';
  }else if(datapoint.date == 'Mon'){
    return '#363329';
  }
}

//decide the opacity of each shape based on the timeperiod
function getOpa(datapoint){
  if(datapoint.timeperiod == '8-10'){
    return 1;
  }else if (datapoint.timeperiod == '10-12') {
    return 0.84;
  }else if (datapoint.timeperiod == '12-14') {
    return 0.72;
  }else if (datapoint.timeperiod == '14-16') {
    return 0.6;
  }else if (datapoint.timeperiod == '16-18') {
    return 0.48;
  }else if (datapoint.timeperiod == '18-20') {
    return 0.36;
  }else if (datapoint.timeperiod == '20-22') {
    return 0.24;
  }else if (datapoint.timeperiod == '22-24') {
    return 0.12;
  }
}


function gotData(incomingData){
  console.log(incomingData);

  //create svg
  let viz = d3.select('#container')
    .append('svg')
      .attr('width', 1200)
      .attr('height', 800)
      .attr('id', 'viz')
      .style("background-color", '#f8f1d5')

  ;

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
    .attr("r", 50)
    .attr('fill', getColor)
    .attr('fill-opacity', getOpa)
  ;

  //append the second circle to create the moon shape
  groupelements.append("circle")
    .attr("cx", setX2)
    .attr("cy", setY)
    .attr("r", 40)
    .attr('fill', '#f8f1d5')
    // .attr('stroke', 'black')
    // .attr('stroke-width', 2)
  ;

  // groupelements.append("text")
  //   .text(getText)
  //   .attr("x", setTextX)
  //   .attr("y", setTextY)
  //   .attr('font-size', '15px')
  // ;
}

d3.json("data.json").then(gotData);
