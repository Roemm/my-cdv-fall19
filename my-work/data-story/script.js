let w = 1000;
let h = 600;


let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "grey")
;

function getChannel(data, code){
  return data.filter(function(datapoint){
    if(datapoint.id == code){
      return true;
    }else{
      return false;
    }
  });
}


d3.json("reference/countries.geojson").then(function(geoData){

  // console.log(geoData.features);


  d3.csv('datasets/BTS_channels.csv').then(function(channelData){
    // let datagroup = [geoData, channelData]
    console.log(channelData);

    var countryList = channelData.map(function(d) {
      // console.log(d.country);
      return d.country;
    })

    let box = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
    ;

    let projection = d3.geoEquirectangular()
      .center([12.7, 42.9])
      .translate([w/2, h/2])
      .fitExtent([ [0, 0], [w, h] ], geoData)
    ;

    // let projection = d3.geoMercator();

    let pathMaker = d3.geoPath(projection);

    geoData.features.forEach(function(country) {
      var result = channelData.filter(function(channelCountry) {
          return channelCountry.country === country.id;
      });
      // delete country.id;
      country.title = (result[0] !== undefined) ? result[0].title : null;
      });
    console.log(geoData.features);

    let map = viz
      .selectAll('path').data(geoData.features).enter()
        .append('path')
        .attr('d', pathMaker)
        .attr('fill', 'lavender')
      ;
      // .data(channelData)

      map
        .on("mouseover",function(d) {
          // console.log("just had a mouseover", d);
          d3.select(this)
            .attr('fill', "pink")
          ;
          if(countryList.indexOf(d.id) > -1){
            box.transition()
                .duration(200)
                .style("opacity", .9)
            ;
            box	.html(d.id + "<br/>" + d.title)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
            ;
          }

        })
        .on("mouseout",function(d){
          d3.select(this)
            .attr('fill', 'lavender')
          ;
          box.transition()
              .duration(500)
              .style("opacity", 0)
          ;
        })
      ;

  })

})
