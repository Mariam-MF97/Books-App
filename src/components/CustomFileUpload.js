import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { Controller } from "react-hook-form";

export const CustomFileUploader = ({ name, control, buttonName, ...props }) => {
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
            accept=".pdf"
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

          {value ? (
            <iframe
              title="PDF Viewer"
              src={value}
              width="100%"
              height="300"
              allowFullScreen
            ></iframe>
          ) : (
            <Avatar
              variant="square"
              sx={{
                height: 200,
                width: 128,
                cursor: "pointer",
                borderColor: "warning",
                borderWidth: "5px",
                borderRadius: "5px",
                backgroundColor: "e8e8e8e",
              }}
            >
              <DescriptionIcon fontSize="large" />
            </Avatar>
          )}
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleUploadClick}
            sx={{ my: 2 }}
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
