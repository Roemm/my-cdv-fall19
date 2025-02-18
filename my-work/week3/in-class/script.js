function randomNumber(datapoint, i){
  console.log(datapoint);
  console.log(i);
  return 10 * i *datapoint.time;
}

function getColor(datapoint, i){
  if (datapoint.date == 'Wed') {
    return 'red';
  }else if (datapoint.date == 'Thu') {
    return 'blue';
  }else {
    return 'orange';
  }
}

function gotData(incomingData){
  console.log(incomingData);

  //create svg
  let viz = d3.select('body')
    .append('svg')
      .attr('width', 500)
      .attr('height', 500)
  ;

  //bind data
  viz.selectAll('circle').data(incomingData)
    .enter()
      .append('circle')
      .attr('cx', d3.randomUniform(width/3, width*2/3))
      .attr('cy', d3.randomUniform(height/3, height*2/3))
      .attr('r', 20)
      .attr('fill', getColor)
  ;
}

d3.json("data.json").then(gotData);
