import { displayPhotographer } from "./photographer.js";
import { displayPhotographers } from "./photographers.js";

console.log(window.location.href);
console.log(window.location.href.includes("photographer.html"));

if (window.location.href.includes("photographer.html")) {
    displayPhotographer();
} else {
    displayPhotographers();
}







