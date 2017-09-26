import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from "material-ui/GridList";

class Grid extends Component {
  static props = {
    characters: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string
    })
  }

  render() {
    this.styles = {
      root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
      },
      gridList: {
        overflowY: "auto"
      }
    };
 
    return (
      <div style={this.styles.root}>
      <GridList style={this.styles.gridList} cols={4}>
        {this.props.characters.map(char => {
            return (
              <GridTile key={char.id} title={char.name}>
                <img
                  src={char.thumbnail}
                  alt={`Thumbail of ${char.name}`}
                />
              </GridTile>
            );
          })}
      </GridList>
    </div>
    )
  }
}

export default Grid;