import BookIcon from "@mui/icons-material/Book";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { Controller } from "react-hook-form";

export const CustomImageUploader = ({
  name,
  control,
  buttonName,
  t,
  ...props
}) => {
  const fileInputRef = React.useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          xs={12}
          md={6}
        >
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const uploadedSrc = e.target.result;
                  onChange(uploadedSrc);
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <Avatar
            variant="square"
            src={value}
            sx={{
              height: 200,
              width: 128,
              cursor: "pointer",
              borderColor: "warning",
              borderWidth: "5px",
              borderRadius: "5px",
              backgroundColor: "e8e8e8e",
            }}
            onClick={handleUploadClick}
          >
            <BookIcon fontSize="large" />
          </Avatar>
          <p>{t("cover_dimension")}</p>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleUploadClick}
            sx={{ mb: 2 }}
            startIcon={<CloudUploadIcon />}
          >
            {`${buttonName}${props?.required ? " *" : ""}`}
          </Button>
          {error ? <div style={{ color: "red" }}>{error.message}</div> : null}
        </Grid>
      )}
    ></Controller>
  );
};
