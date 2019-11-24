import currentBox from "./leonScroller.js";
// imports just one function from a different file
// more info, import: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
// more info, export: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

// we don't hardcode w and h this time
// but keep them responsive
// (see adjustVizHeight and resized function
// that are defined at the bottom)
let w, h;
let heightRatio = 1;
let padding = 90;
let col = 5;
let y = 20;

let viz = d3.select("#visualization")
    .append("svg")
  .style("background-color", "lavender")
;
// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
// (function definition at the bottom)
adjustVizHeight();

function setX(datapoint,i){
  return 120 * (i % col)  + 60;
}

function setY(datapoint,i){
  if(i == 0){
    y = 0;
  }
  if (i % col == 0){
    y++;
  }
  return 60 * y - 30;
}

// function setTextX(datapoint,i){
//   return 90 * (i % col) +20;
// }
//
// function setTextY(datapoint,i){
//   if(i == 0){
//     y = 0;
//   }
//   if (i % col == 0){
//     y++;
//   }
//   return 100 * y - 30;
// }


// your script starts here, e.g. load data here.
d3.csv('BTS_videos.csv').then(function(channelData){
  console.log(channelData);
  let circles = viz.append("g").classed("circles", true);

  circles.selectAll('circle').data(channelData).enter().append('circle')
                                            .attr('cx', setX)
                                            .attr('cy', setY)
                                            .attr('r', 20)
                                            .attr('fill', 'pink')
  ;

  // scrolling event listener
  // you might move this block into the part of your code
  // in which your data is loaded/available
  let previousSection;
  d3.select("#textboxes").on("scroll", function(){
    // the currentBox function is imported on the
    // very fist line of this script
    currentBox(function(box){
      console.log(box.id);

      if(box.id=="two" && box.id!=previousSection){
        console.log("changing viz");
        // trigger a new transition
        previousSection = box.id;
        circles.selectAll('circle')
          .transition()
          .attr('fill', 'white')
      }

    })
  })

})












// function to adjust viz height dynamically
// in order to keep the heightRatio at any given
// width of the browser window
function adjustVizHeight(){
  viz.style("height", function(){
    w = parseInt(viz.style("width"), 10);
    h = w*heightRatio;
    return h;
  })
}
function resized(){
  adjustVizHeight()
}
window.addEventListener("resize", resized);
