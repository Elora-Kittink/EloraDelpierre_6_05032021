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
    let mediaArray = data.media.filter( (media) => { /*recupérer tous les objets media dont le photographerId est égale à l'id de l'url */
        return media.photographerId === idNumber
    } );
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    // trier le mediaArray
    const sortButton = document.querySelector("select");
    sortButton.addEventListener("change", displayGallery)
    if (sortButton.value === "popularity") {
        mediaArray.sort(function(a, b){
            return b.likes-a.likes
        })
    }
    else if (sortButton.value === "date") {
        mediaArray.sort(function(a, b){
            let dateA=new Date(a.date), dateB=new Date(b.date)
            return dateA-dateB 
        })
    }
    else if (sortButton.value === "title") {
        mediaArray.sort(function(a, b){
            let titleA=a.alt.toLowerCase(), titleB=b.alt.toLowerCase()
            if (titleA < titleB) 
                return -1 
            if (titleA > titleB)
                return 1
            return 0 
        })
    };
    
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
            addImageInGalleryMedia(media, media.image, link, media.alt, media.id, media.video);
            addTitleInGalleryMedia(media.alt, galleryMedia);
            addPriceInGalleryMedia(media.price, galleryMedia);
            addDateInGalleryMedia(media.date, galleryMedia);
            addLikesInGalleryMedia(media.likes, galleryMedia);
    }
}

function addImageInGalleryMedia (media, image, link, alt, id, video) {
    if (media.image !== undefined) {
        const mediaImage = document.createElement("img");
        mediaImage.setAttribute("src", "./fisheye_photos/media/" + image);
        mediaImage.setAttribute("alt", alt);
        mediaImage.setAttribute("class", "gallery__media__image");
        mediaImage.setAttribute("id", id);
        link.appendChild(mediaImage);
    } else if (media.video !== undefined) {
        const mediaVideo = document.createElement("video");
        mediaVideo.setAttribute("src", "./fisheye_photos/media/" + video);
        mediaVideo.setAttribute("type", "video/mp4");
        mediaVideo.setAttribute("alt", alt);
        mediaVideo.setAttribute("class", "gallery__media__video");
        mediaVideo.setAttribute("id", id);
        mediaVideo.width= "350px";
        mediaVideo.height= "300px";
        link.appendChild(mediaVideo);
    }
    
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
    const submitFormBtn = document.getElementById("contact__form__submitbtn");
    submitFormBtn.addEventListener("click", function(e) {
        e.preventDefault();
        console.log(document.getElementById("contact__form__firstname__input").value);
        console.log(document.getElementById("contact__form__lastname__input").value);
        console.log(document.getElementById("contact__form__email__input").value);
        console.log(document.getElementById("contact__form__message__input").value);
        closeForm();
    })
}

function closeForm() {
    const containerForm = document.getElementById("contact");
    containerForm.style.display = "none";
}
 
