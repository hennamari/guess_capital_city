function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    if (sideMenu.style.left === "0px") {
        sideMenu.style.left = "-250px"; 
    } else {
        sideMenu.style.left = "0px"; 
    }
  }
  

document.addEventListener('DOMContentLoaded', (event) => {
    const countrySearch = document.getElementById('input')
    const searchButton = document.getElementById('button')
    const countryName = document.getElementById('outputCountryName')
    const countryCapital = document.getElementById('outputCountryCapital')
    const countryRegion = document.getElementById('outputCountryRegion')
    const countryPopulation = document.getElementById('outputCountryPopulation')

    function randomCountrySearch() {
        const countryToSearch = countrySearch.value.trim()
        fetch(`https://restcountries.com/v3.1/name/${countryToSearch}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const country = data[0]
                    countryName.innerText = `Country: ${country.name.common}`
                    countryCapital.innerText = `Capital: ${country.capital ? country.capital[0] : "N/A"}`
                    countryRegion.innerText = `Region: ${country.region}`
                    countryPopulation.innerText = `Population: ${country.population}`
                } else {
                    countryName.innerText = "Country not found"
                    countryCapital.innerText = ""
                    countryRegion.innerText = ""
                    countryPopulation.innerText = ""
                }
                countrySearch.value = ""
            })
            .catch(error => console.error('Error:', error));
    }

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            randomCountrySearch(event)
        }
      });

    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        randomCountrySearch();
    });
});