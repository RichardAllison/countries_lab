// -------------------
const app = function(){
  const url = "https://restcountries.eu/rest/v2/all"
  makeRequest(url, requestComplete);

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
    displayCountryInfo(countries)});
}

const displayCountryInfo = function(countries) {
  const index = document.getElementById('country-list').value;
  const country = countries[index];

  const countrySection = document.getElementById("country-info");

  const name = document.createElement("h2");
  name.innerText = country.name;
  countrySection.appendChild(name);

  const population = document.createElement("p");
  population.innerText = country.population;
  countrySection.appendChild(population);

  const capital = document.createElement("p");
  capital.innerText = country.capital;
  countrySection.appendChild(capital);

}


document.addEventListener('DOMContentLoaded', app);
