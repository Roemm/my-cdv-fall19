let w = 1200;
let h = 800;

let viz = d3.select('#container')
  .append('svg')
    .attr('width', w)
    .attr('height', h)
    .style('background-color', 'lavender')
  ;

  function gotData(incomingData){
    // console.log(incomingData);
    //
    // incomingData.forEach(function(d, i){
    //   console.log("current: ",i);
    // });
    //
    // function newDataPoint(d){
    //   let entity = d.entity;
    //   let year = d.year;
    //   return{firstValue: entity, secondValue: year};
    // }
    // let newArray = incomingData.map(newDataPoint);

    function filterF(d){
      if(d.Code == 'CHN'){
        return true;
      }else{
        return false;
      }
    }

    let filteredData = incomingData.filter(filterF);
    console.log(filteredData);

    let yearToDataConverter = d3.timeParse('%Y');

    let test = yearToDataConverter('2001');
    console.log(typeof(test));

    function findMin(d){
      let year = d.Year;
      let properFormattedYear = yearToDataConverter(year);
      return properFormattedYear;
    }

    let minYear = d3.min(filteredData, findMin);
    console.log(minYear);

    let alterDomainArray = d3.extent(filteredData, function(d){
      return yearToDataConverter(d.Year);
    });

    console.log(alterDomainArray);

    let xPadding = 50;
    let xScale = d3.scaleTime().domain(alterDomainArray).range([xPadding, w-(xPadding*2)]);

    // console.log(xScale(yearToDataConverter('2007')));

    let xAxis = d3.axisBottom(xScale);
    let xAxisGroup = viz.append('g').attr('class', 'xaxis');

    xAxisGroup.call(xAxis);

    let xAxisYPos = h - 30;
    xAxisGroup.attr('transform', 'translate(0, '+xAxisYPos + ')');

    let valuekey = 'Incidence - HIV/AIDS - Sex: Both - Age: All Ages (Number) (new cases of HIV)';
    let yScale = d3.scaleLinear()
      .domain(d3.extent(filteredData, function(d){
        return d[valuekey];
      })).range([xAxisYPos , 30]);

    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = viz.append('g').attr('class', 'yaxis');

    yAxisGroup.call(yAxis);
    yAxisGroup.attr('transform', 'translate(' + xPadding + ', 0)');



  }


  d3.csv('new-cases-of-hiv-infection.csv').then(gotData);
