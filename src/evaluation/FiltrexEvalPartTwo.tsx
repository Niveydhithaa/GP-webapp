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
    const age =45;
    const getResults = () => {
        if(site!==undefined)
        {
            console.log("Click handler")
            var screen3_conditions_arr = siteJson[site-1].screens[2].condition
            console.log(screen3_conditions_arr)
            // step1: categorize offer, consider
            // step2: count_oofer, count_consider need tos tore
        }
    }

    let initialState = { name: [] };
    const [inputFieldsScreenThree, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        // Run! Like go get some data from an API.
        
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
            <Button onClick={getResults}>Get results</Button>
            <Box mt={2}>
                <Button variant="contained">Complete</Button>
            </Box>
        </Box>
    )
}