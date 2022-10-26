import * as React from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab
} from "@mui/material";
import Navbar from "components/Navbar"

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
    <Box>
      <Navbar></Navbar>
      <Box sx={{ width: '80%', alignItems: "center"}} mt={4} mb={4} ml={16} >
        <Tabs value={tabIndex} onChange={handleChange} aria-label="nav tabs example">
          <LinkTab label="NICE Guidelines" href="/dashboard" />
          <LinkTab label="Patients" href="/patientslist" />
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <Box>
            {/* <Typography>The first tab</Typography> */}
            <Dashboard></Dashboard>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            {/* <Typography>The second tab</Typography> */}
            <Patients></Patients>
          </Box>
        )}
        {tabIndex === 2 && (
          <Box>
            <Typography>The third tab</Typography>
          </Box>
        )}
    </Box>
    </Box>
  );
}
