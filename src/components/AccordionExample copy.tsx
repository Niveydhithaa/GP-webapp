import { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Autocomplete,

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
} from "@mui/material";
import Navbar from "components/Navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CustomStepper from "components/CustomStepper"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { symptomOptions } from "pages/data";

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
  function createData_PossibleTable(possible_cancer: string, step1: string)
  {
    return {possible_cancer, step1}
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
  const possible_tablerow = [
    createData_PossibleTable(
      "Breast",
      "Measure serum CA125"
    )
  ]
  const step_names = [
    "Serum CA125",
    "Ultrasound"
  ]
export default function AccordionExample() {
    const [topic, setTopic] = useState("New Patient");
    const [patientDialogOpen, setPatientDialogOpen] = useState<boolean>(false);
    const [suggeDialog, setSuggestionsDialog] = useState<boolean>(false)
    const [testNameSelected, setTestNameSelected] = useState<string>("");
    const [gender, setGender] = useState("");
    const [noofsymptoms, setNoofSymptoms] = useState(sessionStorage.getItem("noofsymptopms"))
    let arr = new Array(Number(noofsymptoms))
    const [value, setValue] = useState<Dayjs | null>(
      dayjs('2022-10-21T19:00:00'),
    );
  
    const handleChangeDate = (newValue: Dayjs | null) => {
      setValue(newValue);
    };
    const handleGender = (
      event: React.MouseEvent<HTMLElement>,
      newGender: string
    ) => {
      setGender(newGender);
    };

    const testClickHandler = (e: React.MouseEvent<HTMLSpanElement> | React.MouseEvent<HTMLAnchorElement>, test_name: string) => {
      setPatientDialogOpen(true)
      console.log("Testname selected: " +test_name)
      localStorage.setItem("selected_test_for_prescription", test_name)
      // setTestNameSelected(test_name)
    }
    const testClick_AssessOtherSymptomsHandler = (e: React.MouseEvent<HTMLSpanElement> | React.MouseEvent<HTMLAnchorElement>, other_symp_action: string) => {
      setSuggestionsDialog(true)
      console.log("Other symptom action " + other_symp_action)
    }
    const handleClosePrescribeDialog = () => {
      setPatientDialogOpen(false)
    }
    const handlePrescribeModuleOpen = () => {
      console.log(document.getElementById("mobile_num"))
      console.log(document.getElementById("name_input"))
      console.log(localStorage.getItem("selected_test_for_prescription"))

      setPatientDialogOpen(false)
    }
    const handleSuggeModuleOpen = () => {
      setSuggestionsDialog(false)
    }
    const handleCloseSuggeDialog = () => {
      setSuggestionsDialog(false)
    }
    return(
        <Box mt={3}>
          {/* {arr.map((arr_el) => ( */}
              <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight="bold">Symptom Title - Version 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Symptom Description
                </Typography>
                <Box mt={3} width="25%">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100}} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            Possible Cancer
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                              Ovarian
                            </StyledTableCell>
                          </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box mt={3}>
                  <Typography fontWeight="bold">Step 01</Typography>
                  <TableContainer component={Paper}>
                  <Table sx={{ width: "auto"}} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          <StyledTableRow>
                            <StyledTableCell component="th" scope="row" style={{color:"red"}}>
                              Urgent Referral to Oncologist
                            </StyledTableCell>
                          </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                
                {/* <Box mt={5}>
                  <Typography>
                    Symptom Description -- Version 2 -- <b>Stepper</b>
                  </Typography>
                  <CustomStepper></CustomStepper>
                </Box> */}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight="bold">Symptom Title - Version 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Symptom Description
                </Typography>
                <Box mt={3} width="40%">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100}} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>
                            Possible Cancer
                          </StyledTableCell>
                          <StyledTableCell>
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                          {possible_tablerow.map((row) => (
                          <StyledTableRow key={row.possible_cancer}>
                            <StyledTableCell component="th" scope="row">
                              {row.possible_cancer}
                            </StyledTableCell>
                            <StyledTableCell>
                              <Link onClick={(e) => testClickHandler(e, row.step1)}>{row.step1}</Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box mt={3}>
                  <Typography fontWeight="bold">{step_names[0]}</Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ width: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          {/* <StyledTableCell>
                            Test /Investigations
                          </StyledTableCell> */}
                          <StyledTableCell>Result</StyledTableCell>
                          <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow key={row.name}>
                            {/* <StyledTableCell component="th" scope="row">
                              <Link onClick={(e) => testClickHandler(e, row.name)}>{row.name}</Link>
                            </StyledTableCell> */}
                            <StyledTableCell>{row.calories}</StyledTableCell>
                            
                              {
                                row.fat!=="No further investigation needed" && 
                                <StyledTableCell>
                                  <Link onClick={(e) => testClickHandler(e, row.fat)}>{row.fat}</Link>
                                </StyledTableCell>
                              }
                              {
                                row.fat==="No further investigation needed" && 
                                <StyledTableCell>
                                  {row.fat}
                                </StyledTableCell>
                              }
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Card>
                <Dialog open={patientDialogOpen}>
                    <DialogTitle>Prescribe</DialogTitle>
                    <DialogContent >
                        <Box>
                          <Box>
                            <TextField
                                label="Name"
                                id="input_name"
                                required
                                style={{minWidth: "350px"}}
                              />
                          </Box>
                          <Box>
                            <TextField
                                label="Surname"
                                id="input_surname"
                                required
                                style={{minWidth: "350px"}}
                              />
                          </Box>
                          <Box>
                            <TextField
                              label="Age"
                              id="age"
                              required
                              style={{minWidth: "350px", marginBottom: "12px"}}
                            />
                          </Box>
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
                              style={{minWidth: "350px", marginBottom: "12px"}}
                            />
                          </Box>
                          <Table sx={{ minWidth: 100, marginTop: 3}} aria-label="customized table">
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>
                                  Test /Investigation
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {localStorage.getItem("selected_test_for_prescription")}
                                  </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                          </Table>
                        
                          <Box mt={5}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                label="Next Appointment"
                                value={value}
                                onChange={handleChangeDate}
                                
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                          </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePrescribeDialog}>Cancel</Button>
                        <Button onClick={handlePrescribeModuleOpen}>Prescribe</Button>
                    </DialogActions>
                </Dialog>
                </Card>
                <Box mt={3}>
                  <Typography fontWeight="bold">{step_names[1]}</Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ width: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          {/* <StyledTableCell>
                            Test /Investigations
                          </StyledTableCell> */}
                          <StyledTableCell>Result</StyledTableCell>
                          <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows_two.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell>{row.result}</StyledTableCell>
                            {/* <StyledTableCell>
                              <Link onClick={(e) => testClickHandler(e, row.action)}>{row.action}</Link>
                            </StyledTableCell> */}
                            {
                                row.action!=="Refer to oncologist" && 
                                <StyledTableCell>
                                  <Link onClick={(e) => testClick_AssessOtherSymptomsHandler(e, row.action)}>{row.action}</Link>
                                </StyledTableCell>
                              }
                              {
                                row.action==="Refer to oncologist" && 
                                <StyledTableCell style={{color:"red"}}>
                                  {row.action}
                                </StyledTableCell>
                              }
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Dialog open={suggeDialog}>
                    <DialogTitle>Search Other Symptoms</DialogTitle>
                    <DialogContent >
                        <Box>
                          <Box>
                          <Autocomplete
                              freeSolo
                              disableClearable
                              options={symptomOptions}
                              sx={{width:"200px"}}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Symptom"
                                  // size="small"
                                  // multiline={true}
                                  // rows={2}
                                  InputProps={{
                                    ...params.InputProps,
                                    type: "Age",
                                  }}
                                />
                              )}/>
                          </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSuggeDialog}>Cancel</Button>
                        <Button onClick={handleSuggeModuleOpen}>Search</Button>
                    </DialogActions>
                </Dialog>
              </AccordionDetails>
            </Accordion>
          {/* ))} */}
        </Box>
    )
}