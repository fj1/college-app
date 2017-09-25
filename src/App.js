import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';

import './App.css';
import utils from './utils.js';

class App extends Component {
  componentDidMount = async() => {
    const characterURL = `http://gateway.marvel.com/v1/public/characters`;
    const timestamp = Date.now()
    const publicKey = utils.getPublicKey();
    const hash = utils.generateHash(timestamp);
    const getCharacterURL = `${characterURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    console.log(getCharacterURL);
    const response = await fetch(getCharacterURL, {
      method: 'GET',
      headers: {accept: 'application/json'}
    });
    const characters = await response.json();
    this.setState({characters: characters.data.results})
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Marvel App" />
          {this.state && this.state.characters.map(char => {
            <Card>
              <CardHeader title={char.name} avatar={`${char.thumbnail.path}.${char.thumbnail.extension}`}/>
              {/* <CardMedia overlay={`${char.thumbnail.path}.${char.thumbnail.extension}`} /> */}
            </Card>
          })}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
