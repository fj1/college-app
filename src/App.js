import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';

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
    const charactersFull = await response.json();
    const charactersData = charactersFull.data.results;
    const characters = charactersData.map(char => {
      return {
        id: char.id, 
        name: char.name,
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`
      }
    });
    this.setState({characters});
  }

    render() {

      this.styles = {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        },
        gridList: {
          width: 500,
          height: 450,
          overflowY: 'auto',
        },
      };
      return (
        <MuiThemeProvider>
          <div className="App">
            <AppBar title="Marvel App" />
              <div style={this.styles.root}>
                <GridList
                  style={this.styles.gridList}
                  cols={4}
                >
              {this.state && this.state.characters.map(char => {
                return (
                  <GridTile
                    key={char.id}
                    title={char.name}>
                    <img src={char.thumbnail} alt={`Thumbail of ${char.name}`} />
                  </GridTile>
                )
              })}
                </GridList>
              </div>
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
