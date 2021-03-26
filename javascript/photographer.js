import {data} from "./data.js";
import {launchLightbox} from "./lightbox.js";

export function displayPhotographer () {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = urlParams.get("id");
    const idNumber = parseInt(id, 10);
    const photographersArray = data.photographers;
    const photographerSelected = photographersArray.find(photographer => photographer.id === idNumber); 
    completePhotographerProfile(photographerSelected)
}

// let currentMediaArray = data.media.filter((media) => {
//     return media.image === photographerId
// });

function completePhotographerProfile (photographerSelected) {
    document.getElementById("photographer__profile__name").textContent = photographerSelected.name;
    document.getElementById("photographer__profile__location").textContent = photographerSelected.city + "," + photographerSelected.country;
    document.getElementById("photographer__profile__tagline").textContent = photographerSelected.tagline;
    document.getElementById("photographer__profile__tags").textContent = "#" + photographerSelected.tags;
    const photographerProfilePortrait = document.getElementById("photographer__profile__portrait");
    photographerProfilePortrait.setAttribute("src", "./fisheye_photos/ID_Photos/" + photographerSelected.portrait)
    photographerProfilePortrait.setAttribute("alt", photographerSelected.alt);
    const contactFormBtn = document.getElementById("photographer__profile__btn");
    contactFormBtn.textContent = "contactez-moi";
    contactFormBtn.addEventListener("click", launchForm);

}
 

export function displayGallery() {
    const url = window.location.search; /*recuperer url*/
    const urlParams = new URLSearchParams(url); /*outil de recherche dans url */
    const id = urlParams.get("id"); /*recuperer ce qu'il y a apres "id" */
    const idNumber = parseInt(id, 10); /*transformer string en number base 10 */
    const mediaArray = data.media.filter( (media) => { /*recupérer tous les objets media dont le photographerId est égale à l'id de l'url */
        return media.photographerId === idNumber
    } );
    const gallery = document.getElementById("gallery");
    for (let media of mediaArray) {
            const link = document.createElement("a");
            link.setAttribute("href", "#");
            link.setAttribute("id", media.id)
            const galleryMedia = document.createElement("div");
            galleryMedia.setAttribute("class", "gallery__media");
            gallery.appendChild(galleryMedia);
            galleryMedia.appendChild(link);
            link.addEventListener("click", function() {
                launchLightbox(media.id, media.image, media.photographerId, mediaArray);
            })
            addImageInGalleryMedia(media.image, link, media.alt, media.id, media.photographerId);
            addTitleInGalleryMedia(media.alt, galleryMedia);
            addPriceInGalleryMedia(media.price, galleryMedia);
            addDateInGalleryMedia(media.date, galleryMedia);
            addLikesInGalleryMedia(media.likes, galleryMedia);
    }
}

function addImageInGalleryMedia (image, link, alt, id, photographerId) {
    
    const mediaImage = document.createElement("img");
    mediaImage.setAttribute("src", "./fisheye_photos/media/" + image);
    mediaImage.setAttribute("alt", alt);
    mediaImage.setAttribute("class", "gallery__media__image");
    mediaImage.setAttribute("id", id);
    link.appendChild(mediaImage);
}

function addTitleInGalleryMedia (alt, galleryMedia) {
    const mediaTitle = document.createElement("div");
    mediaTitle.setAttribute("class", "gallery__media__title");    
    galleryMedia.appendChild(mediaTitle);
    mediaTitle.innerHTML = alt;
    
}

function addPriceInGalleryMedia (price, galleryMedia) {
    const mediaPrice = document.createElement("div");
    mediaPrice.setAttribute("class", "gallery__media__price");
    galleryMedia.appendChild(mediaPrice);
    mediaPrice.innerHTML = price + "€";
}

function addDateInGalleryMedia (date, galleryMedia) {
    const mediaDate = document.createElement("time");
    mediaDate.setAttribute("datetime", date);
    galleryMedia.appendChild(mediaDate);
}

function addLikesInGalleryMedia (likes, galleryMedia) {
    let counter = likes;
    function counterIncrement() {
        counter++
        mediaLikes.innerHTML = counter;
    } 
    const mediaLikes = document.createElement("button");
    mediaLikes.onclick = counterIncrement;
    mediaLikes.setAttribute("class", "gallery__media__likes");        
    galleryMedia.appendChild(mediaLikes);
    const mediaHeart = document.createElement("i");
    mediaHeart.setAttribute("class", "fas fa-heart");
    mediaLikes.appendChild(mediaHeart);
}



/*---------------------------------lightbox---------------------------------*/





// const currentGallery = document.querySelectorAll(".gallery__media");
// console.log(currentGallery);
// const currentGalleryy = array.from("gallery__media");


  


/*----------------------------image ou video-----------------------------------*/

// function capture(){
//     var canvas = document.getElementById('canvas');
//     var video = document.getElementById('video');
//     canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
// }

/*---------------------------------------FORMULAIRE CONTACT-------------------------------------*/

function launchForm() {
    const containerForm = document.getElementById("contact");
    const form = document.getElementById("contact__form");
    containerForm.style.display = "block";
    const closeFormBtn = document.getElementById("contact__form__closebtn");
    closeFormBtn.addEventListener("click", closeForm);

}

function closeForm() {
    const containerForm = document.getElementById("contact");
    containerForm.style.display = "none";
}
 
