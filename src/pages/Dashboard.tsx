import ReplayIcon from '@mui/icons-material/Replay';
import {
  Autocomplete, Box, Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography
} from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
// import MultiSelect from 'components/MultiSelect'
import axios from "axios";
import AccordionExample from "components/AccordionExample";
import Spinner from "components/hooks/Spinner";
import PrimaryAccordion from "components/PrimaryAccordion";
import configData from "config.json";
import { MultiValue } from 'react-select';
import SiteJson from "evaluation/SiteJson"

// let age_global : any = 0;
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
  const [color1, setColor] = useState<string>("#FF0000")
  const [isLung, setIsLung] = useState<boolean>(false);
  const [smoker, setSmoker] = useState<boolean>(false)
  const url = configData.url
  const CreateDict_PrimaryData = (label: string, prim_id : string, findings: string, possible_cancer: string, gender: string, recommendation: string) => {
    return { label: findings, id: prim_id, value: findings.toLowerCase(), possible_cancer: possible_cancer, gender: gender, recommendation: recommendation }
  }
  const CreateDict = (label: string, symp_id: string, sympname: string, possible_cancer: string, gender: string, step1: string, rsponse1_1: string, rsponse1_2: string, nosteps: string, step2_1: string, step2_2: string, response2_1: string, response2_2: string, step3_1: string, step3_2: string, step1_test: string, step2_test: string) => {
    return { label: sympname, id: symp_id, value: sympname.toLowerCase(), possible_cancer: possible_cancer, gender: gender, step1: step1, rsponse1_1: rsponse1_1, rsponse1_2: rsponse1_2, nosteps: nosteps, step2_1: step2_1, step2_2: step2_2, response2_1: response2_1, response2_2: response2_2, step3_1: step3_1, step3_2: step3_2, step1_test: step1_test, step2_test: step2_test }
  }
  const fetchData = debounce((value) => {
    setColor("#800020")
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
    // setAgeV2(0)
    // console.log(ageV2)
    // setAgeV2("")
    setSelectedFromMultiDict([])
    setNoOfSymptoms(0)
    const clr = document.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator")[0] as HTMLElement;
    clr.click();
  }
  const handleTopic = (
    event: React.MouseEvent<HTMLElement>,
    newTopic: string
  ) => {
    if(topic==newTopic) 
    {
      console.log("same topic")
    }
    else if (newTopic!==null && topic!==newTopic)
    {
      console.log(newTopic)
      setNoOfSymptoms(0)
    }
    if (newTopic !== null) {
      console.log("NEW TOPIC: " + newTopic)
      setTopic(newTopic);
    }
    // setTopic(newTopic)
  };
  
  const handleGender = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string
  ) => {
    if (newGender !== null) {
      console.log("gender is:" + newGender)
      setGender(newGender);
    }
    setOptionsTags([])
    setMultiSelectOptions([]);
    setSelectedFromMultiDict([])
    setNoOfSymptoms(0)
    const clr = document.getElementsByClassName("MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator")[0] as HTMLElement;
    if (clr) {
      clr.click();
    }
  };
  const AGEhandleChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("AGE:GT: " + event.target.value)
    setOptionsTags([])
    setMultiSelectOptions([]);
    setSelectedFromMultiDict([])
    setNoOfSymptoms(0)
    if (isNaN(parseInt(event.target.value))) {
      console.log("yes blank")
    }
    else {
      console.log("number is: " + parseInt(event.target.value))
    }
    setAgeV2(Number(event.target.value));
    
  }, 1000);
  // const handleChangeWithLib = debounce((value) => {
  //   fetch(`https://demo.dataverse.org/api/search?q=${value}`)
  //     .then((res) => res.json())
  //     .then((json) => setSuggestions(json.data.items));
  // }, 500);
  const AGEhandleChange_Dropdown = debounce((event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("AGE:from dropdown" + event.target.value)
    if(parseInt(event.target.value)==0)
    {
      console.log("no age filter")
    }
    
      setAgeV2(parseInt(event.target.value));
  }, 1000);
  const handleSearchSymptom = () => {
    setColor("#ff0000")
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
                  <ToggleButton value="site" >Site</ToggleButton>
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
              <TextField
                hiddenLabel={true}
                InputProps={{
                  inputProps: { min: 0, max: 150 }
                }}
                // inputProps={{ type: 'number'}}
                type="number"
                id="demo-simple-select"
                // value={ageV2}
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
                
                onChange={AGEhandleChange} />
            </Box>
            <Box>
              {/* <Typography fontWeight="bold" mb={2}></Typography> */}
              <Button sx={{ mt: 6 }} variant="outlined" startIcon={<ReplayIcon />} onClick={refreshComponents}>
                Clear
              </Button>
            </Box>
            <Box sx={{ mt: 6 }}>{isLoading &&
              <Spinner/>
            }</Box>
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
        {/* <Grid item xs={12} mt={4}>
            {isLoading &&
              <Spinner/>
            }
            {!isLoading
            &&
            <Box></Box>
            }
        </Grid> */}
        {/* SEARCH COMPONENT */}
        <Grid item xs={12}>
          { (topic=="symptom" || topic=="primary") && 
            <Box>
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
                    {/* <Button variant="contained" style={{backgroundColor: color1}}>Hello</Button> */}
                </Box>
              </Box>
            }
          </Box>
          }
        </Grid>
        <Grid item xs={12}>
        {
            (topic=="site") && 
              <Box sx={{ mt: 2, minHeight: "50px" }}>
                <SiteJson />
              </Box>
          }
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
