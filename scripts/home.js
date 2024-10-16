let countries = document.querySelector(".countries");
    body = document.querySelector("body");
    modeBtn = document.querySelector(".mode"),
    modeBtnText = document.querySelector(".mode span");
    homeHeader = document.querySelector("header"),
    search = document.querySelector(".search"),
    searchInput = document.querySelector(".search input"),
    home = document.querySelector("#home");
    detailsPage = document.querySelector("#country-details-page");
    select = document.querySelector("select");
    countryPage = document.querySelector("#country-details-page"),
    countryDetailsCon = document.querySelector(".country-details-con");
    backBtn = document.querySelector(".back-btn");
    searchField = document.querySelector(".search input");


let myData = []; 


async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Sohila25Akram/data/main/data.json');
        if (!response.ok) throw new Error('Network error');
        myData = await response.json();
        myData.length = 250;
        return myData;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}


async function displayCountries(myData){
    const fragment = document.createDocumentFragment();
    myData.forEach(countryData => {
        const cardHTML = document.createElement('div');
        cardHTML.className = 'country';
        cardHTML.innerHTML = `
        <div class="country">
          <div class="photo">
            <img src="${countryData.flags.png}" alt="" loading="lazy">
          </div>
          <div class="details">
            <h3>${countryData.name}</h3>
            <p>Population: <span class="population">${countryData.population}</span></p>
            <p>Region: <span class="region">${countryData.region}</span></p>
            <p>Capital: <span class="capital">${countryData.capital}</span></p>
          </div>
        </div>`;
        fragment.appendChild(cardHTML);
    });
    countries.innerHTML = '';
    countries.appendChild(fragment)
}


fetchData().then((data) => {
    displayCountries(data);
})


function filterRegion(){
    select.addEventListener('change', function(){
        const selectedRegion = select.value;
        const filteredCountries = myData.filter(country => country.region === selectedRegion);
        if(selectedRegion === "All"){
            fetchData().then((data) => {
                displayCountries(data);
            })
        }else{
            displayCountries(filteredCountries)
        }
        
    })
}


filterRegion()


function showDetails(countryH3){
    countryDetailsCon.innerHTML = '';
    countryPage.style.display = "flex";
    countries.style.display = "none";

    const selectedCountry = myData.find(country => country.name === countryH3.textContent);
    console.log(selectedCountry)
    if(!selectedCountry) return;

    const languages = selectedCountry.languages.map(lang => lang.name).join(', ');
    const currencies = Array.isArray(selectedCountry.currencies) 
        ? selectedCountry.currencies.map(cur => cur.name).join(', ') 
        : '';
    const fragment = document.createDocumentFragment();

    const countryDiscDiv = document.createElement('div');
    countryDiscDiv.className = 'country-disc';
    countryDiscDiv.innerHTML = `
        <img src="${selectedCountry.flags.svg}" alt="" width="428" height="280" loading="lazy">
        <div class="country-disc">
            <h3>${selectedCountry.name}</h3>
            <div class="sort">
                <div class="first-side">
                    <p>Native Name: <span class="native-name">${selectedCountry.nativeName}</span></p>
                    <p>Population: <span class="population">${selectedCountry.population}</span></p>
                    <p>Region: <span class="region">${selectedCountry.region}</span></p>
                    <p>Sub Region: <span class="sub-region">${selectedCountry.subregion}</span></p>
                    <p>Capital: <span class="capital">${selectedCountry.capital}</span></p>
                </div>
                <div class="second-side">
                    <p>Top Level Domain: <span class="top-level-domain">${selectedCountry.topLevelDomain}</span></p>
                    <p class="currencies">Currencies: <span class="currencies">${currencies || 'N/A'}</span></p>
                    <p>Languages: <span class="languages">${languages || 'N/A'}</span></p>
                </div>
            </div>
            <h4 class="header-b">Border Countries:</h4>
            <div class="borders-container"></div>
        </div>`;
        
    fragment.appendChild(countryDiscDiv);
    countryDetailsCon.appendChild(fragment);
    updateBorders(selectedCountry);
}


countries.addEventListener('click', (e) => {
    if (e.target.tagName === 'H3') {
      showDetails(e.target);
    }
});


function updateBorders(selectedCountry){
    const bordersContainer = countryDetailsCon.querySelector(".borders-container");
    bordersContainer.innerHTML = '';
    if (selectedCountry.borders && selectedCountry.borders.length > 0) {
        const fragment = document.createDocumentFragment();
        selectedCountry.borders.forEach(border => {
            const span = document.createElement('span');
            span.className = 'border dark';
            span.textContent = border;
            fragment.appendChild(span);
        });
        bordersContainer.appendChild(fragment);
    }
}


backBtn.onclick = function(){
    countryPage.style.display = "none";
    countries.style.display = "flex";
}


searchField.addEventListener('input', function(){
    const searchedCountry = myData.filter(country => country.name.toLowerCase().includes(searchField.value.toLowerCase()));
    countries.innerHTML =''
    if (searchedCountry.length) {
        displayCountries(searchedCountry)
    } else {
        const noResult = document.createElement("p");
        noResult.textContent = "No Result";
        noResult.classList.add("no-result");
        countries.appendChild(noResult);
    }
})


function modeChange(){
    if(modeBtnText.textContent === "Dark Mode"){
        body.classList.add("dark");
        homeHeader.classList.add("dark");
        home.classList.add("dark");
        search.classList.add("dark");
        searchInput.classList.add("dark");
        select.classList.add("dark");
        for (const country of countries.children) {
            country.classList.add("dark");
        }
        modeBtnText.textContent = "Light Mode";
        detailsPage.classList.add("dark");
        backBtn.classList.add("dark");
    }else{
        body.classList.remove("dark");
        homeHeader.classList.remove("dark");
        home.classList.remove("dark");
        search.classList.remove("dark");
        searchInput.classList.remove("dark");
        select.classList.remove("dark");
        modeBtnText.textContent = "Dark Mode";
        detailsPage.classList.remove("dark");
        backBtn.classList.remove("dark");
        for (const country of countries.children) {
            country.classList.remove("dark");
        }
    }
}


modeBtn.onclick = modeChange;
