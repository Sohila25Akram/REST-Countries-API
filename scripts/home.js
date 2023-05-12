fetch('https://raw.githubusercontent.com/Sohila25Akram/data/main/data.json').then((result)=>{
        console.log(result);
        let myData = result.json();
        console.log(myData);
        return myData;
    })
    .then((myData)=>{
        myData.length = 250;
        return myData
    })
    .then((myData)=>{
        //////////////create cards when loading page ////////////
        let i;
        for(i=0; i<myData.length; i++){
            
            console.log(myData[i].name);

            card =`
            <div class="country">
            <div class="photo">
                <img src="${myData[i].flags.png}" alt="">
            </div>
            <div class="details">
                <h3>${myData[i].name}</h3>
                <p>Population: <span class="population">${myData[i].population}</span></p>
                <p>Region: <span class="region">${myData[i].region}</span></p>
                <p>Capital: <span class="capital">${myData[i].capital}</span></p>
            </div>
            </div>`

            countries.insertAdjacentHTML("beforeend", card);
            

            //=====================================================
            ////////show details after loading page/////////
            
            //to handle cards that created in the page
            const country = countries.lastElementChild;
            //handle country name to create page of datails
            const countryH3 = country.querySelector("h3");

            country.addEventListener('click', () => {
                showDetails(countryH3);
            });
            

            ////////////////// mode after loading/////////////////
            modeBtn.onclick = modeChange;

            ///// create mode change function
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
            
                    // for (const border of bordersContainer.children) {
                    //     border.classList.add("dark");
                    // }
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
                    country.classList.remove("dark");
            
                    // for (const border of bordersContainer.children) {
                    //     border.classList.remove("dark");
                    // }

                    modeBtnText.textContent = "Dark Mode";
            
                    detailsPage.classList.remove("dark");
                    backBtn.classList.remove("dark");
            
                    for (const country of countries.children) {
                        country.classList.remove("dark");
                    }
                }
            }


        }

        //=======================================================
        ////////////// Filter ///////////////
        let card4="";

        select.addEventListener('change', function(){
            const selectedRegion = select.value;
            if(selectedRegion !== "All"){
                countries.innerHTML = '';
            
                for(let j=0; j < myData.length; j++){
                    if(myData[j].region === selectedRegion){
                        card4 =`
                        <div class="country">
                        <div class="photo">
                            <img src="${myData[j].flags.png}" alt="">
                        </div>
                        <div class="details">
                            <h3>${myData[j].name}</h3>
                            <p>Population: <span class="population">${myData[j].population}</span></p>
                            <p>Region: <span class="region">${myData[j].region}</span></p>
                            <p>Capital: <span class="capital">${myData[j].capital}</span></p>
                        </div>
                        </div>`
            
                        countries.insertAdjacentHTML("beforeend", card4);


                            //to handle cards that created in the page
                        const country = countries.lastElementChild;
                        //handle country name to create page of datails
                        const countryH3 = country.querySelector("h3");

                        country.addEventListener('click', () => {
                            showDetails(countryH3);
                        });
                    }
                    modeChange();
                }


            }else{
                countries.innerHTML = '';
            
                for(let j=0; j < myData.length; j++){
                    
                    card4 =`
                    <div class="country">
                    <div class="photo">
                        <img src="${myData[j].flags.png}" alt="">
                    </div>
                    <div class="details">
                        <h3>${myData[j].name}</h3>
                        <p>Population: <span class="population">${myData[j].population}</span></p>
                        <p>Region: <span class="region">${myData[j].region}</span></p>
                        <p>Capital: <span class="capital">${myData[j].capital}</span></p>
                    </div>
                    </div>`

        
                    countries.insertAdjacentHTML("beforeend", card4);
                    
                    //to handle cards that created in the page
                    const country = countries.lastElementChild;
                    //handle country name to create page of datails
                    const countryH3 = country.querySelector("h3");

                    country.addEventListener('click', () => {
                        showDetails(countryH3);
                    });

                    modeChange();
                }

            }
            
        })
        //=======================================
        ///// create show details Function implementation
                    

        var card2 = "";

        function showDetails(countryH3){

            countryDetailsCon.innerHTML = '';

            countryPage.style.display = "flex";
            countries.style.display = "none";
            

            let j;
            for(j=0; j<myData.length; j++){
                if(myData[j].name === countryH3.textContent){

                    //make list of Languages and Curencies
                    let languages = '';
                    let currencies = '';
                        for (let i = 0; i < myData[j].languages.length; i++) {
                            languages += myData[j].languages[i].name;
                            if (i !== myData[j].languages.length - 1) {
                                languages += ', ';
                            }
                        }
                        if (Array.isArray(myData[j].currencies)){
                            for(let i=0; i <myData[j].currencies.length; i++){
                                currencies += myData[j].currencies[i].name;
                                if (i !== myData[j].currencies.length - 1) {
                                    currencies += ', ';
                                }
                            }
                        }
                        
                    card2 = 
                    `<img src="${myData[j].flags.svg}" alt="">
                    <div class="country-disc">
                        <h3>${myData[j].name}</h3>
                        <div class="sort">
                            <div class="first-side">
                                <p>Native Name: <span class="native-name">${myData[j].nativeName}</span></p>
                                <p>Population: <span class="population">${myData[j].population}</span></p>
                                <p>Region: <span class="region">${myData[j].region}</span></p>
                                <p>Sub Region: <span class="sub-region">${myData[j].subregion}</span></p>
                                <p>Capital: <span class="capital">${myData[j].capital}</span></p>
                            </div>
                            <div class="second-side">
                                <p>Top Level Domain: <span class="top-level-domain">${myData[j].topLevelDomain}</span></p>
                                <p class="currencies">Currencies: <span class="currencies">${currencies}</span></p>
                                <p>Languages: <span class="languages">${languages}</span></p>
                            </div>
                        </div>
                        <h4 class="header-b">Border Countries:</h4>
                        <div class="borders-container">
                            
                        </div>
                    </div>`
                    
                    countryDetailsCon.insertAdjacentHTML("beforeend", card2);
                    
                    //hide currencies if not found
                    const curr = countryDetailsCon.lastElementChild;
                    const h4borders = curr.querySelector(".country-disc h4");
                    const currency = curr.querySelector(".currencies");
                    if(currencies === ""){
                        currency.style.display = "none";
                    }

                    
                    ////// create Borders
            
                    function updateBorders() {
                        
                        const bordersContainer = curr.querySelector(".borders-container");
                        let borders = "";
                        let bordersname = "";
                        if (Array.isArray(myData[j]?.borders)){
                            if(myData[j].borders.length > 0){
                               
                                for(var z=0; z<myData[j].borders.length;z++ ){
                    
                                    for(var x=0; x<myData.length; x++){
                                        if(myData[x].alpha3Code === myData[j].borders[z]){
                                            bordersname = myData[x].name;
                                            
                                        }
                                    }
                                    if(modeBtnText.textContent === "Light Mode"){
                                    
                                        borders += 
                                    `<span class="border dark">${bordersname}</span>`
                                    
                                    }else{
                                        borders += 
                                        `<span class="border light">${bordersname}</span>`
                                    }
                                    
                    
                                }
                                bordersContainer.insertAdjacentHTML("beforeend", borders);
                        
                            }
                            
                            
                            
                        }
                        
                        
                    }
                    
                    
                    updateBorders();
                    
                    
                    modeBtn.addEventListener("click", () => {
                        updateBorders();
                    });              
                    

                }
                
            }
            
        }

        backBtn.onclick = function(){
            countryPage.style.display = "none";
            countries.style.display = "flex";
        }

        //=============================================
        //////////// Search //////////////////
        let card5="";
        
        searchField.addEventListener('input', function(){
            countries.innerHTML = '';
            
            for(let j=0; j < myData.length; j++){
                if(myData[j].name.includes(searchField.value)){
                    card5 =`
                    <div class="country">
                    <div class="photo">
                        <img src="${myData[j].flags.png}" alt="">
                    </div>
                    <div class="details">
                        <h3>${myData[j].name}</h3>
                        <p>Population: <span class="population">${myData[j].population}</span></p>
                        <p>Region: <span class="region">${myData[j].region}</span></p>
                        <p>Capital: <span class="capital">${myData[j].capital}</span></p>
                    </div>
                    </div>`
        
                    countries.insertAdjacentHTML("beforeend", card5);



                    //to handle cards that created in the page
                    const country = countries.lastElementChild;
                    //handle country name to create page of datails
                    const countryH3 = country.querySelector("h3");

                    country.addEventListener('click', () => {
                        showDetails(countryH3);
                    });

                }
                
                modeChange();
            
            }
            if(countries.innerHTML ===""){
                let texElem = document.createElement("p");
                texElem.textContent = "No Result";
                texElem.classList.add("no-result");
                countries.appendChild(texElem);
               
            }


        })
        
        
    })




let countryPhoto = document.querySelector(".photo img"),
    countryName = document.querySelector(".details h3"),
    countryPop = document.querySelector(".population"),
    countryRegion = document.querySelector(".region"),
    countryCapital = document.querySelector(".capital");
let card="";
let countries = document.querySelector(".countries");


let countryPage = document.querySelector("#country-details-page"),
    countryDetailsCon = document.querySelector(".country-details-con");
    
let flag = document.querySelector(".country-details-con img"),
    countryNameDe = document.querySelector(".country-disc h3");
    
let backBtn = document.querySelector(".back-btn");


let cora = document.querySelector("option"),
    select = document.querySelector("select");

let searchField = document.querySelector(".search input");


let homeHeader = document.querySelector("header"),
    search = document.querySelector(".search"),
    searchInput = document.querySelector(".search input"),
    home = document.querySelector("#home");

    
//handle modeBtn and mode status
let modeBtn = document.querySelector(".mode"),
    modeBtnText = document.querySelector(".mode span");


//handle page of datails
let detailsPage = document.querySelector("#country-details-page");


let body = document.querySelector("body");

