import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Footer from "./components/Footer.js";
import Grid from "./components/Grid.js";
import utils from "./utils.js";

class App extends Component {
  componentDidMount = async () => {
    const characterURL = `https://gateway.marvel.com/v1/public/characters`;
    const timestamp = Date.now();
    const publicKey = utils.getPublicKey();
    const hash = utils.generateHash(timestamp);
    const getCharacterURL = `${characterURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    const response = await fetch(getCharacterURL, {
      method: "GET",
      headers: { accept: "application/json" }
    });
    const charactersFull = await response.json();
    const charactersData = charactersFull.data.results;
    const characters = charactersData.map(char => {
      return {
        id: char.id,
        name: char.name,
        thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`
      };
    });
    this.setState({ characters });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          <AppBar title="Marvel App" />
          {this.state &&
            this.state.characters && (
              <Grid characters={this.state.characters} />
            )}
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
