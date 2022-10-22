import { useState } from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Button,
    Paper,
    Card,
    TextField,
    ToggleButtonGroup,
    ToggleButton,
    Link,
    Autocomplete
} from "@mui/material";
import TwoStepBreadCrumb from "components/TwoStepBreadCrumb"

import { useNavigate } from "react-router-dom"
import Navbar from "components/Navbar"
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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
function createData(name: string, calories: string, fat: string) {
    console.log(sessionStorage.getItem("noofsymptoms"))
    return { name, calories, fat };
}
function createData_StepTwo(name: string, result: string, action: string) {
    return { name, result, action };
}
const rows = [
    createData(
        "Measure serum CA125",
        "Serum CA125 level is less than 35 IU/ml",
        "Perform Ultrasound"
    ),
    createData(
        "Measure serum CA125",
        "Serum CA125 level is greater than or equal to 351U/ml",
        "No further investigation needed"
    ),
];
const rows_two = [
    createData_StepTwo(
        "Ultrasound",
        "Normal",
        "Assess her careflly for other causes"
    ),
    createData_StepTwo(
        "Ultrasound",
        "Abnormal",
        "Refer to oncologist"
    ),
];
interface Patient {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }
const patientOptions: readonly Patient[] = [
    { value: 'Niveydhithaa', label: 'Niveydhithaa', color: '#00B8D9'},
    { value: 'Pooja', label: 'Pooja', color: '#0052CC'},
    { value: 'Logesh', label: 'Logesh', color: '#5243AA' },
    { value: 'Karthik', label: 'Karthik', color: '#FF5630' },
    // { value: 'yellow', label: 'Symptom 2', color: '#FFC400' },
    // { value: 'green', label: 'Symptom 2', color: '#36B37E' },
    // { value: 'forest', label: 'Symptom 2', color: '#00875A' },
    // { value: 'slate', label: 'Symptom 2', color: '#253858' },
    // { value: 'silver', label: 'Symptom 2', color: '#666666' },
  ];
export default function Patients() {
    const navigate = useNavigate();
    const [patientClicked, setPatientClicked] = useState<boolean>(false);
    const onClickPatient = () => {
        // setPatientClicked(true)
        navigate("/patientprofile")
    }
    return (
        <div>
            {/* <Navbar></Navbar> */}
            {!patientClicked &&
                <Box>
                    <TwoStepBreadCrumb></TwoStepBreadCrumb>
                    <Box mt={5} mb={4} maxWidth="60%" m="auto">
                        <Box>
                            <br></br>
                            <Autocomplete
                                freeSolo
                                disableClearable
                                options={patientOptions}
                                fullWidth
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search patient"
                                        // size="small"
                                        // multiline={true}
                                        // rows={2}
                                        InputProps={{
                                            ...params.InputProps,
                                            type: "Age",
                                        }}
                                    />
                                )} />
                                <br></br>
                        </Box>
                        <TableContainer component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>
                                            Patient Name
                                    </StyledTableCell>
                                        <StyledTableCell>Surname</StyledTableCell>
                                        <StyledTableCell>Gender</StyledTableCell>
                                        <StyledTableCell>Age</StyledTableCell>
                                        <StyledTableCell>Mobile</StyledTableCell>
                                        <StyledTableCell>Last Consulted</StyledTableCell>
                                        <StyledTableCell>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            {/* <a href="/patientprofile">Niveydhithaa</a> */}
                                            <Link onClick={onClickPatient}>Niveydhithaa</Link>
                                        </StyledTableCell>
                                        <StyledTableCell>Ramamoorthi</StyledTableCell>
                                        <StyledTableCell>F</StyledTableCell>
                                        <StyledTableCell>21</StyledTableCell>
                                        <StyledTableCell>9888890038556</StyledTableCell>
                                        <StyledTableCell>17/10/2022</StyledTableCell>
                                        <StyledTableCell>Edit/Delete</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            Logesh
                                 </StyledTableCell>
                                        <StyledTableCell>Mani</StyledTableCell>
                                        <StyledTableCell>M</StyledTableCell>
                                        <StyledTableCell>35</StyledTableCell>
                                        <StyledTableCell>9888890038556</StyledTableCell>
                                        <StyledTableCell>17/11/2022</StyledTableCell>
                                        <StyledTableCell>Edit/Delete</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            Karthik
                                 </StyledTableCell>
                                        <StyledTableCell>Kannan</StyledTableCell>
                                        <StyledTableCell>M</StyledTableCell>
                                        <StyledTableCell>24</StyledTableCell>
                                        <StyledTableCell>9888890038556</StyledTableCell>
                                        <StyledTableCell>17/09/2022</StyledTableCell>
                                        <StyledTableCell>Edit/Delete</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            Pooja
                                 </StyledTableCell>
                                        <StyledTableCell>Yuvaraj</StyledTableCell>
                                        <StyledTableCell>M</StyledTableCell>
                                        <StyledTableCell>23</StyledTableCell>
                                        <StyledTableCell>9888890038556</StyledTableCell>
                                        <StyledTableCell>07/08/2022</StyledTableCell>
                                        <StyledTableCell>Edit/Delete</StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            }
            {
                patientClicked &&
                <Box>
                    {/* <PatientProfile></PatientProfile> */}
                </Box>
            }
        </div>
    )
}