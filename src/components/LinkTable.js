import React from 'react';

// Material-UI Imports:
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const LinkTable = () => {
  function createData(url, clickCount, comment, createDate) {
    return { url, clickCount, comment, createDate };
  }

  const rows = [
    createData('google.com', 0, 'all the answers!', '2020-23-12'),
    createData('fullstackacademy.com', 0, 'school!', '2020-23-12'),
  ];

  return (
    <TableContainer>
      <Table className="LinkList">
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell>Click Count</TableCell>
            <TableCell>Comment</TableCell>
            {/* <TableCell>Tags</TableCell> */}
            <TableCell>Created</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.url}
                </TableCell>
                <TableCell>{row.clickCount}</TableCell>
                <TableCell>{row.comment}</TableCell>
                <TableCell>{row.createDate}</TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LinkTable;
