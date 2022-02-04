import React from "react";
import { Helmet } from "react-helmet";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import useDashboard from "../../hooks/useDashboard";

// https://codesandbox.io/s/x5crv?file=/demo.js:987-1903
const Dashboard = () => {


  const { isLoading, isError ,countRegister, rows, handleChangePage,handleChangeRowsPerPage ,page, rowsPerPage} = useDashboard();


  const columns = [
    { id: 'station_get', label: 'Estación de recogida' },
    { id: 'data_get', label: 'Data de recogida' },
    { id: 'station_return', label: 'Estación de devolución', },
    { id: 'data_return', label: 'Data de devolución', },

  ];

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Cargando...</title>
        </Helmet>
      </>
    );
  } else if (isError) {
    return (
      <>
        <Helmet>
          <title>Error, estación no encontrada..</title>
        </Helmet>
      </>
    );
  } else {

    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={`TableRow${index}`}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

}
export default Dashboard