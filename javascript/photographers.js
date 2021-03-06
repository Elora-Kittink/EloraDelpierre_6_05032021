
export async function displayPhotographers() { 
    const dataFile = await fetch("./data.json");   //methode fetch pour récuperer json//    
    const data = await dataFile.json();
    const url= window.location.search;  // url courant //
    const urlParams = new URLSearchParams(url); // pour pouvoir utiliser get //
    const tag = urlParams.get("tag"); // = ce qui se trouve immédiatement après "tag"//
    const photographersArray = data.photographers.filter((element) => {return tag === null || element.tags.includes(tag)}); //filtrer les photographes ayant le tag en question //
    const photographersGrid = document.getElementById("photographers__grid");
    for (let photographer of photographersArray) { // pour chaque photographe du tableau //
        const photographersId = photographer.id;
        const photographersCell = document.createElement("div");
        photographersCell.setAttribute("class", "photographers");
        photographersGrid.appendChild(photographersCell);
        const photographersLink = document.createElement("a");
        photographersLink.setAttribute("class", "photographers__link");
        photographersLink.setAttribute("href", "photographer.html?id=" + photographersId);
        photographersLink.setAttribute("aria-label", photographer.name);
        photographersCell.appendChild(photographersLink);
        addPortraitInPhotographerCell(photographer.portrait, photographersLink, photographer.alt)
        addNameInPhotographerCell(photographer.name, photographersLink);
        addLocationInPhotographerCell(photographer.country, photographer.city, photographersCell);
        addTaglineInPhotographerCell(photographer.tagline, photographersCell);
        addPriceInPhotographerCell(photographer.price, photographersCell);
        addTagsInPhotographerCell(photographer.tags, photographersCell);
    }
    let tagSelected = document.getElementById(tag);
    tagSelected.setAttribute("aria-curent", "page");  
    tagSelected.style.backgroundColor = "#901C1C";
    tagSelected.style.color = "white";
}



function addPortraitInPhotographerCell(portrait, photographersLink, alt) {
    const photographersPortrait = document.createElement("img");
    photographersPortrait.setAttribute("src", "./fisheye_photos/ID_Photos/" + portrait);
    photographersPortrait.setAttribute("class", "photographers__portrait");
    photographersPortrait.setAttribute("alt", alt);
    photographersLink.appendChild(photographersPortrait);
}

function addNameInPhotographerCell(name, photographersLink) {
    const photographersName = document.createElement("h2");
    photographersName.setAttribute("class", "photographers__name");
    photographersName.textContent = name;    
    photographersLink.appendChild(photographersName);
}
    

function addLocationInPhotographerCell(country, city, photographersCell) {
    const photographersLocation = document.createElement("p");
    photographersLocation.setAttribute("class", "photographers__location");
    photographersLocation.textContent = city + ", " + country;
    photographersCell.appendChild(photographersLocation);
}

function addTaglineInPhotographerCell(tagline, photographersCell) {
    const photographersTagline = document.createElement("p");
    photographersTagline.textContent = tagline;
    photographersTagline.setAttribute("class", "photographers__tagline");
    photographersCell.appendChild(photographersTagline);
}

function addPriceInPhotographerCell(price, photographersCell) {
    const photographersPrice = document.createElement("p");
    photographersPrice.textContent = price + "€ /jour";
    photographersPrice.setAttribute("class", "photographers__price");
    photographersCell.appendChild(photographersPrice);
}

function addTagsInPhotographerCell(tags, photographersCell) {
    const photographersTags = document.createElement("div");
    photographersTags.classList.add("photographers__tags");
    for (let tag of tags) {   
        const photographersTag = document.createElement("a");
        photographersTag.textContent = " #" + tag;
        photographersTag.classList.add("photographers__tag");
        photographersTags.appendChild(photographersTag);
        photographersTag.setAttribute("href", "#");
        photographersTag.setAttribute("aria-label", "tag" + tag);
        photographersTag.setAttribute("lang", "en");
    }
    photographersCell.appendChild(photographersTags);
}