function justChecking(datapoint){
  console.log(datapoint.time);
  return datapoint.time*50 //returns value of the datapoint multiplied with 50
}

function gotData(newdata){
  // console.log(newdata);

  let viz = d3.select('#viz-container')
                  .append('svg')
                    .attr('id', 'viz')
                    .attr('width', 800)
                    .attr('height', 800)
  ;

  viz.selectAll('circle').data(newdata).enter().append('circle')
                                            .attr('cx', justChecking)
                                            .attr('cy', 400)
                                            .attr('r', 20)
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
