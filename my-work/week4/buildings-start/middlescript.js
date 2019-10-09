let w = 2400;
let h = 800;

let viz = d3.select('#container')
  .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('background-color', '#f8f1d5')
;

function getColor(datapoint){
  let idx = datapoint.index;
  let day = datapoint[0].data.values[idx].date;
  console.log(datapoint);
  if (day == 'Wed') {
    return '#A89E6F';
  }else if (day == 'Thu') {
    return '#F7DE71';
  }else if(day == 'Fri'){
    return '#757059';
  }else if(day == 'Sat'){
    return '#C2B993';
  }else if(day == 'Sun'){
    return '#898F33';
  }else if(day == 'Mon'){
    return '#363329';
  }
  // console.log(datapoint);
  // if (datapoint.date == 'Wed') {
  //   return '#A89E6F';
  // }else if (datapoint.date == 'Thu') {
  //   return '#F7DE71';
  // }else if(datapoint.date == 'Fri'){
  //   return '#757059';
  // }else if(datapoint.date == 'Sat'){
  //   return '#C2B993';
  // }else if(datapoint.date == 'Sun'){
  //   return '#898F33';
  // }else if(datapoint.date == 'Mon'){
  //   return '#363329';
  // }
}


function gotData(incomingData){

  //console.log(incomingData);
  // timeperiodArray = [9-11, 11-13, 13-15, 15-17, 17-19, 19-21, 21-23, 23-01];

  let yearToDataConverter = d3.timeParse('%H-%H');

  function findMin(d){
    let time = d.timeperiod;
    let properFormattedTime = yearToDataConverter(time);
    // console.log(properFormattedTime);
    return properFormattedTime;
  }

  let minTime = d3.min(incomingData, findMin);
  // console.log(minTime);

  let alterDomainArray = d3.extent(incomingData, function(d){
    return yearToDataConverter(d.timeperiod);
  });

   // console.log(alterDomainArray);

  //create x and y axis
  let xPadding = 50;
  let xScale = d3.scaleTime().domain(alterDomainArray).range([xPadding, w-(xPadding*2)]);
  // console.log(xScale('9-11'));

  let xAxis = d3.axisBottom(xScale);
  xAxis.tickArguments([d3.timeHour.every(2)]);
  let xAxisGroup = viz.append('g').attr('class', 'xaxis');

  xAxisGroup.call(xAxis);

  let xAxisYPos = h - 30;
  xAxisGroup.attr('transform', 'translate(0, '+xAxisYPos + ')');




  // var stackedData = d3.stack().keys('date')(incomingData);
  // console.log(stackedData);

  //one array for each value of x-axis
  // console.log(incomingData);
  let sumstat = d3.nest()
    .key(function(d) { return d.timeperiod;})
    .entries(incomingData);
  console.log(sumstat);

  var mygroup = [0,1,2,3,4,5];

  var stackTheData = d3.stack()
    .keys(mygroup)
    .value(function(d, i){
      console.log(d, i);
      // for(j=0; j<d.values.length;j++){
        return d.values[i].time;
      // }
    });
  let stackedData = stackTheData(sumstat);

  console.log(stackedData);

  let yScale = d3.scaleLinear()
    .domain([0,d3.max(stackedData[stackedData.length-1], function(d){
      return d[1];
    })]).range([xAxisYPos , 30]);

  // let y = d3.scaleLinear()
  //     .domain([0, d3.max(incomingData, function(d) { return +d.time; })*1.2])
  //     .range([ h, 0 ]);

  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append('g').attr('class', 'yaxis');

  yAxisGroup.call(yAxis);
  yAxisGroup.attr('transform', 'translate(' + xPadding + ', 0)');

  let vizGroup = viz.append("g").attr("class", "vizgroup");

  let curve = d3.area()
  .x(function(d, i) {
    console.log( xScale(yearToDataConverter(d.data.key)) );
    return xScale(yearToDataConverter(d.data.key)) ;
  })
  .y0(function(d) { console.log(d);return yScale(d[0]); })
  .y1(function(d) { return yScale(d[1]); })

  vizGroup
  .selectAll("path")
   .data(stackedData)
   .enter()
   .append("path")
     .style("fill", getColor)
     .attr("d", curve)

  // let series = d3.stack().keys(incomingData.columns.slice(1))(incomingData);
  // console.log(series);
  //
  // vizGroup
  //   .selectAll("path")
  //   .data(series)
  //   .join("path")
  //     .attr("fill", getColor)
  //     .attr("d", curve)


}

d3.json("data.json").then(gotData);




// // bind data and create groups for each datapoint:
// let dataGroups = vizGroup.selectAll(".datagroup").data(incomingData).enter()
//     .append("g")
//     .attr("class", "datagroup")
// ;
//
//
// let circles = dataGroups.append("circle")
//     .attr("cx", 0)
//     .attr("cy", 0)
//     .attr("r", 5)
//     .attr('fill', getColor)
// ;
//
// function getTranslate(d, i){
//   let properlyFormattedDate = yearToDataConverter(d.timeperiod);
//   let value = d.time;
//   return "translate("+xScale(properlyFormattedDate)+","+yScale(value)+")";
// }
// // translate the position of each group:
// dataGroups.attr("transform", getTranslate);
