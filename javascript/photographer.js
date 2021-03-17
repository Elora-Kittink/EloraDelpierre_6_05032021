import {data} from "./data.js";

export function displayPhotographer () {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = urlParams.get("id");
    const idNumber = parseInt(id, 10);
    const photographersArray = data.photographers;
    const photographerSelected = photographersArray.find(photographer => photographer.id === idNumber); 
    completePhotographerProfile(photographerSelected)
}



function completePhotographerProfile (photographerSelected) {
    document.getElementById("photographer__profile__name").textContent = photographerSelected.name
    document.getElementById("photographer__profile__city").textContent = photographerSelected.city
    document.getElementById("photographer__profile__country").textContent = photographerSelected.country
    document.getElementById("photographer__profile__tagline").textContent = photographerSelected.tagline
    document.getElementById("photographer__profile__tags").textContent = photographerSelected.tags
    const photographerProfilePortrait = document.getElementById("photographer__profile__portrait");
    photographerProfilePortrait.setAttribute("src", "./fisheye_photos/ID_Photos/" + photographerSelected.portrait)
    photographerProfilePortrait.setAttribute("alt", photographerSelected.alt)
    document.getElementById("photographer__profile__btn").textContent = "contactez-moi"
}
 

export function displayGallery() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = urlParams.get("id");
    const idNumber = parseInt(id, 10);
    const mediaArray = data.media;
    const gallery = document.getElementById("gallery");
    for (let media of mediaArray) {
        if (media.photographerId === idNumber) {
            const galleryMedia = document.createElement("div");
            galleryMedia.setAttribute("class", "gallery__media");
            gallery.appendChild(galleryMedia);
            addImageInGalleryMedia(media.image, galleryMedia, media.alt);
            addTitleInGalleryMedia(media.alt, galleryMedia);
            addPriceInGalleryMedia(media.price, galleryMedia);
        }
    }
}

function addImageInGalleryMedia (image, galleryMedia, alt) {
    const mediaImage = document.createElement("img");
    mediaImage.setAttribute("src", "./fisheye_photos/media/" + image);
    mediaImage.setAttribute("alt", alt);
    mediaImage.setAttribute("class", "gallery__media__image");
    galleryMedia.appendChild(mediaImage);
}

function addTitleInGalleryMedia (alt, galleryMedia) {
    const mediaTitle = document.createElement("div");
    mediaTitle.setAttribute("class", "gallery__media__title");
    
    galleryMedia.appendChild(mediaTitle);
    mediaTitle.innerHTML = alt;
    mediaTitle.setAttribute("translate", "yes");
}

function addPriceInGalleryMedia (price, galleryMedia) {
    const mediaPrice = document.createElement("div");
    mediaPrice.setAttribute("class", "gallery__media__price");
    galleryMedia.appendChild(mediaPrice);
    mediaPrice.innerHTML = price + "€";
}



