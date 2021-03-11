import {data} from "./data.js"; 

const photographersArray = data.photographers; 

const photographerSection = document.getElementById("photographer");

for (let photographer of photographersArray) {
    addPortraitInPhotographerSection(photographer.portrait)
    addNameInPhotographerSection(photographer.name)
    addCityInPhotographerSection(photographer.city)
    addCountryInPhotographerSection(photographer.country)
    addTaglineInPhotographerSection(photographer.tagline)
}

function addPortraitInPhotographerSection(portrait) {
    const photographerPortrait = document.createElement("img");
    photographerPortrait.setAttribute("src", "./fisheye_photos/ID_Photos/" + portrait);
    photographerSection.appendChild(photographerPortrait);
}

function addNameInPhotographerSection(name) {
    const photographerName = document.createElement("h2");
    photographerName.textContent = name;
    photographerSection.appendChild(photographerName);
}

function addCityInPhotographerSection(city) {
    const photographerCity = document.createElement("p");
    photographerCity.textContent = city;
    photographerSection.appendChild(photographerCity);
}

function addCountryInPhotographerSection(country) {
    const photographersCountry = document.createElement("p");
    photographersCountry.textContent = country;
    photographerSection.appendChild(photographersCountry);
}

function addTaglineInPhotographerSection(tagline) {
    const photographersTagline = document.createElement("p");
    photographersTagline.textContent = tagline;
    photographerSection.appendChild(photographersTagline);
}
