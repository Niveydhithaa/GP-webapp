import * as React from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import {useEffect} from "react";
// import Alert from '@mui/joy/Alert';
import SelectPatientStatic from "components/hooks/SelectPatientStatic"
import Box1  from '@mui/joy/Box';
import Navbar from "components/Navbar"
import Analytics from "pages/Analytics"
import Accounts from "pages/Accounts"
import AlertJoy from "components/alerts/AlertJoy"
import ReferPatientDialog from "components/hooks/ReferPatientDialog";
import AlertMUI from "components/alerts/AlertMUI";
import {useLocation, Link} from "react-router-dom"
import Dashboard from './Dashboard';
import Patients from './patients/Patients';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios"
import configData from "config.json"
import VerifiedIcon from '@mui/icons-material/Verified';
import { config } from 'process';
import {
  CheckCircle as CheckCircleIcon,
  Dangerous as DangerousIcon,
  ErrorOutline as ErrorOutlineIcon
} from "@mui/icons-material"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

enum EventStatus {
  LOGIN = 1
}
interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const user = sessionStorage.getItem("userid")
  const check_referral_url = configData.url + "/Getreferalptdetails"
  const refer_email_url = configData.url + "/sendemail"
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const special_chars = ';/:,}{[]()_-`~><.?""&@#$%*!^'.split('');
  // console.log(alphabet);
  const [tabIndex, setIndexValue] = React.useState(0);
  const location = useLocation();
  const [gender, setGender] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [patientNotes, setPatientNotes] = React.useState("")
  const [gpName, setGPName] = React.useState("")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [age, setAge] = React.useState(0)
  const [yasmedId, setYasmedId] = React.useState("")
  const [emailLoading, setEmailLoading] = React.useState(false)
  const [referredPatientDate, setReferredPatientDate]= React.useState('')

  // const [input_dict, setInputDict ] = React.useState<any>();
  const [referDialog, setReferDialog] = React.useState<boolean>(false)
  const [emailSuccess, setEmailSuccess] = React.useState<boolean | string>('default');
  const [addPatientDialog, setAddPatientDialog] = React.useState<boolean>(false);
  const [warnDuplicateReferral, setWarnDuplicateReferral] = React.useState<boolean>(false);
  const [warningConfirm, setWarningConfirm] = React.useState<boolean>(false);
  
  useEffect(() => {
    async function hitEvent() {
      //event login code : 1
      let inputDict:any = {}
      inputDict["params"] = {"empty" : "placeholder"}
      inputDict["userId"] = user
      inputDict["eventCode"] = EventStatus.LOGIN
      let hitApiUrl = "https://fakestoreapi.com/products/1"
      const response = await axios.get(hitApiUrl);
      console.log(response)
    }
    hitEvent()
  }, [])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setIndexValue(newValue);
    localStorage.setItem("tabIndex", newValue.toString())
  };
  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string
) => {
    setGender(newGender);
};
  const handleFirstName = (newFirstName: string) => {
    console.log("Onchange: FirstName: from: " + firstName + "--to: " + newFirstName)
    setFirstName(newFirstName)
  }
  const handleLastName = (newLastName: string) => {
    console.log("Onchange: LastName: from: " + lastName + "--to: " + newLastName)
    setLastName(newLastName)
  }
  const handleGPName = (newGPName: string) => {
    setGPName(newGPName)
  }
  const handlePatientNotes = (newNotes: string) => {
    setPatientNotes(newNotes)
  }
  const handlePhoneNumber = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber)
  }
  const handleAge = (newAge: number) => {
    setAge(newAge)
  }
  const handleYasmedID = (newYasmedID: string) => {
    console.log(newYasmedID)
    setYasmedId(newYasmedID)
  }
  const handlePatientID = (newPatientID: string) => {
    console.log(newPatientID)
  }
  const openReferDialog = () =>{
    setReferDialog(true)
  }
  
  const handleCloseAddPatientDialog = () => {
    setReferDialog(false)
    setPatientNotes('')
    setAge(0)    
    setPatientNotes('')
    setFirstName('')
    setLastName('')
    setGPName('')
    setGender('')
    setYasmedId('')
    setPhoneNumber('')
    setWarningConfirm(false)
    // setWarnDuplicateReferral(false)
    setEmailSuccess('default')
  }
  const closeDuplicateWarning = () => {
    setWarnDuplicateReferral(false)
    handleCloseAddPatientDialog()
  }
  const sendEmailTrigger = () => {
    console.log("into email part")
    var input_dict : Record<string, any> = {}
    input_dict["first_name"] = firstName
    input_dict["last_name"] = lastName
    input_dict["age"] = age
    input_dict["gender"] = gender
    input_dict["phone_number"] = phoneNumber
    input_dict["oopatient_id"] = ''
    input_dict["yasmed_id"] = yasmedId
    input_dict["gp_name"] = gpName
    input_dict["notes"] = patientNotes
    console.log(input_dict)
    setWarnDuplicateReferral(false)
    setEmailLoading(true)
    axios
      .post(refer_email_url, input_dict)
      .then(result => {
        console.log(result);
        setEmailLoading(false)
        console.log(result.data);
        console.log(result.data.message)
        console.log(typeof(result.data.message))
        if(result.data.status==200)
        {
            console.log("yes sent")
            setEmailSuccess(true)
        }
        else
        {
            console.log("no no not sent")
            setEmailSuccess(false)
        }
        return String(result.data);
      })
      .catch(error =>
        console.log(error)
      );
  }
  const handleReferPatient = () => {
    setEmailLoading(true)
    console.log("API integration to validate and save the new patient with given details")
    
    var input_dict : Record<string, any> = {}
    input_dict["first_name"] = firstName
    input_dict["last_name"] = lastName
    input_dict["age"] = age
    input_dict["gender"] = gender
    input_dict["phone_number"] = phoneNumber
    input_dict["oopatient_id"] = ''
    input_dict["yasmed_id"] = yasmedId
    input_dict["gp_name"] = gpName
    input_dict["notes"] = patientNotes
    // setInputDict(input_dict)
    // inputDict["lastname"] = lastName
    axios.post(check_referral_url, input_dict)
    .then(result => {
      setEmailLoading(false)
      console.log(result);
      // setPatientAlreadyReferred(result.data.isSuccess)
      if(result.data.isSuccess==true)
      {
        console.log("already there")
        setReferredPatientDate(result.data.referalptatient_Details.updated_datetime)
        setWarnDuplicateReferral(true)
      }
      else
      {
        setWarnDuplicateReferral(false)
        //run the sending email part here
        sendEmailTrigger()
      }
      return String(result.data);
    })
    .catch(error =>
      console.log(error)
    );
    
    //   // setEmailSuccess(true)
    //   // setReferDialog(false)
  }
  return (
    <Box sx={{backgroundColor: "#EEEEEE", minHeight: "100vh"}}>
      <Navbar></Navbar>
      <>{console.log(sessionStorage.getItem("userid"))}</>
      <Grid container maxWidth="xl" sx={{margin: "0 auto", p: 4}}>
        <Card sx={{p: 2, borderRadius: 4, minHeight: "calc(100vh - 128px)", minWidth: "100%"}}>
          <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}} >
            <Box sx={{display: "flex", width:"80%"}}>
              <Tabs 
                value={tabIndex} 
                onChange={handleChange} 
                aria-label="nav tabs example" 
                variant="scrollable"
                // scrollButtons
                // allowScrollButtonsMobile
              >
                
                <LinkTab label="Patients" href="/patientslist" />
                <LinkTab label="Search Guidelines" href="/dashboard" />
                <LinkTab label="Analytics" href="/" />
                <LinkTab label="Accounts" href="/accounts" />
              </Tabs>
            </Box>
            <Box display="flex" sx={{textAlign: "center"}}>
                <Button variant="contained" onClick={openReferDialog} color="error">Refer Patient</Button>
            </Box>
          </Box>
          <Dialog open={referDialog} onClose={handleCloseAddPatientDialog} fullWidth maxWidth="sm">
              <DialogTitle>
                  <Box display="flex">
                      <Box display="flex" width="100%">
                          Refer Patient
                      </Box>
                      <Box justifyContent="flex-end" sx={{ alignSelf: "center", textAlign: "center" }}>
                          <IconButton onClick={handleCloseAddPatientDialog}><CloseIcon /> </IconButton>
                          {/* todo: icon button */}
                      </Box>
                </Box>
            </DialogTitle>
            <DialogContent >
                {/* <AlertMUI></AlertMUI> */}
                <Box>
                  <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={emailLoading}
                        // onClick={handleClose}
                      >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Box>
                {(emailSuccess=='default') &&
                  <Box className="refer-dialog">
                  {/* <ReferPatientDialog/> */}
                    <Stack>
                      <Box>
                          <Typography fontWeight="bold" fontSize="14px" mb={2}>Patient Details</Typography>
                      </Box>
                      <Box>
                          <TextField
                              label="First Name"
                              id="input_name"
                              required
                              value={firstName}
                              onChange={(e) => handleFirstName(e.target.value)}
                              sx={{ width: "44%" }}
                          // style={{minWidth: "350px"}}
                          />

                          <TextField
                              label="Family/Last Name"
                              id="input_familyname"
                              sx={{ width: "44%", marginLeft: 2 }}
                              value={lastName}
                              onChange={(e) => handleLastName(e.target.value)}
                          // style={{minWidth: "350px"}}
                          />
                      </Box>
                      <br></br>
                      <Box display="flex">
                          <TextField
                              label="Age"
                              id="age"
                              // value={age}
                              InputProps={{
                                inputProps: { min: 0, max: 150 }
                              }}
                              // inputProps={{ type: 'number'}}
                              type="number"
                              placeholder="--"
                              onKeyPress={(event) => {
                                if (event.key == '-' || event.key === '+' || event.key == '.' || event.key === 'e') {
                                  console.log("prohibited")
                                  // event.key=''
                                  event.preventDefault();
                                }
                              }}
                              onChange={(e) => handleAge(Number(e.target.value))}
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
                              onKeyPress={(event) => {
                                for(let i in alphabet)
                                {
                                  if (event.key == alphabet[i]) {
                                    console.log("prohibited")
                                    // event.key=''
                                    event.preventDefault();
                                  }
                                }
                                for(let i in special_chars)
                                {
                                  if (event.key == special_chars[i]) {
                                    console.log("prohibited")
                                    // event.key=''
                                    event.preventDefault();
                                  }
                                }
                                for(let i in ALPHABET)
                                {
                                  if (event.key == ALPHABET[i]) {
                                    console.log("prohibited")
                                    // event.key=''
                                    event.preventDefault();
                                  }
                                }
                                if(event.key=="'" || event.key=="=" || event.key==' ')
                                {
                                  event.preventDefault();
                                }
                              }}
                              id="mobile_num"
                              value={phoneNumber}
                              onChange={(e) => handlePhoneNumber(e.target.value)}
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
                              value={patientNotes}
                              onChange={(e) => handlePatientNotes(e.target.value)}
                              sx={{width: "91%"}}
                              style={{ marginBottom: "12px" }}
                          />
                          
                      </Box>
                      <Box>
                          <TextField
                              label="Yasmed ID"
                              id="yasmed_id"
                              value={yasmedId}
                              onChange={(e) => handleYasmedID(e.target.value)}
                              style={{ marginBottom: "12px", width: "44%" }}
                          />
                          <TextField
                              label="OO Patient ID"
                              sx={{ width: "44%", marginLeft: 2 }}
                              id="patient_id"
                              disabled
                          />
                      </Box>
                      <Box>
                          <Typography fontWeight="bold" mb={2} fontSize="14px">Referrer Details (GP)</Typography>
                      </Box>
                      <Box>
                          <TextField
                              label="Doctor Name"
                              id="gpname"
                              value={gpName}
                              onChange={(e) => handleGPName(e.target.value)}
                              sx={{  width: "44%" }}
                          />
                      </Box>
                  </Stack>
                  {/* {warnDuplicateReferral &&
                    <Box>
                      <Alert severity="warning" sx={{mt: "1rem", width:"100%"}}>
                        <Box justifyContent="center" margin={0} sx={{textAlign: "center"}}>
                          <Typography fontWeight="bold">Proceed further? </Typography>
                          <Typography>Patient Already Referred On: <br></br>{referredPatientDate}</Typography>
                        </Box>
                      </Alert>
                    </Box>
                  } */}
                </Box>
                
                }
                {(emailSuccess==true)
                  &&
                  <Box className="refer-dialog">
                      <Box display="flex" justifyContent="center" alignContent="center" sx={{margin:0, padding: "4rem", fontSize: "12rem", color:"green"}}>
                        {/* <img src="green-checkmark-icon.svg" height="200" width="auto"></img> */}
                        <CheckCircleIcon fontSize="inherit"></CheckCircleIcon>
                      </Box>
                      <Box justifyContent="center" margin={0} sx={{textAlign: "center"}}>
                        <Box className="referral-success-heading">
                          <Typography variant="h4">Referral sent!</Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" margin={0} sx={{textAlign: "center"}}>
                          <Typography>Reference Number:  </Typography> &nbsp; &nbsp;
                          <Typography>GP0001</Typography>
                        </Box>
                      </Box>
                  </Box>
                }
                {
                  (emailSuccess==false)
                  &&
                  <Box className="refer-dialog">
                      <Box display="flex" justifyContent="center" alignContent="center" sx={{margin:0, padding: "4rem", fontSize: "12rem", color:"red"}}>
                        {/* <img src="green-checkmark-icon.svg" height="200" width="auto"></img> */}
                        <DangerousIcon fontSize="inherit"></DangerousIcon>
                      </Box>
                      <Box justifyContent="center" margin={0} sx={{textAlign: "center"}}>
                        <Box className="referral-success-heading">
                          <Typography variant="h4">Referral not sent!</Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" margin={0} sx={{textAlign: "center"}}>
                          <Typography>Reference Number:  </Typography> &nbsp; &nbsp;
                          <Typography>GP0001</Typography>
                        </Box>
                      </Box>
                  </Box>
                }
            </DialogContent>
            <DialogActions>
                {(emailSuccess=='default') && <Button onClick={handleCloseAddPatientDialog}>Cancel</Button>}
                {(emailSuccess=='default') && 
                  <Button 
                    onClick={handleReferPatient} 
                    variant="contained" 
                    disabled={(firstName=='' || phoneNumber=='' )}>
                      Submit
                  </Button>
                }
            </DialogActions>
        </Dialog>
        <Dialog open={warnDuplicateReferral} onClose={closeDuplicateWarning}>
          <DialogTitle>
            <Typography variant="h5">Warning</Typography>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" justifyContent="center" alignContent="center" sx={{margin:0, padding: "1rem", fontSize: "9rem", color:"#ffcc00"}}>
              <ErrorOutlineIcon fontSize="inherit"></ErrorOutlineIcon>
            </Box>
            <Box justifyContent="center" margin={0} sx={{textAlign: "center"}}>
              <Typography fontWeight="bold">Proceed further? </Typography>
              <Typography>Patient Already Referred On: <br></br>{referredPatientDate}</Typography>
              <Box sx={{marginTop: 2}}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={warningConfirm} onChange={
                    (e: any, newValue: boolean) =>
                    setWarningConfirm(newValue)
                  } />} 
                  label="Re-refer the patient again" />
                </FormGroup>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDuplicateWarning}>Cancel</Button>
            <Button onClick={sendEmailTrigger} disabled={!warningConfirm} variant="contained">Yes</Button>
          </DialogActions>
        </Dialog>
                
          <Box sx={{ padding: 2 }}>
            {tabIndex === 0 && (
              <Box>
                {/* <Typography>The first tab</Typography> */}
                <Patients></Patients>
              </Box>
            )}
            {tabIndex === 1 && (
              <Box>
                {/* <Typography>The second tab</Typography> */}
                <Dashboard></Dashboard>
              </Box>
            )}
            {tabIndex === 2 && (
              <Box>
                <Analytics></Analytics>
              </Box>
            )}
            {tabIndex === 3 && (
              <Box>
                <Accounts></Accounts>
              </Box>
            )}
          </Box>
        </Card>
      </Grid>
    </Box>
  );
}
