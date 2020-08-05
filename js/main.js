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
    matchList.innerHTML = '';
  }

  outputHTML(matches);

};

//show results in HTML
const outputHTML = matches => {
  if (matches.length > 0) {
    const HTML = matches.map(match => `
    <div class ="card card-body mb-1"> 
      <h4> <span class="text-secondary"> ${match.country} </span>${match.capital} </h4>
      <small>Lat: ${match.location.lat} / Long: ${match.location.lng}</small>
    </div>
    `).join(' ');

    console.log(HTML);
    matchList.innerHTML = HTML;
  }
}

search.addEventListener("input", () => searchCountries(search.value));


//https://www.youtube.com/watch?v=1iysNUrI3lw&list=LLDlmzli2AvJco6ZRUKSs1sQ&index=6
//dud
//didly