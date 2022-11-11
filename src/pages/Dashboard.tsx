import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
  TextField,
  InputLabel,
  FormControl,
  NativeSelect,
  Grid
} from "@mui/material";
import { debounce } from "lodash";
import ReplayIcon from '@mui/icons-material/Replay';
import {DebounceInput} from "react-debounce-input"
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
import PrimaryAccordion from "components/PrimaryAccordion";
import axios from "axios";
import Spinner from "components/hooks/Spinner"

// let age_global : any = 0;
// let age_global_lt : any = 0;
var multiSelectDict_global: MultiValue<Record<string, string>>;
var multiSelectDict_global_tags: Record<string, string>[];

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [topic, setTopic] = useState("symptom");
  const [gender, setGender] = useState<any>(null);
  const [possibleCancer, setPossibleCancer] = useState("")
  const [step1_test, setStep1_Test] = useState("")
  const [ageV2, setAgeV2] = useState<number>(0);
  const [ageV2_LT, setAgeV2_LT] = useState<number>(0);
  const [symptoms_selected, setSymptomsSelected] = useState<string[]>([])
  const [noofsymptoms, setNoOfSymptoms] = useState<number>(0)
  const [multiSelectOptions, setMultiSelectOptions] = useState<Record<string, string>[]>([])
  const [optionsTags, setOptionsTags] = useState<Record<string, string>[]>([])
  const [tagsStrings, setTagsStrings] = useState<string[]>([])
  const [selectedFromMultiDict, setSelectedFromMultiDict] = useState<MultiValue<Record<string, string>>>([])
  const [noFilterPopup, setNoFiltersPopup] = useState<boolean>(false);
  const [resetComponent, setResetComponent] = useState<boolean>(false);
  const [totalSymptomsinList, setTotalSymptomsinList] = useState<number>(0);
  const url = configData.url
  const CreateDict_PrimaryData = (label: string, prim_id : string, findings: string, possible_cancer: string, gender: string, recommendation: string) => {
    return { label: findings, id: prim_id, value: findings.toLowerCase(), possible_cancer: possible_cancer, gender: gender, recommendation: recommendation }
  }
  const CreateDict = (label: string, symp_id: string, sympname: string, possible_cancer: string, gender: string, step1: string, rsponse1_1: string, rsponse1_2: string, nosteps: string, step2_1: string, step2_2: string, response2_1: string, response2_2: string, step3_1: string, step3_2: string, step1_test: string, step2_test: string) => {
    return { label: sympname, id: symp_id, value: sympname.toLowerCase(), possible_cancer: possible_cancer, gender: gender, step1: step1, rsponse1_1: rsponse1_1, rsponse1_2: rsponse1_2, nosteps: nosteps, step2_1: step2_1, step2_2: step2_2, response2_1: response2_1, response2_2: response2_2, step3_1: step3_1, step3_2: step3_2, step1_test: step1_test, step2_test: step2_test }
  }
  const fetchData = debounce((value) => {
    console.log(topic + " : is the current topic!!")
    if (ageV2 == 0 || isNaN(ageV2)) {
      console.log('no age selected')
      axios
        .get(url + `/Getgpdata?input=${topic}`)
        .then(result => {
          // debugger;
          setIsLoading(false)
          if (topic == "symptom") {
            console.log(result.data)
            let symptomdata_Details = result.data.data_Details;
            // console.log(symptomdata_Details)
            var symptoms_temp_dict: Record<string, string>[] = [];
            symptomdata_Details.forEach(function (value: any) {
              // console.log(value);

              // console.log(v)
              // console.log(value.possible_cancer)
              // console.log(value.step1_test)

              if (gender == null) {
                // debugger;
                //console.log("no gender no age bar")

                let v = CreateDict("label", value.symp_id, value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                //console.log(value.rsponse1_1)
                symptoms_temp_dict.push(v)
              }
              //male and others without male
              else if (gender != "female") {
                // debugger;
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  //console.log(g)
                  g = g.replace(/^\s+|\s+$/gm, '');
                }
                // console.log(g)
                if (g != "F") {
                  //console.log(value.symptom)
                  let v1 = CreateDict("label", value.symp_id, value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  symptoms_temp_dict.push(v1)
                }
              }
              //female and others without filter
              else {
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  g = g.replace(/^\s+|\s+$/gm, '');
                  // console.log(g)
                }
                if (g != "M") {
                  let v1 = CreateDict("label", value.symp_id, value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  symptoms_temp_dict.push(v1)
                }

              }

            });
            console.log(symptoms_temp_dict)
            // const a = [
            //   ...new Set(
            //     symptoms_temp_dict.map((person) => { return person.label; })
            //   ),
            // ];
            console.log(symptoms_temp_dict.length)
            // console.log(a.length)
            // setTagsStrings(a)
            setOptionsTags(symptoms_temp_dict)
            symptoms_temp_dict = []
          }
          else if (topic == "primary") {
            // console.log(result.data.data_Details)
            let primaryData_details = result.data.data_Details;
            //console.log(primaryData_details)
            var primary_temp_dict: Record<string, string>[] = [];
            primaryData_details.forEach(function (value: any) {
              if (gender == null) {
                let v = CreateDict_PrimaryData("label", value.primary_id,value.findings, value.possible_cancer, value.gender, value.recommendation)
                //console.log(value.rsponse1_1)
                primary_temp_dict.push(v)
              }
              //male and others without male
              else if (gender != "female") {
                // debugger;
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  //console.log(g)
                  g = g.replace(/^\s+|\s+$/gm, '');
                }
                // console.log(g)
                if (g != "F") {
                  //console.log(value.symptom)
                  let v1 = CreateDict_PrimaryData("label", value.primary_id, value.findings, value.possible_cancer, value.gender, value.recommendation)
                  primary_temp_dict.push(v1)
                }
              }
              //female and others without filter
              else {
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  g = g.replace(/^\s+|\s+$/gm, '');
                  // console.log(g)
                }
                if (g != "M") {
                  let v1 = CreateDict_PrimaryData("label", value.primary_id, value.findings, value.possible_cancer, value.gender, value.recommendation)
                  primary_temp_dict.push(v1)
                }

              }

            });
            console.log(primary_temp_dict)
            setOptionsTags(primary_temp_dict)
            primary_temp_dict = []
          }
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
    else if (ageV2 != 0 && !isNaN(ageV2)) {
      console.log("age filter applied")
      axios
        .get(url + `/Getgpdata?input=${topic}&agegtlt=${ageV2}`)
        .then(result => {
          console.log(result.data)
          setIsLoading(false)
          if (topic === "symptom") {
            let symptomdata_Details = result.data.data_Details
            // console.log(symptomdata_Details)
            var symptoms_temp_dict: Record<string, string>[] = [];
            symptomdata_Details.forEach(function (value: any) {

              setStep1_Test(value.step1_test)
              setPossibleCancer(value.possible_cancer)

              if (gender == null) {
                // console.log(typeof(value.age_gt))
                let v = CreateDict("label", value.symp_id, value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                symptoms_temp_dict.push(v)
              }
              //male and others without male
              else if (gender != "female") {
                // console.log("male and no-filter")
                // debugger;
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  console.log(g)
                  g = g.replace(/^\s+|\s+$/gm, '');
                }
                // console.log(g)
                if (g != "F") {
                  // console.log(value.symptom)
                  let v1 = CreateDict("label", value.symp_id, value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  symptoms_temp_dict.push(v1)
                }
              }
              //female and others without filter
              else {
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  g = g.replace(/^\s+|\s+$/gm, '');
                  // console.log(g)
                }
                if (g != "M") {
                  let v1 = CreateDict("label", value.symp_id, value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  symptoms_temp_dict.push(v1)
                }

              }

            });
            console.log(symptoms_temp_dict)
            setOptionsTags(symptoms_temp_dict)
            symptoms_temp_dict = []
          }
          else if (topic === "primary") {
            let primaryData_Details = result.data.data_Details
            // console.log(symptomdata_Details)
            var primary_temp_dict: Record<string, string>[] = [];
            primaryData_Details.forEach(function (value: any) {
              if (gender == null) {
                let v = CreateDict_PrimaryData("label", value.primary_id, value.findings, value.possible_cancer, value.gender, value.recommendation)
                //console.log(value.rsponse1_1)
                primary_temp_dict.push(v)
              }
              //male and others without male
              else if (gender != "female") {
                // debugger;
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  //console.log(g)
                  g = g.replace(/^\s+|\s+$/gm, '');
                }
                // console.log(g)
                if (g != "F") {
                  //console.log(value.symptom)
                  let v1 = CreateDict_PrimaryData("label",value.primary_id, value.findings, value.possible_cancer, value.gender, value.recommendation)
                  primary_temp_dict.push(v1)
                }
              }
              //female and others without filter
              else {
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  g = g.replace(/^\s+|\s+$/gm, '');
                  // console.log(g)
                }
                if (g != "M") {
                  let v1 = CreateDict_PrimaryData("label", value.primary_id,value.findings, value.possible_cancer, value.gender, value.recommendation)
                  primary_temp_dict.push(v1)
                }

              }

            });
            console.log(primary_temp_dict)
            setOptionsTags(primary_temp_dict)
            primary_temp_dict = []
          }
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
  }, 1000);

  
  // debounce
  useEffect(() => {
    setIsLoading(true)
    console.log(topic + " : is the current topic!!")
    fetchData(topic)
  }, [topic, gender, ageV2]);

  const refreshComponents = () => {
    //version 1 hard refresh
    // window.location.reload();
    setGender(null)
    setTopic("symptom")
    setAgeV2(0)
    // setAgeV2(NaN)
    // setAgeV2("")
    setSelectedFromMultiDict([])
    const clr = document.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator")[0] as HTMLElement;
    clr.click();
    setNoOfSymptoms(0)
    let a = document.getElementById("age_value") as HTMLInputElement
    a.value = ""
  }
  const handleTopic = (
    event: React.MouseEvent<HTMLElement>,
    newTopic: string
  ) => {
    
    if(topic!=newTopic)
    {
      setOptionsTags([])
      if (newTopic !== null) {
        console.log("NEW TOPIC: " + newTopic)
        setTopic(newTopic);
        const clr = document.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator")[0] as HTMLElement;
        clr.click();
        setMultiSelectOptions([]);
        setSelectedFromMultiDict([])
        setNoOfSymptoms(0)
      }
      setMultiSelectOptions([]);
        setSelectedFromMultiDict([])
        setNoOfSymptoms(0)
      // setTopic(newTopic)
    }
    else if(topic==newTopic)
    {
      // setOptionsTags([])
    // setGender(newGender);
      // setMultiSelectOptions([]);
      // setSelectedFromMultiDict([])
      // setNoOfSymptoms(0)
    }
  };
  

  const handleDebounceFn = (inputValue: any) => {
    if (ageV2 != 0 && !isNaN(ageV2)) {
      console.log("age filter applied")
      axios
        .get(url + `/Getgpdata?input=${topic}&agegtlt=${ageV2}`)
        .then(result => {
          console.log(result.data)
          if (topic === "symptom") {
            // let symptomdata_Details1 = result.data.data_Details.symptomdatadetails1;
            // console.log(symptomdata_Details1.length)
            // let symptomdata_Details2 = result.data.data_Details.symptomdatadetails2;
            // console.log(symptomdata_Details2.length)
            // let symptomdata_Details3 = result.data.data_Details.symptomdatadetails3;
            // console.log(symptomdata_Details3.length)
            // // let symptomdata_Details_old = result.data.symptomdata_Details
            // let symptomdata_Details_part1 = symptomdata_Details1.concat(symptomdata_Details2)
            // let symptomdata_Details_part2 = symptomdata_Details_part1.concat(symptomdata_Details3)
            let symptomdata_Details = result.data.data_Details
            // console.log(symptomdata_Details)
            var symptoms_temp_dict: Record<string, string>[] = [];
            symptomdata_Details.forEach(function (value: any) {

              setStep1_Test(value.step1_test)
              setPossibleCancer(value.possible_cancer)

              if (gender == null) {
                // console.log(typeof(value.age_gt))
                let v = CreateDict("label", value.symp_id, value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                symptoms_temp_dict.push(v)
              }
              //male and others without male
              else if (gender != "female") {
                // console.log("male and no-filter")
                // debugger;
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  console.log(g)
                  g = g.replace(/^\s+|\s+$/gm, '');
                }
                // console.log(g)
                if (g != "F") {
                  // console.log(value.symptom)
                  let v1 = CreateDict("label", value.symp_id, value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  symptoms_temp_dict.push(v1)
                }
              }
              //female and others without filter
              else {
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  g = g.replace(/^\s+|\s+$/gm, '');
                  // console.log(g)
                }
                if (g != "M") {
                  let v1 = CreateDict("label", value.symp_id, value.symptom, value.possible_cancer, value.gender, value.sep1, value.rsponse1_1, value.rsponse1_2, value.steps, value.step2_1, value.step2_2, value.response2_1, value.response2_2, value.step3_1, value.step3_2, value.step1_test, value.step2_test)
                  symptoms_temp_dict.push(v1)
                }

              }

            });
            console.log(symptoms_temp_dict)
            setOptionsTags(symptoms_temp_dict)
            symptoms_temp_dict = []
          }
          else if (topic === "primary") {
            // let primarydata_Details1 = result.data.data_Details.primarydatadetails1;
            // console.log(primarydata_Details1.length)
            // let primarydata_Details2 = result.data.data_Details.primarydatadetails2;
            // console.log(primarydata_Details2.length)
            // let primarydata_Details3 = result.data.data_Details.primarydatadetails3;
            // console.log(primarydata_Details3.length)
            // // let symptomdata_Details_old = result.data.symptomdata_Details
            // let primarydata_Details_part1 = primarydata_Details1.concat(primarydata_Details2)
            // let primarydata_Details_part2 = primarydata_Details_part1.concat(primarydata_Details3)
            let primaryData_Details = result.data.data_Details
            // console.log(symptomdata_Details)
            var primary_temp_dict: Record<string, string>[] = [];
            primaryData_Details.forEach(function (value: any) {
              if (gender == null) {
                let v = CreateDict_PrimaryData("label", value.primary_id, value.findings, value.possible_cancer, value.gender, value.recommendation)
                //console.log(value.rsponse1_1)
                primary_temp_dict.push(v)
              }
              //male and others without male
              else if (gender != "female") {
                // debugger;
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  //console.log(g)
                  g = g.replace(/^\s+|\s+$/gm, '');
                }
                // console.log(g)
                if (g != "F") {
                  //console.log(value.symptom)
                  let v1 = CreateDict_PrimaryData("label",value.primary_id, value.findings, value.possible_cancer, value.gender, value.recommendation)
                  primary_temp_dict.push(v1)
                }
              }
              //female and others without filter
              else {
                let g: string = value.gender;
                if (g !== null) {
                  //remove redundant white spaces
                  g = g.replace(/^\s+|\s+$/gm, '');
                  // console.log(g)
                }
                if (g != "M") {
                  let v1 = CreateDict_PrimaryData("label", value.primary_id,value.findings, value.possible_cancer, value.gender, value.recommendation)
                  primary_temp_dict.push(v1)
                }

              }

            });
            console.log(primary_temp_dict)
            setOptionsTags(primary_temp_dict)
            primary_temp_dict = []
          }
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
  const debounceFn = useCallback(debounce(handleDebounceFn, 50), []);
  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string
  ) => {
    const clr = document.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator")[0] as HTMLElement;
    if (clr) {
      clr.click();
    }
    if (newGender !== null) {
      console.log("gender is:" + newGender)
      setGender(newGender);
    }
    setOptionsTags([])
    // setGender(newGender);
    setMultiSelectOptions([]);
    setSelectedFromMultiDict([])
    setNoOfSymptoms(0)
  };
  const AGEhandleChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("AGE:GT: " + event.target.value)
    setOptionsTags([])
    if (isNaN(parseInt(event.target.value))) {
      console.log("yes blank")
    }
    else {
      console.log("number is: " + parseInt(event.target.value))
    }
    setAgeV2(parseInt(event.target.value));
    
  }, 1000);
  // const handleChangeWithLib = debounce((value) => {
  //   fetch(`https://demo.dataverse.org/api/search?q=${value}`)
  //     .then((res) => res.json())
  //     .then((json) => setSuggestions(json.data.items));
  // }, 500);
  const AGEhandleChange_Dropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("AGE:from dropdown" + event.target.value)
    if(parseInt(event.target.value)==0)
    {
      console.log("no age filter")
    }
    
      setAgeV2(parseInt(event.target.value));
  };
  const handleSearchSymptom = () => {
    var tempDict: Record<string, string>[];
    // console.log(multiSelectDict_global)
    // setSelectedFromMultiDict(multiSelectDict_global)
    console.log(multiSelectDict_global_tags)
    setSelectedFromMultiDict(multiSelectDict_global_tags)
    setNoOfSymptoms(multiSelectDict_global_tags.length)
    // console.log(pswd)
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
      <Grid container maxWidth="xl" sx={{ margin: "0 auto" }}>
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
                  <ToggleButton value="primary" >
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
            <Box component="form"
              // sx={{
              //   '& .MuiTextField-root': {  width: '25ch' },
              // }}

              noValidate
              autoComplete="off">
              <Typography fontWeight="bold" mb={2}>Age</Typography>
              {/* <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Age
                  </InputLabel>
                  <NativeSelect
                    defaultValue={0}
                    value={ageV2}
                    inputProps={{
                      name: 'age',
                      id: 'uncontrolled-native',
                    }}
                    onChange={AGEhandleChange_Dropdown}
                  >
                    <option value={0}>--</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                    <option value={16}>16</option>
                    <option value={17}>17</option>
                    <option value={18}>19</option>
                    <option value={20}>20</option>
                    <option value={21}>21</option>
                    <option value={22}>22</option>
                    <option value={23}>23</option>
                    <option value={24}>24</option>
                    <option value={25}>25</option>
                    <option value={26}>26</option>
                    <option value={27}>27</option>
                    <option value={28}>28</option>
                    <option value={29}>29</option>
                    <option value={30}>30</option>
                    <option value={31}>31</option>
                    <option value={32}>32</option>
                    <option value={33}>33</option>
                    <option value={34}>34</option>
                    <option value={35}>35</option>
                    <option value={36}>36</option>
                    <option value={37}>37</option>
                    <option value={38}>38</option>
                    <option value={39}>39</option>
                    <option value={40}>40</option>
                    <option value={41}>41</option>
                    <option value={42}>42</option>
                    <option value={43}>43</option>
                    <option value={44}>44</option>
                    <option value={45}>45</option>
                    <option value={46}>46</option>
                    <option value={47}>47</option>
                    <option value={48}>48</option>
                    <option value={49}>49</option>
                    <option value={50}>50</option>
                    <option value={51}>51</option>
                    <option value={52}>52</option>
                    <option value={53}>53</option>
                    <option value={54}>54</option>
                    <option value={55}>55</option>
                    <option value={56}>56</option>
                    <option value={57}>57</option>
                    <option value={58}>58</option>
                    <option value={59}>59</option>
                    <option value={60}>60</option>
                    <option value={61}>61</option>
                    <option value={62}>62</option>
                    <option value={63}>63</option>
                    <option value={64}>64</option>
                    <option value={65}>65</option>
                    <option value={66}>66</option>
                    <option value={67}>67</option>
                    <option value={68}>68</option>
                    <option value={69}>69</option>
                    <option value={70}>70</option>
                    <option value={71}>71</option>
                    <option value={72}>72</option>
                    <option value={73}>73</option>
                    <option value={74}>74</option>
                    <option value={75}>75</option>
                    <option value={76}>76</option>
                    <option value={77}>77</option>
                    <option value={78}>78</option>
                    <option value={79}>79</option>
                    <option value={80}>80</option>
                    <option value={81}>81</option>
                    <option value={82}>82</option>
                    <option value={83}>83</option>
                    <option value={84}>84</option>
                    <option value={85}>85</option>
                    <option value={86}>86</option>
                    <option value={87}>87</option>
                    <option value={88}>88</option>
                    <option value={89}>89</option>
                    <option value={90}>90</option>
                    <option value={90}>90</option>
                    <option value={91}>91</option>
                    <option value={92}>92</option>
                    <option value={93}>93</option>
                    <option value={94}>94</option>
                    <option value={95}>95</option>
                    <option value={96}>96</option>
                    <option value={96}>96</option>
                    <option value={97}>97</option>
                    <option value={98}>98</option>
                    <option value={99}>99</option>
                    <option value={100}>100</option>
                  </NativeSelect>
                </FormControl>
              </Box> */}
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
                sx={{ width: 100 }}
                placeholder="--"
                onKeyPress={(event) => {
                  if (event.key == '-' || event.key === '+' || event.key == '.' || event.key === 'e') {
                    console.log("prohibited")
                    // event.key=''
                    event.preventDefault();
                  }
                }}
                onChange={AGEhandleChange}>

              </TextField>
              {/* <DebounceInput
                // minLength={2}
                className="search"
                placeholder="Enter something here..."
                debounceTimeout={500}
                onChange={AGEhandleChange} /> */}
            </Box>
            <Box>
              {/* <Typography fontWeight="bold" mb={2}></Typography> */}
              <Button sx={{ mt: 6 }} variant="outlined" startIcon={<ReplayIcon />} onClick={refreshComponents}>
                Clear
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
        <Box>
              {(topic==null) && 
                <Box m="auto" display="flex" alignItems="center" justifyContent="center" sx={{ verticalAlign: "middle" }}>
                  <Typography fontFamily="sans-serif" fontSize="13px" mt={10}>No Topic Selected! Please select a topic to search. </Typography>
                </Box>
              }
            </Box>
        </Grid>
        <Grid item xs={12} mt={4}>
            {isLoading &&
              <Spinner/>
            }
        </Grid>
        {/* SEARCH COMPONENT */}
        <Grid item xs={12}>
          {isLoading && 
            <Box display="flex" justifyContent="start" flexWrap="wrap" gap={2} mt={4}>
            <Box minWidth="50%" maxWidth="80%">
                <Autocomplete
                multiple
                // limitTags={2}
                id="multiple-limit-tags"
                options={optionsTags}
                // render uniquely using map to ids 
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.label}
                  </li>
                )}
                disabled={true}
                getOptionLabel={(option) => option.label}
                onChange={(e, value) => onTagsChange(e, value)}
                // onFocus = {(e) => fetchData(e)}
                // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                renderInput={(params) => (
                  <TextField {...params} label="Search" />
                )}
              />
            </Box>
            <Box>
                <Button type="submit" variant="contained" onClick={handleSearchSymptom} disabled={true}>
                  Search
                </Button>
            </Box>
          </Box>
          }
          {
            !isLoading &&
            <Box display="flex" justifyContent="start" flexWrap="wrap" gap={2} mt={4}>
              <Box minWidth="50%" maxWidth="80%">
                  <Autocomplete
                  multiple
                  // limitTags={2}
                  id="multiple-limit-tags"
                  options={optionsTags}
                  // render uniquely using map to ids 
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.label}
                    </li>
                  )}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, value) => onTagsChange(e, value)}
                  // onFocus = {(e) => fetchData(e)}
                  // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                  renderInput={(params) => (
                    <TextField {...params} label="Search" />
                  )}
                />
              </Box>
              
              <Box>
                <Button type="submit" variant="contained" onClick={handleSearchSymptom}>
                    Search
                  </Button>
              </Box>
            </Box>
          }
        </Grid>
        <Grid item xs={12}>
          {(topic == "symptom") &&
            <Box sx={{ mt: 2, minHeight: "50px" }}>

              {
                noofsymptoms == 0 &&
                <Box m="auto" display="flex" alignItems="center" justifyContent="center" sx={{ verticalAlign: "middle" }}>
                  <Typography fontFamily="sans-serif" fontSize="13px" mt={10}>No Symptom Selected!</Typography>
                </Box>
              }
              {
                noofsymptoms > 0 &&
                <Box width="100%">
                  <Box>
                    <Box>
                      <Typography fontSize="13px">Showing {noofsymptoms} result(s)</Typography>
                    </Box>
                    {
                      selectedFromMultiDict.map((symptom) => (
                        <Box width="70%">
                          <AccordionExample selectedSymp={symptom.label} possible_cancer={symptom.possible_cancer} gender_specific={symptom.gender} step1={symptom.step1} rsponse1_1={symptom.rsponse1_1} rsponse1_2={symptom.rsponse1_2} no_of_steps={symptom.nosteps} step2_1={symptom.step2_1} step2_2={symptom.step2_2} response2_1={symptom.response2_1} response2_2={symptom.response2_2} step3_1={symptom.step3_1} step3_2={symptom.step3_2} step1_test={symptom.step1_test} step2_test={symptom.step2_test}></AccordionExample>
                        </Box>
                      ))}
                  </Box>
                </Box>
              }

            </Box>
          }
          {
            (topic === "primary") &&
            <Box sx={{ mt: 2, minHeight: "50px" }}>
              {
                noofsymptoms == 0 &&
                <Box m="auto" display="flex" alignItems="center" justifyContent="center" sx={{ verticalAlign: "middle" }}>
                  <Typography fontFamily="sans-serif" fontSize="13px" mt={10}>No Primary Finding Selected!</Typography>
                </Box>
              }
              {
                noofsymptoms > 0 &&
                <Box width="100%">
                  <Box>
                    <Box>
                      <Typography fontSize="13px">Showing {noofsymptoms} result(s)</Typography>
                    </Box>
                    {
                      selectedFromMultiDict.map((primary) => (
                        <Box width="70%">
                          {/* <AccordionExample selectedSymp={symptom.label} possible_cancer={symptom.possible_cancer} gender_specific={symptom.gender} step1={symptom.step1} rsponse1_1={symptom.rsponse1_1} rsponse1_2={symptom.rsponse1_2} no_of_steps={symptom.nosteps} step2_1={symptom.step2_1} step2_2={symptom.step2_2} response2_1={symptom.response2_1} response2_2={symptom.response2_2} step3_1={symptom.step3_1} step3_2={symptom.step3_2} step1_test={symptom.step1_test} step2_test={symptom.step2_test}></AccordionExample> */}
                          <PrimaryAccordion findings={primary.label} possible_cancer={primary.possible_cancer} gender_specific={primary.gender} recommendation={primary.recommendation}></PrimaryAccordion>
                        </Box>
                      ))}
                  </Box>
                </Box>
              }
            </Box>
          }
        </Grid>
      </Grid>
    </Box>
  );
};
