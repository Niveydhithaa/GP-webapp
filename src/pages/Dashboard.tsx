import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
  TextField,
  Grid
} from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
// import MultiSelect from 'components/MultiSelect'
import MultiSelect, { MultiValue } from 'react-select'
import configData from "config.json"
import { symptomOptions } from './data'
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Navbar from "components/Navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import AccordionExample from "components/AccordionExample";
import axios from "axios";
import Spinner from "components/hooks/Spinner"

// let age_global : any = 0;
// let age_global_lt : any = 0;
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
const ageResultLT = () => [
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
var multiSelectDict_global_tags : Record<string, string>[];
const emptyOption : Record<string,string>[]= [
  {label: "", value: ""}
]

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [topic, setTopic] = useState("symptom");
  const [gender, setGender] = useState<any>(null);
  const [possibleCancer, setPossibleCancer]=useState("")
  const [step1_test, setStep1_Test] = useState("")
  const [ageV2, setAgeV2] = useState<number>(0);
  const [ageV2_LT, setAgeV2_LT] = useState<number>(0);
  const [symptoms_selected, setSymptomsSelected] = useState<string[]>([])
  const [noofsymptoms, setNoOfSymptoms] = useState<number>(0)
  const [multiSelectOptions, setMultiSelectOptions] = useState<Record<string, string>[]>([])
  const [optionsTags, setOptionsTags] = useState<Record<string, string>[]>([])
  const [selectedFromMultiDict, setSelectedFromMultiDict] = useState<MultiValue<Record<string, string>>>([])
  const [noFilterPopup, setNoFiltersPopup] = useState<boolean>(false);
  const [resetComponent, setResetComponent] = useState<boolean>(false);
  const [totalSymptomsinList, setTotalSymptomsinList] = useState<number>(0);
  const refreshComponents = () => {
    //version 1 hard refresh
    // window.location.reload();
    setGender("")
    setAgeV2(0)
    setAgeV2_LT(0)
    setSelectedFromMultiDict([])
    const clr = document.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator")[0] as HTMLElement;
    clr.click();
    setNoOfSymptoms(0)
    let a = document.getElementById("age_value") as HTMLInputElement
    a.value=""
  }
  const handleTopic = (
    event: React.MouseEvent<HTMLElement>,
    newTopic: string
  ) => {
    console.log("NEW TOPIC: " + newTopic)
    setTopic(newTopic);
  };
  const CreateDictTemp = (label: string, primaryCare: string) =>
  {
    return {label: primaryCare, value: primaryCare.toLowerCase()}
  }
  const CreateDictTemp_2 = (label: string, symptom: string, possible_cancer: string) =>
  {
    return {label: symptom, value: symptom.toLowerCase(), possible_cancer: possible_cancer}
  }
  const CreateDict = (label: string, sympname: string, possible_cancer: string, gender: string, step1: string, rsponse1_1: string, rsponse1_2:string, nosteps: string, step2_1: string, step2_2: string, response2_1: string, response2_2: string, step3_1: string, step3_2: string, step1_test: string, step2_test: string) =>
  {
    return {label: sympname, value: sympname.toLowerCase(), possible_cancer: possible_cancer, gender: gender, step1: step1, rsponse1_1: rsponse1_1, rsponse1_2: rsponse1_2, nosteps: nosteps, step2_1: step2_1, step2_2: step2_2, response2_1: response2_1, response2_2: response2_2, step3_1: step3_1, step3_2: step3_2, step1_test: step1_test, step2_test: step2_test}
  }
  const fetchDataOthers = (e:  React.FocusEvent<HTMLInputElement, Element>) => {
    var temp_arr_record : Record<string, string>[] = [];
    temp_arr_record.push(CreateDictTemp("label", "Anaemia (iron‑deficiency), 60 and over" ))
    temp_arr_record.push(CreateDictTemp("label", "Haemoglobin levels low with visible haematuria in women 55 and over"))
    setMultiSelectOptions(temp_arr_record)
  }
  const fetchData_LimitTags = (e: React.FocusEvent<HTMLDivElement, Element> ) => {
    // var temp_arr_record : Record<string, string>[] = [];
    // temp_arr_record.push(CreateDictTemp_2("label", "Anaemia (iron‑deficiency), 60 and over", "Breast" ))
    // temp_arr_record.push(CreateDictTemp_2("label", "Haemoglobin levels low with visible haematuria in women 55 and over", "Ovarian"))
    // setOptionsTags(temp_arr_record)    
    const url = configData.url
      if(ageV2==0 || isNaN(ageV2))
      {
        console.log('no age selected')
        axios
          .get(url +'/Getsymptomdata')
          .then(result => {
              // debugger;
              setIsLoading(false)
              let symptomdata_Details = result.data.symptomdata_Details;
              // console.log(symptomdata_Details)
              var symptoms_temp_dict :Record<string, string>[] = [];
              symptomdata_Details.forEach(function (value : any) {
                // console.log(value);
                
                // console.log(v)
                // console.log(value.possible_cancer)
                // console.log(value.step1_test)
                
                if(gender==null)
                {
                  // debugger;
                  //console.log("no gender no age bar")
                  
                  let v = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  //console.log(value.rsponse1_1)
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
                    //console.log(g)
                    g = g.replace(/^\s+|\s+$/gm,'');
                  }
                  // console.log(g)
                  if(g!="F")
                  {
                    //console.log(value.symptom)
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
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
                    // console.log(g)
                  }
                  if(g!="M")
                  {
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                    symptoms_temp_dict.push(v1)
                  }
                  
                }
                
              });
              console.log(symptoms_temp_dict)
              setOptionsTags(symptoms_temp_dict)
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
      else if(ageV2!=0 && !isNaN(ageV2))
      {
        console.log("age filter applied")
        axios
          .get(url + `/GetSymptomdatafilter?agegtlt=${ageV2}`)
          .then(result => {
              // console.log(result.data)
              let symptomdata_Details1 = result.data.symptomdata_Details.symptomdatadetails1;
              console.log(symptomdata_Details1.length)
              let symptomdata_Details2 = result.data.symptomdata_Details.symptomdatadetails2;
              console.log(symptomdata_Details2.length)
              let symptomdata_Details3 = result.data.symptomdata_Details.symptomdatadetails3;
              console.log(symptomdata_Details3.length)
              // let symptomdata_Details_old = result.data.symptomdata_Details
              let symptomdata_Details_part1 = symptomdata_Details1.concat(symptomdata_Details2)
              let symptomdata_Details_part2 = symptomdata_Details_part1.concat(symptomdata_Details3)
              let symptomdata_Details = symptomdata_Details_part2
              // console.log(symptomdata_Details)
              var symptoms_temp_dict :Record<string, string>[] = [];
              symptomdata_Details.forEach(function (value : any) {
                
                setStep1_Test(value.step1_test)
                setPossibleCancer(value.possible_cancer)
                
                if(gender==null)
                {
                  // console.log(typeof(value.age_gt))
                  let v = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  symptoms_temp_dict.push(v)
                }
                //male and others without male
                else if(gender!="female")
                {
                  // console.log("male and no-filter")
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
                    // console.log(value.symptom)
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
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
                    // console.log(g)
                  }
                  if(g!="M")
                  {
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                    symptoms_temp_dict.push(v1)
                  }
                  
                }
                
              });
              console.log(symptoms_temp_dict)
              setOptionsTags(symptoms_temp_dict)
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
  const fetchData = (e: React.FocusEvent<HTMLInputElement, Element>, topic: string) => {
    // setIsLoading(true)  
    const url = configData.url
      if(ageV2==0 || isNaN(ageV2))
      {
        console.log('no age selected')
        axios
          .get(url +'/Getsymptomdata')
          .then(result => {
              // debugger;
              setIsLoading(false)
              let symptomdata_Details = result.data.symptomdata_Details;
              // console.log(symptomdata_Details)
              var symptoms_temp_dict :Record<string, string>[] = [];
              symptomdata_Details.forEach(function (value : any) {
                // console.log(value);
                
                // console.log(v)
                // console.log(value.possible_cancer)
                // console.log(value.step1_test)
                
                if(gender==null)
                {
                  // debugger;
                  //console.log("no gender no age bar")
                  
                  let v = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  //console.log(value.rsponse1_1)
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
                    //console.log(g)
                    g = g.replace(/^\s+|\s+$/gm,'');
                  }
                  // console.log(g)
                  if(g!="F")
                  {
                    //console.log(value.symptom)
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
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
                    // console.log(g)
                  }
                  if(g!="M")
                  {
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
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
      else if(ageV2!=0 && !isNaN(ageV2))
      {
        console.log("age filter applied")
        axios
          .get(url + `/GetSymptomdatafilter?agegtlt=${ageV2}`)
          .then(result => {
              // console.log(result.data)
              let symptomdata_Details1 = result.data.symptomdata_Details.symptomdatadetails1;
              console.log(symptomdata_Details1.length)
              let symptomdata_Details2 = result.data.symptomdata_Details.symptomdatadetails2;
              console.log(symptomdata_Details2.length)
              let symptomdata_Details3 = result.data.symptomdata_Details.symptomdatadetails3;
              console.log(symptomdata_Details3.length)
              // let symptomdata_Details_old = result.data.symptomdata_Details
              let symptomdata_Details_part1 = symptomdata_Details1.concat(symptomdata_Details2)
              let symptomdata_Details_part2 = symptomdata_Details_part1.concat(symptomdata_Details3)
              let symptomdata_Details = symptomdata_Details_part2
              // console.log(symptomdata_Details)
              var symptoms_temp_dict :Record<string, string>[] = [];
              symptomdata_Details.forEach(function (value : any) {
                
                setStep1_Test(value.step1_test)
                setPossibleCancer(value.possible_cancer)
                
                if(gender==null)
                {
                  // console.log(typeof(value.age_gt))
                  let v = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  symptoms_temp_dict.push(v)
                }
                //male and others without male
                else if(gender!="female")
                {
                  // console.log("male and no-filter")
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
                    // console.log(value.symptom)
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
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
                    // console.log(g)
                  }
                  if(g!="M")
                  {
                    let v1 = CreateDict("label", value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
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
  }
  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string
  ) => {
    const clr = document.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator")[0] as HTMLElement;
    if(clr){
       clr.click();
    }
    console.log(typeof(newGender))
    setOptionsTags([])
    setGender(newGender);
    setMultiSelectOptions([]);
    console.log("gender is:" + newGender)
    setSelectedFromMultiDict([])
    setNoOfSymptoms(0)
  };
  const AGEhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("AGE:GT: "+event.target.value)
    setOptionsTags([])
    if(isNaN(parseInt(event.target.value)))
    {
      console.log("yes blank")
    }
    else
    {
      console.log("number is: "+parseInt(event.target.value))
    }
    setAgeV2(parseInt(event.target.value));
    
  };
  const AGEhandleChange_LT = (event: SelectChangeEvent) => {
    console.log("AGE:LT: "+event.target.value)
    setAgeV2_LT(parseInt(event.target.value));
  };
  const handleSearchSymptom = () => {
    
    // const selected_options = (document.getElementById("multiselect") as HTMLInputElement)
    // const children_options = (selected_options.getElementsByClassName("css-12jo7m5 select__multi-value__label") as HTMLCollection);
    // console.log(children_options)
    // let temp_array: string[] = []
    // let item_select: string;
    // for (let i = 0; i < children_options.length; i++) {
    //   item_select = children_options[i].innerHTML
    //   console.log(item_select)
    //   temp_array.push(item_select)
    // }
    // setSymptomsSelected(temp_array)
    var tempDict : Record<string, string>[];
    // console.log(multiSelectDict_global)
    // setSelectedFromMultiDict(multiSelectDict_global)
    console.log(multiSelectDict_global_tags)
    setSelectedFromMultiDict(multiSelectDict_global_tags)
    setNoOfSymptoms(multiSelectDict_global_tags.length)
    // console.log(pswd)
  }
  
  const onMultiChange = (e: MultiValue<Record<string, string>>)=> {
      console.log(e)
      var a = selectedFromMultiDict as Record<string, string>[];
      multiSelectDict_global = e
 }
 const onTagsChange = (e: React.SyntheticEvent<Element, Event>, value: Record<string, string>[]) => {
    console.log(value)
    multiSelectDict_global_tags = value
    console.log("tags changes")
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
                  <ToggleButton value="site" disabled>Site</ToggleButton>
                  <ToggleButton value="primaryCare" disabled >
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
            {/* <Box sx={{ minWidth: 120 }}>
              <Typography fontWeight="bold" mb={2}>Age Greater Than:</Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ageV2.toString()}
                  label="Age"
                  onChange={AGEhandleChange}
                >
                  <MenuItem value={0}>No Filter</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
            <Box component="form"
              // sx={{
              //   '& .MuiTextField-root': {  width: '25ch' },
              // }}
              
              noValidate
              autoComplete="off">
                <Typography fontWeight="bold" mb={2}>Age</Typography>
                <TextField 
                      hiddenLabel={true}
                      InputProps={{
                        inputProps: { min: 0, max: 150 }
                      }}
                      // inputProps={{ type: 'number'}}
                      type="number"
                      id="demo-simple-select"
                      // value={ageV2.toString()}
                      // label="Age"
                      sx={{width: 100}}
                      placeholder="--"
                      onKeyPress = {(event) => {
                        if(event.key=='-' || event.key==='+' || event.key=='.' || event.key==='e') {
                          console.log("prohibited")
                          // event.key=''
                          event.preventDefault();
                        }
                      }}
                      onChange={AGEhandleChange}>
                      
                    </TextField>
                    
              </Box>
              <Box>
                  {/* <Typography fontWeight="bold" mb={2}></Typography> */}
                    <Button sx={{ mt: 6}} variant="outlined" startIcon={<ReplayIcon />} onClick={refreshComponents}>
                      Clear
                    </Button>
              </Box>
            
            {/* <Box sx={{ minWidth: 120 }}>
              <Typography fontWeight="bold" mb={2}>Age Lesser Than: </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ageV2_LT.toString()}
                  label="Age less than"
                  onChange={AGEhandleChange_LT}
                >
                  <MenuItem value={0}>No Filter</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
            
          </Box>
        </Grid>
        {/* SEARCH COMPONENT */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="start" flexWrap="wrap" gap={2} mt={4}>
            <Box minWidth="50%" maxWidth="80%">
              {/* <MultiSelect
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
                  /> */}
                  <Autocomplete
                    multiple
                    // limitTags={2}
                    id="multiple-limit-tags"
                    options={optionsTags}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, value) => onTagsChange(e, value)}
                    onFocus = {(e) => fetchData_LimitTags(e)}
                    // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                    renderInput={(params) => (
                      <TextField {...params} label="Search symptom.. " />
                    )}
                  />
            </Box>

            
            <Box>
            {
                isLoading &&
                <Spinner></Spinner>
                }
              {!isLoading &&
                <Button type="submit" variant="contained" onClick={handleSearchSymptom}>
                   Search
                </Button>
              }
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
                        <AccordionExample selectedSymp={symptom.label} possible_cancer={symptom.possible_cancer} gender_specific={symptom.gender} step1={symptom.step1} rsponse1_1={symptom.rsponse1_1} rsponse1_2 = {symptom.rsponse1_2} no_of_steps={symptom.nosteps} step2_1={symptom.step2_1} step2_2={symptom.step2_2} response2_1={symptom.response2_1} response2_2={symptom.response2_2} step3_1={symptom.step3_1} step3_2={symptom.step3_2} step1_test={symptom.step1_test} step2_test={symptom.step2_test}></AccordionExample>
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
