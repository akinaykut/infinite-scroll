const imageContainer = document.getElementById("image-container");

const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "T65NOfKL-FddmhxPpWC95oRakR3qiCfjx2PWCnV26OI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create Elements For Links & Photos, Add to DOM

function displayPhotos() {
  // Run function for each object in photosArray

  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // Create <img> for photo
    let img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    if (photo.description) {
      img.setAttribute("alt", photo.description);
      img.setAttribute("title", photo.description);
    }

    // Put <img> inside <a>, then puth both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (err) {
    // Cath Error
    console.log(err);
  }
}

// Check to see if scrolling near bottom of page, Load More Photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
  }
});

// On Load
getPhotos();
