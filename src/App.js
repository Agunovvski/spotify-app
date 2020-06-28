import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Featured from './Featured'


const spotifyWebApi = new Spotify();

class App extends Component {

  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: '-',
        albumArt: '',
        releaseDate: '-',
        device: -'',
        artist: '',
        albumType: '',
        artistLink: ''
      }
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            releaseDate: response.item.album.release_date,
            device: response.device.name,
            artist: response.item.artists[0].name,
            albumType: response.item.album.album_type,
            artistLink: response.item.artists[0].uri
          }
        })
      })
  }


  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' >
          <button>Login with Spotify</button>
        </a>
        <button onClick={() => this.getNowPlaying()}>Check Now Playing</button>
        <div className='songWrapper' style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.9), rgba(0,0,0,.7)), url(${this.state.nowPlaying.albumArt})`
        }}>
          <h4>Now Playing</h4>
          <h2>{this.state.nowPlaying.name}</h2>
          <h4>{this.state.nowPlaying.albumType} By <a href={this.state.nowPlaying.artistLink}>{this.state.nowPlaying.artist}</a></h4>
          <img src={this.state.nowPlaying.albumArt} alt={this.state.nowPlaying.name} style={{ width: 100 }}></img>
          <p>Released on: {this.state.nowPlaying.releaseDate}</p>
          <br />
          <p>Playing on: {this.state.nowPlaying.device}</p>
        </div>
        <Featured />
      </div >
    );
  }
}

export default App;
