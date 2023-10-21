import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { notFoundComponentStyles } from "../utils/styles/styles";

export function NotFound() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box style={notFoundComponentStyles.container}>
      <Typography variant="h4" gutterBottom>
        404 - Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for does not exist.
      </Typography>
      {user ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/books-list", { replace: true })}
        >
          Go to Books List
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login", { replace: true })}
        >
          Go to Login
        </Button>
      )}
    </Box>
  );
}
