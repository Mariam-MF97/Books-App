import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import { handleDelete } from "../utils/functions/deleteBook";
import {
  getCategoryLabel,
  getOldVersionLabel,
} from "../utils/functions/getDropDownsLabel";
import { viewBookStyles } from "../utils/styles/viewBookFormStyle";
import CustomButton from "./CustomButton";

const ViewBookForm = ({ book, id }) => {
  const history = useNavigate();
  const navigate = useNavigate();
  const { state, dispatch } = useBookContext();

  const generateRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const pageCount = generateRandomValue(100, 999);
  const hoursToRead = generateRandomValue(1, 10);

  return (
    <Paper elevation={3} sx={viewBookStyles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid item xs={12} lg={2}>
            <img
              src={book?.cover_photo}
              alt="Book Cover"
              style={viewBookStyles.coverImage}
            />
          </Grid>
          <Grid item xs={12} lg={2} sx={{ justifyContent: "center" }}>
            <Typography variant="h6" sx={{ m: 2 }}>
              Title:{" "}
              <span style={viewBookStyles.textWithBold}>{book?.title}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              Price:{" "}
              <span style={viewBookStyles.textWithBold}>
                ${parseFloat(book?.price).toFixed(2)}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              Pages Count:{" "}
              <span style={viewBookStyles.textWithBold}>{pageCount}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              Hours to Read:{" "}
              <span style={viewBookStyles.textWithBold}>{hoursToRead}h</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              Author:{" "}
              <span style={viewBookStyles.textWithBold}>{book?.author}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              Category:{" "}
              <span style={viewBookStyles.textWithBold}>
                {getCategoryLabel(book?.category)}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              Version:{" "}
              <span style={viewBookStyles.textWithBold}>{book?.version}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              Old Version:{" "}
              <span style={viewBookStyles.textWithBold}>
                {getOldVersionLabel(book?.old_version)}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              Edition:{" "}
              <span style={viewBookStyles.textWithBold}>{book?.edition}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              ISBN:{" "}
              <span style={viewBookStyles.textWithBold}>{book?.isbn}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              Release Date:{" "}
              <span style={viewBookStyles.textWithBold}>
                {book?.release_date}
              </span>
            </Typography>
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1" sx={{ mx: 1 }}>
              <strong>PDF:</strong>
            </Typography>
            <iframe
              title="Book PDF"
              src={book?.pdf_file}
              style={viewBookStyles.pdf}
            ></iframe>
          </Grid>
          <Grid item xs={3} sx={{ display: "flex", justifyContent: "end" }}>
            <Grid item sx={{ mx: 1 }}>
              <CustomButton
                label="Edit"
                color="info"
                onClick={() => navigate(`/books-list/edit-book/${id}`)}
              />
            </Grid>
            <Grid item>
              <CustomButton
                label="Delete"
                color="error"
                onClick={() => {
                  handleDelete(id, dispatch, history, "/books-list");
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ m: 2 }}>
            Brief:{" "}
            <span
              style={{
                ...viewBookStyles.textWithBold,
                ...viewBookStyles.briefText,
              }}
            >
              {book?.brief}
            </span>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViewBookForm;
