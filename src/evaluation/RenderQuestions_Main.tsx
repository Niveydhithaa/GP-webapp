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
}
export const reducer = (state: any, action: ActionProp) => {
    switch (action.type) {
        case ActionKind.STATE: {
            debugger;
            console.log(action)
            return {...state, name: [...state.name, action.payload]};
        }
        case ActionKind.UPDATE:{
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
export default function RenderQuestions_MAIN({condition, site, ...props} : Props) {
    const [smoker, setSmoker] = useState<boolean>()
    const [asbestos, setAsbestos] = useState<boolean>()
    const [startEval, setStartEval] = useState<boolean>(false)
    
    const [inputFields, dispatch] = useReducer(reducer, initialState)
    let states: Record<string, any>[] = [];
    const age = 45;
    console.log("Hello rendering!")
    const vals = Object.values(siteJson[0].screens[0].values)
    useEffect(() => {
        renderQuestionsToggle()
    }, [site])
    const getResults = () => {
        console.log("smoker val:" + smoker)
        console.log("asbestos val:" + asbestos)
        console.log("age: " + age)
        {
            Object.entries(siteJson[0].screens[0].values).forEach(([k, v]) => {
                console.log("The key: ", k)
                console.log("The value: ", v)
            })
        }
        if (smoker == false && asbestos == false) {
        }
        else if (smoker == true && asbestos == false) {
            // console.log(siteJson[0].screens)
            console.log(siteJson[0].screens[2])
            localStorage.setItem("screenname", siteJson[0].screens[2].screen_name)
            console.log(siteJson[0].screens[2].screen_name)
            let screen3obj = siteJson[0].screens[2]
            // let total_symps = screen3obj.symptoms
        }
        setStartEval(true)
    }
    const handleAddMoreFields = useCallback((state_name: string, state_value: boolean, question: string) => {
        console.log("to add to list")
        //debugger;
        dispatch({
            type: ActionKind.STATE,
            payload: { title: state_name, value: state_value, question: question }
        });
    }, [site]);

    const handleUpdateValueField = (index: number, state_name: string, state_value: boolean, question: string) => {
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
            let totalDict = siteJson[site-1].screens[0].values
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
        console.log(" Input field after loop: " + JSON.stringify(inputFields))
        console.log("driver function exit")
        }
        return questionsList;
    }
    return (
        <Box>
            <Typography style={{color: "red"}}>Dynamic tries: START</Typography>
            {/* <Box>{condition&&renderQuestionsToggle()}</Box> */}
            {/* <Button onClick={renderQuestionsToggle}>Render</Button> */}
            {JSON.stringify(inputFields.name)}
            {inputFields.name.map((item: any, index : number) => {
                   return (
                        <Box key={index} className="Wrapper">
                            {/* {console.log(item.name.title)} */}
                            <Typography>{item.question} - {item.title}</Typography>
                            
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
                                                    handleUpdateValueField(index, item.title, newValue, item.question)
                                                    item.value = newValue
                                                }}
                                                aria-label="Platform"
                                            >
                                            <ToggleButton value={true} id="toggle_symptom">Yes</ToggleButton>
                                            <ToggleButton value={false}>No</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                }
                                {
                                    (item.title=="gender" || item.title=="age")
                                    &&
                                    <Box>
                                        <TextField label={item.title} disabled={true}>Autofilled</TextField>
                                    </Box>
                                }
                        </Box>
                   )
                  
                })
            }
            <Typography style={{color: "red"}}>Dynamic tries: END</Typography>
            <Button onClick={getResults} variant="contained">Next</Button>
            {
                startEval &&
                <FiltrexEval smoker={smoker} asbestos={asbestos} site={site} inputFields={inputFields}></FiltrexEval>
            }
            
        </Box>
    );
}