import { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
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
} from "@mui/material";
import * as React from 'react';
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
import DefaultStepper from "components/DefaultStepper"
import configData from "config.json"
const debugMode = configData.debug
interface Props {
  selectedSymp: string  
  possible_cancer: string
  // any props that come into the component
}
export default function SymptomTracker({selectedSymp, possible_cancer, ...props} : Props) {
    const [topic, setTopic] = useState("New Patient");
    const [patientDialogOpen, setPatientDialogOpen] = useState<boolean>(false);
    const [testNameSelected, setTestNameSelected] = useState<string>("");
    const [noofsymptoms, setNoofSymptoms] = useState(sessionStorage.getItem("noofsymptopms"))
    let arr = new Array(Number(noofsymptoms))
    const [value, setValue] = useState<Dayjs | null>(
      dayjs('2022-10-21T19:00:00'),
    );
  
    const handleChange = (newValue: Dayjs | null) => {
      setValue(newValue);
    };


    const testClickHandler = (e: React.MouseEvent<HTMLButtonElement>, test_name: string) => {
      setPatientDialogOpen(true)
      if(debugMode) console.log("Testname selected: " +test_name)
      localStorage.setItem("selected_test_for_prescription", test_name)
      // setTestNameSelected(test_name)
    }
    const handleClosePrescribeDialog = () => {
      setPatientDialogOpen(false)
    }
    const handlePrescribeModuleOpen = () => {
      if(debugMode) {
        console.log(document.getElementById("mobile_num"))
        console.log(document.getElementById("name_input"))
        console.log(localStorage.getItem("selected_test_for_prescription"))
      }
      setPatientDialogOpen(false)
    }
    return(
        <Box>
          {/* {arr.map((arr_el) => ( */}
              <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                sx={{backgroundColor: "#EEEEEE"}}
                id="panel1a-header"
              >
                <Typography fontWeight="bold">{selectedSymp}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography fontSize="12px">
                  Last updated on 17/10/2022.
                </Typography>
                <Box width="25%">
                  {/* <TableContainer component={Paper}>
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
                              Breast
                            </StyledTableCell>
                          </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer> */}
                </Box>
                <DefaultStepper possible_cancer={possible_cancer}></DefaultStepper>
              </AccordionDetails>
              </Accordion>
        </Box>
    )
}