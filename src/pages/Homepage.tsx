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
  Stack
} from "@mui/material";
import Alert from '@mui/joy/Alert';
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
  const [tabIndex, setIndexValue] = React.useState(0);
  const location = useLocation();
  const [gender, setGender] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [patientNotes, setPatientNotes] = React.useState("")
  const [gpName, setGPName] = React.useState("")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [age, setAge] = React.useState(0)
  const [yasmedId, setYasmedId] = React.useState(0)

  const [referDialog, setReferDialog] = React.useState<boolean>(false)
  const [emailSuccess, setEmailSuccess] = React.useState<boolean>(false);
  const [addPatientDialog, setAddPatientDialog] = React.useState<boolean>(false);
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
    console.log("Onchange: LastName: from: " + firstName + "--to: " + newLastName)
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
  const handleYasmedID = (newYasmedID: number) => {
    console.log(newYasmedID)
    setYasmedId(newYasmedID)
  }
  const openReferDialog = () =>{
    setReferDialog(true)
  }
  const handleCloseAddPatientDialog = () => {
    setReferDialog(false)
    setEmailSuccess(false)
  }
  const handleReferPatient = () => {
    console.log("API integration to validate and save the new patient with given details")
    const refer_email_url = configData.url + "/sendemail"
    var input_dict : Record<string, any> = {}
    input_dict["patient_name"] = firstName + lastName
    input_dict["age"] = 12
    input_dict["gender"] = gender
    input_dict["mobile_number"] = "96567892911"
    input_dict["patient_id"] = 19
    input_dict["yasmed_id"] = 20
    input_dict["gp_name"] = "Dr. Mohan"
    input_dict["notes"] = "Lorem ipsum deor Lorem ipsum deor Lorem ipsum deor Lorem ipsum deor"
    // inputDict["lastname"] = lastName
    
    axios
      .post(refer_email_url, input_dict)
      .then(result => {
        console.log(result);
        console.log(result.data);
        console.log(result.data.message)
        console.log(typeof(result.data.message))
        if(result.data.status==200)
        {
            console.log("yes sent")
            setEmailSuccess(true)
        }
        return String(result.data);
      })
      .catch(error =>
        console.log(error)
      );
      // setEmailSuccess(true)
      // setReferDialog(false)
  }
  return (
    <Box sx={{backgroundColor: "#EEEEEE", minHeight: "100vh"}}>
      <Navbar></Navbar>
      <Grid container maxWidth="xl" sx={{margin: "0 auto", p: 4}}>
        <Card sx={{p: 2, borderRadius: 4, minHeight: "calc(100vh - 128px)", minWidth: "100%"}}>
          <Box sx={{alignItems: "center", justifyContent: "space-around"}} >
            <Tabs value={tabIndex} onChange={handleChange} aria-label="nav tabs example" sx={{display: "flex"}}>
              
              <LinkTab label="Patients" href="/patientslist" />
              <LinkTab label="Search Guidelines" href="/dashboard" />
              <LinkTab label="Analytics" href="/" />
              <LinkTab label="Accounts" href="/accounts" />
              <Box display="flex" sx={{marginLeft: "52%", justifyContent: "flex-end"}}>
                <Button variant="contained" onClick={openReferDialog} color="error">Refer Patient</Button>
              </Box>
            </Tabs>
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
                {!emailSuccess &&
                  <Box>
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
                              value={age}
                              type="number"
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
                              type="number"
                              onChange={(e) => handleYasmedID(Number(e.target.value))}
                              style={{ marginBottom: "12px", width: "44%" }}
                          />
                          <TextField
                              label="OO Patient ID"
                              sx={{ width: "44%", marginLeft: 2 }}
                              id="patient_id"
                              value={99}
                              disabled
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
                              value={gpName}
                              onChange={(e) => handleGPName(e.target.value)}
                              sx={{  width: "44%" }}
                          />
                      </Box>
                  </Stack>
                </Box>

                }
                {emailSuccess
                  &&
                  <Box>
                      <Box display="flex" justifyContent="center" sx={{height: "calc(100% - 64px)", maxWidth: "600px"}}>
                        <img src="green-checkmark-icon.svg" height="250"></img>
                      </Box>
                      <Typography>Referral sent!</Typography>
                  </Box>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAddPatientDialog}>Cancel</Button>
                {!emailSuccess && <Button onClick={handleReferPatient} variant="contained">Submit</Button>}
                {emailSuccess && <Button onClick={handleCloseAddPatientDialog} variant="contained">Done</Button>}

            </DialogActions>
        </Dialog>
        {/* <Dialog open={emailSuccess} onClose={handleCloseAddPatientDialog}>
          <DialogTitle>
            <Typography>Title of succcess email</Typography>
          </DialogTitle>
          <DialogContent>
            <VerifiedIcon />
            <Typography>Referral sent!</Typography>
          </DialogContent>
        </Dialog> */}
                
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
