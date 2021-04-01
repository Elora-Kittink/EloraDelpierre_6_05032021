import {data} from "./data.js";

let allTags = ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"]


export function displayPhotographers() {    
    const url= window.location.search; 
    const urlParams = new URLSearchParams(url);
    const tag = urlParams.get("tag");
    const photographersArray = data.photographers.filter((element) => {return tag === null || element.tags.includes(tag)}); 
    const photographerGrid = document.getElementById("photographer__grid");
    for (let photographer of photographersArray) {
        const photographerId = photographer.id;
        const photographerCell = document.createElement("div")
        photographerCell.setAttribute("class", "photographer__cell")
        photographerCell.setAttribute("data-id", photographerId)
        photographerGrid.appendChild(photographerCell)
        addPortraitInPhotographerCell(photographer.portrait, photographerCell, photographer.alt)
        addNameInPhotographerCell(photographer.name, photographerCell, photographerId)
        addCityInPhotographerCell(photographer.city, photographerCell)
        addCountryInPhotographerCell(photographer.country, photographerCell)
        addTaglineInPhotographerCell(photographer.tagline, photographerCell)
        addPriceInPhotographerCell(photographer.price, photographerCell)
        addTagsInPhotographerCell(photographer.tags, photographerCell)
    }
}



function addPortraitInPhotographerCell(portrait, photographerCell, alt) {
    const photographerPortrait = document.createElement("img");
    photographerPortrait.setAttribute("src", "./fisheye_photos/ID_Photos/" + portrait);
    photographerPortrait.setAttribute("class", "photographer__portrait");
    photographerPortrait.setAttribute("alt", alt);
    photographerCell.appendChild(photographerPortrait);
}

function addNameInPhotographerCell(name, photographerCell, photographerId) {
    const photographerName = document.createElement("h2");
    photographerName.setAttribute("class", "photographer__name");
    photographerCell.appendChild(photographerName);
    const photographerLink = document.createElement("a");
    photographerLink.textContent = name;
    photographerLink.setAttribute("data-id", photographerId);
    photographerLink.setAttribute("href", "photographer.html?id=" + photographerId);
    // photographerLink.setAttribute("onclick","maFutureFonction" + "(" + photographerId + ")" );
    photographerName.appendChild(photographerLink);
}
    

function addCityInPhotographerCell(city, photographerCell) {
    const photographerCity = document.createElement("p");
    photographerCity.textContent = city;
    photographerCity.setAttribute("class", "photographer__city");
    photographerCell.appendChild(photographerCity);
}

function addCountryInPhotographerCell(country, photographerCell) {
    const photographerCountry = document.createElement("p");
    photographerCountry.textContent = country;
    photographerCountry.setAttribute("class", "photographer__country")
    photographerCell.appendChild(photographerCountry);
}

function addTaglineInPhotographerCell(tagline, photographerCell) {
    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = tagline;
    photographerTagline.setAttribute("class", "photographer__tagline")
    photographerCell.appendChild(photographerTagline);
}

function addPriceInPhotographerCell(price, photographerCell) {
    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = price;
    photographerPrice.setAttribute("class", "photographer__price");
    photographerCell.appendChild(photographerPrice);
}

function addTagsInPhotographerCell(tags, photographerCell) {
    const photographerTags = document.createElement("a");
    photographerTags.textContent = tags;
    photographerTags.setAttribute("class", "photographer__tags")
    photographerCell.appendChild(photographerTags);
}