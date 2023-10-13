import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Controller } from "react-hook-form";

const EmailTextField = ({ control, ...props }) => {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          error={fieldState.invalid}
          helperText={fieldState.invalid ? fieldState.error?.message : null}
          {...props}
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          {...field}
        />
      )}
    />
  );
};

const PasswordTextField = ({ control, ...props }) => {
  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          error={fieldState.invalid}
          helperText={fieldState.invalid ? fieldState.error?.message : null}
          {...props}
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          {...field}
        />
      )}
    />
  );
};

export { EmailTextField, PasswordTextField };
