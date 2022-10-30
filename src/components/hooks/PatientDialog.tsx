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
    Stack
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
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
    const handleChangeDate = (newValue: Dayjs | null) => {
        setValue(newValue);
    };
    return (
        <Box>
            {/* <Box>
                <br></br>
                <Box>
                    <TextField
                        label="Name"
                        id="input_name"
                        required
                        style={{ minWidth: "350px" }}
                    />
                </Box>
                <br></br>
                <Box>
                    <TextField
                        label="Surname"
                        id="input_surname"
                        required
                        style={{ minWidth: "350px" }}
                    />
                </Box>
                <br></br>
                <Box>
                    <TextField
                        label="Age"
                        id="age"
                        required
                        style={{ minWidth: "350px", marginBottom: "12px" }}
                    />
                </Box>
                <br></br>
                <Box>
                    <Box>
                        <ToggleButtonGroup
                            color="primary"
                            value={gender}
                            exclusive
                            onChange={handleGender}
                            aria-label="Platform"
                        >
                            <ToggleButton value="male">Male</ToggleButton>
                            <ToggleButton value="female">Female</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Mobile"
                        id="mobile_num"
                        style={{ minWidth: "350px", marginBottom: "12px" }}
                    />
                </Box>
            </Box> */}
            <Stack>
                <br></br>
                <Box>
                    <TextField
                        label="Name"
                        id="input_name"
                        required
                        sx={{ width: "44%" }}
                    // style={{minWidth: "350px"}}
                    />

                    <TextField
                        label="Surname"
                        id="input_surname"
                        required
                        sx={{ width: "44%", marginLeft: 2 }}
                    // style={{minWidth: "350px"}}
                    />
                </Box>
                <br></br>
                <Box display="flex">
                    <TextField
                        label="Age"
                        id="age"
                        required
                        sx={{ width: "44%" }}
                    />
                    &nbsp; &nbsp;
                            <ToggleButtonGroup
                        color="primary"
                        value={gender}
                        sx={{ width: "44%", marginLeft: 1 }}
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
                        label="Mobile"

                        id="mobile_num"
                        style={{ marginBottom: "12px", width: "44%" }}
                    />
                </Box>

            </Stack>
        </Box>
    )
}
