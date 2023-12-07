// Set Last.fm API key and username
const apiKey = "eec3d37ba5f26bcbda54681e7b97dde7";

let imagesArray = [];

async function getData() {
  event.preventDefault();

  console.log("starting the data grabbing process");

  //getting username
  const username = document.getElementById("input").value;

  let apiURL;
  let urlBase;

  //get value from dropdown menu
  const chartType = document.getElementById("pickType").value;
  console.log(chartType);

  //api URL changes depending on what we want to do
  if (chartType === "Weekly Album Chart") {
    urlBase =
      "https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=";
  } else {
    //Top Albums Chart
    urlBase =
      "https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=";
  }

  //put together whole API URL
  apiURL = urlBase + username + "&api_key=" + apiKey + "&format=json";

  const response = await fetch(apiURL);
  let userData = await response.json();
  console.log(userData);

  /*
  //this will hold all the album images
  let images = [];

  let xPos = [];
  let yPos = [];
  */
  let imageURLs = [];
  userData.topalbums.album.forEach((node) => {
    //sizes: 0 is small, 1 is medium, 2 is large, 3 is extra-large
    imageURLs.push(node.image[2]["#text"]);
  });
  console.log(imageURLs);
  const element = document.querySelector('#container');
  const photoGrid = new PhotoGridBox(element, imageURLs);
  photoGrid.setShowUnCompleteRow(false);
}

async function mainEvent() {
  console.log("Loaded script.js");

  const form = document.querySelector("form");
  form.addEventListener("submit", getData);
}

// the async keyword means we can make API requests
document.addEventListener("DOMContentLoaded", async () => mainEvent());