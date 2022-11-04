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
  Divider
} from "@mui/material";
import Alert from '@mui/joy/Alert';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Box1  from '@mui/joy/Box';
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
export default function AccordionExample({findings, possible_cancer, gender_specific, recommendation, ...props} : Props) {
    const [topic, setTopic] = useState("New Patient");
    const [patientDialogOpen, setPatientDialogOpen] = useState<boolean>(false);
    const [suggeDialog, setSuggestionsDialog] = useState<boolean>(false)
    const [oncologyReferralPopup, setOncologyReferralPopup] = useState<boolean>(false)
    const [testNameSelected, setTestNameSelected] = useState<string>("");
    const [gender, setGender] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [noofsymptoms, setNoofSymptoms] = useState(sessionStorage.getItem("noofsymptopms"))
    let arr = new Array(Number(noofsymptoms))
    return(
        
        <Box mt={3}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{backgroundColor: "#EEEEEE"}}
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
                                  <Link><p className="prescribelink">{recommendation}</p></Link>
                                </StyledTableCell>
                              </StyledTableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                </Box>
                 
              </AccordionDetails>
            </Accordion>
          {/* ))} */}
        </Box>
    )
}