import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useBookContext } from "../../context/BookContext";
import { handleDelete } from "../../utils/functions/deleteBook";
import { getCategoryLabel } from "../../utils/functions/getDropDownsLabel";
import { booksListStyles } from "../../utils/styles/styles";
import CustomSearchField from "../../components/CustomSearchField";
import { useTranslation } from "react-i18next";

const BooksList = () => {
  const { state, dispatch } = useBookContext();
  const { bookData } = state;
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBooks = bookData.filter((book) =>
    Object.values(book).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const displayedBooks = filteredBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper elevation={3} sx={booksListStyles.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={booksListStyles.tableCell}>
          <Typography variant="h4">{t("booksList")}</Typography>
        </Grid>
        <Grid item xs={6}>
          <CustomSearchField
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            t={t}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("add-book")}
          >
            {t("addBook")}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ marginTop: "16px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="Books table">
              <TableHead sx={booksListStyles.tableHeader}>
                <TableRow>
                  <TableCell sx={booksListStyles.tableHeader}>
                    {t("title")}
                  </TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>
                    {t("category")}
                  </TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>
                    {t("author")}
                  </TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>
                    {t("isbn")}
                  </TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>
                    {t("version")}
                  </TableCell>
                  <TableCell sx={booksListStyles.tableHeader}>
                    {t("actions")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedBooks.length > 0 ? (
                  displayedBooks.map((book) => (
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
                          onClick={() => navigate(`edit-book/${book.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => navigate(`view-book/${book.id}`)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDelete(book.id, dispatch, navigate)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell sx={booksListStyles.tableCell} colSpan={6}>
                      {t("noBooksFound")}
                    </TableCell>
                  </TableRow>
                )}
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
