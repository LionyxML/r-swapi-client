
var searchBox = document.getElementById('search-box');
var consoleBox = document.getElementById('console');
var apiSearch = 'https://swapi.dev/api/people/?search='

var optRadio1 = document.getElementById('radio1');
var optRadio2 = document.getElementById('radio2');
var optRadio3 = document.getElementById('radio3');


optRadio1.addEventListener('click', search);
optRadio2.addEventListener('click', search);
optRadio3.addEventListener('click', search);
searchBox.addEventListener('input', search);

function search() {
  if ((searchBox.value != '') && (optRadio1.checked != true)){
    consoleBox.style.display = 'block';
    fetch(apiSearch + searchBox.value).then(
      response => response.json()).then(
        data => getInfo(data.results));

    } else {
      consoleBox.style.display = 'none';
    }
}

var data = [];

function getInfo(object) {

  cleanConsole();
  data = [];

  object.forEach( function (element) {
      data.push(element);
      if (optRadio2.checked == true) {
          printToConsole(JSON.stringify(element.name));
      }
      if (optRadio3.checked == true) {
        printToConsole(JSON.stringify(element));
      }
  });

}


function cleanConsole(){
  consoleBox.innerHTML = "";
}


function printToConsole (string){
  consoleBox.innerHTML = consoleBox.innerHTML + '<br>' + string;
}
