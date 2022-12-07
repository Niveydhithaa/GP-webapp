import { compileExpression } from 'filtrex';
import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography, 
    TextField
} from "@mui/material"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect, useReducer, useCallback } from "react";
import siteJson from "data/sites_master_mod.json"
import { isUndefined } from 'util';
import { useNavigate } from "react-router-dom"
import FiltrexEvalPartTwo from 'evaluation/FiltrexEvalPartTwo';
import ImmediateReferral from "evaluation/components/ImmediateReferral"
import {isEqual} from "lodash"

let initialState = { name: [] };
enum Colors {
    PRIMARY = "primary",
    ERROR  = "error"
}
enum ActionKind {
    STATE = "state",
    UPDATE = "update",
    RESET = "reset"
}
interface ActionProp {
    type: ActionKind
    payload: { title: string, value: boolean | number, question: string }
    index?: number
}
interface Props {
    smoker: boolean | undefined
    asbestos: boolean | undefined
    site: number | undefined
    inputFields: any
    siteJson_blob: any[]
    age_prefilled: number
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
        case ActionKind.RESET: {
            state = initialState;
            console.log(state)
            return {...state};
        }
        default:
            return state;
    }
};
export default function FiltrexEval({ smoker, asbestos, site, inputFields, siteJson_blob, age_prefilled, ...props }: Props) {
    const navigate = useNavigate()
    const [value, setValue] = useState('female');

    const handleChangeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImmediate(false)
        setFurther(false)
        setValue((event.target as HTMLInputElement).value);
    };
    //#region state variables
    const [xray, setXray] = useState<number>();
    const [openTreatmentOptions, setOpenTreatmentOptions] = useState<boolean>();
    const [unhaemo, setUnHaemo] = useState<number>();
    const [furtherInvest, setFurther] = useState<boolean>(false)
    const [immediate, setImmediate] = useState<boolean>(false)
    const [ruleEvalResults, setRuleEvalResults] = useState<boolean[]>([])
    const [buttonMapping, setButtonMapping] = useState<Record<any, any>>();
    //#endregion
    const [nextScreen, setNextScreen] = useState<boolean>(false)
    const [inputFieldsScreenTwo, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        // Run! Like go get some data from an API.
        setNextScreen(false)
        
        renderQuestionsToggle()
        
        setRuleEvalResults([])
    }, [site]);
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
        console.log(inputFieldsScreenTwo.name)
    };
    const clickHandler = () => {
        if(site!==undefined)
        {
            console.log("Click handler")
            var screen2_conditions_arr = siteJson_blob[site-1].screens[1].condition
            console.log(screen2_conditions_arr)
            var compareList:any[] = []
            inputFieldsScreenTwo.name.map((item: any, index: any) => {

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
            // iterate data array and use empty object "a" as accumulator
            let totalDict = compareList.reduce((a, e) => 
            // iterate each object entry as [key, value] and use "a" as accumulator
            Object.entries(e).reduce((a, t) => {
                // create an empty array on "a" for each key (if it does not exist yet)
                // then push current value to it
                a[t[0]] = t[1];
                return a;
            }, a), {});
            console.log(totalDict);
            var resultsArray : boolean[] = []
            screen2_conditions_arr?.map((condition: any, index: any) => {
                console.log(condition)
                console.log(typeof(condition))
                if(condition!=undefined)
                {
                    var ruleEngine = compileExpression(condition)
                    var a2 = ruleEngine(totalDict)
                    console.log(a2)
                    resultsArray.push(a2)
                }
            })
            console.log(resultsArray)
            setRuleEvalResults(resultsArray)
        }
        setOpenTreatmentOptions(true)
    }
    const clickFurther = () => {
        // navigate("/filtrex/screen3")
        setNextScreen(true)
    }
    const renderQuestionsToggle = () => {
        console.log("driver function enter")
        //make the inputFields epmty here. for each site it has to be made empty
        let questionsList: any[] = [];
        if (site != undefined) {
            dispatch({
                type: ActionKind.RESET,
                payload : {title: 'dummy', value: 9, question: 'dummy'}
            })
            console.log(site)
            let totalDict = siteJson_blob[site - 1].screens[1].values
            let keys: any[] = Object.keys(totalDict)
            let values: any[] = Object.values(totalDict)
            console.log(" Initial state of input field:  " + JSON.stringify(initialState))
            for (var i in keys) {
                console.log(i)
                console.log(values[i])
                console.log(keys[i])
                console.log(totalDict.hasOwnProperty(keys[i]))
                // #infinite loop problem
                // handleAddMoreFields(keys[i], true, values[i].message)
                if(keys[i]=='age')
                {
                    handleAddMoreFields(keys[i], age_prefilled, values[i].message)
                }
                else
                {
                    handleAddMoreFields(keys[i], 0, values[i].message)
                }
                console.log(JSON.stringify(initialState))
            }
            console.log(" Input field after loop: " + JSON.stringify(inputFieldsScreenTwo))
            console.log("driver function exit")
        }
        return questionsList;
    }
    const onSubmitScreen2 = () => {
        if(value!=="Consider further investigations")
        {
            setImmediate(true)
        }
        else
        {
            setFurther(true)
        }
    }
    return (
        <Box>
            {JSON.stringify("Whether the local and remote JSONs are equal - " + isEqual(siteJson, siteJson_blob))}
            {
                (site !== undefined) &&
                <Box>
                    <Typography>{siteJson_blob[site - 1].screens[1].display_name}</Typography>
                    {inputFieldsScreenTwo.name.map((item: any, index: number) => {
                        return (
                            <Box key={index} className="Wrapper">
                                {/* {console.log(item.name.title)} */}
                                <Typography>{item.question} - {item.title}</Typography>
                                {
                                    (item.title=="xray_findings") &&
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
                                                setOpenTreatmentOptions(false)
                                            }}
                                            aria-label="Platform"
                                        >
                                            <ToggleButton value={1} id="toggle_symptom">Yes, Lung cancer</ToggleButton>
                                            <ToggleButton value={2} id="toggle_symptom">Yes, Mesathelioma</ToggleButton>
                                            <ToggleButton value={3} id="toggle_symptom">Not available</ToggleButton>
                                            <ToggleButton value={0}>No</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                }
                                {
                                    (item.title != "gender" && item.title != "age" && item.title!=="xray_findings") &&
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
                                                setOpenTreatmentOptions(false)
                                            }}
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
            <Box>

            </Box>
            <Button onClick={clickHandler} variant="contained">Next</Button>
            { openTreatmentOptions && 
                <Box>
                {/* <Button disabled={!furtherInvest} color="secondary" variant="contained" onClick={clickFurther}>{siteJson_blob[0].screens[1].termination_button_text?.at(1)}</Button>
                <Button disabled={!immediate} color="error" variant="contained">{siteJson_blob[0].screens[1].termination_button_text?.at(0)}</Button> */}
                <Box>
                    { (site!==undefined) &&
                        <FormControl>
                            {/* <FormLabel id="demo-controlled-radio-buttons-group">Select Treatment</FormLabel> */}
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChangeToggle}
                            >
                                {
                                siteJson_blob[site - 1].screens[1].termination_button_text?.map((item: any, index: number ) => {
                                    return (
                                        <Box display="inline-flex">
                                            <>{console.log(ruleEvalResults)}</>
                                            <FormControlLabel value={item} control={<Radio />} label={item} />
                                            {(index==siteJson_blob[site - 1].screens[1].termination_button_text.length-1 && (ruleEvalResults.filter(x => x===false).length==siteJson_blob[site - 1].screens[1].condition.length))
                                            &&
                                                <Typography color="red" fontSize="13px">(Probable)</Typography>
                                            }
                                            {/* {(ruleEvalResults[index]==true && index!==ruleEvalResults.length) &&
                                                <Typography>(Recommended)</Typography>
                                            } */}
                                            {siteJson_blob[site - 1].screens[1].condition_satisfied_actions?.map((single_condition:any, cond_satis_index: number) => {
                                                return (
                                                    <Box>
                                                        {/* {JSON.stringify(single_condition.button_index)} */}
                                                        {(ruleEvalResults[single_condition.condition_index]==true && single_condition.button_index==index)
                                                            &&
                                                            <Typography color="red" fontSize="13px">(Probable)</Typography>
                                                        }
                                                    </Box>
                                                )
                                            })

                                            }
                                        </Box>
                                    )
                                })
                                }
                            </RadioGroup>
                            <Box>
                            <Button onClick={onSubmitScreen2} variant="contained">Next</Button>
                            </Box>
                        </FormControl>
                    }
                </Box>
            </Box>
            

            }
            {/* section for further offer screen */}
            {
                furtherInvest &&
                <FiltrexEvalPartTwo smoker={smoker} asbestos={asbestos} site={site} inputFields={inputFields} siteJson_blob={siteJson_blob} age_prefilled={age_prefilled}/>
            }
            {/* immediate referral - oncology popup */}
            {
                immediate &&
                <ImmediateReferral cause_of_immediate={value} />
            }
        </Box>
    )
}