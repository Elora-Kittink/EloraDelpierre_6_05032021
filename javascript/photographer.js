import {launchLightbox} from "./lightbox.js";
import MediaFactory from "./MediaFactory.js";

let sum = 0;
let currentElementFormFocus = null;



export async function displayPhotographer () {    
    const dataFile = await fetch("./data.json");   //methode fetch pour récuperer json//
    const data = await dataFile.json();
    const url = window.location.search; //url courant //
    const urlParams = new URLSearchParams(url); //pour utiliser get //
    const id = urlParams.get("id"); // = ce qui se trouver immédiatement après "id"//
    const idNumber = parseInt(id, 10); //en base 10//
    const photographersArray = data.photographers;
    const photographerSelected = photographersArray.find(photographer => photographer.id === idNumber); // trouver dans le tableau le photographe avec l'id correspondant//
    completePhotographerProfile(photographerSelected, photographerSelected.tags)
}


function completePhotographerProfile (photographerSelected, tags) {  // tags = tableau contenant les tags du photographe selectionné//
    document.getElementById("photographer-profile__name").textContent = photographerSelected.name;
    document.getElementById("photographer-profile__location").textContent = photographerSelected.city + "," + photographerSelected.country;
    document.getElementById("photographer-profile__tagline").textContent = photographerSelected.tagline;
    const photographerTags = document.getElementById("photographer-profile__tags")
    for (let tag of tags) { //pour chaque tag du tableau tags//
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
    contactFormBtn.setAttribute("aria-haspopup", "dialog");
    contactFormBtn.addEventListener("click", function() {
        launchForm(photographerSelected.name);
    });
} 


 

export async function displayGallery() {
    const dataFile = await fetch("./data.json");   //methode fetch pour récuperer json//
    const data = await dataFile.json();
    const url = window.location.search; /* url courant*/
    const urlParams = new URLSearchParams(url); /*outil de recherche dans url */
    const id = urlParams.get("id"); /*recuperer ce qu'il y a apres "id" */
    const idNumber = parseInt(id, 10); /*transformer string en number base 10 */
    let mediaArray = data.media.filter( (media) => { /*recupérer tous les objets media dont le photographerId est égale à l'id de l'url */
        return media.photographerId === idNumber
    } );
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    const dropdownOptions = document.getElementById("sort__dropdown__options");
    let selectedOption = document.getElementById("sort__dropdown__selected");
    selectedOption.innerHTML = "Popularité";
    selectedOption.addEventListener("click", function() {
        dropdownOptions.style.display = "block";
    })
    selectedOption.addEventListener("keydown", function(e){
        if (e.key == "Enter") {
            dropdownOptions.style.display = "block";
        }
    })
    const popularityOption = document.getElementById("sort__dropdown__options__popularity");
    popularityOption.addEventListener("click", function() {
        selectedOption.innerHTML = "Popularité " + "   <i class=\"fas fa-chevron-down\">";
        mediaArray.sort(function(a, b){  // trier par nombre de likes//
            return b.likes-a.likes    
        });
        addMediasInGallery(mediaArray);
        dropdownOptions.style.display = "none";
    });
    popularityOption.addEventListener("keydown", function(e){
        if(e.key == "Enter"){
            selectedOption.innerHTML = "Popularité " + "   <i class=\"fas fa-chevron-down\">";
        mediaArray.sort(function(a, b){  // trier par nombre de likes//
            return b.likes-a.likes    
        });
        addMediasInGallery(mediaArray);
        dropdownOptions.style.display = "none";
        }
    })
    const dateOption = document.getElementById("sort__dropdown__options__date");
    dateOption.addEventListener("click", function() {
        selectedOption.innerHTML = "Date " + "   <i class=\"fas fa-chevron-down\">";
        mediaArray.sort(function(a, b){ //trier par date la plus récente vers la moins récente//
            let dateA=new Date(a.date), dateB=new Date(b.date)
            return dateA-dateB             
        });
        addMediasInGallery(mediaArray);
        dropdownOptions.style.display = "none";
    });
    dateOption.addEventListener("keydown", function(e){
        if(e.key == "Enter") {
            selectedOption.innerHTML = "Date " + "   <i class=\"fas fa-chevron-down\">";
        mediaArray.sort(function(a, b){ //trier par date la plus récente vers la moins récente//
            let dateA=new Date(a.date), dateB=new Date(b.date)
            return dateA-dateB             
        });
        addMediasInGallery(mediaArray);
        dropdownOptions.style.display = "none";
        }
    })
    const titleOption = document.getElementById("sort__dropdown__options__title");
    titleOption.addEventListener("click", function() {
        selectedOption.innerHTML = "Titre " + "   <i class=\"fas fa-chevron-down\">";
        mediaArray.sort(function(a, b){ // trier par ordre alphabetique//
            let titleA=a.alt.toLowerCase(), titleB=b.alt.toLowerCase()
            if (titleA < titleB) 
                return -1 
            if (titleA > titleB)
                return 1
            return 0 
        });
        addMediasInGallery(mediaArray);
        dropdownOptions.style.display = "none";
    });
    titleOption.addEventListener("keydown", function(e){
        if(e.key == "Enter"){
            selectedOption.innerHTML = "Titre " + "   <i class=\"fas fa-chevron-down\">";
        mediaArray.sort(function(a, b){ // trier par ordre alphabetique//
            let titleA=a.alt.toLowerCase(), titleB=b.alt.toLowerCase()
            if (titleA < titleB) 
                return -1 
            if (titleA > titleB)
                return 1
            return 0 
        });
        addMediasInGallery(mediaArray);
        dropdownOptions.style.display = "none";
        }
    })
    
    //Simule le click sur popularity, le filtre par défaut
    const clickEvent = new Event("click");
    popularityOption.dispatchEvent(clickEvent);
    
    
}

function addMediasInGallery(mediaArray) {
    //remet à vide la gallerie pour une mise à jour (filtre)
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    for (let media of mediaArray) { // pour chaque média du tableau de media du photographe selectionné//
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
    let src ="";
    if (media.image !== undefined) {
        src = "./fisheye_photos/media/" + image;

    } else if (media.video !== undefined) {
        src = "./fisheye_photos/media/" + video;
    }
    const mediaFactory = new MediaFactory(src, id, alt);
    const mediaElement = mediaFactory.createMedia();
    link.appendChild(mediaElement);
    
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
    mediaPrice.setAttribute("aria-label", "prix de l'oeuvre");    
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
    let likesArray = mediaArray.map((media) => {  // tableau contenant tous les likes de chaque media//
        return media.likes;
    }) ; 
    let mediaLikes = document.createElement("p");    
    mediaLikes.setAttribute("class", "gallery__media__info__likes"); 
    mediaLikes.innerHTML = counter;      
    galleryInfo.appendChild(mediaLikes);
    const mediaHeart = document.createElement("i");
    mediaHeart.setAttribute("class", "fas fa-heart");
    mediaHeart.setAttribute("aria-label", "likes");  
    mediaHeart.setAttribute("tabindex", "0");
    galleryInfo.appendChild(mediaHeart);
    let footerTotalLikes = document.getElementById("footer-profile__likes__total");
    sum = likesArray.reduce((acc, cur) => acc + cur, 0);  //on fait la somme de tous les likes du tableau//
    footerTotalLikes.innerHTML = sum + "<i class=\"fas fa-heart\">"; //affciher le total des likes de tous les medias//
    function counterIncrement() { //fonction ajout de like//
        counter++; //on ajoute un like//
        mediaLikes.innerHTML = counter; //on affiche le nouveau nombre de likes//   
        sum++ ;   //on ajoute le like à la somme//
        footerTotalLikes.innerHTML = sum + "<i class=\"fas fa-heart\">"; // affiche dans le footer la somme trouvée suivie de l'icone coeur//
    }
    mediaHeart.addEventListener("click", counterIncrement);
    
}
  

/*---------------------------------------FORMULAIRE CONTACT-------------------------------------*/

function launchForm(name) {
    const containerForm = document.getElementById("contact");
    containerForm.style.display = "block"; // affiche la modale en la passant de "none" à "block"//
    const closeFormBtn = document.getElementById("contact__form__closebtn");
    closeFormBtn.addEventListener("click", closeForm);
    const submitFormBtn = document.getElementById("contact__form__submitbtn");
    const photographerContacted = document.getElementById("contact__form__photographer");
    photographerContacted.innerHTML = name;
    const bodyProfile = document.getElementById("body__profile");
    bodyProfile.setAttribute("aria-hidden", "true"); //tout le body est caché et illisibe pour les lecteurs d'écrans//
    bodyProfile.setAttribute("class", "no-scroll");
    containerForm.setAttribute("aria-hidden", "false"); //le formulaire devient lui lisible//
    const firstnameInput = document.getElementById("contact__form__info__firstname__input");
    const lastnameInput = document.getElementById("contact__form__info__lastname__input");
    const emailInput = document.getElementById("contact__form__info__email__input");
    const messageInput = document.getElementById("contact__form__message__input");
    submitFormBtn.addEventListener("click", function(e) {  // affiche le contenu des champs au submit//
        e.preventDefault();
        console.log(firstnameInput.value);
        console.log(lastnameInput.value);
        console.log(emailInput.value);
        console.log(messageInput.value);
        bodyProfile.removeAttribute("class", "no-scroll");
        closeForm();
    })
    
    window.addEventListener("keydown", function(e){
        if(e.key == "Tab"){
            if(currentElementFormFocus == closeFormBtn){ // si le focus est sur close il va à firstname//
                e.preventDefault();       
                firstnameInput.focus();
                currentElementFormFocus = firstnameInput;
            } else if (currentElementFormFocus == firstnameInput){//si il est sur firstnam il va à lastname//
                e.preventDefault();
                lastnameInput.focus();
                currentElementFormFocus = lastnameInput;
            } else if (currentElementFormFocus == lastnameInput){ //etc//
                e.preventDefault();
                emailInput.focus();
                currentElementFormFocus = emailInput;
            } else if (currentElementFormFocus == emailInput){ //etc//
                e.preventDefault();
                messageInput.focus();
                currentElementFormFocus = messageInput;
            } else if (currentElementFormFocus == messageInput) { //etc//
                e.preventDefault();
                submitFormBtn.focus();
                currentElementFormFocus = submitFormBtn;
            } else {
                e.preventDefault();
                closeFormBtn.focus();
                currentElementFormFocus = closeFormBtn;
            }
        }
    });
}

function closeForm() {
    const containerForm = document.getElementById("contact");
    containerForm.style.display = "none";
    document.getElementById("body__profile").removeAttribute("class", "no-scroll");
}
 

