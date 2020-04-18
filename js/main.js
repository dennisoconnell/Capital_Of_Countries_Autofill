const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

//search capitals.json and filter it
const searchCountries = async searchText => {
  const res = await fetch("../data/capitals.json");
  const countries = await res.json();

  //get matches to current user input
  let matches = countries.filter(countryName => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return countryName.country.match(regex);
  });

  if (searchText.length == 0) {
    matches = [];
  }

  outputHTML(matches);
};

//show results in HTML
const outputHTML = matches => {
  if (matches.length > 0) {
    const HTML = matches.map(match => `
    <div class ="card card-body mb-1"> 
      <h4>${match.country} (${match.abbr}) <span class = "text-primary" ${match.capital} </span> </h4>
      <small>Lat: ${match.lat} / Long: ${match.lng}</small>
    </div>
    `).join(' ');

    console.log(HTML);
    matchList.innerHTML = HTML;
  }
}

search.addEventListener("input", () => searchCountries(search.value));
