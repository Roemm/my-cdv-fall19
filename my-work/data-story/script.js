let width = 1200;
let height = 600;

var initX;
var mouseClicked = false;
var s = 1;
var rotated = 90;

//need to store this because on zoom end, using mousewheel, mouse position is NAN
var mouse;


d3.json("reference/countries.geojson").then(function(world) {
  // if(error) return console.error(error);
  console.log(world);

  // var projection = d3.geoMercator()
  //   // .scale(100)
  //   .translate([width/4,height/1.5])
  //   .rotate([rotated,0,0])
  //   .fitExtent([ [0, 0], [width, height] ], world)
  // ; //center on USA
  //
  // var path = d3.geoPath().projection(projection);
  //
  // var zoom = d3.zoom()
  // .scaleExtent([1, 10])
  // .on("zoom", zoomed)
  // .on("end", zoomended);

  let viz = d3.select("#container").append("svg")
      .style("width", width)
      .style("height", height)
  //     .on("wheel", function() {
  //       //zoomend needs mouse coords
  //       initX = d3.mouse(this)[0];
  //     })
  //     .on("mousedown", function() {
  //       //only if scale === 1
  //       if(s !== 1) return;
  //       initX = d3.mouse(this)[0];
  //       mouseClicked = true;
  //     })
  //     .call(zoom);
  //
  //     var g = viz.append("g");
  //
  //     function rotateMap(endX) {
  //       projection.rotate([rotated + (endX - initX) * 360 / (s * width),0,0]);
  //       g.selectAll('path').attr('d', path);
  //     }
  //
  //     function zoomended(){
  //       if(s !== 1) return;
  //       //rotated = rotated + ((d3.mouse(this)[0] - initX) * 360 / (s * width));
  //       rotated = rotated + ((mouse[0] - initX) * 360 / (s * width));
  //       mouseClicked = false;
  //     }
  //
  //     function zoomed() {
  //       var t = [d3.event.transform.x,d3.event.transform.y];
  //       s = d3.event.transform.k;
  //       var h = 0;
  //
  //       t[0] = Math.min(
  //         (width/height)  * (s - 1),
  //         Math.max( width * (1 - s), t[0] )
  //       );
  //
  //       t[1] = Math.min(
  //         h * (s - 1) + h * s,
  //         Math.max(height  * (1 - s) - h * s, t[1])
  //       );
  //
  //       g.attr("transform", "translate(" + t + ")scale(" + s + ")");
  //
  //       //adjust the stroke width based on zoom level
  //       d3.selectAll(".boundary").style("stroke-width", 1 / s);
  //
  //       mouse = d3.mouse(this);
  //
  //       if(s === 1 && mouseClicked) {
  //         //rotateMap(d3.mouse(this)[0]);
  //         rotateMap(mouse[0]);
  //         return;
  //       }
  //
  //     }

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

        // let projection = d3.geoMercator();

        // let pathMaker = d3.geoPath(projection);

        world.features.forEach(function(country) {
          var result = channelData.filter(function(channelCountry) {
              return channelCountry.country === country.id;
          });
          // delete country.id;
          country.title = (result[0] !== undefined) ? result[0].title : null;
          country.subscriberCount = (result[0] !== undefined) ? result[0].subscriberCount : null;
          country.description = (result[0] !== undefined) ? result[0].description : null;

          });
        console.log(world.features);

        let projection = d3.geoEquirectangular()
          .center([12.7, 42.9])
          .translate([width/2, height/2])
          .fitExtent([ [0, 0], [width, height] ], world)
        ;

        let path = d3.geoPath(projection);

          //countries
          let map = viz.append("g")
            .attr("class", "boundary")
            .selectAll("boundary")
            .data(world.features)
            .enter().append("path")
            .attr("d", path)
              .attr('fill', '#F5F5F5')
            ;
          map
            .on("mouseover",function(d) {
              // console.log("just had a mouseover", d);

              if(countryList.indexOf(d.id) > -1){
                d3.select(this)
                  .attr('fill', "pink")
                ;
                box.transition()
                    .duration(200)
                    .style("opacity", .9)
                ;
                box.html("Country Code: " + d.id + "<br/>" + "Channel Title: "+ d.title + "<br/>" + "Subscriber Count: " + d.subscriberCount + "</br>" + "Channel Description: " + d.description)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px")
                ;
              }

            })
            .on("mouseout",function(d){
              d3.select(this)
                .attr('fill', '#F5F5F5')
              ;
              box.transition()
                  .duration(500)
                  .style("opacity", 0)
              ;
            })
          ;

          let dots = viz.append('g')
            .attr("class", "dots")
            .selectAll("circle")
            .data(world.features.filter(function(d){console.log(d.geometry.coordinates[0]);return d.title !== null;}))
            .enter()
            .append("circle")
            .attr('cx', function(d){return projection(d.geometry.coordinates[0][0])[0]})
            .attr('cy', function(d){return projection(d.geometry.coordinates[0][0])[1]})
            .attr('r', 5)
            .attr('fill', "lightblue")
          ;

          dots.on("mouseover",function() {
            // console.log("just had a mouseover", d);

              box.transition()
                  .duration(200)
                  .style("opacity", .9)
              ;
              box.html("Country Code: " + d.id + "<br/>" + "Channel Title: "+ d.title + "<br/>" + "Subscriber Count: " + d.subscriberCount + "</br>" + "Channel Description: " + d.description)
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 28) + "px")
              ;
            })
            .on("mouseout",function(d){
              box.transition()
                  .duration(500)
                  .style("opacity", 0)
              ;
            })

});
});


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
