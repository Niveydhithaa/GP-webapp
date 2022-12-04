import {
    Box,
    Autocomplete,
    TextField,
    Button,
    Typography,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material"
import {useState, useCallback, useEffect, useReducer} from "react"
import siteJson from "data/sites_master_mod.json"
import { compileExpression } from "filtrex"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
interface Props {
    smoker: boolean | undefined
    asbestos: boolean | undefined
    site: number | undefined
    inputFields: any
}
enum ActionKind {
    STATE = "state",
    UPDATE = "update"
}
interface ActionProp {
    type: ActionKind
    payload: { title: string, value: boolean | number, question: string }
    index?: number
}
export const reducer = (state: any, action: ActionProp) => {
    switch (action.type) {
        case ActionKind.STATE: {
            debugger;
            console.log(action)
            return { ...state, name: [...state.name, action.payload] };
        }
        case ActionKind.UPDATE: {
            if (action.index !== undefined)
                state["name"][action.index]["value"] = action.payload.value
            // return {...state, name: [...state.name, action.payload]};
            return { ...state };
        }
        default:
            return state;
    }
};
export default function FiltrexEvalPartTwo({smoker, asbestos, site, inputFields, ...props} : Props) {
    const [cough, setCough] = useState<number>()
    const [fatigue, setFatigue] = useState<number>()
    const [shortness_breath, setShortnessBreath]= useState<number>()
    const [buttonText, setButtonText] = useState<string>()
    const [offer, setOffer] = useState<string[]>()
    const [consider, setConsider] = useState<string[]>()
    const [ruleEvalResults, setRuleEvalResults] = useState<boolean[]>([])
    const [openTreatmentOptions, setOpenTreatmentOptions] = useState<boolean>();
    const age =45;
    const [value, setValue] = useState('female');

    const handleChangeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setImmediate(false)
        // setFurther(false)
        setValue((event.target as HTMLInputElement).value);
    };
    const getResults = () => {
        if(site!==undefined)
        {
            console.log("Click handler")
            var screen3_conditions_arr = siteJson[site-1].screens[2].condition
            console.log(screen3_conditions_arr)
            // step1: categorize offer, consider
            // step2: count_oofer, count_consider need to store the length of true's
            // merge the valyes needed for comparing condition
            var compareList:any[] = []
            inputFieldsScreenThree.name.map((item: any, index: any) => {

                let a = item.title
                let compareDict = {[a] : item.value}
                console.log(compareDict)
                compareList.push(compareDict)
            })
            inputFields.name.map((item: any, index: any) => {
                let a = item.title
                let compareDict = {[a] : item.value}
                console.log(compareDict)
                compareList.push(compareDict)
            })
            let totalDict = compareList.reduce((a, e) => 
            // iterate each object entry as [key, value] and use "a" as accumulator
            Object.entries(e).reduce((a, t) => {
                // create an empty array on "a" for each key (if it does not exist yet)
                // then push current value to it
                a[t[0]] = t[1];
                return a;
            }, a), {});
            for(let i in Object.keys(totalDict)) {
                if(Object.keys(totalDict)[i] == "age")
                {
                    totalDict["age"] = 45;
                }
            }
            console.log(totalDict);
            //total dict has tp be added with:
            // 1. count_offer
            console.log(siteJson[0].screens[2].values)
            console.log(siteJson[site-1].screens[2].offer_symptoms)
            console.log(siteJson[site-1].screens[2].consider_symptoms)
            //branch 1 - offer (urgent)
            if(site-1==0)
            {
                const completeOfferDict = siteJson[site-1].screens[2].offer_symptoms
                let tempDict_offer : Record<string, number[]>[] = []
                let tempDict_consider : Record<string, number[]>[] = []
                if(completeOfferDict!==undefined)
                {
                    console.log(Object.keys(completeOfferDict).length)
                    
                    let keys_offer = Object.keys(completeOfferDict)
                    let values_offer = Object.values(completeOfferDict)
                    // inputFieldsScreenThree.name.map((item_input: any, index_input: number) => {
                    //     // console.log(item_input.title)
                        
                    // })
                    let tempList:number[] = []
                    
                        // console.log(item_input.title)
                        for(let i in keys_offer)
                        {
                            tempList = []
                            values_offer[i].map((item_actual: any, index: number) => {
                                // console.log(item_actual)
                                inputFieldsScreenThree.name.map((item_input: any, index_input: number) => {
                                    if(item_actual==item_input.title)
                                    {
                                        console.log(keys_offer[i])
                                        console.log("EQUAL KEYS")
                                        // tempDict.push({[keys_offer[i])
                                        tempList.push(item_input.value)
                                    }
                                })
                            })
                            tempDict_offer.push({[keys_offer[i]] : tempList })
                        }
                    
                    console.log("values of offer (both types of cancer) with inputfields" + JSON.stringify(tempDict_offer))
                }
                

                //branch 2 - consider
                const completeConsiderDict = siteJson[site-1].screens[2].consider_symptoms
                if(completeConsiderDict!==undefined)
                {
                    console.log(Object.keys(completeConsiderDict).length)
                    
                    let keys_offer = Object.keys(completeConsiderDict)
                    let values_offer = Object.values(completeConsiderDict)
                    let tempList:number[] = []
                    
                        // console.log(item_input.title)
                        for(let i in keys_offer)
                        {
                            tempList = []
                            values_offer[i].map((item_actual: any, index: number) => {
                                // console.log(item_actual)
                                inputFieldsScreenThree.name.map((item_input: any, index_input: number) => {
                                    if(item_actual==item_input.title)
                                    {
                                        console.log(keys_offer[i])
                                        console.log("EQUAL KEYS")
                                        // tempDict.push({[keys_offer[i])
                                        tempList.push(item_input.value)
                                    }
                                })
                            })
                            tempDict_consider.push({[keys_offer[i]] : tempList })
                        }
                    
                    console.log("values of consider (both types of cancer) with inputfields" + JSON.stringify(tempDict_consider))
                }
                // var count_offer = tempDict_offer[0].lung_cancer.length
                // var count_offer_mes = tempDict_offer[1].mesathelioma.length
                // console.log(tempDict_offer[0].lung_cancer.filter(x => x==1).length)
                var count_offer = tempDict_offer[0].lung_cancer.filter(x => x==1).length
                // console.log(tempDict_offer[1].mesothelioma.filter(x => x==1).length)
                var count_offer_mes = tempDict_offer[1].mesothelioma.filter(x => x==1).length
                var count_consider = tempDict_consider[0].lung_cancer.filter(x => x==1).length
                var count_consider_mes = tempDict_consider[1].mesothelioma.filter(x => x==1).length
                console.log(count_offer + "---- LUNG cancer, offer")
                console.log(count_consider + "---- LUNG cancer, consider")
                console.log(count_offer_mes + "---- MESOTHELIOMA cancer, offer")
                console.log(count_consider_mes + "---- MESOTHELIOMA cancer, consider")
                totalDict["count_offer"] = count_offer
                totalDict["count_offer_mes"] = count_offer_mes
                totalDict["count_consider"] = count_consider
                totalDict["count_consider_mes"] = count_consider_mes

            }
            // CONDITIONS!
            var screen3_conditions_arr = siteJson[site-1].screens[2].condition
            console.log(screen3_conditions_arr)
            console.log(totalDict)
            var resultsArray : boolean[] = []
            screen3_conditions_arr?.map((condition: any, index: any) => {
                console.log(condition)
                console.log(typeof(condition))
                if(condition!=undefined)
                {
                    var ruleEngine = compileExpression(condition)
                    var a3 = ruleEngine(totalDict)
                    console.log(a3)
                    resultsArray.push(a3)
                }
            })
            console.log(resultsArray)
            setRuleEvalResults(resultsArray)
            
        }
        setOpenTreatmentOptions(true)
    }

    let initialState = { name: [] };
    const [inputFieldsScreenThree, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        // Run! Like go get some data from an API.
        setRuleEvalResults([])
        renderQuestionsToggle()
    }, []);
    const handleAddMoreFields = useCallback((state_name: string, state_value: boolean | number, question: string) => {
        console.log("to add to list")
        //debugger;
        dispatch({
            type: ActionKind.STATE,
            payload: { title: state_name, value: state_value, question: question }
        });
    }, [site]);

    const handleUpdateValueField = (index: number, state_name: string, state_value: boolean | number, question: string) => {
        console.log("update value : index: " + index + " value: " + state_value)
        dispatch({
            type: ActionKind.UPDATE,
            payload: { title: state_name, value: state_value, question: question },
            index: index
        });
        console.log(inputFieldsScreenThree.name)
    };
    const renderQuestionsToggle = () => {
        console.log("driver function enter")
        //make the inputFields epmty here. for each site it has to be made empty
        let questionsList: any[] = [];
        if (site != undefined) {
            console.log(site)
            let totalDict = siteJson[site - 1].screens[2].values
            let keys = Object.keys(totalDict)
            let values = Object.values(totalDict)
            console.log(" Initial state of input field:  " + JSON.stringify(initialState))
            for (var i in keys) {
                console.log(i)
                console.log(values[i])
                console.log(keys[i])
                console.log(totalDict.hasOwnProperty(keys[i]))
                // #infinite loop problem
                handleAddMoreFields(keys[i], true, values[i].message)

                console.log(JSON.stringify(initialState))
            }
            console.log(" Input field after loop: " + JSON.stringify(inputFieldsScreenThree))
            console.log("driver function exit")
        }
        return questionsList;
    }
    return (
        <Box>
            { (site!==undefined) && 
                <Box>
                    <Typography>{siteJson[site-1].screens[2].display_name}</Typography>
                    {inputFieldsScreenThree.name.map((item: any, index: number) => {
                        return (
                            <Box key={index} className="Wrapper">
                                {/* {console.log(item.name.title)} */}
                                <Typography>{item.question} - {item.title}</Typography>

                                {
                                    (item.title != "gender" && item.title != "age") &&
                                    <Box>
                                        <ToggleButtonGroup
                                            color="primary"
                                            exclusive
                                            value={item.value}
                                            // onInput={}
                                            // onClick={(e: React.MouseEvent<HTMLElement>, newValue: boolean) => handleUpdateValueField(index, item.title, newValue, item.question)}
                                            onChange={(e: React.MouseEvent<HTMLElement>, newValue: boolean) => {
                                                handleUpdateValueField(index, item.title, newValue, item.question)
                                                item.value = newValue
                                            }}
                                            defaultValue={0}
                                            aria-label="Platform"
                                        >
                                            <ToggleButton value={1} id="toggle_symptom">Yes</ToggleButton>
                                            <ToggleButton value={0}>No</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                }
                                {
                                    (item.title == "gender" || item.title == "age")
                                    &&
                                    <Box>
                                        <TextField label={item.title} disabled={true}>Autofilled</TextField>
                                    </Box>
                                }
                            </Box>
                        )

                    })
                    }
                </Box>                
            }
            
            
            
            <Typography>Further Investigation - screen 3</Typography>
            <Button onClick={getResults} variant="contained">Next</Button>
            { openTreatmentOptions && 
                <Box>
                {/* <Button disabled={!furtherInvest} color="secondary" variant="contained" onClick={clickFurther}>{siteJson[0].screens[1].termination_button_text?.at(1)}</Button>
                <Button disabled={!immediate} color="error" variant="contained">{siteJson[0].screens[1].termination_button_text?.at(0)}</Button> */}
                <Box>
                    { (site!==undefined) &&
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Select Treatment</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChangeToggle}
                            >
                                {
                                siteJson[site - 1].screens[2].termination_button_text?.map((item: any, index: number ) => {
                                    return (
                                        <Box display="inline-flex">
                                            <>{console.log(ruleEvalResults)}</>
                                            <FormControlLabel value={item} control={<Radio />} label={item} />
                                            {/* recheck the below conditions */}
                                            {(ruleEvalResults[index]==true && index!==ruleEvalResults.length) &&
                                                <Typography>(Recommended)</Typography>
                                            }
                                        </Box>
                                    )
                                })
                                }
                            </RadioGroup>
                            <Box>
                            {/* <Button variant="contained">Next</Button> */}
                            </Box>
                        </FormControl>
                    }
                </Box>
            </Box>

            }
            
            <Box mt={2}>
                <Button variant="contained">Complete</Button>
            </Box>
        </Box>
    )
}