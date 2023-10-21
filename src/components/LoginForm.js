import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import acoreLogo from "../assets/images/acore-logo.png";
import CustomButton from "./CustomButton";
import { EmailTextField, PasswordTextField } from "./loginReusableComponents";
import { loginFormStyle } from "../utils/styles/styles";
import { useTranslation } from "react-i18next";

const LoginForm = ({ control, onSubmit }) => {
  const { t } = useTranslation();
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        style={loginFormStyle.backgroundContainer}
      >
        <img src={acoreLogo} alt="logo" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <Box style={loginFormStyle.loginFormContainer}>
          <Avatar style={loginFormStyle.avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            {t("login")}
          </Typography>
          <form onSubmit={onSubmit}>
            <EmailTextField control={control} t={t} />
            <PasswordTextField control={control} t={t} />
            <CustomButton
              onClick={() => {
                onSubmit();
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              label={t("login")}
            />
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
