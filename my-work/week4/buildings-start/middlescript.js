let w = 2400;
let h = 800;

let containerColor = '#DFD1B5';

//create svg
let viz = d3.select('#container')
  .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('background-color', containerColor)
    .attr('class', 'chart')
;



function getColor(datapoint){
  let idx = datapoint.index;
  let day = datapoint[0].data.values[idx].date;
  console.log(datapoint);
  if (day == 'Wed') {
    return 'CCC6BA';
  }else if (day == 'Thu') {
    return '#3D5578';
  }else if(day == 'Fri'){
    return '#A6A197';
  }else if(day == 'Sat'){
    return '#5F779C';
  }else if(day == 'Sun'){
    return '#918367';
  }else if(day == 'Mon'){
    return '#9FAFC4';
  }
}


function gotData(incomingData){

  //parse the period time value and create x scale
  let yearToDataConverter = d3.timeParse('%H-%H');

  let alterDomainArray = d3.extent(incomingData, function(d){
    return yearToDataConverter(d.timeperiod);
  });
   // console.log(alterDomainArray);

  //create x axis
  let xPadding = 100;
  let xScale = d3.scaleTime().domain(alterDomainArray).range([xPadding, w-(xPadding*1.5)]);
  // console.log(xScale('9-11'));

  let xAxis = d3.axisBottom(xScale);
  xAxis.tickArguments([d3.timeHour.every(2)]);
  let xAxisGroup = viz.append('g').attr('class', 'xaxis');

  xAxisGroup.call(xAxis);

  let xAxisYPos = h - 50;
  xAxisGroup.attr('transform', 'translate(0, '+xAxisYPos + ')')
    .style('font-family', "'Ruda', sans-serif")
    .style('font-size', 20)
    .style('color', '#5E584C')
    .style('stroke-width', 3)
  ;


  //one array for each value of x-axis
  let sumstat = d3.nest()
    .key(function(d) { return d.timeperiod;})
    .entries(incomingData);
  console.log(sumstat);

  //stack the data of each day
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

  //create y axis after data is stacked
  let yScale = d3.scaleLinear()
    .domain([0,d3.max(stackedData[stackedData.length-1], function(d){
      return d[1];
    })]).range([xAxisYPos , 50]);

  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append('g').attr('class', 'yaxis');

  yAxisGroup.call(yAxis);
  yAxisGroup.attr('transform', 'translate(' + xPadding + ', 0)')
    .style('font-family', "'Ruda', sans-serif")
    .style('font-size', 20)
    .style('color', '#5E584C')
    .style('stroke-width', 3)
  ;

  let vizGroup = viz.append("g").attr("class", "vizgroup");

  //append area map
  let curve = d3.area()
    .x(function(d, i) {
      console.log( xScale(yearToDataConverter(d.data.key)) );
      return xScale(yearToDataConverter(d.data.key)) + 2 ;
    })
    .y0(function(d) { return yScale(d[0]) -1; })
    .y1(function(d) { return yScale(d[1]) -1; })

  vizGroup
    .selectAll("path")
    .data(stackedData)
    .enter()
    .append("path")
      .style("fill", getColor)
      .attr("d", curve)
  ;

  //add notations
  let note = d3.select(".chart").append("g")
      .attr("class","note")
  ;
  let notation = note
    .selectAll('note')
    .data(stackedData)
    .enter()
    .append('g', 'notation');
    // .attr('class', 'notation');

  notation.append('text')
      .text(function(d){
        let idx = d.index;
        return d[0].data.values[idx].date;
      })
      .style('fill', '#5E584C')
      .attr("x",2320)
      .attr("y",function(d, i){return 145 + i*50;})
      .style("text-anchor","end")
      .style('font-size', 25)
      .style('font-family', "'Ruda', sans-serif")
  ;

  notation.append('rect')
    .attr("x",2330)
    .attr("y",function(d, i){return 120 + i*50;})
    .attr('width', 40)
    .attr('height', 30)
    .style('fill', getColor)
  ;


}

d3.json("data.json").then(gotData);
