import {
    Box,
    Autocomplete,
    TextField,
    Button,
    Typography,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material"
import { useState, useReducer, useCallback, useMemo } from "react"
import siteJson from "../data/sites_master_mod.json"
import FiltrexEval from "evaluation/FiltrexEval"
enum ActionKind {
    STATE = "state",
    UPDATE = "update"
}
interface ActionProp {
    type: ActionKind
    payload: { title: string, value: boolean, question: string }
}
export const reducer = (state: any, action: ActionProp) => {
    switch (action.type) {
        case ActionKind.STATE: {
            debugger;
            console.log(action)
            return {...state, name: [...state.name, action.payload]};
        }
        case ActionKind.UPDATE:
            state.action.name.payload = action.payload.value
            return state;
        default:
            return state;
    }
};
export default function RenderQuestions_MAIN() {
    const [smoker, setSmoker] = useState<boolean>()
    const [asbestos, setAsbestos] = useState<boolean>()
    const [startEval, setStartEval] = useState<boolean>(false)
    let initialState = { name: [{ title: "default", payload: true, question: "defaultqn" }]};
    const [inputFields, dispatch] = useReducer(reducer, initialState)
    let states: Record<string, any>[] = [];
    const age = 45;
    console.log("Hello rendering!")
    const vals = Object.values(siteJson[0].screens[0].values)
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
    }, [inputFields]);

    const handleUpdateValueField = (state_name: string, state_value: boolean, question: string) => {
        console.log("update value")
        dispatch({
            type: ActionKind.UPDATE,
            payload: { title: state_name, value: state_value, question: question}
        });
    };
    const toggleFn = useMemo(() => renderQuestionsToggle(), [inputFields]);
    const createDict = (key: string, value: any) => {
        return { key: value }
    }
    function renderQuestionsToggle() {
        console.log("driver function enter")
        let questionsList: any[] = [];
        let totalDict = siteJson[0].screens[0].values
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
            // inputFields.map((item: any) => {
            //         console.log(item)
            //         questionsList.push(
            //             <Box key={`${item.name?.title}`} className="Wrapper">
            //                 {/* {console.log(item.name.title)} */}
            //                 <Typography>{values[i].message}</Typography>
                            
            //                     {
            //                         values[i].options &&
            //                         <Box>
            //                             <ToggleButtonGroup
            //                                     color="primary"
            //                                     exclusive
            //                                     value={true}
            //                                     onChange={(e: React.MouseEvent<HTMLElement>, newValue: boolean) => handleUpdateValueField(keys[i], newValue, values[i].message)}
            //                                     aria-label="Platform"
            //                                 >
            //                                 <ToggleButton value={true} id="toggle_symptom">Yes</ToggleButton>
            //                                 <ToggleButton value={false}>No</ToggleButton>
            //                             </ToggleButtonGroup>
            //                         </Box>
            //                     }
            //                     {
            //                         !values[i].options &&
            //                             <TextField disabled value="Autofilled"/>
            //                     }
            //             </Box>
            //         );
            //     })
            
            console.log(JSON.stringify(initialState))
        }
        console.log(" Input field after loop: " + JSON.stringify(inputFields))
        console.log("driver function exit")
        return questionsList;
    }
    function renderQuestionsToggle_version2() {
        
        console.log("driver function enter")
        let questionsList: any[] = [];
        return questionsList;
    }
    return (
        <Box>
            <Box>
            </Box>
            <Box>
                <Typography>Q.1. Smoker?</Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={smoker}
                    exclusive
                    onChange={(e: any, newValue: boolean) => setSmoker(newValue)}
                    aria-label="Platform"
                >
                    <ToggleButton value={true} id="toggle_symptom">Yes</ToggleButton>
                    <ToggleButton value={false}>No</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box>
                <Typography>Q.2. Has he/she worked in asbestos industry?</Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={asbestos}
                    exclusive
                    onChange={(e: any, newValue: boolean) => setAsbestos(newValue)}
                    aria-label="Platform"
                >
                    <ToggleButton value={true} id="toggle_symptom">Yes</ToggleButton>
                    <ToggleButton value={false}>No</ToggleButton>
                </ToggleButtonGroup>
            </Box> 
            <Typography style={{color: "red"}}>Dynamic tries: START</Typography>
            <Box>{toggleFn}</Box>
            <Typography style={{color: "red"}}>Dynamic tries: END</Typography>
            <Button onClick={getResults}>Get results</Button>
            {
                startEval &&
                <FiltrexEval smoker={smoker} asbestos={asbestos}></FiltrexEval>
            }
            
        </Box>
    );
}