import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class Footer extends Component {
  render() {
    return (
      <BottomNavigation>
      <BottomNavigationItem
        label="Data provided by Marvel. © 2014 Marvel"
        icon={<StarBorder color="black" />}
        href="https://developer.marvel.com"
      />
      <BottomNavigationItem
        label="Github"
        icon={<StarBorder color="black" />}
        href="https://github.com/fj1/college-app"
      />
    </BottomNavigation>
    )
  }
}

export default Footer;