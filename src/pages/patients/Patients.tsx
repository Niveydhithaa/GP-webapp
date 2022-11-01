import { useState } from "react";
import {
    Box,
    Typography,
    TableContainer,
    Table,
    Stack,
    TableHead,
    TableRow,
    TableBody,
    Button,
    Paper,
    TextField,
    Link,
    Autocomplete,
    IconButton,
    Divider,
    InputBase
} from "@mui/material";
import TwoStepBreadCrumb from "components/TwoStepBreadCrumb"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom"
import Navbar from "components/Navbar"
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PatientDialog from "components/hooks/PatientDialog";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PatientProfile from "./PatientProfile";
import AlertJoy from "components/alerts/AlertJoyPrimary"
import AlertJoyPrimary from "components/alerts/AlertJoyPrimary";

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
    { value: 'Patient1', label: 'Patient1', color: '#00B8D9' },
    { value: 'Patient2', label: 'Patient2', color: '#0052CC' },
    { value: 'Patient3', label: 'Patient3', color: '#5243AA' },
    { value: 'Patient4', label: 'Patient4', color: '#FF5630' },
];
export default function Patients() {
    const navigate = useNavigate();

    const [patientClicked, setPatientClicked] = useState<boolean>(false);
    const [addPatientDialog, setAddPatientDialog] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<any>("");
    const onClickPatient = () => {
        setPatientClicked(true)
        navigate("/patientprofile")
    }
    const handleSavePatient = () => {
        console.log("API integration to validate and save the new patient with given details")
        setAddPatientDialog(false)
    }
    const handleCloseAddPatientDialog = () => {
        setAddPatientDialog(false)
    }
    const handleClosePatientDialog = () => {
        setPatientClicked(false)
    }
    const addNewPatientHandler = () => {
        console.log("On Add patient button click")
        setAddPatientDialog(true)
    }
    return (
        <div>
            <Box>
                <Box mb={4}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        { /*<Autocomplete
                                freeSolo
                                disableClearable
                                options={patientOptions}
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
                                )}
                                sx={{width: "350px"}}
                            /> */}
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, boxShadow: "none", outline: "1px solid #ccc" }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'Search' }}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <Button variant="contained" color="primary" onClick={addNewPatientHandler}>
                            Create Patient
                            </Button>
                        
                    </Box>
                    <AlertJoyPrimary></AlertJoyPrimary>
                    <TableContainer component={Paper}>
                        {/* <Box
                                component="span"
                                m={1}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                >
                                <Typography>List of Patients</Typography>
                                
                            </Box> */}
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>
                                        Name
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
                                        <Link onClick={onClickPatient}><p className="prescribelink">Patient1</p></Link>
                                    </StyledTableCell>
                                    <StyledTableCell>Surname1</StyledTableCell>
                                    <StyledTableCell>F</StyledTableCell>
                                    <StyledTableCell>30</StyledTableCell>
                                    <StyledTableCell>88890038556</StyledTableCell>
                                    <StyledTableCell>17/10/2022</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton><EditIcon /></IconButton>
                                        <IconButton><DeleteIcon /></IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Patient2
                                 </StyledTableCell>
                                    <StyledTableCell>Surname2</StyledTableCell>
                                    <StyledTableCell>M</StyledTableCell>
                                    <StyledTableCell>48</StyledTableCell>
                                    <StyledTableCell>890038556187</StyledTableCell>
                                    <StyledTableCell>17/11/2022</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton><EditIcon /></IconButton>
                                        <IconButton><DeleteIcon /></IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Patient3
                                 </StyledTableCell>
                                    <StyledTableCell>Surname3</StyledTableCell>
                                    <StyledTableCell>M</StyledTableCell>
                                    <StyledTableCell>54</StyledTableCell>
                                    <StyledTableCell>788901238556</StyledTableCell>
                                    <StyledTableCell>17/09/2022</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton><EditIcon /></IconButton>
                                        <IconButton><DeleteIcon /></IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Patient4
                                 </StyledTableCell>
                                    <StyledTableCell>Surname4</StyledTableCell>
                                    <StyledTableCell>M</StyledTableCell>
                                    <StyledTableCell>29</StyledTableCell>
                                    <StyledTableCell>665432256890</StyledTableCell>
                                    <StyledTableCell>07/08/2022</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton><EditIcon /></IconButton>
                                        <IconButton><DeleteIcon /></IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog open={addPatientDialog} onClose={handleCloseAddPatientDialog}>
                        <DialogTitle>Create Patient (Coming Soon...)
                        <AlertJoy></AlertJoy>
                        </DialogTitle>
                        <DialogContent >
                            <Box>
                                <PatientDialog></PatientDialog>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseAddPatientDialog}>Cancel</Button>
                            <Button onClick={handleSavePatient}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
            <Dialog open={patientClicked} onClose={handleClosePatientDialog}>
                    <DialogTitle>Profile</DialogTitle>
                    <DialogContent >
                        <PatientProfile></PatientProfile>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePatientDialog}>Close</Button>
                        {/* <Button onClick={handleOncoRefer} variant="contained" color="success">Submit</Button> */}
                    </DialogActions>
                </Dialog>
        </div>
    )
}