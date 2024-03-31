export const APIController = (function () {
  const clientId = "aec4295dbd4f4d84ae15c4b52e97d597";
  const clientSecret = "303024ea5f1e47ee884109d3365beb35";

  const _getToken = async () => {
    try {
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
      });
      const data = await result.json();
      return data.access_token;
    } catch (error) {
      console.log(error);
      alert("An error has occurred on token requisition. Try again.");
    }
  };

  const _getAlbum = async (id, token) => {
    try {
      const result = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await result.json();
      return data;
    } catch (error) {
      console.log(error);
      alert("An error has occurred on album fetching. Try again.");
    }
  };

  const _getAlbumTracks = async (id, token) => {
    try {
      const result = await fetch(
        `https://api.spotify.com/v1/albums/${id}/tracks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await result.json();
      return data.items;
    } catch (error) {
      console.log(error);
      alert("An error has occurred on track fetching. Try again.");
    }
  };

  const _returnAlbumInfo = async () => {
    let token = await APIController.getToken();

    let albums_ids = [
      "3WmujGwOS0ANHkJRnMH6n8",
      "4OXoBlapQygTdzAifJm8BL",
      "1HmWZnKnecBlWqYcD7Zead",
      "0oMXn0MNLNyvB4iJPZXOuV",
      "3cQO7jp5S9qLBoIVtbkSM1",
    ];

    let albums = [];
    let info;

    const getAlbumsInfo = async function () {
      for (let i = 0; i < albums_ids.length; i++) {
        info = await APIController.getAlbum(albums_ids[i], token);
        albums.push(info);
      }
    };

    await getAlbumsInfo();
    console.log(albums);
    return albums;
  };

  return {
    getToken() {
      return _getToken();
    },
    getAlbum(id, token) {
      return _getAlbum(id, token);
    },
    getAlbumTracks() {
      return _getAlbumTracks();
    },
    returnAlbumInfo() {
      return _returnAlbumInfo();
    },
  };
})();
