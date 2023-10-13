import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../../context/BookContext";
import { handleDelete } from "../../utils/functions/deleteBook";
import { getCategoryLabel } from "../../utils/functions/getDropDownsLabel";

const booksListStyles = {
  paper: {
    borderRadius: 4,
    padding: 4,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
  },
  actionButton: {
    textAlign: "center",
  },
  tableHeader: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  },
  tableCell: {
    textAlign: "center",
  },
};

const BooksList = () => {
  const { state, dispatch } = useBookContext();
  const { bookData } = state;
  console.log("bookData:", bookData);
  const history = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [searchQuery, setSearchQuery] = useState("");
  console.log("searchQuery:", searchQuery);
  const filteredBooks = bookData.filter((book) =>
    Object.values(book).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  console.log(filteredBooks);

  const displayedBooks = filteredBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={3} sx={booksListStyles.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={booksListStyles.tableCell}>
          <Typography variant="h4">Books List</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history("add-book")}
          >
            Add Book
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ marginTop: "16px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="Books table">
              <TableHead sx={booksListStyles.tableHeader}>
                <TableRow>
                  <TableCell sx={booksListStyles.tableHeader}>Title</TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>
                    Category
                  </TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>Author</TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>ISBN</TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>
                    Version
                  </TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell sx={booksListStyles.tableCell}>
                      {book.title}
                    </TableCell>
                    <TableCell sx={booksListStyles.tableCell}>
                      {getCategoryLabel(book?.category)}
                    </TableCell>
                    <TableCell sx={booksListStyles.tableCell}>
                      {book.author}
                    </TableCell>
                    <TableCell sx={booksListStyles.tableCell}>
                      {book.isbn}
                    </TableCell>
                    <TableCell sx={booksListStyles.tableCell}>
                      {book.version}
                    </TableCell>
                    <TableCell sx={booksListStyles.actionButton}>
                      <IconButton
                        color="primary"
                        onClick={() => history(`edit-book/${book.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => history(`view-book/${book.id}`)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(book.id, dispatch, history)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredBooks.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BooksList;
