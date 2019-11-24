let w = 1000;
let h = 600;

let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
;


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
