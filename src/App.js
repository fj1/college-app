import React, { Component } from "react";
import AppBar from "material-ui/AppBar";

// Material UI Themes
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Material UI Components
import TextField from 'material-ui/TextField';

// React Components
import Footer from "./components/Footer.js";
import Grid from "./components/Grid.js";

// Helper Functions
import utils from "./utils.js";

class App extends Component {

  state = {
    search: '',
  };
 
  componentDidMount =  () => {
    this.fetchCharacters();
  };

  fetchCharacters = async (search) => {
    const characterURL = `https://gateway.marvel.com/v1/public/characters`;
    const timestamp = Date.now();
    const publicKey = utils.getPublicKey();
    const hash = utils.generateHash(timestamp);
    const randomNumber = Math.floor(Math.random() * 1471) + 0;
    const offset = search ? `&offset=0` : `&offset=${randomNumber}`;
    const nameStartsWith = search ? `&nameStartsWith=${search}` : ``;
    const getCharacterURL = `${characterURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}${offset}${nameStartsWith}`;
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
  }
  
  handleSearchChange = (e) => {
    this.setState({search: e.target.value});
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.fetchCharacters(this.state.search);
      this.setState({search: ''});
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="App">
          <AppBar title="Marvel App" iconElementRight={
            <TextField
              hintText="Search for a Marvel Hero"
              value={this.state.search}
              onChange={this.handleSearchChange}
              onKeyPress={this.handleEnter}
            />
          }/>
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
