import {data} from "./data.js";

let currentIndex = -1;
let currentMediaArray = [];

export function launchLightbox(id, image, photographerId, mediaArray) { /* <= infos de l'image cliquée */
    const lightboxBody = document.getElementById("lightbox__body");
    const lightboxModal = document.getElementById("lightbox");
    const lightboxMedia = document.getElementById("lightbox__body__media");
    currentIndex = mediaArray.findIndex((el) => {return el.id === id}); /*trouver dans le tableau mediaArray l'index de l'element dont l'id est égale a l'élément */
    currentMediaArray = mediaArray;
    lightboxMedia.innerHTML = "";
    lightboxBody.appendChild(lightboxMedia);
    lightboxModal.style.display = "block";
    const lightboxImg = document.createElement("img");
    lightboxImg.setAttribute("id", "lightbox__body__media-img");
    lightboxImg.src = "./fisheye_photos/media/" + image;
    lightboxMedia.appendChild(lightboxImg);
    const lightboxCloseBtn = document.getElementById("lightbox__body-closebtn");   
    lightboxCloseBtn.addEventListener("click", closeLightbox) ;
}
  
function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox");
    lightboxModal.style.display = "none";
    console.log("test2");
}

export function nextButton() {
    const lightboxImg = document.getElementById("lightbox__body__media-img");
    if (currentIndex === currentMediaArray.length-1) {
        currentIndex = 0;
        lightboxImg.src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].image;
        console.log(currentIndex);
    } 
    else {
        currentIndex += 1;
        console.log(currentIndex);
        console.log(currentMediaArray[currentIndex].image);
        lightboxImg.src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].image;
    }

    

    // const nextImage = mediaArray.find(image => image.index === currentImageIndex++);
    // console.log(nextImage);
    // lightboxImg.src = "./fisheye_photos/media/" + nextImage;
}

export function previousButton() {
    const lightboxImg = document.getElementById("lightbox__body__media-img");
    if (currentIndex ===0) {
        currentIndex = currentMediaArray.length-1;
        lightboxImg.src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].image;
    } 
    else {
        currentIndex -= 1;    
        lightboxImg.src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].image;
    
    }
    
}



