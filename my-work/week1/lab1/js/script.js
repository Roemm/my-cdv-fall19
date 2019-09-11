let data = [
    {
        "time": "2019-09-09T07:40:40.809Z",
        "bts": 3,
        "exo": 8,
        "got7": 9,
        "superJunior": 10,
        "bigbang": 6,
        "girlsGeneration": 10,
        "2ne1": 9,
        "twice": 9,
        "blackpink": 5,
        "redVelvet": 7
    },
    {
        "time": "2019-09-09T07:42:26.711Z",
        "bts": 6,
        "exo": 5,
        "got7": 8,
        "superJunior": 5,
        "bigbang": 6,
        "girlsGeneration": 7,
        "2ne1": 7,
        "twice": 8,
        "blackpink": 7,
        "redVelvet": 7
    },
    {
        "time": "2019-09-09T07:44:11.739Z",
        "bts": 4,
        "exo": 7,
        "got7": 8,
        "superJunior": 9,
        "bigbang": 8,
        "girlsGeneration": 6,
        "2ne1": 6,
        "twice": 5,
        "blackpink": 5,
        "redVelvet": 7
    },
    {
        "time": "2019-09-09T07:48:01.202Z",
        "bts": 5,
        "exo": 7,
        "got7": 10,
        "superJunior": 7,
        "bigbang": 7,
        "girlsGeneration": 8,
        "2ne1": 5,
        "twice": 9,
        "blackpink": 8,
        "redVelvet": 8
    },
    {
        "time": "2019-09-09T07:56:38.829Z",
        "bts": 5,
        "exo": 1,
        "got7": 10,
        "superJunior": 6,
        "bigbang": 4,
        "girlsGeneration": 3,
        "2ne1": 4,
        "twice": 8,
        "blackpink": 3,
        "redVelvet": 5
    },
    {
        "time": "2019-09-09T08:23:04.372Z",
        "bts": 5,
        "exo": 4,
        "got7": 5,
        "superJunior": 5,
        "bigbang": 6,
        "girlsGeneration": 5,
        "2ne1": 5,
        "twice": 5,
        "blackpink": 7,
        "redVelvet": 5
    },
    {
        "time": "2019-09-09T08:29:39.160Z",
        "bts": 5,
        "exo": 10,
        "got7": 10,
        "superJunior": 5,
        "bigbang": 5,
        "girlsGeneration": 9,
        "2ne1": 5,
        "twice": 9,
        "blackpink": 9,
        "redVelvet": 6
    },
    {
        "time": "2019-09-09T10:49:07.517Z",
        "bts": 7,
        "exo": 5,
        "got7": 5,
        "superJunior": 5,
        "bigbang": 5,
        "girlsGeneration": 5,
        "2ne1": 5,
        "twice": 3,
        "blackpink": 9,
        "redVelvet": 6
    },
    {
        "time": "2019-09-09T13:22:19.831Z",
        "bts": 9,
        "exo": 1,
        "got7": 5,
        "superJunior": 6,
        "bigbang": 6,
        "girlsGeneration": 8,
        "2ne1": 3,
        "twice": 9,
        "blackpink": 7,
        "redVelvet": 8
    },
    {
        "time": "2019-09-11T01:54:02.122Z",
        "bts": 5,
        "exo": 7,
        "got7": 9,
        "superJunior": 6,
        "bigbang": 6,
        "girlsGeneration": 10,
        "2ne1": 5,
        "twice": 9,
        "blackpink": 8,
        "redVelvet": 9
    }
]


function averageData(data){

  let newData = [];

  let keys = Object.keys(data[data.length-1]);

  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];

      if(key in datum){
        sum += datum[key];
        num++;
      }
    }

    let avg = sum/num;

    if(!isNaN(avg)){

      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};

      newData.push(newDataPoint);
    }
  }

  return newData;
}


let transformedData = averageData(data);

for(let i = 0; i<transformedData.length; i++){

  let datapoint = transformedData[i];
  let food = datapoint.name;
  let average = datapoint.average;
  console.log(datapoint);
  console.log(food);
  console.log(average);


  let bar = document.createElement('div');
  let barname = document.createElement('p');
  barname.innerHTML = datapoint.name + ": " + datapoint.average;

  //modify bar size
  bar.className = "bar";
  bar.style.width = (average*20)+'px';

  bar.appendChild(barname);
  document.body.appendChild(bar);


}
