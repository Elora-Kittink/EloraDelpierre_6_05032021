import {data} from "./data.js";
import {launchLightbox} from "./lightbox.js";

export function displayPhotographer () {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = urlParams.get("id");
    const idNumber = parseInt(id, 10);
    const photographersArray = data.photographers;
    const photographerSelected = photographersArray.find(photographer => photographer.id === idNumber); 
    completePhotographerProfile(photographerSelected, photographerSelected.tags)
}


function completePhotographerProfile (photographerSelected, tags) {
    document.getElementById("photographer-profile__name").textContent = photographerSelected.name;
    document.getElementById("photographer-profile__location").textContent = photographerSelected.city + "," + photographerSelected.country;
    document.getElementById("photographer-profile__tagline").textContent = photographerSelected.tagline;
    const photographerTags = document.getElementById("photographer-profile__tags")
    for (let tag of tags) {
        const photographerTag = document.createElement("a");
        photographerTag.textContent = " #" + tag;
        photographerTag.classList.add("photographer__tag");
        photographerTags.appendChild(photographerTag);
        photographerTag.setAttribute("href", "#");
        photographerTag.setAttribute("aria-label", "tag");
    }
    const photographerProfilePortrait = document.getElementById("photographer-profile__portrait");
    photographerProfilePortrait.setAttribute("src", "./fisheye_photos/ID_Photos/" + photographerSelected.portrait)
    photographerProfilePortrait.setAttribute("alt", photographerSelected.alt);
    const contactFormBtn = document.getElementById("photographer-profile__btn");
    contactFormBtn.textContent = "contactez-moi";
    contactFormBtn.addEventListener("click", function() {
        launchForm(photographerSelected.name);
    });
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
    }
    
    for (let media of mediaArray) {
            const link = document.createElement("a");
            link.setAttribute("href", "#");
            link.setAttribute("id", media.id)
            const galleryMedia = document.createElement("div");
            galleryMedia.setAttribute("class", "gallery__media");
            gallery.appendChild(galleryMedia);
            galleryMedia.appendChild(link);
            const galleryInfo = document.createElement("div");
            galleryInfo.setAttribute("class", "gallery__media__info");
            galleryMedia.appendChild(galleryInfo);
            link.addEventListener("click", function() {
                launchLightbox(media.id, media.image, media.video, mediaArray, media.alt);
            });
            addImageInGalleryMedia(media, media.image, link, media.alt, media.id, media.video);
            addTitleInGalleryMedia(media.alt, galleryInfo);
            addPriceInGalleryMedia(media.price, galleryInfo);
            addDateInGalleryMedia(media.date, galleryInfo);
            addLikesInGalleryMedia(media.likes, galleryInfo, mediaArray);
    }
    
    
}

function addImageInGalleryMedia (media, image, link, alt, id, video) {
    if (media.image !== undefined) {
        const mediaImage = document.createElement("img");
        mediaImage.setAttribute("src", "./fisheye_photos/media/" + image);
        mediaImage.setAttribute("alt", alt + ", closeup view");
        mediaImage.setAttribute("class", "gallery__media__image");
        mediaImage.setAttribute("id", id);
        link.appendChild(mediaImage);
    } else if (media.video !== undefined) {
        const mediaVideo = document.createElement("video");
        const mediaVideoSrc = document.createElement("source");
        mediaVideoSrc.setAttribute("src", "./fisheye_photos/media/" + video);
        mediaVideoSrc.setAttribute("type", "video/mp4");
        mediaVideo.setAttribute("alt", alt + ", closeup view");
        mediaVideo.setAttribute("class", "gallery__media__video");
        mediaVideo.setAttribute("id", id);
        link.appendChild(mediaVideo);
        mediaVideo.appendChild(mediaVideoSrc);
    }
    
}

function addTitleInGalleryMedia (alt, galleryInfo) {
    const mediaTitle = document.createElement("title");
    mediaTitle.setAttribute("class", "gallery__media__info__title");    
    mediaTitle.setAttribute("lang", "en");
    galleryInfo.appendChild(mediaTitle);
    mediaTitle.innerHTML = alt;
    
}

function addPriceInGalleryMedia (price, galleryInfo) {
    const mediaPrice = document.createElement("div");
    mediaPrice.setAttribute("class", "gallery__media__info__price");
    mediaPrice.setAttribute("aria-label", "prix de l'oeuvre")
    galleryInfo.appendChild(mediaPrice);
    mediaPrice.innerHTML = price + " €";
}

function addDateInGalleryMedia (date, galleryInfo) {
    const mediaDate = document.createElement("time");
    mediaDate.setAttribute("datetime", date);
    galleryInfo.appendChild(mediaDate);
}

function addLikesInGalleryMedia (likes, galleryInfo, mediaArray) {
    let counter = likes;
    const mediaLikes = document.createElement("p");    
    mediaLikes.setAttribute("class", "gallery__media__info__likes");  
    mediaLikes.innerHTML = likes;      
    galleryInfo.appendChild(mediaLikes);
    const mediaHeart = document.createElement("i");
    mediaHeart.setAttribute("class", "fas fa-heart");
    mediaHeart.setAttribute("aria-label", "likes");  //ARIA titre pour icone coeur//
    galleryInfo.appendChild(mediaHeart);
    function counterIncrement() {
        counter++;
        mediaLikes.innerHTML = counter;
        likesArray.push(1);
        footerTotalLikes.innerHTML = "";
        const sum = likesArray.reduce((acc, cur) => acc + cur, 0);
        footerTotalLikes.innerHTML = sum + "<i class=\"fas fa-heart\">";
    } 
    mediaHeart.addEventListener("click", counterIncrement);
    
    
    const likesArray = mediaArray.map((media) => {
        return media.likes;
    }) ; 
    const footerTotalLikes = document.getElementById("footer-profile__likes__total");
    const sum = likesArray.reduce((acc, cur) => acc + cur, 0);
    footerTotalLikes.innerHTML = sum + "<i class=\"fas fa-heart\">";
}
  

/*---------------------------------------FORMULAIRE CONTACT-------------------------------------*/

function launchForm(name) {
    const containerForm = document.getElementById("contact");
    const form = document.getElementById("contact__form");
    containerForm.style.display = "block";
    const closeFormBtn = document.getElementById("contact__form__closebtn");
    closeFormBtn.addEventListener("click", closeForm);
    const submitFormBtn = document.getElementById("contact__form__submitbtn");
    const photographerContacted = document.getElementById("contact__form__photographer");
    photographerContacted.innerHTML = name;
    const bodyProfile = document.getElementById("body__profile");
    bodyProfile.setAttribute("aria-hidden", "true");
    bodyProfile.setAttribute("class", "no-scroll");
    containerForm.setAttribute("aria-hidden", "false");
    closeFormBtn.focus();
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
 

