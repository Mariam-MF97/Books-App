import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import { handleDelete } from "../utils/functions/deleteBook";
import {
  getCategoryLabel,
  getOldVersionLabel,
} from "../utils/functions/getDropDownsLabel";
import CustomButton from "./CustomButton";
import { viewBookStyles } from "../utils/styles/styles";
import { generateRandomValue } from "../utils/functions/generateRandomValue";
import { useTranslation } from "react-i18next";

const ViewBookForm = ({ book, id }) => {
  const { dispatch } = useBookContext();
  const { t } = useTranslation();

  const pageCount = generateRandomValue(100, 999);
  const hoursToRead = generateRandomValue(1, 10);

  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={viewBookStyles.paper}>
      <h1>{t("bookDetails")}</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid item xs={12} lg={2}>
            <img
              src={book?.cover_photo}
              alt={t("bookCover")}
              style={viewBookStyles.coverImage}
            />
          </Grid>
          <Grid item xs={12} lg={2} sx={{ justifyContent: "center" }}>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("title")}
              <span style={viewBookStyles.textWithBold}>{book?.title}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("price")}
              <span style={viewBookStyles.textWithBold}>
                ${parseFloat(book?.price).toFixed(2)}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("pagesCount")}
              <span style={viewBookStyles.textWithBold}>{pageCount}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("hoursToRead")}
              <span style={viewBookStyles.textWithBold}>{hoursToRead}h</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("author")}
              <span style={viewBookStyles.textWithBold}>{book?.author}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("category")}
              <span style={viewBookStyles.textWithBold}>
                {getCategoryLabel(book?.category)}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("version")}
              <span style={viewBookStyles.textWithBold}>{book?.version}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("oldVersion")}
              <span style={viewBookStyles.textWithBold}>
                {getOldVersionLabel(book?.old_version)}
              </span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("edition")}
              <span style={viewBookStyles.textWithBold}>{book?.edition}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("isbn")}
              <span style={viewBookStyles.textWithBold}>{book?.isbn}</span>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              {t("releaseDate")}
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
              <strong>{t("pdf")}:</strong>
            </Typography>
            <iframe
              title={t("bookPdf")}
              src={book?.pdf_file}
              style={viewBookStyles.pdf}
            ></iframe>
          </Grid>
          <Grid item xs={3} sx={{ display: "flex", justifyContent: "end" }}>
            <Grid item sx={{ mx: 1 }}>
              <CustomButton
                label={t("editButton")}
                color="info"
                onClick={() => navigate(`/books-list/edit-book/${id}`)}
              />
            </Grid>
            <Grid item>
              <CustomButton
                label={t("deleteButton")}
                color="error"
                onClick={() => {
                  handleDelete(id, dispatch, navigate, "/books-list");
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ m: 2 }}>
            {t("brief")}
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
