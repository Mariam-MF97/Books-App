import { Grid, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { bookCategories, bookVersions } from "../utils/data/selectData";
import CustomButton from "./CustomButton";
import { CustomCurrencyInput } from "./CustomCurrencyInput";
import { CustomDatePicker } from "./CustomDatePicker";
import { CustomFileUploader } from "./CustomFileUpload";
import { CustomImageUploader } from "./CustomImageUploader";
import { CustomTextField } from "./CustomInput";
import { CustomSelect } from "./CustomSelect";
import { CustomTextarea } from "./CustomTextArea";

const BookForm = ({ title, control, onSubmit, t }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 4,
        padding: 4,
        backgroundColor: "white",
      }}
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <h2>{title}</h2>
          </Grid>

          <Grid item xs={6}>
            <Grid item sx={{ my: 2 }}>
              <CustomTextField
                name="title"
                control={control}
                label={t("title")}
                required
              />
            </Grid>
            <Grid item sx={{ my: 2 }}>
              <CustomTextField
                name="author"
                control={control}
                label={t("author")}
                required
              />
            </Grid>
            <Grid item sx={{ my: 2 }}>
              <CustomSelect
                name="category"
                control={control}
                label={t("category")}
                options={bookCategories}
                required
                defaultValue={bookCategories[0].id}
              />
            </Grid>
            <Grid item sx={{ my: 2 }}>
              <CustomCurrencyInput
                name="price"
                control={control}
                label={t("price")}
                startAdornment="$"
                required
              />
            </Grid>

            <Grid item sx={{ my: 2 }}>
              <CustomTextField
                name="version"
                control={control}
                label={t("version")}
                required
              />
            </Grid>
            <Grid item sx={{ my: 2 }}>
              <CustomSelect
                name="old_version"
                control={control}
                label={t("oldVersion")}
                options={bookVersions}
                defaultValue={bookVersions[0].id}
              />
            </Grid>
            <Grid item sx={{ my: 2 }}>
              <CustomTextField
                name="edition"
                control={control}
                label={t("edition")}
              />
            </Grid>
            <Grid item sx={{ my: 2 }}>
              <CustomTextField
                name="isbn"
                control={control}
                label={t("isbn")}
                required
              />
            </Grid>
            <Grid item sx={{ my: 2 }}>
              <CustomDatePicker
                name="release_date"
                label={t("releaseDate")}
                control={control}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item sx={{ mt: 2, mb: 3 }}>
              <CustomTextarea
                name="brief"
                control={control}
                label={t("brief")}
              />
            </Grid>

            <Grid
              item
              sx={{ my: 2, display: "flex", justifyContent: "center" }}
            >
              <CustomImageUploader
                name="cover_photo"
                control={control}
                buttonName={t("uploadCover")}
                required
                t={t}
              />
            </Grid>

            <Grid
              item
              sx={{ my: 2, display: "flex", justifyContent: "center" }}
            >
              <CustomFileUploader
                name="pdf_file"
                control={control}
                buttonName={t("uploadPDF")}
                required
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <CustomButton
                label={t("save")}
                color="success"
                type="submit"
                onClick={onSubmit}
              />
            </Grid>
            <Grid item>
              <CustomButton
                label={t("cancel")}
                color="error"
                onClick={() => {
                  navigate("/books-list");
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BookForm;
