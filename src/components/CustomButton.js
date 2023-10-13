import Button from "@mui/material/Button";
import React from "react";

const CustomButton = ({ label, color, onClick, type, ...props }) => {
  return (
    <Button
      variant="contained"
      color={color}
      type={type}
      onClick={onClick}
      sx={{ my: 3 }}
      {...props}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
