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
  IconButton,
  Grid
} from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
// import MultiSelect from 'components/MultiSelect'
import MultiSelect, { MultiValue } from 'react-select'
// import Select from 'react-select'
import { symptomOptions } from './data'
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Navbar from "components/Navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import AccordionExample from "components/AccordionExample";
import axios from "axios";

let age_global : any = 0;
let age_global_lt : any = 0;
const ageResult = () => [
  {
    title: 18,
  },
  {
    title: 24,
  },
  {
    title: 50,
  },
  {
    title: 60,
  }
];
var multiSelectDict_global : MultiValue<Record<string, string>>;
const emptyOption : Record<string,string>[]= [
  {label: "", value: ""}
]

export default function Dashboard() {
  const [topic, setTopic] = useState("symptom");
  const [gender, setGender] = useState("no");
  const [possibleCancer, setPossibleCancer]=useState("")
  const [step1_test, setStep1_Test] = useState("")
  const [age, setAge] = useState("");
  const [age_lt, setAgeLt] = useState("");
  const [symptoms_selected, setSymptomsSelected] = useState<string[]>([])
  const [noofsymptoms, setNoOfSymptoms] = useState<number>(0)
  const [multiSelectOptions, setMultiSelectOptions] = useState<Record<string, string>[]>([])
  const [selectedFromMultiDict, setSelectedFromMultiDict] = useState<MultiValue<Record<string, string>>>([])
  const [noFilterPopup, setNoFiltersPopup] = useState<boolean>(false);
  const [resetComponent, setResetComponent] = useState<boolean>(false);
  const [totalSymptomsinList, setTotalSymptomsinList] = useState<number>(0);
  const refreshComponents = () => {
    //version 1 hard refresh
    // window.location.reload();
    setGender("")
    setAge("")
    setAgeLt("")
    setSelectedFromMultiDict([])
    setNoOfSymptoms(0)
    let a = document.getElementById("age_value") as HTMLInputElement
    a.value=""
  }
  const handleTopic = (
    event: React.MouseEvent<HTMLElement>,
    newTopic: string
  ) => {
    setTopic(newTopic);
  };
  const CreateDict = (label: string, sympname: string, possible_cancer: string, gender: string, step1: string, response1: string, nosteps: string, step2: string) =>
  {
    return {label: sympname, value: sympname.toLowerCase(), possible_cancer: possible_cancer, gender: gender, step1: step1, response1: response1, nosteps: nosteps, step2: step2}
  }
  const fetchData = (e: React.FocusEvent<HTMLInputElement, Element>, topic: string) => {
      if(age_global==0 && age_global_lt==0)
      {
        console.log('no age selected')
        axios
          .get('https://localhost:44370/GPValues/Getsymptomdata')
          .then(result => {
              if(age==null && gender==null)
              {
                setNoFiltersPopup(true)
              }
              // debugger;
              let symptomdata_Details = result.data.symptomdata_Details;
              console.log(symptomdata_Details)
              var symptoms_temp_dict :Record<string, string>[] = [];
              symptomdata_Details.forEach(function (value : any) {
                // console.log(value);
                
                // console.log(v)
                console.log(value.possible_cancer)
                console.log(value.step1_test)
                setStep1_Test(value.step1_test)
                setPossibleCancer(value.possible_cancer)
                
                if(gender=="no")
                {
                  // debugger;
                  console.log("no gender no age bar")
                  console.log(typeof(age))
                  console.log(typeof(value.age_gt))
                  if(age==value.age_gt)
                  {
                    console.log("yes age equal")
                  }
                  let v = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                  symptoms_temp_dict.push(v)
                }
                //male and others without male
                else if(gender!="female")
                {
                  // debugger;
                  let g:string = value.gender;
                  if(g!==null)
                  {
                    //remove redundant white spaces
                    console.log(g)
                    g = g.replace(/^\s+|\s+$/gm,'');
                  }
                  // console.log(g)
                  if(g!="F")
                  {
                    console.log(value.symptom)
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                    symptoms_temp_dict.push(v1)
                  }
                }
                //female and others without filter
                else
                {
                  let g:string = value.gender;
                  if(g!==null)
                  {
                    //remove redundant white spaces
                    g = g.replace(/^\s+|\s+$/gm,'');
                    console.log(g)
                  }
                  if(g!="M")
                  {
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                    symptoms_temp_dict.push(v1)
                  }
                  
                }
                
              });
              console.log(symptoms_temp_dict)
              setMultiSelectOptions(symptoms_temp_dict)
              symptoms_temp_dict = []
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
      else if(age_global_lt==0)
      {
        const input_dict : Record<string, number> = {};
        input_dict['age_gt'] = age_global
        console.log(age_global + "%$&*#(@" + age_global_lt)
        axios
          .get(`https://localhost:44370/GPValues/GetSymptomdatafilter?agegt=${age_global}`)
          .then(result => {
              console.log(result.data)
              if(age==null && gender==null)
              {
                setNoFiltersPopup(true)
              }
              // debugger;
              // let symptomdata_Details1 = result.data.symptomdata_Details1;
              // console.log(symptomdata_Details1)
              // let symptomdata_Details2 = result.data.symptomdata_Details2;
              // console.log(symptomdata_Details2)
              let symptomdata_Details = result.data.symptomdata_Details
              console.log(symptomdata_Details)
              var symptoms_temp_dict :Record<string, string>[] = [];
              symptomdata_Details.forEach(function (value : any) {
                // console.log(value);
                
                // console.log(v)
                console.log(value.possible_cancer)
                console.log(value.step1_test)
                setStep1_Test(value.step1_test)
                setPossibleCancer(value.possible_cancer)
                
                if(gender=="no")
                {
                  // debugger;
                  console.log(typeof(age))
                  console.log(typeof(value.age_gt))
                  if(age==value.age_gt)
                  {
                    console.log("yes age equal")
                  }
                  let v = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                  symptoms_temp_dict.push(v)
                }
                //male and others without male
                else if(gender!="female")
                {
                  console.log("male and no-filter")
                  // debugger;
                  let g:string = value.gender;
                  if(g!==null)
                  {
                    //remove redundant white spaces
                    console.log(g)
                    g = g.replace(/^\s+|\s+$/gm,'');
                  }
                  // console.log(g)
                  if(g!="F")
                  {
                    console.log(value.symptom)
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                    symptoms_temp_dict.push(v1)
                  }
                }
                //female and others without filter
                else
                {
                  let g:string = value.gender;
                  if(g!==null)
                  {
                    //remove redundant white spaces
                    g = g.replace(/^\s+|\s+$/gm,'');
                    console.log(g)
                  }
                  if(g!="M")
                  {
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                    symptoms_temp_dict.push(v1)
                  }
                  
                }
                
              });
              console.log(symptoms_temp_dict)
              setMultiSelectOptions(symptoms_temp_dict)
              symptoms_temp_dict = []
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
      else if(age_global == 0)
      {
        const input_dict : Record<string, number> = {};
        input_dict['age_gt'] = age_global
        console.log(age_global + "%$&*#(@" + age_global_lt)
        axios
          .get(`https://localhost:44370/GPValues/GetSymptomdatafilter?agelt=${age_global_lt}`)
          .then(result => {
              console.log(result.data)
              if(age==null && gender==null)
              {
                setNoFiltersPopup(true)
              }
              // debugger;
              // let symptomdata_Details1 = result.data.symptomdata_Details1;
              // console.log(symptomdata_Details1)
              // let symptomdata_Details2 = result.data.symptomdata_Details2;
              // console.log(symptomdata_Details2)
              let symptomdata_Details = result.data.symptomdata_Details
              console.log(symptomdata_Details)
              var symptoms_temp_dict :Record<string, string>[] = [];
              symptomdata_Details.forEach(function (value : any) {
                // console.log(value);
                
                // console.log(v)
                console.log(value.possible_cancer)
                console.log(value.step1_test)
                setStep1_Test(value.step1_test)
                setPossibleCancer(value.possible_cancer)
                
                if(gender=="no")
                {
                  // debugger;
                  console.log(typeof(age))
                  console.log(typeof(value.age_gt))
                  if(age==value.age_gt)
                  {
                    console.log("yes age equal")
                  }
                  let v = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                  symptoms_temp_dict.push(v)
                }
                //male and others without male
                else if(gender!="female")
                {
                  console.log("male and no-filter")
                  // debugger;
                  let g:string = value.gender;
                  if(g!==null)
                  {
                    //remove redundant white spaces
                    console.log(g)
                    g = g.replace(/^\s+|\s+$/gm,'');
                  }
                  // console.log(g)
                  if(g!="F")
                  {
                    console.log(value.symptom)
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                    symptoms_temp_dict.push(v1)
                  }
                }
                //female and others without filter
                else
                {
                  let g:string = value.gender;
                  if(g!==null)
                  {
                    //remove redundant white spaces
                    g = g.replace(/^\s+|\s+$/gm,'');
                    console.log(g)
                  }
                  if(g!="M")
                  {
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                    symptoms_temp_dict.push(v1)
                  }
                  
                }
                
              });
              console.log(symptoms_temp_dict)
              setMultiSelectOptions(symptoms_temp_dict)
              symptoms_temp_dict = []
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
      else if(age_global_lt!=0 && age_global!=0)
      {
        const input_dict : Record<string, number> = {};
        input_dict['age_gt'] = age_global
        if (age_global == 0 ) 
          age_global = null
        if(age_global_lt==0)
          age_global_lt=null
        console.log(age_global + "%$&*#(@" + age_global_lt)
        axios
          .get(`https://localhost:44370/GPValues/GetSymptomdatafilter?agegt=${age_global}&agelt=${age_global_lt}`)
          .then(result => {
              console.log(result.data)
              if(age==null && gender==null)
              {
                setNoFiltersPopup(true)
              }
              // debugger;
              // let symptomdata_Details1 = result.data.symptomdata_Details1;
              // console.log(symptomdata_Details1)
              // let symptomdata_Details2 = result.data.symptomdata_Details2;
              // console.log(symptomdata_Details2)
              let symptomdata_Details = result.data.symptomdata_Details
              console.log(symptomdata_Details)
              var symptoms_temp_dict :Record<string, string>[] = [];
              symptomdata_Details.forEach(function (value : any) {
                // console.log(value);
                
                // console.log(v)
                console.log(value.possible_cancer)
                console.log(value.step1_test)
                setStep1_Test(value.step1_test)
                setPossibleCancer(value.possible_cancer)
                
                if(gender=="no")
                {
                  // debugger;
                  console.log(typeof(age))
                  console.log(typeof(value.age_gt))
                  if(age==value.age_gt)
                  {
                    console.log("yes age equal")
                  }
                  let v = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                  symptoms_temp_dict.push(v)
                }
                //male and others without male
                else if(gender!="female")
                {
                  console.log("male and no-filter")
                  // debugger;
                  let g:string = value.gender;
                  if(g!==null)
                  {
                    //remove redundant white spaces
                    console.log(g)
                    g = g.replace(/^\s+|\s+$/gm,'');
                  }
                  // console.log(g)
                  if(g!="F")
                  {
                    console.log(value.symptom)
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                    symptoms_temp_dict.push(v1)
                  }
                }
                //female and others without filter
                else
                {
                  let g:string = value.gender;
                  if(g!==null)
                  {
                    //remove redundant white spaces
                    g = g.replace(/^\s+|\s+$/gm,'');
                    console.log(g)
                  }
                  if(g!="M")
                  {
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.step1_test? value.step1_test : value.sep1, value.rsponse1, value.steps, value.step2_test? value.step2_test : value.step2)
                    symptoms_temp_dict.push(v1)
                  }
                  
                }
                
              });
              console.log(symptoms_temp_dict)
              setMultiSelectOptions(symptoms_temp_dict)
              setTotalSymptomsinList(symptoms_temp_dict.length)
              symptoms_temp_dict = []
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
  }
  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string
  ) => {
    setGender(newGender);
    console.log("gender is:" + newGender)
  };

  const handleAge = (event: React.SyntheticEvent<Element, Event>) => {
    console.log(event.currentTarget.innerHTML)
    console.log(typeof(event.currentTarget.innerHTML))
    let age = event.currentTarget.innerHTML
    console.log(typeof(parseInt(age)))
    setAge(age)
    age_global = parseInt(age)
  };
  const handleAgeLT = (event: React.SyntheticEvent<Element, Event>) => {
    console.log(event.currentTarget.innerHTML)
    console.log(typeof(event.currentTarget.innerHTML))
    let age_lt = event.currentTarget.innerHTML
    console.log(typeof(parseInt(age_lt)))
    setAgeLt(age_lt)
    age_global_lt = parseInt(age_lt)
    console.log(age_global_lt)
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
    if(document.getElementById("age_value")!=null){
      let a = (document.getElementById("age_value") as HTMLInputElement)
      console.log(a?.value)
      setAge(a?.value)
    }
    setSymptomsSelected(temp_array)
    var tempDict : Record<string, string>[];
    console.log(multiSelectDict_global)
    setSelectedFromMultiDict(multiSelectDict_global)
    setNoOfSymptoms(temp_array.length)
    // console.log(pswd)
  }
  
  const onMultiChange = (e: MultiValue<Record<string, string>>)=> {
      console.log(e)
      var a = selectedFromMultiDict as Record<string, string>[];
      multiSelectDict_global = e
 }
  return (
    <Box
      width="100%"
      sx={{ pb: 5 }}
    >
      {/* <Navbar /> */}
      <Grid container maxWidth="xl" sx={{margin: "0 auto"}}>
        <Grid item xs={12} justifyContent="center">
          <Box display="flex" flexWrap="wrap" justifyContent="start" width="100%" gap={2}>
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
                id="age_value"
                value={age} 
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Age >"
                    id="age_value"
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
                onChange={handleAge}
              />
            </Box>
            <Box>
              <Typography fontWeight="bold" mb={2}>Age</Typography>
              <Autocomplete
                freeSolo
                disableClearable
                options={ageResult().map((option) => option.title)}
                id="age_value_lt"
                value={age_lt}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Age <"
                    id="age_value_lt"
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
                onChange={handleAgeLT}
              />
            </Box>
            <Box>
            <IconButton aria-label="refresh" onClick={refreshComponents}>
                <ReplayIcon />
            </IconButton>
            </Box>
          </Box>
        </Grid>
        {
          totalSymptomsinList>0 && 
        <Typography>Searching in {totalSymptomsinList} from the list</Typography>
        }
        {/* SEARCH COMPONENT */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="start" flexWrap="wrap" gap={2} mt={4}>
            <Box minWidth="50%" maxWidth="80%">
              <MultiSelect
                    // defaultValue={[symptomOptions[2], symptomOptions[3]]}
                    isMulti
                    name="symptoms"
                    options={multiSelectOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    id="multiselect"
                    onFocus = {(e) => fetchData(e, topic)}
                    onChange={onMultiChange}
                    // defaultValue={emptyOption}
                  />
            </Box>

          
            <Box>
              <Button variant="contained" onClick={handleSearchSymptom}>
                Search
              </Button>
            </Box>
          </Box>
        </Grid>
        
        {/* No data section */}
        <Grid item xs={12}>
          <Box sx={{ mt: 2, minHeight:"50px"}}>
          
            {
              noofsymptoms==0 &&
              <Box m="auto" display="flex" alignItems="center" justifyContent="center" sx={{verticalAlign: "middle"}}>
                <Typography fontFamily="sans-serif" fontSize="13px" mt={10}>No Symptom Selected!</Typography>
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
                    <Typography fontSize="13px">Showing {noofsymptoms} symptom result(s)</Typography>
                  </Box> 
                  {
                    selectedFromMultiDict.map((symptom) => (
                      <Box>
                        <AccordionExample selectedSymp={symptom.label} possible_cancer={symptom.possible_cancer} gender_specific={symptom.gender} step1={symptom.step1} response1={symptom.response1} no_of_steps={symptom.nosteps} step2={symptom.step2}></AccordionExample>
                      </Box>
                    ))}
                </Box>
              </Box>
            }
          
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
