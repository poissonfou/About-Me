import { APIController } from "./api.js";

export const UIController = (function (APIController) {
  const _displayAlbums = async () => {
    let albums = await APIController.returnAlbumInfo();

    let main_div = document.getElementById("albums-carrousel");
    let album_div;
    for (let i = 0; i < albums.length; i++) {
      album_div = `
        <div class="album-item ${i !== 0 ? "hidden" : "selected"}" id="${i}">
            <img src="${albums[i].images[1].url}" alt="${
        albums[i].name
      }" title="${albums[i].name}" loading="lazy">
            <p>${
              albums[i].name == "<COPINGMECHANISM>"
                ? albums[i].name.slice(1, 16)
                : albums[i].name
            }</p>
        </div>
        `;

      main_div.insertAdjacentHTML("beforeend", album_div);
    }
    document.querySelectorAll(".album-item").forEach((el, index) =>
      el.addEventListener("click", () => {
        let url = albums[index].external_urls.spotify;
        window.location.href = url;
      })
    );

    return albums;
  };

  return {
    displayAlbums() {
      return _displayAlbums();
    },
  };
})(APIController);
