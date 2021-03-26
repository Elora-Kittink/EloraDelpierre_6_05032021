import {data} from "./data.js";

let currentIndex = -1;
let currentMediaArray = [];

export function launchLightbox(id, image, photographerId, mediaArray) { /* <= infos de l'image cliquée */
    const lightboxBody = document.getElementById("lightbox__body");
    const lightboxModal = document.getElementById("lightbox");
    const lightboxMedia = document.getElementById("lightbox__body__media");
    currentIndex = mediaArray.findIndex((el) => {return el.id === id}); /*trouver dans le tableau mediaArray l'index de l'element dont l'id est égale a l'élément */
    const LightboxNextBtn = document.getElementById("lightbox__body__nextbtn");
    lightboxMedia.innerHTML = "";
    lightboxBody.appendChild(lightboxMedia);
    lightboxModal.style.display = "block";
    const lightboxImg = document.createElement("img");
    lightboxImg.setAttribute("id", "lightbox__body__media-img");
    lightboxImg.src = "./fisheye_photos/media/" + image;
    lightboxMedia.appendChild(lightboxImg);
    const lightboxCloseBtn = document.getElementById("lightbox__body-closebtn");
    LightboxNextBtn.addEventListener("click", function() {
        nextButton(lightboxImg, mediaArray)
    });    
    lightboxCloseBtn.addEventListener("click", closeLightbox) ;


}
  
function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox");
    lightboxModal.style.display = "none";
    console.log("test2");
}

function nextButton(lightboxImg, mediaArray) {
    currentIndex += 1;
    console.log(currentIndex);
    console.log(mediaArray[currentIndex].image);
    lightboxImg.src = "./fisheye_photos/media/" + mediaArray[currentIndex].image;

    // const nextImage = mediaArray.find(image => image.index === currentImageIndex++);
    // console.log(nextImage);
    // lightboxImg.src = "./fisheye_photos/media/" + nextImage;
}




