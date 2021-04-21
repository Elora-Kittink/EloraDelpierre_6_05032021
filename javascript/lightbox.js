import MediaFactory from "./MediaFactory.js";

let currentIndex = -1;
let currentMediaArray = [];

export async function launchLightbox(id, image, video, mediaArray, alt) { /* <= infos de l'image cliquée */
    const dataFile = await fetch("./data.json");   //methode fetch pour récuperer json//
    const data = await dataFile.json();
    const lightboxBody = document.getElementById("lightbox__body");
    const lightboxModal = document.getElementById("lightbox");
    const lightboxMediaCell = document.getElementById("lightbox__body__media");
    currentIndex = mediaArray.findIndex((el) => {return el.id === id}); /*trouver dans le tableau mediaArray l'index de l'element dont l'id est égale a l'élément */
    currentMediaArray = mediaArray;
    lightboxMediaCell.innerHTML = ""; //remettre à blanc//
    lightboxBody.appendChild(lightboxMediaCell);
    lightboxModal.style.display = "flex";
    let src ="" ;
    if(image !== undefined) { //si c'est une image//
        const lightboxImgTitle = document.createElement("p");       
        src = "./fisheye_photos/media/" + image;        
        lightboxImgTitle.setAttribute("class", "lightbox__body__media__title");
        lightboxImgTitle.innerText = alt;
        lightboxMediaCell.appendChild(lightboxImgTitle);
    }
    else if(video !== undefined) { //si c'est une video//
        src = "./fisheye_photos/media/" + video ;    
        const lightboxVideoTitle = document.createElement("p");        
        lightboxVideoTitle.innerText = alt;
        lightboxVideoTitle.setAttribute("class", "lightbox__body__media__title");       
        lightboxMediaCell.appendChild(lightboxVideoTitle);
    }    

    const lightboxFactory = new MediaFactory(src, id, alt);
    const lightboxMedia = lightboxFactory.createMedia();
    lightboxMediaCell.appendChild(lightboxMedia);
    const lightboxCloseBtn = document.getElementById("lightbox__body__closebtn");   
    lightboxCloseBtn.addEventListener("click", closeLightbox) ;
}
  
function closeLightbox() {
    const lightboxModal = document.getElementById("lightbox");
    lightboxModal.style.display = "none"; 
    console.log("test2");
}

export function nextButton() {
    const lightboxMediaCell = document.getElementById("lightbox__body__media");
    if(currentIndex === currentMediaArray.length-1) { /* si on est sur le dernier element du tableau alors on revient au premier */
        currentIndex = 0;
    } 
    else {
        currentIndex += 1;       
    }
    lightboxMediaCell.innerHTML = ""; //remettre à blanc//
    let src = "";
    if (currentMediaArray[currentIndex].image !== undefined) {  //si c'est une image// 
        const lightboxImgTitle = document.createElement("p");        
        lightboxImgTitle.setAttribute("class", "lightbox__body__media__title");
        lightboxImgTitle.innerText = currentMediaArray[currentIndex].alt;
        lightboxMediaCell.appendChild(lightboxImgTitle);
        src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].image;
    } else {                                                          //si c'est une video//
        const lightboxVideoTitle = document.createElement("p");
        lightboxVideoTitle.innerText = currentMediaArray[currentIndex].alt;
        lightboxMediaCell.appendChild(lightboxVideoTitle);
        src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].video;
    }
    const lighboxFactory = new MediaFactory(src, currentMediaArray.id, currentMediaArray.alt);
    const lightboxMedia = lighboxFactory.createMedia();
    lightboxMediaCell.appendChild(lightboxMedia);
}

export function previousButton() {
    const lightboxMediaCell = document.getElementById("lightbox__body__media");
    lightboxMediaCell.innerHTML = "";
    let src = "" ;
    if (currentIndex ===0) {  // si on est sur le premier media alors aller au dernier//
        currentIndex = currentMediaArray.length-1;        
    } 
    else {           //sinon allez simplement au précédent //
        currentIndex -= 1;        
    }
    if (currentMediaArray[currentIndex].image !== undefined) {
        const lightboxImgTitle = document.createElement("p");
        lightboxImgTitle.setAttribute("class", "lightbox__body__media__title");
        lightboxImgTitle.innerText = currentMediaArray[currentIndex].alt;
        lightboxMediaCell.appendChild(lightboxImgTitle);
        src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].image;

    } else {
        const lightboxVideoTitle = document.createElement("p");
        lightboxVideoTitle.innerText = currentMediaArray[currentIndex].alt;
        lightboxMediaCell.appendChild(lightboxVideoTitle);
        src = "./fisheye_photos/media/" + currentMediaArray[currentIndex].video;
    }
    const lighboxFactory = new MediaFactory(src, currentMediaArray.id, currentMediaArray.alt);
    const lightboxMedia = lighboxFactory.createMedia();
    lightboxMediaCell.appendChild(lightboxMedia);
}



