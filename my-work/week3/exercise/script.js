function rad(datapoint){
  // console.log(datapoint);
  return datapoint.time * 100 //returns value of the datapoint multiplied with 50
}

function randomNumber(){
  console.log(Math.sin(Math.random()*360)*50);
  return 400 + Math.sin(Math.random()*360)*100; //returns a random number between 0 and 800;
}

function gotData(newdata){
  // console.log(newdata);

  let viz = d3.select('#viz-container')
                  .append('svg')
                    .attr('id', 'viz')
                    .attr('width', 800)
                    .attr('height', 800)
  ;

  viz.selectAll('line').data(newdata).enter().append('line')
                                            .attr('x1', 400)
                                            .attr('y1', 400)
                                            .attr('x2', rad )
                                            .attr('y2',randomNumber)
                                            .attr('stroke', 'white')
                                            .attr('stroke-width', 2)
}

d3.json("data.json").then(gotData);


// let viz = d3.select('#viz-container')
//                 .append('svg')
//                   .attr('id', 'viz')
//                   .attr('width', 800)
//                   .attr('height', 800)
// ;
//
//
// let myData = [4,29,85,74,6];
//
// viz.selectAll('circle').data(myData).enter().append('circle')
//                                           .attr('cx', 120)
//                                           .attr('cy', 400)
//                                           .attr('r', 20)
// ;
