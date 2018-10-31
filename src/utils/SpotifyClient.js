import axios from 'axios';

class SpotifyClient {

  CLIENT_ID = '6661528e201d41e599f2e053f3be1a4a';
  REDIRECT_URI = 'http://localhost:3000/callback.html';

  access_token = null;

  constructor() {
    this.access_token = localStorage.getItem('access_token') || null;
  }

  openLoginPopup = () => {
    const URL = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${encodeURIComponent(this.REDIRECT_URI)}&scope=user-read-recently-played&response_type=token`;

    const width = 450;
    const height = 730;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    window.open(URL,
      'Spotify',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
    );
  }

  getUser = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${this.access_token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  getRecentlyPlayed = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          'Authorization': `Bearer ${this.access_token}`,
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

};

export default new SpotifyClient();
