import { useState } from "react";
import {
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Button,
    Typography,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import Navbar from "components/Navbar"
import SymptomTracker from "components/SymptomTrackerAccordion"
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CustomBreadCrumb from "components/CustomBreadCrumb"
import AccordionExample from "components/AccordionExample";
import Dashboard from "pages/Dashboard";
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
// input is a patient nameit can be the IDENTITY or  selected from the list
export default function PatientProfile() {
    const [symptomDialog, setSymptomDialog] = useState<boolean>(false)
    const handleSuggeModuleOpen = () => {
        setSymptomDialog(false)
      }
      const handleCloseSuggeDialog = () => {
        setSymptomDialog(false)
      }
      const addNewPatient = () => {
          setSymptomDialog(true)
      }
    return (
        <div>
            <Navbar></Navbar>
            <br></br>
            
            <CustomBreadCrumb></CustomBreadCrumb>
            <Box maxWidth="60%" m="auto">
                <Box mt={5} mb={4}>
                    <TableContainer component={Paper}>
                        <Box
                            component="span"
                            m={1}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            >
                            <Typography>Patient Profile</Typography>
                            <Button variant="outlined"  color="secondary" sx={{ height: 40 }} onClick={addNewPatient}>
                                Add New Symptom
                            </Button>
                        </Box>
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
                                        Niveydhithaa
                                    </StyledTableCell>
                                    <StyledTableCell>Ramamoorthi</StyledTableCell>
                                    <StyledTableCell>F</StyledTableCell>
                                    <StyledTableCell>21</StyledTableCell>
                                    <StyledTableCell>9888890038556</StyledTableCell>
                                    <StyledTableCell>17/10/2022</StyledTableCell>
                                    <StyledTableCell>Edit/Delete</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog open={symptomDialog}>
                        <DialogTitle>Add Symptom</DialogTitle>
                        <DialogContent >
                            <Box>
                                <Dashboard></Dashboard>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseSuggeDialog}>Cancel</Button>
                            <Button onClick={handleSuggeModuleOpen}>Add</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                <SymptomTracker></SymptomTracker>
            </Box>
        </div>

    )
}