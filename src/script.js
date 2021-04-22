


/* Using the API to search a caracter */

var searchBox = document.getElementById('search-box');
var consoleBox = document.getElementById('console');
var apiSearch = 'https://swapi.dev/api/people/?search=';

var optRadio1 = document.getElementById('radio1');
var optRadio2 = document.getElementById('radio2');
var optRadio3 = document.getElementById('radio3');

var closeX = document.getElementById('closex');

optRadio1.addEventListener('click', search);
optRadio2.addEventListener('click', search);
optRadio3.addEventListener('click', search);
searchBox.addEventListener('input', search);

function search() {
  if (searchBox.value != ''){
    closeX.style.display = 'block';
    if (optRadio1.checked != true) {
      cleanCards();
      consoleBox.style.display = 'block';
    } else {
      consoleBox.style.display = 'none';
    }
    fetch(apiSearch + searchBox.value).then(
      response => response.json()).then(
        data => {
          if (data.count != 0) {
              getInfo(data.results);
          } else {
            cleanConsole();
            cleanCards();
            printToConsole("Nenhum resultado encontrado...");
          }
        });
    } else {
      cleanConsole();
      cleanCards();
      closeX.style.display = 'none';
      consoleBox.style.display = 'none';

    }
}

var data = [];

function getInfo(object) {

  cleanConsole();
  cleanCards();
  data = [];

  object.forEach( function (element) {
      data.push(element);
      if (optRadio2.checked == true) {
          printToConsole(JSON.stringify(element.name));
      }
      if (optRadio3.checked == true) {
        printToConsole(JSON.stringify(element));
      }
      if (optRadio1.checked == true) {
        createCards(element);
      }
  });

}


/* Console helpers */

function cleanConsole(){
  consoleBox.innerHTML = "";
}


function printToConsole (string){
  consoleBox.innerHTML = consoleBox.innerHTML + '<br>' + string;
}


/* The card space */

var cardSpace = document.getElementById('card-space');
var cardSkel = `
<div class="card" id="c3">
  <div class="name">theName</div>
  <div class="height">theMasskg</div>
  <div class="mass">cabelo theHair</div>
  <div class="skin">pele theSkin</div>
  <div class="eye">olho theEyes</div>
  <div class="birth">theBirth</div>
  <div class="gender">theGender</div>
</div>
`

function cleanCards(){
  cardSpace.innerHTML = '';
}

function createCards(element) {

  var newCard = cardSkel.replace('theName', element.name).replace(
    'theMass', element.mass).replace('theHair', element.hair_color).replace(
    'theSkin', element.skin_color).replace('theEyes', element.eye_color).replace(
    'theBirth', element.birth_year).replace('theGender', element.gender);

  newCard = translate(newCard);


  cardSpace.insertAdjacentHTML('beforeend', newCard);
}



/* Translation to portuguese */

var dictionary = {
  'female' : 'feminino',
  'male' : 'masculino',
  'unknown' : '-',
  'n/a' : '-',
  'blond' : 'loiro',
  'blue' : 'azul',
  'hermaphrodite' : 'hermafrodita',
  'fair' : 'pálida',
  'light' : 'clara',
  'black' : 'preto',
  'orange' : 'laranja',
  'brown' : 'marrom',
  'green-tan' : 'bronzeado verde',
  'white' : 'branco',
  'green' : 'verde',
  'mottle' : 'manchado',
  'gray' : 'cinza',
  'grey' : 'cinza',
  'none' : '-',
  'yellow' : 'amarela',
  'gold' : 'dourada',
  'dark' : 'escura',
  'auburn' : 'ruivo',
  'red' : 'vermelho'
};

function translate(words) {

  for (const [key, value] of Object.entries(dictionary)) {
    words = words.replaceAll(key, value);
  }

  return words;
}

closex.addEventListener('click', function() {
  cleanCards();
  cleanConsole();
  searchBox.value = '';
  closeX.style.display = 'none';
  consoleBox.style.display = 'none';
});


/* Modal info-box */
var modal = document.getElementById('modal-info');
var botInfo = document.getElementById('bot-info');
var botClose = document.getElementById('close');

botInfo.onclick = function () {
  modal.style.display = "block";
};

botClose.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
