import { useState } from "react";
import {
  Box,
  Typography,
  Container,
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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Navbar from "components/Navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import AccordionExample from "components/AccordionExample";
import MultiSelect from 'components/MultiSelect'

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
  sessionStorage.setItem("noofsymptoms", "3")
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

const Dashboard = () => {
  const [topic, setTopic] = useState("all");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleTopic = (
    event: React.MouseEvent<HTMLElement>,
    newTopic: string
  ) => {
    sessionStorage.setItem("noofsymptoms", "3")
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
  return (
    <Box
      width="100%"
      minHeight="100vh"
      sx={{ backgroundColor: "#ECEFF1", pb: 5 }}
    >
      <Navbar />
      <Container maxWidth="xl">
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
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="symptom">Symptom</ToggleButton>
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

          {/* Search */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontWeight="bold" mb={2}>Search Symptoms</Typography>
            {/* <Autocomplete
              freeSolo
              disableClearable
              options={topSearchResults().map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            /> */}
            <MultiSelect></MultiSelect>
          </Box>
        </Box>

        {/* Data found */}
        <Card sx={{ mt: 3}}>
          <Box width="80%" minHeight="500px" p={3} sx={{ml: 10}}>
            {/* <AccordionExample selectedSymp={""}></AccordionExample>            */}
          </Box>
        </Card>

        {/* No data section */}
        <Card sx={{ mt: 3 }}>
          <Box
            width="100%"
            height="500px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>No Data Found</Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
