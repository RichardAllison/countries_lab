// -------------------
const app = function(){
  const url = "https://restcountries.eu/rest/v2/all"
  makeRequest(url, requestComplete);

  const jsonString = localStorage.getItem('country');
  const savedCountry = JSON.parse(jsonString);

  const name = document.getElementById("name-display");
  name.innerText = savedCountry.name;

  const population = document.getElementById("population-display");
  population.innerText = `Population: ${savedCountry.population}`;

  const capital = document.getElementById("capital-display");
  capital.innerText = `Capital city: ${savedCountry.capital}`;

  const mapDiv = document.querySelector('#main-map');

  const map = new MapWrapper(mapDiv, {lat:0, lng:0}, 1);
  console.log(map);
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
    displayCountryInfo(countries)
  });
}

const displayCountryInfo = function(countries) {
  const index = document.getElementById('country-list').value;
  const country = countries[index];

  // const countrySection = document.getElementById("country-info");

  const name = document.getElementById("name-display");
  name.innerText = country.name;
  // countrySection.appendChild(name);

  const population = document.getElementById("population-display");
  population.innerText = `Population: ${country.population}`;
  // countrySection.appendChild(population);

  const capital = document.getElementById("capital-display");
  capital.innerText = `Capital city: ${country.capital}`;
  // countrySection.appendChild(capital);

  const jsonString = JSON.stringify(country);
  localStorage.setItem('country', jsonString);

}


document.addEventListener('DOMContentLoaded', app);
