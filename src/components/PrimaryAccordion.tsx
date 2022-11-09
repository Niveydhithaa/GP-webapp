import { useState, ReactNode } from "react";
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
  Divider
} from "@mui/material";
import Alert from '@mui/joy/Alert';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Box1 from '@mui/joy/Box';
import AlertMUI from "components/alerts/AlertMUI"
import SelectHospitalStatic from "components/hooks/SelectHospitalStatic"
import SelectPatientStatic from "components/hooks/SelectPatientStatic"
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
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  findings: string
  possible_cancer: string
  gender_specific: string
  recommendation: string
  // any props that come into the component
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    backgroundColor: "#EEEEEE",
    color: "black",
    fontWeight: "800"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
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
function disableRandomDates() {
  return Math.random() > 0.7;
}
export default function AccordionExample({ findings, possible_cancer, gender_specific, recommendation, ...props }: Props) {
  const [topic, setTopic] = useState("New Patient");
  const [patientDialogOpen, setPatientDialogOpen] = useState<boolean>(false);
  const [suggeDialog, setSuggestionsDialog] = useState<boolean>(false)
  const [oncologyReferralPopup, setOncologyReferralPopup] = useState<boolean>(false)
  const [testNameSelected, setTestNameSelected] = useState<string>("");
  const [gender, setGender] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [noofsymptoms, setNoofSymptoms] = useState(sessionStorage.getItem("noofsymptopms"))
  let arr = new Array(Number(noofsymptoms))
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(),
  );

  const handleChangeDate = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  const handleClosePrescribeDialog = () => {
    setPatientDialogOpen(false)
  }
  const handlePrescribeModuleOpen = () => {
    console.log(document.getElementById("mobile_num"))
    console.log(document.getElementById("name_input"))
    console.log(localStorage.getItem("selected_test_for_prescription"))

    setPatientDialogOpen(false)
  }
  const handleTimeSlot = (
    event: React.MouseEvent<HTMLElement>,
    newTimeSlot: string
  ) => {
    setTimeSlot(newTimeSlot);
  };
  const testClickHandler = (e: React.MouseEvent<HTMLSpanElement> | React.MouseEvent<HTMLAnchorElement>, test_name: string) => {
    setPatientDialogOpen(true)
    console.log(recommendation)
    console.log("Recommendation selected: " +test_name)
    localStorage.setItem("selected_test_for_recommendation", test_name)
    // setTestNameSelected(test_name)
  }
  return (

    <Box mt={3}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: "#EEEEEE" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight="bold">{findings}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {findings}
          </Typography>
          <Typography>
            {/* {!gender_specific &&
                        <Typography fontSize="10px">Not gender specific!</Typography>
                  }
                  {gender_specific &&
                        <Typography fontSize="10px">Specific to: {gender_specific}</Typography>
                  } */}
          </Typography>
          <Box mt={3}>
            <Box>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        Possible Cancer
                      </StyledTableCell>
                      <StyledTableCell>
                        Recommendation
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow >
                      <StyledTableCell component="th" scope="row">
                        {possible_cancer}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link onClick={(e) => testClickHandler(e, recommendation)}><p className="prescribelink">{recommendation}</p></Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

        </AccordionDetails>
      </Accordion>
      <Dialog open={patientDialogOpen} onClose={handleClosePrescribeDialog} fullWidth sx={{ padding: "24px" }} maxWidth="md">
        <DialogTitle>
          {/* <Tooltip title="Hospital Inegration is still onprocess. Once EMR is connected, this dialog will be activated" arrow>
                        <IconButton><InfoIcon color="primary"/></IconButton>
                      </Tooltip> */}
          <Box display="flex">
            <Box display="flex" width="100%">
              Prescribe (Coming Soon...)
            </Box>
            <Box justifyContent="flex-end" sx={{ alignSelf: "center", textAlign: "center" }}>
              <IconButton onClick={handleClosePrescribeDialog}><CloseIcon /> </IconButton>
              {/* todo: icon button */}
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent >
          <AlertMUI></AlertMUI>
          <Stack>
            <br></br>
            <Box>
              <SelectPatientStatic></SelectPatientStatic>
            </Box>
            <Box sx={{ border: '1px solid grey' }} mt={2} padding={1} >
              <Box display="flex" sx={{ backgroundColor: "#fff" }}>

                <Box p={1.5} width="200px">
                  <p className="patient-name">Patient1</p>
                  <p className="patient-details">32 | F | Chennai</p>
                  <p className="patient-id">88890038556</p>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box p={1.5} className="patient-ids-group">
                  <Box display="flex" flexWrap="nowrap">
                    <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="90%">
                      <p>Optimal ID</p>
                      <p>:</p>
                    </Box>
                    <Box width="10%">
                      <p><b>BCHT00022</b></p>
                    </Box>
                  </Box>
                  <Box display="flex" flexWrap="nowrap">
                    <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="90%">
                      <p><b>GP ID</b></p>
                      <p>:</p>
                    </Box>
                    <Box width="10%">
                      GP00022
                    </Box>
                  </Box>
                  <Box display="flex" flexWrap="nowrap">
                    <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="90%">
                      <p><b>Hospital ID</b></p>
                      <p>:</p>
                    </Box>
                    <Box width="10%">
                      <p><b>HT00022</b></p>
                    </Box>
                  </Box>
                  <Box display="flex" flexWrap="nowrap">
                    <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="90%">
                      <p>Last Consulted On</p>
                      <p>:</p>
                    </Box>
                    <Box width="10%">
                      17/10/2022
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Table sx={{ minWidth: 100, marginTop: 2 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    Recommendation
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {localStorage.getItem("selected_test_for_recommendation")}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
            <br></br>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrescribeDialog}>Cancel</Button>
          <Button onClick={handlePrescribeModuleOpen}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* ))} */}
    </Box>
  )
}