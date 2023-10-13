import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export const CustomTextarea = ({
  name,
  control,
  label,
  maxLength = 800,
  error,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextField
            {...props}
            helperText={error ? error.message : null}
            size="medium"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            multiline
            rows={4}
            label={label}
            variant="outlined"
          />
          <Typography
            variant="caption"
            // color={value?.length > maxLength ? "error" : "textPrimary"}
            sx={{ float: "right" }}
          >
            {`${value?.length || 0}/${maxLength}`}
          </Typography>
        </>
      )}
    />
  );
};
