// -------------------
const app = function(){
  const url = "https://restcountries.eu/rest/v2/all"
  makeRequest(url, requestComplete);

  const mapDiv = document.querySelector('#main-map');

  if (localStorage.getItem('country')) {
    const jsonString = localStorage.getItem('country');
    const savedCountry = JSON.parse(jsonString);

    coords = {lat: savedCountry.latlng[0], lng: savedCountry.latlng[1]}
    const map = new MapWrapper(mapDiv, coords, 4);
    map.addMarker(coords);

    const name = document.getElementById("name-display");
    name.innerText = savedCountry.name;

    const population = document.getElementById("population-display");
    population.innerText = `Population: ${savedCountry.population}`;

    const capital = document.getElementById("capital-display");
    capital.innerText = `Capital city: ${savedCountry.capital}`;
  } else {
    coords = {lat: 0, lng: 0}
    const map = new MapWrapper(mapDiv, coords, 1);
  }


}
// -------------------

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const countries = JSON.parse(jsonString);
  populateList(countries);
}

const populateList = function(countries){
  const select = document.getElementById("country-list");


  countries.forEach(function(country, index){
    const option = document.createElement("option");
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  })

  select.addEventListener('change', function(){
    displayCountryInfo(countries);
  });
}

const displayCountryInfo = function(countries) {
  const index = document.getElementById('country-list').value;
  const country = countries[index];

  // const countrySection = document.getElementById("country-info");

  const name = document.getElementById("name-display");
  name.innerText = country.name;

  const population = document.getElementById("population-display");
  population.innerText = `Population: ${country.population}`;

  const capital = document.getElementById("capital-display");
  capital.innerText = `Capital city: ${country.capital}`;

  const coords = {lat: country.latlng[0], lng: country.latlng[1]};
  const mapDiv = document.querySelector('#main-map');
  const map = new MapWrapper(mapDiv, coords, 4);
  map.addMarker(coords);


  const jsonString = JSON.stringify(country);
  localStorage.setItem('country', jsonString);

}


document.addEventListener('DOMContentLoaded', app);
