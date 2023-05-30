import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerComponent({ value, onChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                slotProps={{
                    textField: {
                        fullWidth: "true",
                        style: { marginTop: "15px" },
                    },
                }}
                label="Date of birth"
                value={value}
                onChange={onChange}
            />
        </LocalizationProvider>
    );
}
