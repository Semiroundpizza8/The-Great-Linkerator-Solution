import React from 'react';

// Material U-I imports:
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Link = (props) => {
  const { url, clickCount, comment, createDate } = props;

  return (
    <>
      <TableCell component="th" scope="row">
        {url}
      </TableCell>
      <TableCell>{clickCount}</TableCell>
      <TableCell>{comment}</TableCell>
      <TableCell>{createDate}</TableCell>
      <TableCell>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </>
  );
};

export default Link;
