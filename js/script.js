// Set Last.fm API key and username
const apiKey = "eec3d37ba5f26bcbda54681e7b97dde7";

/*
async function makeGrid (imgs) {
  const element = document.querySelector('#container');
  const photoGrid = new PhotoGridBox(element, imgs);
  photoGrid.setShowUnCompleteRow(false);
}
*/

async function makeCubeGallery(imgs) {
  document.getElementById("chartPlace").style.visibility = "visible"; 
  const gallery = document.getElementById("gallery");
  await imgs.forEach((node) => {
    let currImg = document.createElement("img");
    currImg.src = node;
    console.log(currImg.src);
    gallery.appendChild(currImg);
  });
  new CubeGallery('gallery', {
    minHeight: 100,
    margin: 5
})
}

async function getData() {
  event.preventDefault();

  console.log("starting the data grabbing process");

  //getting username
  const username = document.getElementById("input").value;

  //setting up API url
  let apiURL;
  const URLBase = "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=";

  //get value from dropdown menu
  const chartType = document.getElementById("pickType").value;
  console.log(chartType);
  
  //setting time parameter
  let periodOfTime = "overall";
  if (chartType === "Last 7 days") {
   periodOfTime = "7day";
  } else if (chartType === "Last month") {
    periodOfTime = "1month";
  } else if (chartType === "Last 3 months") {
    periodOfTime = "3month";
  } else if (chartType === "Last 6 months") {
    periodOfTime = "6month";
  } else if (chartType === "Last 12 months") {
    periodOfTime = "12month";
  }

  //put together whole API URL
  apiURL = URLBase + username + "&period=" + periodOfTime + "&api_key=" + apiKey + "&format=json";

  const response = await fetch(apiURL);
  let userData = await response.json();
  console.log(userData);

  let imageURLs = [];
  await userData.topalbums.album.forEach((node) => {
    //sizes: 0 is small, 1 is medium, 2 is large, 3 is extra-large (clearest quality)
    imageURLs.push(node.image[3]["#text"]);
  });
  //console.log(imageURLs);
  return imageURLs;
}

async function mainEvent() {
  console.log("Loaded script.js");

  const button = document.getElementById("submit");
  //let images;

  button.addEventListener('click', async () => {
    const images = await getData();
    console.log(images);

    //await makeGrid(images);

    document.getElementById("chartPlace").style.visibility = "hidden"; 
    //jquery to clear any existing images
    $( "img" ).remove();
    await makeCubeGallery(images);
  })
}

// the async keyword means we can make API requests
document.addEventListener("DOMContentLoaded", async () => mainEvent());