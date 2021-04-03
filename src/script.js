
var searchBox = document.getElementById('search-box');
var consoleBox = document.getElementById('console');
var apiSearch = 'https://swapi.dev/api/people/?search='


searchBox.addEventListener('input', function () {
  //consoleBox.innerHTML = searchBox.value;

  if (searchBox.value != '') {
    consoleBox.style.display = 'block';
    fetch(apiSearch + searchBox.value).then(
      response => response.json()).then(
        data => getInfo(data.results));

    } else {
      consoleBox.style.display = 'none';
    }

});


function getInfo(object) {

  cleanConsole();

  object.forEach( function (element) {
    printToConsole(element.name);
  });

}


function cleanConsole(){
  consoleBox.innerHTML = "";
}


function printToConsole (string){
  consoleBox.innerHTML = consoleBox.innerHTML + '<br>' + string;
}
