import { UIController } from "./ui.js";

let albums;
let song;
let nextTrackTimeout;
let trackInterval;

function audioControlClick(e) {
  if (song == null) return;
  if (e.target.innerText == "volume_off") {
    e.target.innerText = "volume_up";
    song.volume = 1;
  } else {
    e.target.innerText = "volume_off";
    song.volume = 0;
  }
}

export const App = (function (UIController) {
  const _loadAlbums = async () => {
    let counter = 0;
    let audioControler = document.getElementById("audio-control");
    let titleDiv = document.getElementById("track-title");
    albums = await UIController.displayAlbums();

    if (albums[0].tracks.items[counter].preview_url == null) {
      song = null;
      audioControler.innerText = "volume_off";
      titleDiv.innerText = "";
      titleDiv.setAttribute("title", "");
      return;
    }

    song = new Audio(albums[0].tracks.items[counter].preview_url);
    song.play();
    song.volume = 0;
    titleDiv.innerText = albums[0].tracks.items[counter].name;
    titleDiv.setAttribute("title", albums[0].tracks.items[counter].name);

    trackInterval = setInterval(() => {
      counter++;
      if (counter > albums[0].tracks.items.length) counter = 0;
      song = new Audio(albums[0].tracks.items[counter].preview_url);
      titleDiv.innerText = albums[0].tracks.items[counter].name;
      titleDiv.setAttribute("title", albums[0].tracks.items[counter].name);
      nextTrackTimeout = setTimeout(() => {
        song.play();
      }, 3000);
      if (audioControler.innerText == "volume_off") {
        song.volume = 0;
      } else {
        song.volume = 1;
      }
    }, 30000);

    audioControler.addEventListener("click", audioControlClick);
  };

  const _moveCarrousel = (id, prevId) => {
    if (song) song.pause();
    clearInterval(trackInterval);
    clearTimeout(nextTrackTimeout);

    let counter = 0;
    let nextAlbum = document.getElementById(`${id}`);
    let prevAlbum = document.getElementById(`${prevId}`);
    let audioControler = document.getElementById("audio-control");
    let titleDiv = document.getElementById("track-title");

    prevAlbum.classList = "album-item hidden";
    nextAlbum.classList = "album-item selected";

    let album = albums[id];
    if (album.tracks.items[counter].preview_url == null) {
      song = null;
      audioControler.innerText = "volume_off";
      titleDiv.innerText = "";
      titleDiv.setAttribute("title", "");
      return;
    }

    song = new Audio(album.tracks.items[counter].preview_url);
    song.play();
    titleDiv.innerText = album.tracks.items[counter].name;
    titleDiv.setAttribute("title", album.tracks.items[counter].name);

    if (audioControler.innerText == "volume_off") {
      song.volume = 0;
    } else {
      song.volume = 1;
    }

    trackInterval = setInterval(() => {
      counter++;
      if (counter > album.tracks.items.length) counter = 0;
      song = new Audio(album.tracks.items[counter].preview_url);
      titleDiv.innerText = album.tracks.items[counter].name;
      titleDiv.setAttribute("title", album.tracks.items[counter].name);
      nextTrackTimeout = setTimeout(() => {
        song.play();
      }, 3000);
      if (audioControler.innerText == "volume_off") {
        song.volume = 0;
      } else {
        song.volume = 1;
      }
    }, 30000);
  };

  return {
    loadAlbums() {
      return _loadAlbums();
    },
    moveCarrousel(id, prevId) {
      return _moveCarrousel(id, prevId);
    },
  };
})(UIController);

App.loadAlbums();

document.getElementById("next").addEventListener("click", () => {
  let selectedAlbum = document.getElementsByClassName("selected")[0].id;

  if (selectedAlbum == "4") return;
  App.moveCarrousel(+selectedAlbum + 1, selectedAlbum);
});

document.getElementById("prev").addEventListener("click", () => {
  let selectedAlbum = document.getElementsByClassName("selected")[0].id;

  if (selectedAlbum == "0") return;
  App.moveCarrousel(+selectedAlbum - 1, selectedAlbum);
});

let imgs = document.querySelectorAll(".card");

let projectsDesc = [
  "This is a simple page to play chess locally. You can choose different times, skip through moves and games stay available after they are finished. Created with React and Redux.",
  "A homepage for a footwear store. Created using React.js.",
  "A concept for a private school website. Contains info about the school and also a student board page (which you need to login to access). Created with Vue.js 3, Vuex and Vue Router.",
  "A website where you can search for albums/artists and save them. You can browse through your albums and listen to previews (if available). Created with the Spotify API.",
  "Aplication where the user can track places where the went running/cicling, created during the JavaScript course offered by Jonas Schmedtmann on Udemy. User can enter infomations such as duration of the exercise, as well as travelled kilometers and velocity.",
];

let projectsUrl = [
  "https://github.com/poissonfou/Chess",
  "https://github.com/poissonfou/RocketShoes",
  "https://github.com/poissonfou/School-Site-Concept",
  "https://github.com/poissonfou/Save-Albums",
  "https://github.com/poissonfou/Mapty_App",
];

for (let i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener("click", (e) => {
    let mainImg = document.getElementById("selected-project-img");
    let mainImgDiv = document.getElementById("selected-project-div");
    let clickMe = document.getElementById("call-click");
    let p = document.getElementById("project-desc");
    let prevSelected = document.getElementsByClassName("selected-project")[0];
    if (prevSelected) prevSelected.classList = "";

    if (p.innerText == projectsDesc[i]) {
      mainImg.setAttribute("src", "");
      mainImg.setAttribute("data-github-url", "");
      mainImg.style.height = "0em";
      mainImgDiv.style.height = "0em";
      mainImgDiv.style.border = "none";
      p.innerText = "";
      clickMe.classList.add("hidden");
      return;
    }

    mainImgDiv.style.height = "30em";
    mainImg.style.height = "30em";
    if (window.innerWidth < 750) {
      mainImgDiv.style.height = "15em";
      mainImg.style.height = "15em";
    }
    clickMe.classList.remove("hidden");
    mainImgDiv.style.border = "#0a1f35 2px solid";
    mainImg.setAttribute("src", imgs[i].currentSrc);
    mainImg.setAttribute("data-github-url", projectsUrl[i]);
    p.innerText = projectsDesc[i];
    e.target.classList = "card selected-project";
  });
}

document
  .getElementById("selected-project-img")
  .addEventListener("click", (e) => {
    if (e.target.attributes[2].nodeValue !== "") {
      window.location.href = e.target.attributes[2].nodeValue;
    }
  });

window.addEventListener("resize", () => {
  let mainImgDiv = document.getElementById("selected-project-div");
  let mainImg = document.getElementById("selected-project-img");
  if (mainImg.getAttribute("src") !== "") {
    mainImgDiv.style.height = "30em";
    mainImg.style.height = "30em";
    if (window.innerWidth < 750) {
      mainImgDiv.style.height = "15em";
      mainImg.style.height = "15em";
    }
  }
});
