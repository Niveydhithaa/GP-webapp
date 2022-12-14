import {
    Box,
    Autocomplete,
    TextField,
    Button,
    Typography,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material"
import { useState, useReducer, useCallback, useMemo, useEffect } from "react"
import siteJson from "../data/sites_master_mod.json"
import FiltrexEval from "evaluation/FiltrexEval"
import {isEqual} from "lodash"
let initialState = { name: []};
enum ActionKind {
    STATE = "state",
    UPDATE = "update",
    RESET = "reset"
}
interface ActionProp {
    type: ActionKind
    payload: { title: string, value: boolean | number, question: string }
    index? : number
}
interface Props {
    condition: boolean
    site: number | undefined
    siteJson_blob: any[]
    age_prefilled: number
    gender_prefilled: any
}
export const reducer = (state: any, action: ActionProp) => {
    switch (action.type) {
        case ActionKind.STATE: {
            debugger;
            console.log(action)
            // if(action.payload.title=='age')
            // {
            //     return {...state, name: [...state.name, ]}
            // }
            return {...state, name: [...state.name, action.payload]};
        }
        case ActionKind.UPDATE:{
            // state["name"][action.inde]
            if(action.index!==undefined)
                state["name"][action.index]["value"] = action.payload.value
            // return {...state, name: [...state.name, action.payload]};
            
            return {...state};
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
export default function RenderQuestions_MAIN({condition, site, siteJson_blob, age_prefilled, gender_prefilled, ...props} : Props) {
    const [smoker, setSmoker] = useState<boolean>()
    const [asbestos, setAsbestos] = useState<boolean>()
    const [startEval, setStartEval] = useState<boolean>(false)
    
    const [inputFields, dispatch] = useReducer(reducer, initialState)
    let states: Record<string, any>[] = [];
    const age = 45;
    console.log("Hello rendering!")
    const vals = Object.values(siteJson_blob[0].screens[0].values)
    useEffect(() => {
        renderQuestionsToggle()
    }, [site])
    const getResults = () => {
        console.log("smoker val:" + smoker)
        console.log("asbestos val:" + asbestos)
        console.log("age: " + age)
        {
            Object.entries(siteJson_blob[0].screens[0].values).forEach(([k, v]) => {
                console.log("The key: ", k)
                console.log("The value: ", v)
            })
        }
        if (smoker == false && asbestos == false) {
        }
        else if (smoker == true && asbestos == false) {
            // console.log(siteJson_blob[0].screens)
            console.log(siteJson_blob[0].screens[2])
            localStorage.setItem("screenname", siteJson_blob[0].screens[2].screen_name)
            console.log(siteJson_blob[0].screens[2].screen_name)
            let screen3obj = siteJson_blob[0].screens[2]
            // let total_symps = screen3obj.symptoms
        }
        setStartEval(true)
    }
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
            payload: { title: state_name, value: state_value, question: question},
            index: index
        });
        console.log(inputFields.name)
    };
    //const toggleFn = useMemo(() => renderQuestionsToggle(), [inputFields]);
    const createDict = (key: string, value: any) => {
        return { key: value }
    }
    //function renderQuestionsToggle
    const renderQuestionsToggle = () => {
        console.log("driver function enter")
        //make the inputFields epmty here. for each site it has to be made empty
        let questionsList: any[] = [];
        if(site!=undefined)
        {
            dispatch({
                type: ActionKind.RESET,
                payload : {title: 'dummy', value: 9, question: 'dummy'}
            })
            console.log(site)
            let totalDict = siteJson_blob[site-1].screens[0].values
        let keys: any[] = Object.keys(totalDict)
        let values: any[] = Object.values(totalDict)
        console.log(" Initial state of input field:  " + JSON.stringify(initialState))
        for (var i in keys) {
            console.log(i)
            console.log(values[i])
            console.log(keys[i])
            console.log(totalDict.hasOwnProperty(keys[i]))
            // #infinite loop problem
            if(keys[i]=='age')
            {
                handleAddMoreFields(keys[i], age_prefilled, values[i].message)
            }
            else if(keys[i]=='gender')
            {
                console.log(typeof(gender_prefilled))
                handleAddMoreFields(keys[i], gender_prefilled, values[i].message)
            }
            else
            {
                handleAddMoreFields(keys[i], 0, values[i].message)
            }
            
            console.log(JSON.stringify(initialState))
        }
        console.log(" Input field after loop: " + JSON.stringify(inputFields))
        console.log("driver function exit")
        }
        return questionsList;
    }
    return (
        <Box>
            {/* <Typography style={{color: "red"}}>Dynamic tries: START</Typography> */}
            {/* <Box>{condition&&renderQuestionsToggle()}</Box> */}
            {/* <Button onClick={renderQuestionsToggle}>Render</Button> */}
            {/* {JSON.stringify(inputFields.name)} */}
            {/* {JSON.stringify("Whether the local and remote JSONs are equal - " + isEqual(siteJson, siteJson_blob))} */}
            
            {inputFields.name.map((item: any, index : number) => {
                   return (
                        <Box key={index} className="Wrapper">
                            {/* {console.log(item.name.title)} */}
                            <Typography>{item.question}</Typography>
                            
                                {
                                    (item.title!="gender" && item.title!="age") &&
                                    <Box>
                                        <ToggleButtonGroup
                                                color="primary"
                                                exclusive
                                                value={item.value}
                                                // onInput={}
                                                // onClick={(e: React.MouseEvent<HTMLElement>, newValue: boolean) => handleUpdateValueField(index, item.title, newValue, item.question)}
                                                onChange={(e: React.MouseEvent<HTMLElement>, newValue: boolean) => {
                                                    // if(newValue!==null && item.value!==newValue)
                                                    // {

                                                    // }
                                                    if(newValue!==null)
                                                    {
                                                        handleUpdateValueField(index, item.title, newValue, item.question)
                                                        item.value = newValue
                                                    }
                                                    
                                                    setStartEval(false)
                                                }}
                                                aria-label="Platform"
                                            >
                                            <ToggleButton value={1} id="toggle_symptom">Yes</ToggleButton>
                                            <ToggleButton value={0}>No</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                }
                                {
                                    (item.title=="age")
                                    &&
                                    <Box>
                                        {age_prefilled==0 &&
                                            <TextField disabled={true} label="Age"></TextField>
                                        }
                                        {age_prefilled!==0 &&
                                            <TextField disabled={true} label={age_prefilled}></TextField>
                                        }
                                    </Box>
                                }
                                {
                                    (item.title=="gender") &&
                                    <Box>
                                        {(gender_prefilled!=0 && gender_prefilled!==1) &&
                                            <TextField disabled={true} label="Gender"></TextField>
                                        }
                                        {gender_prefilled==0 &&
                                            <TextField disabled={true} label="Male"></TextField>
                                        }
                                        {gender_prefilled==1 &&
                                            <TextField disabled={true} label="Female"></TextField>
                                        }
                                    </Box>
                                }
                        </Box>
                   )
                  
                })
            }
            {/* <Typography style={{color: "red"}}>Dynamic tries: END</Typography> */}
            <Box mt={1} mb={2}>
                <Button onClick={getResults} variant="contained">Next</Button>
            </Box>
            {
                startEval &&
                <FiltrexEval smoker={smoker} asbestos={asbestos} site={site} inputFields={inputFields} siteJson_blob = {siteJson_blob} age_prefilled={age_prefilled} gender_prefilled={gender_prefilled}></FiltrexEval>
            }
            
        </Box>
    );
}