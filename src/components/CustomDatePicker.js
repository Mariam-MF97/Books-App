import TextField from "@mui/material/TextField";
import React from "react";
import { Controller } from "react-hook-form";

export const CustomDatePicker = ({ name, label, control, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <TextField
            error={error}
            helperText={error ? error.message : null}
            fullWidth
            value={value}
            variant="outlined"
            label={label}
            type="date"
            format="yyyy-MM-dd"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const formattedDate = selectedDate.toISOString().split("T")[0];
              onChange(formattedDate);
            }}
            {...rest}
          />
        );
      }}
    />
  );
};
