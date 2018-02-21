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

  countries.forEach(function(country){
    const option = document.createElement("option");
    option.innerText = country.name;
    select.appendChild(option);
  })
}


document.addEventListener('DOMContentLoaded', app);
