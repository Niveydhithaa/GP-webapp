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
    DialogTitle,
    Grid,
    Card,
    Divider
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
        <Box sx={{backgroundColor: "#EEEEEE", minHeight: "100vh"}}>
            <Navbar></Navbar>
            <Box width="100%">
                <Grid container maxWidth="xl" sx={{margin: "0 auto"}}>
                    <Grid item xs={12} sx={{p: 2}}>
                        <CustomBreadCrumb></CustomBreadCrumb>
                    </Grid>
                    <Grid container item xs={12} spacing={2} sx={{px: 2}}>
                        <Grid item xs={3}>
                            <Card sx={{p: 2, borderRadius: 4, minWidth: "100%", backgroundColor: "#fff"}}>
                                <Box p={1.5}>
                                    <p className="card-title">Patient Details</p>
                                </Box>
                                <Divider />
                                <Box p={1.5}>
                                    <p className="patient-name">Patient1</p>
                                    <p className="patient-details">32 | F | Chennai</p>
                                    <p className="patient-id">88890038556</p>
                                </Box>
                                <Divider />
                                <Box p={1.5} className="patient-ids-group">
                                    <Box display="flex" flexWrap="nowrap">
                                        <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="50%">
                                            <p>Optimal ID</p>
                                            <p>:</p>
                                        </Box>
                                        <Box width="50%">
                                            BCHT00022
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexWrap="nowrap">
                                        <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="50%">
                                            <p>GP ID</p>
                                            <p>:</p>
                                        </Box>
                                        <Box width="50%">
                                            GP00022
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexWrap="nowrap">
                                        <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="50%">
                                            <p>Hospital ID</p>
                                            <p>:</p>
                                        </Box>
                                        <Box width="50%">
                                            HT00022
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexWrap="nowrap">
                                        <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="50%">
                                            <p>Last Consulted On</p>
                                            <p>:</p>
                                        </Box>
                                        <Box width="50%">
                                        17/10/2022
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={9}>
                            <Card sx={{p: 2}}>
                                <Box
                                    component="span"
                                    m={1}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    >
                                    <Typography>Symptoms</Typography>
                                    <Button variant="contained" sx={{ height: 40 }} onClick={addNewPatient}>
                                        Add Symptom
                                    </Button>
                                </Box>
                                <Dialog open={symptomDialog} onClose={handleCloseSuggeDialog}>
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
                                <SymptomTracker></SymptomTracker>
                                <SymptomTracker></SymptomTracker>
                                <SymptomTracker></SymptomTracker>
                                <SymptomTracker></SymptomTracker>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>

    )
}