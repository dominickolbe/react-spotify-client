import React, { Component } from 'react';
import axios from 'axios';

import Track from './components/Track';

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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <header>
              <h1>React spotify client</h1>
            </header>
            <main>
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
