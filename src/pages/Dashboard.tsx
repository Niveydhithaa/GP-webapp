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
import axios from "axios";

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
  const [multiSelectOptions, setMultiSelectOptions] = useState<Record<string, string>[]>([])
  const handleTopic = (
    event: React.MouseEvent<HTMLElement>,
    newTopic: string
  ) => {
    setTopic(newTopic);
  };
  const CreateDict = (label: string, sympname: string) =>
  {
    return {label: sympname, value: sympname.toLowerCase()}
  }
  const fetchData = (e: React.FocusEvent<HTMLInputElement, Element>, topic: string) => {
    //for now topic is only symptom
    axios
      .get('https://localhost:44370/GPValues/Getsymptomdata')
      .then(result => {
          // console.log(result);
          console.log(result.data);
          let symptomdata_Details = result.data.symptomdata_Details;
          console.log(symptomdata_Details)
          var symptoms_temp_dict :Record<string, string>[] = [];
          symptomdata_Details.forEach(function (value : any) {
            // console.log(value);
            let v = CreateDict("label", value.symptom)
            // console.log(v)
            symptoms_temp_dict.push(v)

          });
          console.log(symptoms_temp_dict)
          setMultiSelectOptions(symptoms_temp_dict)
          // ({
          //     repos: result.data,
          //     isLoading: false
          // });
          return String(result.data);
      })
      .catch(error =>
          console.log(error)
      );
  }
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
      sx={{ pb: 5 }}
    >
      {/* <Navbar /> */}
      <Container>
        <Box display="flex" flexWrap="wrap" gap={2}>
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
                  // size="small"
                  // multiline={true}
                  // rows={2}
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
                    onFocus = {(e) => fetchData(e, topic)}
                  />
            </Box>

          
            <Box>
              <Button variant="contained" onClick={handleSearchSymptom}>
                Search
              </Button>
            </Box>
        </Box>
        
        {/* No data section */}
        <Box sx={{ mt: 2, minHeight:"50px"}}>
          
            {
              noofsymptoms==0 &&
              <Box m="auto" display="flex" alignItems="center" justifyContent="center" sx={{verticalAlign: "middle"}}>
                <Typography fontFamily="sans-serif" fontSize="13px" >No Symptom Selected!</Typography>
              </Box>               
            }
            {
              noofsymptoms>0 &&
              <Box
                width="100%"
                // display="flex"
                // justifyContent="center"
                // alignItems="center"
              >
                
                <Box>
                  <Box>
                    <Typography fontSize="13px">Showing {noofsymptoms} symptom result(s) based on NICE Guidelines v2022. </Typography>
                  </Box> 
                  {
                    symptoms_selected.map((symptom) => (
                      <Box>
                        <AccordionExample></AccordionExample>
                      </Box>
                    ))}
                </Box>
              </Box>
            }
          
        </Box>
      </Container>
    </Box>
  );
};
