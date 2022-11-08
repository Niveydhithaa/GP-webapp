import React from "react";
import { useState } from "react";
import { Tabs, Tab, AppBar } from "@mui/material";
import Dashboard from './Dashboard';
import Patients from './patients/Patients';
import Analytics from "pages/Analytics"
import Accounts from "pages/Accounts"
import {useNavigate} from "react-router-dom"

interface Props {
    page: string
    history: any
}
export default function Home({page, history, ...props} : Props):JSX.Element {
  const tabNameToIndex = [
    "about",
    "contact"
  ];

  const indexToTabName = {
    about: 0,
    contact: 1
  };

//   const [selectedTab, setSelectedTab] = useState<number>(indexToTabName[page]);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    history.push(`/home/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="About" />
          <Tab label="Contact Us" />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <Patients />}
      {selectedTab === 1 && <Dashboard />}
    </>
  );
};
