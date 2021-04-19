let currentIndex = -1;
let currentMediaArray = [];

export function launchLightbox(id, image, video, mediaArray, alt) { /* <= infos de l'image cliquée */
    const lightboxBody = document.getElementById("lightbox__body");
    const lightboxModal = document.getElementById("lightbox");
    const lightboxMedia = document.getElementById("lightbox__body__media");
    currentIndex = mediaArray.findIndex((el) => {return el.id === id}); /*trouver dans le tableau mediaArray l'index de l'element dont l'id est égale a l'élément */
    currentMediaArray = mediaArray;
    lightboxMedia.innerHTML = "";
    lightboxBody.appendChild(lightboxMedia);
    lightboxModal.style.display = "flex";
    if(image !== undefined) {
        const lightboxImg = document.createElement("img");
        const lightboxImgTitle = document.createElement("p");
        lightboxImg.setAttribute("id", "lightbox__body__media__img");
        lightboxImg.setAttribute("aria-label", alt);
        lightboxImg.src = "./fisheye_photos/media/" + image;
        lightboxMedia.appendChild(lightboxImg);
        lightboxImgTitle.setAttribute("id", "lightbox__body__media__title");
        lightboxImgTitle.innerText = alt;
        lightboxMedia.appendChild(lightboxImgTitle);
    }
    else if(video !== undefined) {
        const lightboxVideo = document.createElement("video");
        const lightboxVideoSrc = document.createElement("source");
        const lightboxVideoTitle = document.createElement("p");
        lightboxVideo.setAttribute("id", "lightbox__body__media__video");
        lightboxVideo.setAttribute("controls","");
        lightboxVideoTitle.innerText = alt;
        lightboxVideoSrc.setAttribute("src", "./fisheye_photos/media/" + video);
        lightboxVideoSrc.setAttribute("type", "video/mp4");
        lightboxVideoSrc.setAttribute("id", "lightbox__body__media__video__src");
        lightboxMedia.appendChild(lightboxVideo);
        lightboxVideo.appendChild(lightboxVideoSrc);
        lightboxMedia.appendChild(lightboxVideoTitle);
    }    
    const lightboxCloseBtn = document.getElementById("lightbox__body__closebtn");   
    lightboxCloseBtn.addEventListener("click", closeLightbox) ;
}
  
function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox");
    lightboxModal.style.display = "none";
    console.log("test2");
}

export function nextButton() {
    const lightboxMedia = document.getElementById("lightbox__body__media");
    if(currentIndex === currentMediaArray.length-1) { /* si on est sur le dernier element du tableau alors on revient au premier */
        currentIndex = 0;
    } 
    else {
        currentIndex += 1;       
    }
    const lightboxMediaContainer = document.getElementById("lightbox__body__media");
    lightboxMediaContainer.innerHTML = "";
    if (currentMediaArray[currentIndex].image !== undefined) {
        const lightboxImg = document.createElement("img");
        const lightboxImgTitle = document.createElement("p");
        lightboxImg.setAttribute("id", "lightbox__body__media__img");
        lightboxMedia.appendChild(lightboxImg);
        lightboxImgTitle.setAttribute("id", "lightbox__body__media-title");
        lightboxImgTitle.innerText = currentMediaArray[currentIndex].alt;
        lightboxMedia.appendChild(lightboxImgTitle);
        lightboxImg.setAttribute("src", "./fisheye_photos/media/" + currentMediaArray[currentIndex].image);
    } else {
        const lightboxVideo = document.createElement("video");
        const lightboxVideoSrc = document.createElement("source");
        const lightboxVideoTitle = document.createElement("p");
        lightboxVideo.setAttribute("id", "lightbox__body__media__video");
        lightboxVideo.setAttribute("controls","");
        lightboxVideoTitle.innerText = currentMediaArray[currentIndex].alt;
        lightboxVideoSrc.setAttribute("type", "video/mp4");
        lightboxVideoSrc.setAttribute("id", "lightbox__body__media__video__src");
        lightboxMedia.appendChild(lightboxVideo);
        lightboxVideo.appendChild(lightboxVideoSrc);
        lightboxMedia.appendChild(lightboxVideoTitle);
        lightboxVideoSrc.setAttribute("src", "./fisheye_photos/media/" + currentMediaArray[currentIndex].video);
    }
}

export function previousButton() {
    const lightboxImg = document.getElementById("lightbox__body__media__img");
    if (currentIndex ===0) {
        currentIndex = currentMediaArray.length-1;
        lightboxImg.src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].image;
    } 
    else {
        currentIndex -= 1;    
        lightboxImg.src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].image;
    
    }
    
}



