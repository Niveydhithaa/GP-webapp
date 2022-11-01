import { useState , ReactNode} from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Autocomplete,
  Tooltip,
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
  IconButton,
} from "@mui/material";
import Alert from '@mui/joy/Alert';
import Box1  from '@mui/joy/Box';
import AlertMUI from "components/alerts/AlertMUI"
import SelectHospitalStatic from "components/hooks/SelectHospitalStatic"
import Navbar from "components/Navbar";
import InfoIcon from '@mui/icons-material/Info';
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
  rsponse1_1: string
  rsponse1_2: string
  no_of_steps: string
  step2_1: string
  step2_2: string
  response2_1: string
  response2_2: string
  step3_1: string
  step3_2: string
  step1_test: string
  step2_test: string
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
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: "#F6F5F5",
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
export default function AccordionExample({selectedSymp, possible_cancer, gender_specific, step1, rsponse1_1, rsponse1_2, no_of_steps, step2_1, step2_2, response2_1, response2_2, step3_1, step3_2, step1_test, step2_test, ...props} : Props) {
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
        
        <Box mt={3} width="70%">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{backgroundColor: "#EEEEEE"}}
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
                <Card>
                <Dialog open={patientDialogOpen} onClose={handleClosePrescribeDialog}>
                    <DialogTitle>Prescribe (Coming Soon...)
                      {/* <Tooltip title="Hospital Inegration is still onprocess. Once EMR is connected, this dialog will be activated" arrow>
                        <IconButton><InfoIcon color="primary"/></IconButton>
                      </Tooltip> */}
                      <AlertMUI></AlertMUI>
                    </DialogTitle>
                    
                    
                    <DialogContent >
                        <Stack>
                          <br></br>
                          <Box>
                            <TextField
                                label="Name"
                                id="input_name"
                                required
                                sx={{width:"44%"}}
                                // style={{minWidth: "350px"}}
                              />
                            
                            <TextField
                                label="Surname"
                                id="input_surname"
                                required
                                sx={{width:"44%", marginLeft: 2}}
                                // style={{minWidth: "350px"}}
                              />
                          </Box>
                          <br></br>
                          <Box display="flex">
                            <TextField
                              label="Age"
                              id="age"
                              required
                              sx={{width:"44%"}}
                            />
                            &nbsp; &nbsp;
                            <ToggleButtonGroup
                              color="primary"
                              value={gender}
                              sx={{width:"44%", marginLeft: 1}}
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
                              style={{marginBottom: "12px", width:"44%"}}
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
                <Box mt={3}>
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
                                  <Link onClick={(e) => testClick_OpenOncologistPopup(e, step1)} style={{color: "red"}}><p className="prescribelink">{step1.replace("message: ", "")}</p></Link>
                                </StyledTableCell>
                              </StyledTableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                }
                </Box>
                 <Box>
                {
                    parseInt(no_of_steps)==2 &&
                      <Box>
                        <Box mt={3}>
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
                                    <Link onClick={(e) => testClickHandler(e, step1)}><p className="prescribelink">{step1}</p></Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        </Box>
                        
                        
                        <Box mt={3}>
                        <Typography fontWeight="bold">{step1_test? step1_test : step1}</Typography>
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
                                <TableRow>
                                  {/* <StyledTableCell component="th" scope="row">
                                    <Link onClick={(e) => testClickHandler(e, row.name)}>{row.name}</Link>
                                  </StyledTableCell> */}
                                  <StyledTableCell>{rsponse1_1}</StyledTableCell>
                                  <StyledTableCell>
                                        <Link onClick={(e) => testClickHandler(e, step2_1)}><p className="prescribelink">{step2_1}</p></Link>
                                  </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                  {/* <StyledTableCell component="th" scope="row">
                                    <Link onClick={(e) => testClickHandler(e, row.name)}>{row.name}</Link>
                                  </StyledTableCell> */}
                                  <StyledTableCell>{rsponse1_2}</StyledTableCell>
                                    <StyledTableCell>
                                      <Link onClick={(e) => testClick_OpenOncologistPopup(e, step2_2)} style={{color: "red"}}><p className="prescribelink">{step2_2}</p></Link>
                                    </StyledTableCell>
                                </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        </Box>
                      </Box>
                    }
                </Box>
                <Box>
                {
                    parseInt(no_of_steps)==3 &&
                      <Box>
                        <Box mt={3}>
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
                                    <Link onClick={(e) => testClickHandler(e, step1)}><p className="prescribelink">{step1}</p></Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        </Box>
                        
                        <Box mt={3} >
                        <Typography fontWeight="bold">{step1_test? step1_test : step1}</Typography>
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
                                  <StyledTableCell>{rsponse1_1}</StyledTableCell>
                                  <StyledTableCell>
                                        <Link onClick={(e) => testClickHandler(e, step2_1)}><p className="prescribelink">{step2_1}</p></Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                  {/* <StyledTableCell component="th" scope="row">
                                    <Link onClick={(e) => testClickHandler(e, row.name)}>{row.name}</Link>
                                  </StyledTableCell> */}
                                  <StyledTableCell>{rsponse1_2}</StyledTableCell>
                                  <StyledTableCell>
                                        <Link onClick={(e) => testClickHandler(e, step2_2)}><p className="prescribelink">{step2_2}</p></Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        </Box>
                        
                        <Box mt={3} >
                        <Typography fontWeight="bold">{step2_test? step2_test : step2_1}</Typography>
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
                                  <StyledTableCell>{response2_1}</StyledTableCell>
                                  <StyledTableCell>
                                        <Link onClick={(e) => testClickHandler(e, step3_1)}><p className="prescribelink">{step3_1}</p></Link>
                                  </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                  {/* <StyledTableCell component="th" scope="row">
                                    <Link onClick={(e) => testClickHandler(e, row.name)}>{row.name}</Link>
                                  </StyledTableCell> */}
                                  <StyledTableCell>{response2_2}</StyledTableCell>
                                    <StyledTableCell>
                                      <Link onClick={(e) => testClick_OpenOncologistPopup(e, step3_2)} style={{color: "red"}}><p className="prescribelink">{step3_2}</p></Link>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        </Box>
                      </Box>
                    }
                </Box>
                <Dialog open={oncologyReferralPopup} onClose={handleCloseOncoRefer}>
                    <DialogTitle>Oncology referral (Coming Soon...)
                    <AlertMUI></AlertMUI>
                    </DialogTitle>
                    <DialogContent >
                        <Box>
                          <Stack display="flex" >
                            <br></br>
                              <SelectHospitalStatic></SelectHospitalStatic>
                              <br></br>
                              <TextField label="Doctor"></TextField>
                              <br></br>
                              <TextField multiline={true} label="Notes about patient"></TextField>
                          </Stack>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseOncoRefer}>Cancel</Button>
                        <Button onClick={handleOncoRefer} variant="contained" color="success">Submit</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={suggeDialog} onClose={handleCloseSuggeDialog}>
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