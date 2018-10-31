import React, { Component } from 'react';
import axios from 'axios';

import Track from './components/Track';

const CLIENT_ID = '6661528e201d41e599f2e053f3be1a4a';
const REDIRECT_URI = 'http://localhost:3000/callback.html';

class App extends Component {

  state = {
    searchValue: '',
    access_token: localStorage.getItem('access_token') || null,
    user: null,
    recentlyPlayed: null,
  }

  async componentDidMount() {

    window.addEventListener('message', e => {
      if (e.data.access_token) {
        this.setState({ access_token: e.data.access_token });
      }
    }, false);

    this.getRecentlyPlayed();

  }

  login = () => {

    const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-recently-played&response_type=token`;

    const width = 450;
    const height = 730;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);

    window.open(URL,
      'Spotify',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
    );

  }

  search = async () => {

    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: this.state.searchValue,
        type: 'track,album,artist'
      },
      headers: {
        'Authorization': `Bearer ${this.state.access_token}`,
      }
    });

    this.setState({ searchResult: response.data });

  }

  getMe = async () => {

    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${this.state.access_token}`,
      }
    });

    debugger;

    this.setState({ user: response.data });
  }

  getRecentlyPlayed = async () => {

    const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        'Authorization': `Bearer ${this.state.access_token}`,
      }
    });

    this.setState({ recentlyPlayed: response.data });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <header>
              <h1>React spotify client</h1>
            </header>
            <main>
              { !this.state.access_token &&
                <button onClick={this.login}>login</button>
              }

              <br />

              <h3>Recently played</h3>

              {
                this.state.recentlyPlayed && this.state.recentlyPlayed.items.map(rPlayed => (
                  <Track {...rPlayed.track} />
                ))
              }

            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
