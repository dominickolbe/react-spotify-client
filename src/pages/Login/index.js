import React, { Component } from 'react';
import styled from 'styled-components';
import SpotifyClient from '../../utils/SpotifyClient';

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  min-height: 100px;
  width: 100%;
`;

const SpotifyLoginButton = styled.div`
  background: #1db954;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 45px;
  padding: 0 20px;
`;

export default class Login extends Component {

  login = async () => {
    const isLoggedIn = await SpotifyClient.login();
    if (isLoggedIn) this.props.history.push('/profile');
  }

  render() {
    return (
      <Container>
        <SpotifyLoginButton onClick={this.login}>Login with Spotify</SpotifyLoginButton>
      </Container>
    );
  }
}
