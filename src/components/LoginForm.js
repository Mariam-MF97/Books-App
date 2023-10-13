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

const LoginForm = ({ control, onSubmit }) => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={6}
        md={6}
        sx={{
          backgroundRepeat: "no-repeat",
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(84,9,121,1) 41%, rgba(0,212,255,1) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={acoreLogo} alt="logo" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#49086E" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <form sx={{ mt: 1 }} onSubmit={onSubmit}>
            <EmailTextField control={control} />
            <PasswordTextField control={control} />
            <CustomButton
              onClick={() => {
                onSubmit();
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              label="Login"
            />
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
