function myFunction(){
  var num = document.getElementById('num').value;
  boxes = document.getElementById('displayBox');
  // document.getElementById('test').innerHTML = num;
  for (var i = 0; i < num; i++) {
    box = document.createElement("div");
    box.setAttribute("class", "box");
    boxes.appendChild(box);
  }
}
