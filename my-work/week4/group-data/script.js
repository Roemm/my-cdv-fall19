let y = 0;
let col = 8;

//set the position of each element
//so that it is positioned in a grid
function setX(datapoint,i){
  return 100 * (i % col) + 50;
}

function setX2(datapoint,i){
  console.log(datapoint.time *10);
  return 100 * (i % col) + 60 + datapoint.time*5;
}

function setX3(datapoint,i){
  return 100 * (i % col) + 70;
}

function setTextX(datapoint,i){
  return 100 * (i % col) + 40;
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

function setTextY(datapoint,i){
  if(i == 0){
    y = 0;
  }
  if (i % col == 0){
    y++;
  }
  return 100 * y;
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
  if(datapoint.timeperiod == '9-11'){
    return 1;
  }else if (datapoint.timeperiod == '11-13') {
    return 0.84;
  }else if (datapoint.timeperiod == '13-15') {
    return 0.72;
  }else if (datapoint.timeperiod == '15-17') {
    return 0.6;
  }else if (datapoint.timeperiod == '17-19') {
    return 0.48;
  }else if (datapoint.timeperiod == '19-21') {
    return 0.36;
  }else if (datapoint.timeperiod == '21-23') {
    return 0.24;
  }else if (datapoint.timeperiod == '23-01') {
    return 0.12;
  }
}

// function getText(datapoint){
//   if(datapoint.timeperiod == '9-11'){
//     return '😪';
//   }else if (datapoint.timeperiod == '11-13') {
//     return '🤓';
//   }else if (datapoint.timeperiod == '13-15') {
//     return '🥵';
//   }else if (datapoint.timeperiod == '15-17') {
//     return '🥳';
//   }else if (datapoint.timeperiod == '17-19') {
//     return '😛';
//   }else if (datapoint.timeperiod == '19-21') {
//     return '🤯';
//   }else if (datapoint.timeperiod == '21-23') {
//     return '😏';
//   }else if (datapoint.timeperiod == '23-01') {
//     return '🤪';
//   }
// }

function gotData(incomingData){
  console.log(incomingData);

  //create svg
  let viz = d3.select('body')
    .append('svg')
      .attr('width', 800)
      .attr('height', 610)
      .attr('id', 'viz')
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
    .attr("r", 30)
    .attr('fill', getColor)
    .attr('fill-opacity', getOpa)
  ;

  //append the second circle to create the moon shape
  groupelements.append("circle")
    .attr("cx", setX2)
    .attr("cy", setY)
    .attr("r", 25)
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
