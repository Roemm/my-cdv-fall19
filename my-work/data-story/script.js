let width = 1200;
let height = 600;

var initX;
var mouseClicked = false;
var s = 1;
var rotated = 90;

//need to store this because on zoom end, using mousewheel, mouse position is NAN
var mouse;

var dotsCor = {
  'CAN': [-110, 55],
  'IDN': [115, 0],
  'JPN': [140, 38],
  'RUS': [100, 60],
  'USA': [-100, 40],
  'BRA': [-50, -10],
  'KOR': [128, 36],
  'MEX': [-102, 23],
  'THA': [101, 16],
  'VNM': [108, 14]
}


let viz = d3.select("#container").append("svg")
    .style("width", width)
    .style("height", height)
;


d3.json("reference/countries.geojson").then(function(world) {
  // if(error) return console.error(error);
  // console.log(world);

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


  d3.csv('datasets/BTS_channels.csv').then(function(channelData){
    // let datagroup = [geoData, channelData]
    // console.log(channelData);

    var countryList = channelData.map(function(d) {
      // console.log(d.country);
      return d.country;
    })

    let box = d3.select("#container").append("div")
      .attr("class", "tooltip")
      // .style("opacity", 0)
    ;


    var groupNote = [
      {'name': 'BTS',
        'color' : "#8C203D",
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
        'color' : "#3C5C60",
        'r': 5
      },
    ];



    // let projection = d3.geoMercator();

    // let pathMaker = d3.geoPath(projection);

    //bind data
    world.features.forEach(function(country) {
      var result = channelData.filter(function(channelCountry) {
          return channelCountry.country === country.id;
      });

      // console.log(result);
      country.properties.channels = result;
    });
    // console.log(world.features);

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
        .attr('fill', '#C1B79B')
        .style("opacity", function(d){
          if (d.properties.channels.length>0) {
            // console.log(d);
            return 1;
          }else {
            return 0.5;
          }
        })
      ;

    let dataForUse = world.features.filter(function(d){return d.properties.channels.length>0});
    console.log(dataForUse);

    let dotGroup = viz.selectAll(".dotGroup")
      .data(dataForUse)
      .enter()
        .append("g")
        .attr("class", "dotGroup")
      ;

    var myLogScale = d3.scaleSymlog([1, 4], [0.5, 1]);
    // console.log(myLogScale(0));


    // console.log(country.properties.channels);
    let dotsBts = dotGroup
      .append("circle")
      .attr('cx', function(d){
          // console.log(d.id+ " x: "+d.geometry.coordinates[0][2][0]);
          return projection(dotsCor[d.id])[0];
      })
        // console.log(d);return projection(d.geometry.coordinates[0][0])[0]})
      .attr('cy', function(d){
          // console.log(d.id+ " y: "+d.geometry.coordinates[0][2][1]);
          return projection(dotsCor[d.id])[1];
      })
      .attr('r', groupNote[0].r)
      .attr('fill',  groupNote[0].color)
      .style('opacity', function(d, i){
        let count = 0;
        d.properties.channels.forEach(function(country){
          if (country.group == 'BTS') {
            count +=1;
          }
          console.log(country.country + " has " +count);
        } )
        // console.log(logScale(count));
        if(count == 0 ){
          return count;
        } else{
          return myLogScale(count);
        }


      })
    ;
    let dotsGot7 = dotGroup
      .append("circle")
      .attr('cx', function(d){
          // console.log(d.id+ " x: "+d.geometry.coordinates[0][2][0]);
          return projection(dotsCor[d.id])[0];
      })
        // return projection(d.geometry.coordinates[0][0])[0]})
      .attr('cy', function(d){
          // console.log(d.id+ " y: "+d.geometry.coordinates[0][2][1]);
          return projection(dotsCor[d.id])[1];
      })
      .attr('r',  groupNote[1].r)
      .attr('fill', groupNote[1].color)
      .style('opacity', function(d, i){
        let count = 0;
        d.properties.channels.forEach(function(country){
          if (country.group == 'GOT7') {
            count +=1;
          }
          console.log(country.country + " has " +count);
        } )
        if(count == 0 ){
          return count;
        } else{
          return myLogScale(count);
        }

      })
    ;
    ;
    let dotsIzone = dotGroup
      .append("circle")
      .attr('cx', function(d){
          // console.log(d.id+ " x: "+d.geometry.coordinates[0][2][0]);
          return projection(dotsCor[d.id])[0];
      })
        // return projection(d.geometry.coordinates[0][0])[0]})
      .attr('cy', function(d){
          // console.log(d.id+ " y: "+d.geometry.coordinates[0][2][1]);
          return projection(dotsCor[d.id])[1];
      })
      .attr('r',  groupNote[2].r)
      .attr('fill', groupNote[2].color)
      .style('opacity', function(d, i){
        let count = 0;
        d.properties.channels.forEach(function(country){
          if (country.group == 'IZONE') {
            count +=1;
          }
          console.log(country.country + " has " +count);
        } )
        if(count == 0 ){
          return count;
        } else{
          return myLogScale(count);
        }

      });
    ;
    let dotsBp = dotGroup
      .append("circle")
      .attr('cx', function(d){
          // console.log(d.id+ " x: "+d.geometry.coordinates[0][2][0]);
          return projection(dotsCor[d.id])[0];
      })
        // console.log(d);return projection(d.geometry.coordinates[0][0])[0]})
      .attr('cy', function(d){
          // console.log(d.id+ " y: "+d.geometry.coordinates[0][2][1]);
          return projection(dotsCor[d.id])[1];
      })
      .attr('r',  groupNote[3].r)
      .attr('fill', groupNote[3].color)
      .style('opacity', function(d, i){
        let count = 0;
        d.properties.channels.forEach(function(country){
          if (country.group == 'BLACKPINK') {
            count +=1;
          }
          console.log(country.country + " has " +count);
        } )
        if(count == 0 ){
          return count;
        } else{
          return myLogScale(count);
        }

      })
    ;
    ;

    // dotGroup.on('mouseover', function(d){
    //   let element = d3.select(this);
    //   element.select('circle').transition().attr('r', 20);
    // });

    dotGroup.on('click', function(d){
      box.transition()
          .duration(200)
          .style("display", 'block')
      ;
      var text = '';

      d.properties.channels.forEach(function(country){
        console.log(country);
        text = text + '<h3>Title:<strong> <i>' + country.title + '</i></strong></h3>'+
                '<ul><li>Group: ' + country.group + '</li><li>Subscriber Count: ' + country.subscriberCount +'</li><li>Video Count: ' + country.videoCount+'</li><li>View Count: ' + country.viewCount +'</li></ul>'

        ;
      })

      console.log(text);

      box.html('<span class="close" id="toolClose">&times;</span> <h2>' + d.properties.name + "</h2>" + '<hr>'  + text)
      ;

      var closeButton = document.getElementById('toolClose');
      var tooltipBox = document.getElementsByClassName('tooltip')[0];
      closeButton.onclick = function(){
        console.log("clicked");
        tooltipBox.style.display = 'none';
      }
    })

    let note = viz.append("g")
      .attr("class", "note")
    ;

    let notation = note
      .selectAll('note')
      .data(groupNote)
      .enter()
      .append('g', 'notation');
      // .attr('class', 'notation');

    notation
      .append('circle')
        .attr("cx",20)
        .attr("cy",function(d, i){return 400 + i*40;})
        .attr('r', function(d){
          return d.r;
        })
        .attr('fill', function(d){
          return d.color;
        })
    ;

    notation.append('text')
        .text(function(d){
          return d.name;
        })
        .style('fill', '#26241f')
        .attr("x",50)
        .attr("y",function(d, i){return 405 + i*40;})
        .style('font-size', 16)
        .style('font-family', "'Ruda', sans-serif")
    ;


    // let dots = viz.append('g')
    //   .attr("class", "dots")
    //   .selectAll("circle")
    //   .data(world.features.filter(function(d){return d.properties.channels.length>0;}))
    //   .enter()
    //   .append("circle")
    //   .attr('cx', function(d){
    //       // console.log(d.id+ " x: "+d.geometry.coordinates[0][2][0]);
    //       return projection(dotsCor[d.id])[0];
    //   })
    //
    //     // console.log(d);return projection(d.geometry.coordinates[0][0])[0]})
    //   .attr('cy', function(d){
    //       // console.log(d.id+ " y: "+d.geometry.coordinates[0][2][1]);
    //       return projection(dotsCor[d.id])[1];
    //   })
    //   .attr('r', 5)
    //   .attr('fill', "lightblue")
    // ;

    // dotGroup.on("mouseover",function(d) {
    //   // console.log("just had a mouseover", d);
    //
    //     box.transition()
    //         .duration(200)
    //         .style("opacity", .9)
    //     ;
    //     box.html("Country Code: " + d.id + "<br/>" + "Channel Title: "+ d.title + "<br/>" + "Subscriber Count: " + d.subscriberCount + "</br>" + "Channel Description: " + d.description)
    //         .style("left", (d3.event.pageX) + "px")
    //         .style("top", (d3.event.pageY - 28) + "px")
    //     ;
    //   })
    //   .on("mouseout",function(d){
    //     box.transition()
    //         .duration(500)
    //         .style("opacity", 0)
    //     ;
    //   })

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
