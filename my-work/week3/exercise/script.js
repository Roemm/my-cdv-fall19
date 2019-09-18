function xp(datapoint, i){
  let x = 400 + datapoint.time * 30 * Math.cos(i*7.5);
  // let y = datapoint.time * 100 * Math.sin(i*7.5);
  console.log(x);
  // console.log(datapoint);
  return x;
}

function yp(datapoint, i){
  // let x = datapoint.time * 100 * Math.cos(i*7.5);
  let y = 200 + datapoint.time * 30 * Math.sin(i*7.5);
  // console.log(x);
  // console.log(datapoint);
  return y;
}

// function randomNumber(){
//   console.log(Math.sin(Math.random()*360)*50);
//   return 400 + Math.sin(Math.random()*360)*100;
// }

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
                                            .attr('y1', 200)
                                            .attr('x2', xp)
                                            .attr('y2',yp)
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
