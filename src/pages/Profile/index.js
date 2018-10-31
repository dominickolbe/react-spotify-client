import React, { Component } from 'react';
import styled from 'styled-components';
import SpotifyClient from '../../utils/SpotifyClient';

import Track from '../../components/Track';

export default class Profile extends Component {

  state = {
    user: null,
    recentlyPlayed: null,
  }

  async componentDidMount() {
    const user = await SpotifyClient.getUser();
    const recentlyPlayed = await SpotifyClient.getRecentlyPlayed();
    this.setState({ user, recentlyPlayed })
  }

  render() {

    const { user, recentlyPlayed } = this.state;

    if (!user) {
      return null;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Hello {this.state.user.display_name}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            { recentlyPlayed.items.map(played => (
              <Track {...played.track} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
