import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';


const spotifyWebApi = new Spotify();

class Featured extends Component {

    constructor() {
        super();
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,
            theList: {
                message: '',
                playListName: '',
                playlistImg: '',
                playlistLink: ''
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


    getFeatured() {
        spotifyWebApi.getFeaturedPlaylists([])
            .then((response) => {
                this.setState({
                    theList: {
                        message: response.message,
                        playlistName: response.playlists.items[0].name,
                        // playlistName: response.playlists.items.map(obj => obj && obj.name),
                        playlistImg: response.playlists.items[0].images[0].url,
                        playlistLink: response.playlists.items[0].uri
                    }
                })
            })
    }



    render() {
        return (
            <div className="App">
                <button onClick={() => this.getFeatured()}>Show me Featured Playlists</button>
                <a href={this.state.theList.playlistLink}>
                    <h4>{this.state.theList.playlistName}</h4>
                    <img src={this.state.theList.playlistImg} alt={this.state.theList.playlistName}></img>
                </a>
                {/* {this.state.theList.playListName.map(obj => (
                    <p>{obj.playlists.name}</p>
                ))} */}
            </div >
        );
    }


}

export default Featured;
