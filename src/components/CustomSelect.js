import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export const CustomSelect = ({ name, control, label, options, ...props }) => {
  return (
    <Controller
      defaultValue={props.defaultValue}
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={fieldState.error}>
          <InputLabel id={`${name}-label `}>
            {`${label}${props.required ? "*" : ""}`}
          </InputLabel>
          <Select
            error={!!fieldState.error}
            {...props}
            labelId={`${name}-label`}
            id={name}
            label={label}
            {...field}
            size="medium"
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {fieldState.error ? fieldState.error.message : ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
