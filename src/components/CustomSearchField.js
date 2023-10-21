import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const CustomSearchField = ({ searchQuery, setSearchQuery, t, ...props }) => {
  return (
    <TextField
      sx={{ direction: "ltr" }}
      label={t("search")}
      variant="outlined"
      fullWidth
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {searchQuery && (
              <IconButton
                onClick={() => setSearchQuery("")}
                size="small"
                color="error"
              >
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default CustomSearchField;
