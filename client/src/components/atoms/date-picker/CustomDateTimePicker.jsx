"use client";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function CustomDateTimePicker({
  label,
  value,
  onChange,
  error,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label && label}
        value={value ? dayjs(value) : null}
        onChange={(newValue) => onChange?.(newValue)}
        slotProps={{
          textField: {
            error: !!error,
            helperText: error,
            fullWidth: true,
            sx: {
              "& .MuiPickersInputBase-root": {
                backgroundColor: "transparent",
                borderRadius: "50px",
                color: "#fff",

                "& .MuiPickersSectionList-root": {
                  padding: "10px",
                },

                "& .MuiPickersOutlinedInput-notchedOutline": {
                  borderColor: "#364153 !important",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#364153 !important",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#94a3b8 !important",
              },
              "& .MuiFormLabel-root": {
                top: "-5px",
                fontSize: "14px",
              },
              "& .MuiSvgIcon-root": {
                color: "#94a3b8 !important",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
