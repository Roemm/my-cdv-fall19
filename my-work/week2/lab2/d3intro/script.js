let viz = d3.select('#viz-container')
                .append('svg')
                  .attr('id', 'viz')
                  .attr('width', 800)
                  .attr('height', 800)
;


let myData = [4,29,85,74,6];

viz.selectAll('circle').data(myData).enter().append('circle')
                                          .attr('cx', 120)
                                          .attr('cy', 400)
                                          .attr('r', 20)
;




// viz.attr('height', 500);
//
// let myCircle = viz.append('rect')
//       .attr('x', 200)
//       .attr('y', 100)
//       .attr('width', 200)
//       .attr('height', 200)
//       // .attr('r', 50)
// ;
//
// myCircle.attr('fill', 'white')
