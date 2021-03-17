import { displayPhotographer } from "./photographer.js";
import { displayPhotographers } from "./photographers.js";
import {displayGallery} from "./photographer.js";

console.log(window.location.href);
console.log(window.location.href.includes("photographer.html"));

if (window.location.href.includes("photographer.html")) {
    displayPhotographer();
    displayGallery();
} else {
    displayPhotographers();
}







