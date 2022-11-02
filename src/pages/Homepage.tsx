import * as React from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card
} from "@mui/material";
import Alert from '@mui/joy/Alert';
import Box1  from '@mui/joy/Box';
import Navbar from "components/Navbar"
import Analytics from "pages/Analytics"
import Accounts from "pages/Accounts"
import AlertJoy from "components/alerts/AlertJoy"

import {useLocation, Link} from "react-router-dom"
import Dashboard from './Dashboard';
import Patients from './patients/Patients';
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setIndexValue(newValue);
    localStorage.setItem("tabIndex", newValue.toString())
  };

  return (
    <Box sx={{backgroundColor: "#EEEEEE", minHeight: "100vh"}}>
      <Navbar></Navbar>
      <Grid container maxWidth="xl" sx={{margin: "0 auto", p: 4}}>
        <Card sx={{p: 2, borderRadius: 4, minHeight: "calc(100vh - 128px)", minWidth: "100%"}}>
          <Box sx={{ width: '80%', alignItems: "center"}} >
            <Tabs value={tabIndex} onChange={handleChange} aria-label="nav tabs example">
              
              <LinkTab label="Patients" href="/patientslist" />
              <LinkTab label="Search Guidelines" href="/dashboard" />
              <LinkTab label="Analytics" href="/" />
              <LinkTab label="Accounts" href="/accounts" />
            </Tabs>
          </Box>
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
