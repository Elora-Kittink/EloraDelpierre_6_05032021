

export default class MediaFactory {
    constructor(src, id, alt) {
        if (src.includes("jpg")){
            return new ImageFactory(src, id, alt);
        } else {
            return new VideoFactory(src, id, alt);
        }
    }

}

class ImageFactory {
    constructor(src, id, alt,) {
        this.id = id ;
        this.src = src ;
        this.alt = alt ;                      
    }
    createMedia() {
        const mediaImage = document.createElement("img");
        mediaImage.src = this.src;
        mediaImage.setAttribute("alt", this.alt + ", closeup view");
        mediaImage.setAttribute("class", "gallery__media__image" + " lightbox__body__media__img");
        mediaImage.setAttribute("id", this.id);
        mediaImage.setAttribute("aria-haspopup", "dialog");
        return mediaImage;
    }
}

class VideoFactory {
    constructor(src, id, alt) {
        this.id = id ;
        this.src = src;
        this.alt = alt ;
        
    }
    createMedia() {
        const mediaVideo = document.createElement("video");
        const mediaVideoSrc = document.createElement("source");
        mediaVideoSrc.src = this.src ;
        mediaVideoSrc.setAttribute("type", "video/mp4");
        mediaVideo.alt = this.alt ;
        mediaVideo.setAttribute("class", "gallery__media__video" + " lightbox__body__media__video");
        mediaVideo.id = this.id;
        mediaVideo.setAttribute("aria-haspopup", "dialog");
        mediaVideo.appendChild(mediaVideoSrc);
        return mediaVideo;
    }
}
