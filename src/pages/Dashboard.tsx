import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  MenuItem,
  Autocomplete,
  TextField,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
// import MultiSelect from 'components/MultiSelect'
import MultiSelect from 'react-select'
import { symptomOptions } from './data'
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Navbar from "components/Navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import AccordionExample from "components/AccordionExample";

const topSearchResults = () => [
  {
    title: "symptom 1",
  },
  {
    title: "symptom 2",
  },
  {
    title: "symptom 3",
  },
  {
    title: "symptom 4",
  },
];

const ageResult = () => [
  {
    title: 10,
  },
  {
    title: 20,
  },
  {
    title: 30,
  },
];

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
  return { name, calories, fat };
}
function createData_StepTwo(name: string, result: string, action: string) {
  return { name, result, action };
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

export default function Dashboard() {
  const [topic, setTopic] = useState("symptom");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [symptoms_selected, setSymptomsSelected] = useState<string[]>([])
  const [noofsymptoms, setNoOfSymptoms] = useState<number>(0)
  const handleTopic = (
    event: React.MouseEvent<HTMLElement>,
    newTopic: string
  ) => {
    setTopic(newTopic);
  };

  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string
  ) => {
    setGender(newGender);
  };

  const handleAge = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleSearchSymptom = () => {
    const selected_options = (document.getElementById("multiselect") as HTMLInputElement)
    const children_options = (selected_options.getElementsByClassName("css-12jo7m5 select__multi-value__label") as HTMLCollection);
    console.log(children_options)
    let temp_array: string[] = []
    let item_select: string;
    for (let i = 0; i < children_options.length; i++) {
      item_select = children_options[i].innerHTML
      console.log(item_select)
      temp_array.push(item_select)
    }
    setSymptomsSelected(temp_array)
    setNoOfSymptoms(temp_array.length)
    // console.log(pswd)
  }
  return (
    <Box
      width="100%"
      minHeight="100vh"
      sx={{ backgroundColor: "#ECEFF1", pb: 5 }}
    >
      <Navbar />
      <Container>
        <Box display="flex" flexWrap="wrap" gap={2} mt={6}>
          {/* Topic */}
          <Box>
            <Typography fontWeight="bold" mb={2}>Topic</Typography>
            <Box>
              <ToggleButtonGroup
                color="primary"
                value={topic}
                exclusive
                onChange={handleTopic}
                aria-label="Platform"
                defaultValue={"symptom"}

              >
                <ToggleButton value="symptom" id="toggle_symptom">Symptom</ToggleButton>
                <ToggleButton value="site">Site</ToggleButton>
                <ToggleButton value="primaryCare">
                  Primary care Investigations
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Gender */}
          <Box>
            <Typography fontWeight="bold" mb={2}>Gender</Typography>
            <Box>
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
          </Box>

          {/* Age */}
          <Box>
            <Typography fontWeight="bold" mb={2}>Age</Typography>
            <Autocomplete
              freeSolo
              disableClearable
              options={ageResult().map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Age"
                  InputProps={{
                    ...params.InputProps,
                    type: "Age",
                  }}
                />
              )}
              sx={{ width: "100px" }}
            />
          </Box>
        </Box>
        {/* SEARCH COMPONENT */}
        <Box display="flex" flexWrap="wrap" gap={2} mt={4}>
            <Box minWidth="50%" maxWidth="80%">
              <MultiSelect
                    // defaultValue={[symptomOptions[2], symptomOptions[3]]}
                    isMulti
                    name="symptoms"
                    options={symptomOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    id="multiselect"
                    
                  />
            </Box>

          
            <Box>
              <Button variant="contained" onClick={handleSearchSymptom}>
                Search
              </Button>
            </Box>
        </Box>
        
        {/* No data section */}
        <Card sx={{ mt: 3 }}>
          <Box>
            <Typography>Testing Reusable Accordion</Typography>
            <br></br>
          </Box>
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box>

              {
                symptoms_selected.map((symptom) => (
                  <Box>
                    <AccordionExample></AccordionExample>
                    <br></br>
                  </Box>
                ))}
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};
