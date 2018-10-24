import React, { Component } from 'react';
import axios from 'axios';

const CLIENT_ID = '6661528e201d41e599f2e053f3be1a4a';
const REDIRECT_URI = 'http://localhost:3000/callback.html';

class App extends Component {

  state = {
    searchValue: '',
    access_token: localStorage.getItem('access_token') || null,
  }

  async componentDidMount() {

    window.addEventListener('message', e => {
      if (e.data.access_token) {
        this.setState({ access_token: e.data.access_token });
      }
    }, false);

  }

  login = () => {

    const URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-private&response_type=token`;

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

  render() {
    return (
      <div>
        <header>
          <h2>react-spotify-client</h2>
        </header>
        <main>
          { !this.state.access_token &&
            <button onClick={this.login}>login</button>
          }

          <br />

          <input
            type="text"
            value={this.state.searchValue}
            onChange={e => this.setState({ searchValue: e.target.value })}
          />
          <button onClick={this.search}>search</button>

          <br />
          <h3>Tracks</h3>
          <ul>
            {
              this.state.searchResult && this.state.searchResult.tracks.items.map(track => (
                <li>{track.name} - {track.artists[0].name}</li>
              ))
            }
          </ul>

          <br />
          <h3>Albums</h3>
          <ul>
            {
              this.state.searchResult && this.state.searchResult.albums.items.map(album => (
                <li>{album.name} - {album.artists[0].name}</li>
              ))
            }
          </ul>

          <br />
          <h3>Artists</h3>
          <ul>
            {
              this.state.searchResult && this.state.searchResult.artists.items.map(artist => (
                <li>
                  {artist.name}
                  <img src={artist.images[0].url} height="100" />
                </li>
              ))
            }
          </ul>

        </main>
      </div>
    );
  }
}

export default App;
