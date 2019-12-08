import currentBox from "./leonScroller.js";

let w, h;
let heightRatio = 1;
let padding = 40;
let col = 5;
let y = 20;

var groupNote = [
  {'name': 'BTS',
    'color' : "#ae6277",
    'r': 15
  },
  {'name': 'GOT7',
    'color' : "#A8C28D",
    'r': 12
  },
  {'name': 'IZ*ONE',
    'color' : "#D96248",
    'r': 8
  },
  {'name': 'BLACKPINK',
    'color' : "#59898F",
    'r': 5
  },
];


let viz = d3.select("#visualization")
    .append("svg")
  // .style("background-color", "lavender")
;

adjustVizHeight();


d3.csv('datasets/GOT7_videos.csv').then(function(data){

  console.log(data);

  let cates = [];
  data.forEach(function(d){
    // console.log(d.cates);
    let cate = d.cates.split("['").join("").split("']").join("").split("' ").join("").split(" '").join("").split("'").join("");
    var newW = cate.split(",");
    for (var i = 0; i < newW.length; i++) {
      cates.push(newW[i]);
    }
    // console.log(newW);
    // cates.push(d.cates.split("[").join("").split("]").join("").split(",").join(""));
  });
  console.log(cates);

  var counts = [];

  for (var i = 0; i < cates.length; i++) {
    var num = cates[i];
    var co
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  let countData = Object.entries(counts).sort((a, b) => b[1] - a[1]);


  let myScale = d3.scaleLinear()
    .domain([16670, 4213105])
    .range([5, 40]);

  let likeScale = d3.scaleLinear()
      .domain([712, 110442])
      .range([5, 40]);

  //set random position
  var dataset = [];
  for (var i = 0; i < data.length; i++) {
    var x = d3.randomUniform(padding, w-padding)();
    var y = d3.randomUniform(padding, h*2/3)();
    dataset.push([x, y]);
  }

  let ratio = [];
  let decimals = [];
  let formatDecimal = d3.format(".2%");
  data.forEach(function(d){
    let l = parseFloat(d.likeCount);
    let dis = parseFloat(d.dislikeCount);
    decimals.push(l/(l+dis));
    ratio.push(formatDecimal(l/(l+dis)));
  })
  // console.log(ratio);

  let box = d3.select("#visualization").append("div")
    .attr("class", "tooltip")
  ;

  let zero = d3.select("#zero").append("div");

  zero.html('<p>For GOT7, among the top 50 most-viewed videos on Youtube, the highest one has <strong style="font-size: 32px;">' + data[0].viewCount +' </strong>views, which is also the highest among all the four groups; the lowest one has <strong style="font-size: 32px;">' + data[49].viewCount +'</strong> views.</p>');


  let one = d3.select("#one").append("div");

  one.html('<p>Among the top 50 most-viewed videos, the highest like/dislike ratio is <strong style="font-size: 32px;">' + d3.max(ratio) +' </strong>, which is also the highest among all the four groups; the lowest one is <strong style="font-size: 32px;">' + d3.min(ratio) +'</strong>. </br> The average ratio is <strong style="font-size: 32px;">' + formatDecimal(d3.mean(decimals)) +'</strong>.</p>');

  let two = d3.select("#two").append("div");

  two.html('<p>The Category <strong style="font-size: 32px;">"Music"</strong> is used most frequently. </br><strong style="font-size: 32px;">"Television Program" </strong>apprears a lot more frequently than other groups.</p>');

  let group = viz.append('g').classed("group", true);

  let circleGroup = group.selectAll('g')
      .data(data).enter()
      .append("g").classed("cirGroup", true);

  let circles = circleGroup.append("circle").classed("circles", true);
  let innerCircles = circleGroup.append("circle").classed("innerCircles", true);

  let cateGroup = viz.append('g').classed("cateGroup", true);

  let rectG = cateGroup.selectAll('g')
      .data(countData).enter()
      .append("g").classed("cirGroup", true);

  let rect = rectG.append("rect");
  let text = rectG.append("text");
  let number = rectG.append("text");


  function circleInit(){
    circles
            .transition()
            .style("display", 'block')
    // .selectAll('circle').data(data).enter().append('circle')
            .attr('cx',function(d, i){return dataset[i][0]})
            .attr('cy', function(d, i){return dataset[i][1]})
            .attr('r', function(d){return myScale(d.viewCount)})
            .attr('fill', function(d, i){
              if (i == 0 || i == 49) {
                return '#647454';
              }else{
                return groupNote[1].color;
              }
            })
            .style('opacity', 1);

    innerCircles
      .transition()
      .style('display', 'none')
    ;
    circleGroup.on("mouseover",function(d) {
        d3.select(this)
          .style("opacity", .8)
        ;
        d3.select(this)
          .transition()
          .attr("r", function(d){return myScale(d.viewCount)*1.3})
        ;
        box.transition()
            .duration(200)
            .style("display", 'block')
        ;
        box.html("<h4 style='text-align:center;'>"+ d.Title + "</h4><ul><li>View: " + d.viewCount+"</li><li>Comment Count: "+d.commentCount+"</li></ul>")
            .style("left", (d3.event.pageX + 20) + "px")
            .style('top', (d3.event.pageY - 150) + "px")
        ;

    })
    .on("mouseout",function(d){
      d3.select(this)
        .style("opacity", 1)
      ;
      d3.select(this)
        .transition()
        .attr("r", function(d){return myScale(d.viewCount)})
      ;
      box.transition()
          .duration(500)
          .style("display", 'none')
      ;
    });
  }

  function Scroll1(){
    rectG
      .transition()
      .duration(200)
      .style('display', 'none')
    ;
    circles.transition()
    .duration(500)
      .style('display', 'block')
      .style("opacity", 0.5)
      .attr('fill', '#C28DA8')
      .attr("r", function(d){let like = parseFloat(d.likeCount);let dislike = parseFloat(d.dislikeCount);return likeScale(like+dislike)})
    ;
    innerCircles
      .transition()
      .duration(500)
      .style('display', 'block')
      .attr('cx',function(d, i){return dataset[i][0]})
      .attr('cy', function(d, i){return dataset[i][1]})
      .attr('r', function(d){let like = parseFloat(d.likeCount);let dislike = parseFloat(d.dislikeCount);return likeScale(like+dislike)*(like/(like+dislike))*0.7})
      .attr('fill', '#C28DA8')
      // .style("opacity", 0.8)
    ;
    circleGroup.on("mouseover",function(d) {
        let like = parseFloat(d.likeCount);
        let dislike = parseFloat(d.dislikeCount);
        // console.log((like+dislike));
        box.transition()
            .duration(200)
            .style("display", 'block')
        ;
        box.html("<h4 style='text-align:center;'>"+ d.Title + "</h4><ul><li>View: " + d.viewCount+"</li><li>Comment Count: "+d.commentCount+"</li><li>Like Count: "+d.likeCount+"</li><li>Dislike Count: "+d.dislikeCount + "</li><li>Like/Dislike Ratio: "+formatDecimal(like/(like+dislike))+"</li></ul>")
            .style("left", (d3.event.pageX + 20) + "px")
            .style('top', (d3.event.pageY - 150) + "px")
        ;

    })
    .on("mouseout",function(d){

      box.transition()
          .duration(500)
          .style("display", 'none')
      ;
    });

  }

  function Scroll2(){
    circles
      .transition()
      .style('display', 'none')
    ;
    innerCircles
      .transition()
      .style('display', 'none')
    ;
    rectG
      .transition()
      .duration(200)
      .style('display', 'block')
    ;
    rect
      .transition()
      .attr('x', w/3 + 20)
      .attr('y', function(d, i){return (30 + i *40)+'px'})
      .attr('width', function(d){return 10 + 8*d[1]})
      .attr('height', 25)
      .attr('fill', '#c1a49b')
      .style('opacity', 0.7)
    ;

    number
      .transition()
      .text( (d) => d[1] )
      .attr("fill", "#f2f0eb")
      .attr('x', w/3 + 25)
      .attr('y', function(d, i){return (47 + i *40)+'px'})
    ;

    text
      .transition()
      .text( (d) => d[0] )
      .attr("fill", "#26241f")
      .attr('text-anchor', 'end')
      .attr('x', w/3 +5)
      .attr('y', function(d, i){return (47 + i *40)+'px'})
  }


  let previousSection = 'zero';
  d3.select("#textboxes").on("scroll", function(){
    // the currentBox function is imported on the
    // very fist line of this script
    currentBox(function(box){
      console.log(box.id);

      if(box.id=="zero" && box.id!=previousSection){
        console.log("changing viz");
        console.log(circles);
        circleInit();
        // trigger a new transition
        previousSection = box.id;

      }else if (box.id=="one" && box.id!=previousSection) {
        Scroll1();
        previousSection = box.id;
      }else if (box.id=="two" && box.id!=previousSection) {
        Scroll2();
        previousSection = box.id;
      }

    })
  })

  circleInit();
});


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


var modal = document.getElementById("myModal");
var abt = document.getElementById("about");
var span = document.getElementsByClassName("close")[0];

abt.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
