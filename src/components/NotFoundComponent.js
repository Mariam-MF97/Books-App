import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { notFoundComponentStyles } from "../utils/styles/styles";
import { useTranslation } from "react-i18next";

export function NotFound() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Box style={notFoundComponentStyles.container}>
      <Typography variant="h4" gutterBottom>
        {t("notFoundTitle")}
      </Typography>
      <Typography variant="body1" paragraph>
        {t("notFoundMessage")}
      </Typography>
      {user ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/books-list", { replace: true })}
        >
          {t("goToBooksList")}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login", { replace: true })}
        >
          {t("goToLogin")}
        </Button>
      )}
    </Box>
  );
}
