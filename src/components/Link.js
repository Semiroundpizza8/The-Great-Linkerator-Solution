import React from 'react';

// Material U-I imports:
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Link = () => {
  return (
    <List>
      <ListItem>
        <ListItemText>I'm a URL.</ListItemText>
        <LisItemText>Click Count.</LisItemText>
      </ListItem>
    </List>
  );
};

export default Link;
