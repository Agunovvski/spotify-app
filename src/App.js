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
        name: 'Nothing. Start playing!',
        albumArt: '',
        releaseDate: '',
        device: '',
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
            artist: response.item.artists.map(obj => obj && obj.name),
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

// {
//   "context": {
//     "external_urls" : {
//       "spotify" : "http://open.spotify.com/user/spotify/playlist/49znshcYJROspEqBoHg3Sv"
//     },
//     "href" : "https://api.spotify.com/v1/users/spotify/playlists/49znshcYJROspEqBoHg3Sv",
//       "type" : "playlist",
//         "uri" : "spotify:user:spotify:playlist:49znshcYJROspEqBoHg3Sv"
//   },
//   "timestamp": 1490252122574,
//     "progress_ms": 44272,
//       "is_playing": true,
//         "currently_playing_type": "track",
//           "actions": {
//     "disallows": {
//       "resuming": true
//     }
//   },
//   "item": {
//     "album": {
//       "album_type": "album",
//         "external_urls": {
//         "spotify": "https://open.spotify.com/album/6TJmQnO44YE5BtTxH8pop1"
//       },
//       "href": "https://api.spotify.com/v1/albums/6TJmQnO44YE5BtTxH8pop1",
//         "id": "6TJmQnO44YE5BtTxH8pop1",
//           "images": [
//             {
//               "height": 640,
//               "url": "https://i.scdn.co/image/8e13218039f81b000553e25522a7f0d7a0600f2e",
//               "width": 629
//             },
//             {
//               "height": 300,
//               "url": "https://i.scdn.co/image/8c1e066b5d1045038437d92815d49987f519e44f",
//               "width": 295
//             },
//             {
//               "height": 64,
//               "url": "https://i.scdn.co/image/d49268a8fc0768084f4750cf1647709e89a27172",
//               "width": 63
//             }
//           ],
//             "name": "Hot Fuss",
//               "type": "album",
//                 "uri": "spotify:album:6TJmQnO44YE5BtTxH8pop1"
//     },
//     "artists": [
//       {
//         "external_urls": {
//           "spotify": "https://open.spotify.com/artist/0C0XlULifJtAgn6ZNCW2eu"
//         },
//         "href": "https://api.spotify.com/v1/artists/0C0XlULifJtAgn6ZNCW2eu",
//         "id": "0C0XlULifJtAgn6ZNCW2eu",
//         "name": "The Killers",
//         "type": "artist",
//         "uri": "spotify:artist:0C0XlULifJtAgn6ZNCW2eu"
//       }
//     ],
//       "available_markets": [
//         "AD",
//         "AR",
//         "TW",
//         "UY"
//       ],
//         "disc_number": 1,
//           "duration_ms": 222075,
//             "explicit": false,
//               "external_ids": {
//       "isrc": "USIR20400274"
//     },
//     "external_urls": {
//       "spotify": "https://open.spotify.com/track/0eGsygTp906u18L0Oimnem"
//     },
//     "href": "https://api.spotify.com/v1/tracks/0eGsygTp906u18L0Oimnem",
//       "id": "0eGsygTp906u18L0Oimnem",
//         "name": "Mr. Brightside",
//           "popularity": 0,
//             "preview_url": "http://d318706lgtcm8e.cloudfront.net/mp3-preview/f454c8224828e21fa146af84916fd22cb89cedc6",
//               "track_number": 2,
//                 "type": "track",
//                   "uri": "spotify:track:0eGsygTp906u18L0Oimnem"
//   }
// }