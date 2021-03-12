import {data} from "./data.js"; 

const photographersArray = data.photographers; 

const photographerGrid = document.getElementById("photographer_grid");

for (let photographer of photographersArray) {
    const photographerCell = document.createElement("div")
    photographerCell.setAttribute("class", "photographer_cell")
    photographerGrid.appendChild(photographerCell)
    addPortraitInPhotographerCell(photographer.portrait, photographerCell)
    addNameInPhotographerCell(photographer.name, photographerCell)
    addCityInPhotographerCell(photographer.city, photographerCell)
    addCountryInPhotographerCell(photographer.country, photographerCell)
    addTaglineInPhotographerCell(photographer.tagline, photographerCell)
    addPriceInPhotographerCell(photographer.price, photographerCell)
    addTagsInPhotographerCell(photographer.tags, photographerCell)
}

function addPortraitInPhotographerCell(portrait, photographerCell) {
    const photographerPortrait = document.createElement("img");
    photographerPortrait.setAttribute("src", "./fisheye_photos/ID_Photos/" + portrait);
    photographerPortrait.setAttribute("class", "photographer_portrait");
    photographerCell.appendChild(photographerPortrait);
}

function addNameInPhotographerCell(name, photographerCell) {
    const photographerName = document.createElement("h2");
    photographerName.textContent = name;
    photographerName.setAttribute("class", "photographer_name");
    photographerCell.appendChild(photographerName);
}

function addCityInPhotographerCell(city, photographerCell) {
    const photographerCity = document.createElement("p");
    photographerCity.textContent = city;
    photographerCity.setAttribute("class", "photographer_city");
    photographerCell.appendChild(photographerCity);
}

function addCountryInPhotographerCell(country, photographerCell) {
    const photographerCountry = document.createElement("p");
    photographerCountry.textContent = country;
    photographerCountry.setAttribute("class", "photographer_country")
    photographerCell.appendChild(photographerCountry);
}

function addTaglineInPhotographerCell(tagline, photographerCell) {
    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = tagline;
    photographerTagline.setAttribute("class", "photographer_tagline")
    photographerCell.appendChild(photographerTagline);
}

function addPriceInPhotographerCell(price, photographerCell) {
    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = price;
    photographerPrice.setAttribute("class", "photographer_price");
    photographerCell.appendChild(photographerPrice);
}

function addTagsInPhotographerCell(tags, photographerCell) {
    const photographerTags = document.createElement("a");
    photographerTags.textContent = tags;
    photographerTags.setAttribute("class", "photographer_tags")
    photographerCell.appendChild(photographerTags);
}