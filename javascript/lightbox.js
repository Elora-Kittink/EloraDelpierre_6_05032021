import {data} from "./data.js";

const lightboxModal = document.getElementById("lightbox");
const lightboxCloseBtn = document.getElementById("lightbox__body-closebtn");



function launchLightbox() {
    lightboxModal.style.display = "block"
}

lightboxCloseBtn.addEventListener ("click", closeLightbox);

function closeLightbox() {
    lightboxModal.style.display = "none"
}



const lightboxModal = document.getElementById("lightbox");

function launchLightbox() {
    lightboxModal.style.display = "block"
}

function closeLightbox() {
    lightboxModal.style.display = "none"
}





modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));   /*pour chaque bouton, écouter l'évenement "click" et executer la fonction "launchModal" */

function launchModal() {
  modalbg.style.display = "block";   /* fait apparaitre le formulaire en le passant en display block */
}

closeBtn.addEventListener ("click", closeModal)   /*au click executer la fonction closemodal*/

function closeModal () {
  modalbg.style.display = "none"; /*fermer en passant en display none*/
}