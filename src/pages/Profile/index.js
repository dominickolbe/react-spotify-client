import React, { Component } from "react";
import SpotifyClient from "../../utils/SpotifyClient";
import Track from "../../components/Track";

export default class Profile extends Component {
  state = {
    user: null,
    recentlyPlayed: null,
  };

  async componentDidMount() {
    const user = await SpotifyClient.getUser();
    const recentlyPlayed = await SpotifyClient.getRecentlyPlayed();
    if (!user || !recentlyPlayed) {
      return this.props.history.push("/login");
    }
    this.setState({ user, recentlyPlayed });
  }

  render() {
    const { user, recentlyPlayed } = this.state;

    if (!user) return null;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{user.display_name}</h1>
            <h2>last played:</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {recentlyPlayed.items.map((played) => (
              <Track key={played.played_at} {...played.track} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
