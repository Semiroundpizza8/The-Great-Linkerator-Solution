import React from 'react';
import Link from './Link';

// Material-UI Imports:
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const LinkTable = (props) => {
  function createData(url, clickCount, comment, createDate) {
    return { url, clickCount, comment, createDate };
  }

  const rows = [
    createData('google.com', 0, 'all the answers!', '2020-23-12'),
    createData('fullstackacademy.com', 0, 'school!', '2020-23-12'),
    createData('espn.com', 0, 'stories and scores!', '2020-30-12'),
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
                <Link
                  url={row.url}
                  clickCount={row.clickCount}
                  comment={row.comment}
                  createDate={row.createDate}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LinkTable;
