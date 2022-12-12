import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Box,
    TextField,
    Table,
    TableHead,
    TableRow,
    TableBody,
    ToggleButtonGroup,
    ToggleButton,
    Stack,
    Typography
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function PatientDialog() {
    const [gender, setGender] = useState("");
    const [value, setValue] = useState<Dayjs | null>(
        dayjs('2022-10-21T19:00:00'),
    );
    
    const handleGender = (
        event: React.MouseEvent<HTMLElement>,
        newGender: string
    ) => {
        setGender(newGender);
    };
    return (
        <Box>
            <Stack>
                <Box>
                    <Typography fontWeight="bold" fontSize="14px" mb={2}>Patient Details</Typography>
                </Box>
                <Box>
                    <TextField
                        label="First Name"
                        id="input_name"
                        required
                        sx={{ width: "44%" }}
                    // style={{minWidth: "350px"}}
                    />

                    <TextField
                        label="Last Name"
                        id="input_surname"
                        sx={{ width: "44%", marginLeft: 2 }}
                    // style={{minWidth: "350px"}}
                    />
                </Box>
                <br></br>
                <Box display="flex">
                    <TextField
                        label="Age"
                        id="age"
                        sx={{ width: "44%" }}
                    />
                            <ToggleButtonGroup
                        color="primary"
                        value={gender}
                        sx={{  marginLeft: 2 , width: "44%"}}
                        exclusive
                        onChange={handleGender}
                        aria-label="Platform"
                    >
                        <ToggleButton value="male">Male</ToggleButton>
                        <ToggleButton value="female">Female</ToggleButton>
                    </ToggleButtonGroup>
                    
                </Box>
                <br></br>
                <Box>
                    <TextField
                        label="Phone number"
                        required
                        id="mobile_num"
                        sx={{ width: "44%"}}
                    />
                </Box>
                <br></br>
                <Box>
                    <TextField
                        label="Notes about the patient"
                        id="patient_notes"
                        // helperText="Brief notes about the patient"
                        multiline
                        rows={3}
                        sx={{width: "91%"}}
                        style={{ marginBottom: "12px" }}
                    />
                    
                </Box>
                <Box>
                    <TextField
                        label="Yasmed ID"
                        id="yasmed_id"
                        style={{ marginBottom: "12px", width: "44%" }}
                    />
                    <TextField
                        label="OO Patient ID"
                        sx={{ width: "44%", marginLeft: 2 }}
                        id="patient_id"
                        // style={{ marginBottom: "12px", width: "44%", marginLeft: 1 }}
                    />
                </Box>
                <Box>
                    <Typography fontWeight="bold" mb={2} fontSize="14px">Referrer Details (GP)</Typography>
                </Box>
                <Box>
                    <TextField
                        label="Doctor Name"
                        id="gpname"
                        sx={{  width: "44%" }}
                    />
                </Box>
            </Stack>
        </Box>
    )
}
