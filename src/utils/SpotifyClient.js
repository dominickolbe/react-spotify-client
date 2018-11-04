import axios from 'axios';

class SpotifyClient {

  CLIENT_ID = '6661528e201d41e599f2e053f3be1a4a';
  REDIRECT_URI = window.location.origin + '/callback.html';

  access_token = null;

  constructor() {
    this.getToken();
  }

  clearToken = () => {
    localStorage.removeItem('access_token');
  }

  getToken = () => {
    this.access_token = localStorage.getItem('access_token') || null;
  }

  login = () => {
    this.clearToken();

    const URL = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${encodeURIComponent(this.REDIRECT_URI)}&scope=user-read-recently-played&response_type=token`;

    const width = 450;
    const height = 730;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    const loginWindow = window.open(URL,
      'Spotify',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
    );

    return new Promise(resolve => {
      const timer = setInterval(async () => {
        if (loginWindow.closed) {
          clearInterval(timer);
          this.getToken();
          if (this.access_token) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }, 1000);
    });
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
