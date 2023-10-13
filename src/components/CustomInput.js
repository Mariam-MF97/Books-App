import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
export const CustomTextField = ({
  name,
  control,
  label,
  startAdornment,
  error,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...props}
          helperText={error ? error.message : null}
          size="medium"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          InputProps={{
            startAdornment: startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  );
};
