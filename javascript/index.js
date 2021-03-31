import { displayPhotographer } from "./photographer.js";
import { displayPhotographers } from "./photographers.js";
import {displayGallery} from "./photographer.js";
import {nextButton} from "./lightbox.js";
import {previousButton} from "./lightbox.js";


console.log(window.location.href);
console.log(window.location.href.includes("photographer.html"));

if (window.location.href.includes("photographer.html")) {
    displayPhotographer();
    displayGallery();
    const LightboxNextBtn = document.getElementById("lightbox__body__nextbtn");
    LightboxNextBtn.addEventListener("click", function() {
        nextButton();
    }); 
    const lightboxPreviousBtn = document.getElementById("lightbox__body__prevbtn");
    lightboxPreviousBtn.addEventListener("click", function() {
        previousButton();
    })
} else {
    displayPhotographers();
}









