import { UIController } from "./ui.js";

let albums;
let song;
let nextTrackTimeout;
let trackInterval;

let titleDisplay = document.getElementById("track-title-display");
let audioControler = document.getElementById("audio-control");
let titleDiv = document.getElementById("track-title");

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

    albums = await UIController.displayAlbums();

    if (albums[0].tracks.items[counter].preview_url == null) {
      song = null;
      audioControler.innerText = "volume_off";
      titleDisplay.innerText = "";
      titleDisplay.style.animationName = "";
      titleDiv.setAttribute("title", "");
      return;
    }

    song = new Audio(albums[0].tracks.items[counter].preview_url);
    window.addEventListener("mousedown", () => {
      if (song.duration > 0 && song.paused) {
        song.play();
        song.volume = 0;
      }
    });

    titleDisplay.innerText = albums[0].tracks.items[counter].name;
    if (titleDisplay.innerText.length > 15) {
      titleDisplay.style.animationName = "slide_text";
    }
    titleDiv.setAttribute("title", albums[0].tracks.items[counter].name);

    trackInterval = setInterval(() => {
      counter++;
      if (counter == albums[0].tracks.items.length) counter = 0;
      song.pause();
      song = new Audio(albums[0].tracks.items[counter].preview_url);
      titleDisplay.innerText = "Next track...";
      titleDiv.setAttribute("title", "Next track...");
      titleDisplay.style.animationName = "";
      nextTrackTimeout = setTimeout(() => {
        titleDisplay.innerText = albums[0].tracks.items[counter].name;
        titleDiv.setAttribute("title", albums[0].tracks.items[counter].name);
        if (titleDisplay.innerText.length > 15) {
          titleDisplay.style.animationName = "slide_text";
        }

        song.play();
      }, 4000);
      if (audioControler.innerText == "volume_off") {
        song.volume = 0;
      } else {
        song.volume = 1;
      }
    }, 31000);

    audioControler.addEventListener("click", audioControlClick);
  };

  const _moveCarrousel = (id, prevId) => {
    titleDisplay.style.animationName = "";
    if (song) song.pause();
    clearInterval(trackInterval);
    clearTimeout(nextTrackTimeout);

    let counter = 0;
    let nextAlbum = document.getElementById(`${id}`);
    let prevAlbum = document.getElementById(`${prevId}`);

    prevAlbum.classList = "album-item hidden";
    nextAlbum.classList = "album-item selected";

    let album = albums[id];
    if (album.tracks.items[counter].preview_url == null) {
      song = null;
      audioControler.innerText = "volume_off";
      titleDisplay.innerText = "Not available.";
      titleDiv.setAttribute("title", "Not available.");
      titleDisplay.style.animationName = "";
      return;
    }

    song = new Audio(album.tracks.items[counter].preview_url);
    song.play();
    titleDisplay.innerText = album.tracks.items[counter].name;
    titleDiv.setAttribute("title", album.tracks.items[counter].name);
    if (titleDisplay.innerText.length > 15) {
      titleDisplay.style.animationName = "slide_text";
    }

    if (audioControler.innerText == "volume_off") {
      song.volume = 0;
    } else {
      song.volume = 1;
    }

    trackInterval = setInterval(() => {
      counter++;
      if (counter == album.tracks.items.length) counter = 0;
      song.pause();
      song = new Audio(album.tracks.items[counter].preview_url);
      titleDisplay.innerText = "Next track...";
      titleDiv.setAttribute("title", "Next track...");
      titleDisplay.style.animationName = "";
      nextTrackTimeout = setTimeout(() => {
        titleDisplay.innerText = album.tracks.items[counter].name;
        titleDiv.setAttribute("title", album.tracks.items[counter].name);
        if (titleDisplay.innerText.length > 15) {
          titleDisplay.style.animationName = "slide_text";
        }
        song.play();
      }, 4000);
      if (audioControler.innerText == "volume_off") {
        song.volume = 0;
      } else {
        song.volume = 1;
      }
    }, 31000);
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

//changes selected project
const PROJECTS = document.querySelectorAll(".card");

const PROJECTS_DESC = [
  "This is a simple page to play chess locally. You can choose different times, skip through moves and games stay available after they are finished. Created with React and Redux.",
  "A homepage for a footwear store. Created using React.js.",
  "A concept for a private school website. Contains info about the school and also a student board page (which you need to login to access). Created with Vue.js 3, Vuex and Vue Router.",
  "A website where you can search for albums/artists and save them. You can browse through your albums and listen to previews (if available). Created with the Spotify API.",
  "Application where the user can track places where the went running/cicling, created during the JavaScript course offered by Jonas Schmedtmann on Udemy. User can enter infomations such as duration of the exercise, as well as travelled kilometers and velocity.",
  "Website to browse and download high resolution paintings. The user can create an account to save and create 'collections' of paintings, accessible on their profile page. Composed of a backend REST API created with Node.js + Express and Mongoose, and a frontend composed of React, React Router and Redux.",
];

const PROJECTS_URL = [
  "https://github.com/poissonfou/Chess",
  "https://github.com/poissonfou/RocketShoes",
  "https://github.com/poissonfou/School-Site-Concept",
  "https://github.com/poissonfou/Save-Albums",
  "https://github.com/poissonfou/Mapty_App",
  "https://github.com/poissonfou/Art",
];

for (let i = 0; i < PROJECTS.length; i++) {
  PROJECTS[i].addEventListener("click", (e) => {
    if (window.innerWidth <= 750) return;
    let mainImg = document.getElementById("selected-project-img");
    let mainImgDiv = document.getElementById("selected-project-div");
    let clickMe = document.getElementById("call-click");
    let p = document.getElementById("project-desc");
    let prevSelected = document.getElementsByClassName("selected-project")[0];
    if (prevSelected) prevSelected.classList = "";

    if (p.innerText == PROJECTS_DESC[i]) {
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
    mainImg.setAttribute("src", PROJECTS[i].currentSrc);
    mainImg.setAttribute("data-github-url", PROJECTS_URL[i]);
    p.innerText = PROJECTS_DESC[i];
    e.target.classList = "card selected-project";
  });
}

//sets project description on load and resize

const PROJECT_DESC = document.getElementById("project-desc");

if (window.innerWidth <= 750) {
  const currentProject = document.getElementById("0_project");
  currentProject.classList = "card displayed";
  PROJECT_DESC.innerText = PROJECTS_DESC[0];
  currentProject.setAttribute("data-github-url", PROJECTS_URL[0]);

  const cards = document.getElementsByClassName("card");

  for (let i = 1; i < cards.length; i++) {
    cards[i].classList = "card hidden";
  }
}

window.addEventListener("resize", () => {
  const displayedProject = document.getElementsByClassName("displayed")[0];
  const selectedProject =
    document.getElementsByClassName("selected-project")[0];

  if (window.innerWidth <= 750 && !selectedProject && !displayedProject) {
    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList = "card hidden";
    }

    const firstProject = document.getElementById("0_project");
    firstProject.classList = "card displayed";
    firstProject.setAttribute("data-github-url", PROJECTS_URL[0]);
    PROJECT_DESC.innerText = PROJECTS_DESC[0];
  }

  if (window.innerWidth <= 750 && selectedProject) {
    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList = "card hidden";
    }

    const mainImg = document.getElementById("selected-project-img");
    const mainImgDiv = document.getElementById("selected-project-div");
    const clickMe = document.getElementById("call-click");

    mainImgDiv.style.height = "0em";
    mainImgDiv.style.border = "none";
    mainImg.style.height = "0em";
    clickMe.classList.add("hidden");

    mainImg.setAttribute("src", "");
    mainImg.setAttribute("data-github-url", "");

    const currentProjectId = selectedProject.id[0];
    selectedProject.classList = "card displayed";
    selectedProject.setAttribute(
      "data-github-url",
      PROJECTS_URL[currentProjectId]
    );
    PROJECT_DESC.innerText = PROJECTS_DESC[currentProjectId];
  }

  if (displayedProject && window.innerWidth > 750) {
    const cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList = "card";
    }

    displayedProject.classList = "card selected-project";
    displayedProject.removeAttribute("data-github-url");
    const idx = displayedProject.id[0];
    const mainImg = document.getElementById("selected-project-img");
    const mainImgDiv = document.getElementById("selected-project-div");
    const clickMe = document.getElementById("call-click");

    mainImgDiv.style.height = "30em";
    mainImgDiv.style.border = "#0a1f35 2px solid";
    mainImg.style.height = "30em";

    clickMe.classList.remove("hidden");

    mainImg.setAttribute("src", PROJECTS[idx].currentSrc);
    mainImg.setAttribute("data-github-url", PROJECTS_URL[idx]);
  }
});

//redirects to project github

const selectedProject = document.getElementById("selected-project-img");

if (selectedProject) {
  selectedProject.addEventListener("click", (e) => {
    if (e.target.attributes[2].nodeValue !== "") {
      window.location.href = e.target.attributes[2].nodeValue;
    }
  });
}

const displayedProject = document.getElementsByClassName("displayed")[0];

if (displayedProject) {
  displayedProject.addEventListener("click", (e) => {
    window.location.href = e.target.attributes[5].nodeValue;
  });
}

//events for buttons on projects page

const next_projects = document.getElementById("next_projects");
const prev_projects = document.getElementById("prev_projects");

const moveForwards = () => {
  const currentProject = document.getElementsByClassName("displayed")[0];

  let id = Number(currentProject.id[0]);

  if (id == 5) return;

  id++;
  currentProject.classList = "card hidden";
  const nextProject = document.getElementById(`${id}_project`);
  nextProject.classList = "card displayed";

  PROJECT_DESC.innerText = PROJECTS_DESC[id];
};

const moveBackwards = () => {
  const currentProject = document.getElementsByClassName("displayed")[0];

  let id = Number(currentProject.id[0]);

  if (id == 0) return;

  id--;
  currentProject.classList = "card hidden";
  const nextProject = document.getElementById(`${id}_project`);
  nextProject.classList = "card displayed";

  PROJECT_DESC.innerText = PROJECTS_DESC[id];
};

next_projects.addEventListener("click", moveForwards);
prev_projects.addEventListener("click", moveBackwards);

//set 'skills' div position when page is rezised

const SKILLS = `
  <div class="skills">
  <div>Detail Oriented</div>
  <div>Dedicated</div>
  <div>Frontend</div>
  <div>Backend</div>
  <div>Cooperative</div>
  <div>Sympathetic</div>
  <div>Great Coffee☕</div> 
  </div>
  `;

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

  if (window.innerWidth <= 900) {
    let sectionOne = document.getElementsByClassName("section-one")[0];
    if (sectionOne.children.length == 2) {
      let skills = document.getElementsByClassName("skills")[0];
      skills.remove();
      sectionOne.insertAdjacentHTML("afterbegin", SKILLS);
    }
  } else {
    let textBox = document.getElementsByClassName("text-box")[0];
    if (textBox.children.length == 2) {
      let skills = document.getElementsByClassName("skills")[0];
      skills.remove();
      textBox.insertAdjacentHTML("beforeend", SKILLS);
    }
  }
});

//set 'skills' div position when page is loaded
if (window.innerWidth <= 900) {
  let sectionOne = document.getElementsByClassName("section-one")[0];
  if (sectionOne.children.length == 2) {
    sectionOne.insertAdjacentHTML("afterbegin", SKILLS);
  }
} else {
  let textBox = document.getElementsByClassName("text-box")[0];
  if (textBox.children.length == 2) {
    textBox.insertAdjacentHTML("beforeend", SKILLS);
  }
}
