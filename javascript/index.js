import {data} from "./data.js"; 

const photographersArray = data.photographers; 

const photographerSection = document.getElementById("photographer");

for (let photographer of photographersArray) {
    addPortraitInPhotographerSection(photographer.portrait)
    addNameInPhotographerSection(photographer.name)
    addCityInPhotographerSection(photographer.city)
    addCountryInPhotographerSection(photographer.country)
    addTaglineInPhotographerSection(photographer.tagline)
    addPriceInPhotographerSection(photographer.price)
    addTagsInPhotographerSection(photographer.tags)
}

function addPortraitInPhotographerSection(portrait) {
    const photographerPortrait = document.createElement("img");
    photographerPortrait.setAttribute("src", "./fisheye_photos/ID_Photos/" + portrait);
    photographerPortrait.setAttribute("class", "photographer_portrait");
    photographerSection.appendChild(photographerPortrait);
}

function addNameInPhotographerSection(name) {
    const photographerName = document.createElement("h2");
    photographerName.textContent = name;
    photographerName.setAttribute("class", "photographer_name");
    photographerSection.appendChild(photographerName);
}

function addCityInPhotographerSection(city) {
    const photographerCity = document.createElement("p");
    photographerCity.textContent = city;
    photographerCity.setAttribute("class", "photographer_city");
    photographerSection.appendChild(photographerCity);
}

function addCountryInPhotographerSection(country) {
    const photographerCountry = document.createElement("p");
    photographerCountry.textContent = country;
    photographerCountry.setAttribute("class", "photographer_country")
    photographerSection.appendChild(photographerCountry);
}

function addTaglineInPhotographerSection(tagline) {
    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = tagline;
    photographerTagline.setAttribute("class", "photographer_tagline")
    photographerSection.appendChild(photographerTagline);
}

function addPriceInPhotographerSection(price) {
    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = price;
    photographerPrice.setAttribute("class", "photographer_price");
    photographerSection.appendChild(photographerPrice);
}

function addTagsInPhotographerSection(tags) {
    const photographerTags = document.createElement("a");
    photographerTags.textContent = tags;
    photographerTags.setAttribute("class", "photographer_tags")
    photographerSection.appendChild(photographerTags);
}