import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const Row = styled.div`
  background: white;
  border: 1px solid rgba(36, 51, 66, 0.09);
  border-radius: 5px;
  display: flex;
  align-items: center;
  height: 45px;
  margin-bottom: 5px;
  width: 100%;
  > div {
    flex-grow: 1;
    flex-basis: 0;
  }

  .artwork {
    flex-grow: 0;
    flex-basis: 40px;
    margin-right: 10px;
    img {
      height: 40px;
    }
  }

  .duration {
    flex-grow: 0;
    flex-basis: auto;
  }
  .popularity {
    flex-grow: 0;
    flex-basis: 50px;
  }

  .progress-container {
    background: white;
    border: 1px solid black;
    height: 5px;
    width: 100%;

    .progress {
      background: black;
      height: 100%;
    }
  }


`;

const Track = ({ album, artists, name, popularity, duration_ms }) => (
  <Row>
    <div className="artwork">
      <img src={album.images[1].url} />
    </div>
    <div>{name}</div>
    <div>
      {
        artists.map(artist => (
          <div>{artist.name}</div>
          ))
        }
    </div>
    <div>{album.name}</div>
    <div className="duration">{dayjs(duration_ms).format('mm:ss')}</div>

    <div className="popularity">
      <div className="progress-container">
        <div className="progress" style={{ width: popularity + '%' }} />
      </div>
    </div>
  </Row>
);

export default Track;
