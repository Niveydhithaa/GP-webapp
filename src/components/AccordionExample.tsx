import { useState , ReactNode} from "react";
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
  Stack,
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DatePicker from 'material-ui/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { symptomOptions } from "pages/data";
interface Props {
  selectedSymp: string  
  possible_cancer: string
  gender_specific: string
  step1: string
  response1: string
  no_of_steps: string
  step2: string
  // any props that come into the component
}
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
  function disableRandomDates() {
    return Math.random() > 0.7;
  }
export default function AccordionExample({selectedSymp, possible_cancer, gender_specific, step1, response1, no_of_steps, step2, ...props} : Props) {
    const [topic, setTopic] = useState("New Patient");
    const [patientDialogOpen, setPatientDialogOpen] = useState<boolean>(false);
    const [suggeDialog, setSuggestionsDialog] = useState<boolean>(false)
    const [oncologyReferralPopup, setOncologyReferralPopup] = useState<boolean>(false)
    const [testNameSelected, setTestNameSelected] = useState<string>("");
    const [gender, setGender] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [noofsymptoms, setNoofSymptoms] = useState(sessionStorage.getItem("noofsymptopms"))
    let arr = new Array(Number(noofsymptoms))
    const new_arr = new Array(parseInt(no_of_steps)) 
    
    for(let i=0; i< parseInt(no_of_steps); i++)
      new_arr.push(`${i}`)
    const [value, setValue] = useState<Dayjs | null>(
      dayjs(),
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
    const handleTimeSlot = (
      event: React.MouseEvent<HTMLElement>,
      newTimeSlot: string
    ) => {
      setTimeSlot(newTimeSlot);
    };
    const testClickHandler = (e: React.MouseEvent<HTMLSpanElement> | React.MouseEvent<HTMLAnchorElement>, test_name: string) => {
      setPatientDialogOpen(true)
      console.log(selectedSymp)
      console.log("Testname selected: " +test_name)
      localStorage.setItem("selected_test_for_prescription", test_name)
      // setTestNameSelected(test_name)
    }
    const testClick_AssessOtherSymptomsHandler = (e: React.MouseEvent<HTMLSpanElement> | React.MouseEvent<HTMLAnchorElement>, other_symp_action: string) => {
      setSuggestionsDialog(true)
      console.log("Other symptom action " + other_symp_action)
    }
    const testClick_OpenOncologistPopup = (e: React.MouseEvent<HTMLSpanElement> | React.MouseEvent<HTMLAnchorElement>, other_symp_action: string) => {
      setOncologyReferralPopup(true)
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
    const handleOncoRefer = () => {
      setOncologyReferralPopup(false)
    }
    const handleCloseOncoRefer = () => {
      setOncologyReferralPopup(false)
    }
    return(
        
        <Box mt={3}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontWeight="bold">{selectedSymp}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {selectedSymp}
                </Typography>
                <Typography>
                  {!gender_specific &&
                        <Typography fontSize="10px">Not gender specific!</Typography>
                  }
                  {gender_specific &&
                        <Typography fontSize="10px">Specific to: {gender_specific}</Typography>
                  }
                </Typography>
                
                {/* <Typography>{response1}</Typography> */}
                {/* <Box mt={3}  width="50%">
                  <Typography fontWeight="bold">{step_names[0]}</Typography>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Result</StyledTableCell>
                          <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow key={row.name}>
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
                </Box> */}
                <Card>
                <Dialog open={patientDialogOpen}>
                    <DialogTitle>Prescribe (Coming Soon...)</DialogTitle>
                    <DialogContent >
                        <Stack>
                          <br></br>
                          <Box display="flex">
                            <TextField
                                label="Name"
                                id="input_name"
                                required
                                // style={{minWidth: "350px"}}
                              />
                              &nbsp; &nbsp;
                            <TextField
                                label="Surname"
                                id="input_surname"
                                required
                                // style={{minWidth: "350px"}}
                              />
                          </Box>
                          <br></br>
                          <Box display="flex">
                            <TextField
                              label="Age"
                              id="age"
                              required
                            />
                            &nbsp; &nbsp;
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
                          <br></br>
                          <Box>
                            <TextField
                              label="Mobile"
                              id="mobile_num"
                              style={{minWidth: "350px", marginBottom: "12px"}}
                            />
                          </Box>
                          <Table sx={{ minWidth: 100}} aria-label="customized table">
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
                          <br></br>
                          <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              {/* <DateTimePicker
                                label="Next Appointment"
                                value={value}
                                onChange={handleChangeDate}
                                shouldDisableDate={disableRandomDates}
                                shouldDisableTime={disableRandomDates}
                                renderInput={(params) => <TextField {...params} />}
                              /> */}
                              <DatePicker
                                label="Next Appointment"
                                value={value}
                                onChange={handleChangeDate}
                                shouldDisableDate={disableRandomDates}
                                renderInput={(params) => <TextField {...params} />}
                              />
                              {/* <DatePicker hintText="Random Dates Disabled" shouldDisableDate={disableRandomDates} /> */}
                            </LocalizationProvider>
                            
                          </Box>
                          <br></br>
                            <Box>
                              <ToggleButtonGroup
                                color="primary"
                                value={timeSlot}
                                exclusive
                                onChange={handleTimeSlot}
                                aria-label="Platform"
                              >
                                <ToggleButton value="9amto10am">9:00 - 10: 00</ToggleButton>
                                <ToggleButton value="11.30amto12.30pm">11:30 - 12:30</ToggleButton>
                                <ToggleButton value="3pmto4pm" disabled={true}>15:00 - 16:00</ToggleButton>
                                <ToggleButton value="4.30pmto5pm">16:30 - 17:00</ToggleButton>
                                <ToggleButton value="6.30pmto7.30pm" disabled={true}>18:30 - 19:30</ToggleButton>
                              </ToggleButtonGroup>
                            </Box>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePrescribeDialog}>Cancel</Button>
                        <Button onClick={handlePrescribeModuleOpen}>Save</Button>
                    </DialogActions>
                </Dialog>
                </Card>
                <Box mt={3} width="30%">
                {
                  parseInt(no_of_steps)==1 &&
                    <Box>
                      <TableContainer component={Paper}>
                        <Table aria-label="customized table">
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
                              <StyledTableRow >
                                <StyledTableCell component="th" scope="row">
                                  {possible_cancer}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <Link onClick={(e) => testClickHandler(e, step1)} style={{color: "red"}}>{step1.replace("message: ", "")}</Link>
                                </StyledTableCell>
                              </StyledTableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                }
                </Box>
                 <Box mt={3}  width="50%">
                {
                    parseInt(no_of_steps)==2 &&
                      <Box>
                        <TableContainer component={Paper}>
                          <Table aria-label="customized table">
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
                                <StyledTableRow >
                                  <StyledTableCell component="th" scope="row">
                                    {possible_cancer}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Link onClick={(e) => testClickHandler(e, step1)}>{step1.replace("message: ", "")}</Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Typography fontWeight="bold">{step1}</Typography>
                        <TableContainer component={Paper}>
                          <Table aria-label="customized table">
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
                                <StyledTableRow>
                                  {/* <StyledTableCell component="th" scope="row">
                                    <Link onClick={(e) => testClickHandler(e, row.name)}>{row.name}</Link>
                                  </StyledTableCell> */}
                                  <StyledTableCell>{response1.replace("message: ", "")}</StyledTableCell>
                                  <StyledTableCell>
                                        <Link onClick={(e) => testClickHandler(e, step2)}>{step2.replace("result: ", "")}</Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                  {/* <StyledTableCell component="th" scope="row">
                                    <Link onClick={(e) => testClickHandler(e, row.name)}>{row.name}</Link>
                                  </StyledTableCell> */}
                                  <StyledTableCell>{response1.replace("message: ", "")}</StyledTableCell>
                                  <StyledTableCell>
                                        <Link onClick={(e) => testClickHandler(e, step2)}>{step2.replace("result: ", "")}</Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        </Box>
                    }
                </Box>
                <Box mt={3} width="50%">
                {
                    parseInt(no_of_steps)==3 &&
                      <Box>
                        <TableContainer component={Paper}>
                          <Table aria-label="customized table">
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
                                <StyledTableRow >
                                  <StyledTableCell component="th" scope="row">
                                    {possible_cancer}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <Link onClick={(e) => testClickHandler(e, step1)}>{step1.replace("message: ", "")}</Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Typography fontWeight="bold">{step1}</Typography>
                        <TableContainer component={Paper}>
                          <Table aria-label="customized table">
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
                                <StyledTableRow>
                                  {/* <StyledTableCell component="th" scope="row">
                                    <Link onClick={(e) => testClickHandler(e, row.name)}>{row.name}</Link>
                                  </StyledTableCell> */}
                                  <StyledTableCell>{response1.replace("message: ", "")}</StyledTableCell>
                                  <StyledTableCell>
                                        <Link onClick={(e) => testClickHandler(e, step2)}>{step2.replace("result: ", "")}</Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                  {/* <StyledTableCell component="th" scope="row">
                                    <Link onClick={(e) => testClickHandler(e, row.name)}>{row.name}</Link>
                                  </StyledTableCell> */}
                                  <StyledTableCell>{response1.replace("message: ", "")}</StyledTableCell>
                                  <StyledTableCell>
                                        <Link onClick={(e) => testClickHandler(e, step2)}>{step2.replace("result: ", "")}</Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Typography fontWeight="bold">{step2}</Typography>
                        <TableContainer component={Paper}>
                          <Table aria-label="customized table">
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
                              
                            </TableBody>
                          </Table>
                        </TableContainer>
                        </Box>
                    }
                </Box>
                <Dialog open={oncologyReferralPopup}>
                    <DialogTitle>Oncology referral (Coming Soon...)</DialogTitle>
                    <DialogContent >
                        <Box>
                          <Stack display="flex" >
                            <br></br>
                              <TextField label="Hospital Name"></TextField>
                              <br></br>
                              <TextField label="Doctor"></TextField>
                              <br></br>
                              <TextField label="Notes about patient"></TextField>
                          </Stack>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseOncoRefer}>Cancel</Button>
                        <Button onClick={handleOncoRefer} variant="contained" color="success">Submit</Button>
                    </DialogActions>
                </Dialog>
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