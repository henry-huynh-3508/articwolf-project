import React, { Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { GET_TOP10ANAGRAMS } from "./anagramRankingQueries";
import { useQuery } from "@apollo/react-hooks";
import { createAnagramRowData } from "./anagramTableHelpers";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 360,
  },
});

export default function AnagramRankingTable() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_TOP10ANAGRAMS, {});
  if (error) return <h1>Something went wrong!</h1>;
  if (loading) return <h1>Loading...</h1>;
  return (
    <Fragment>
      <Typography component={"span"}>
        <Box fontSize={36} m={1} textAlign="center">
          TOP 10 MOST POPULAR ANAGRAMS
        </Box>
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="anagram ranking table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell align="center">Anagrams</StyledTableCell>
              <StyledTableCell align="right">Count</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {createAnagramRowData(data).map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.rank}
                </StyledTableCell>
                <StyledTableCell align="center">{row.anagrams}</StyledTableCell>
                <StyledTableCell align="right">{row.count}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
