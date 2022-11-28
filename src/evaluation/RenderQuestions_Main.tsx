import {
    Box,
    Autocomplete,
    TextField,
    Button,
    Typography,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material"
import { useState, useReducer } from "react"
import siteJson from "../data/sites_master_mod.json"
import FiltrexEval from "evaluation/FiltrexEval"
enum ActionKind {
    STATE = "state",
    UPDATE = "update"
}
interface ActionProp {
    type: ActionKind
    name: { title: string, payload: boolean, question: string }
}
const reducer = (state: any, action: ActionProp) => {
    switch (action.type) {
        case ActionKind.STATE:
            return [...state, action];
        case ActionKind.UPDATE:
            state.action.name.payload = action.name.payload
            return state;
        default:
            return state;
    }
};
export default function RenderQuestions_MAIN() {
    const [smoker, setSmoker] = useState<boolean>()
    const [asbestos, setAsbestos] = useState<boolean>()
    const [startEval, setStartEval] = useState<boolean>(false)
    let initialState = [{ type: ActionKind.STATE, name: { title: "default", payload: true, question: "defaultqn" } }];
    const [inputFields, setInputFields] = useReducer(reducer, initialState)
    let states: Record<string, any>[] = [];
    const age = 45;
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
            let total_symps = screen3obj.symptoms
        }
        setStartEval(true)
    }
    const handleAddMoreFields = (state_name: string, state_value: boolean, question: string) => {
        console.log("to add to list")
        setInputFields({
            type: ActionKind.STATE,
            name: { title: state_name, payload: state_value, question: question }
        });
    };
    const handleUpdateValueField = (state_name: string, state_value: boolean, question: string) => {
        console.log("update value")
        setInputFields({
            type: ActionKind.UPDATE,
            name: { title: state_name, payload: state_value, question: question}
        });
    };
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
            console.log(values[i])
            console.log(keys[i])
            console.log(totalDict.hasOwnProperty(keys[i]))
            // #infinite loop problem
            // handleAddMoreFields(keys[i], true, values[i].message)
            inputFields.map((item: any) => {
                    console.log(item)
                    questionsList.push(
                        <Box key={`${item.name.title}`} className="Wrapper">
                            {/* {console.log(item.name.title)} */}
                            <Typography>{values[i].message}</Typography>
                            
                                {
                                    values[i].options &&
                                    <Box>
                                        <ToggleButtonGroup
                                                color="primary"
                                                exclusive
                                                value={true}
                                                onChange={(e: React.MouseEvent<HTMLElement>, newValue: boolean) => handleUpdateValueField(keys[i], newValue, values[i].message)}
                                                aria-label="Platform"
                                            >
                                            <ToggleButton value={true} id="toggle_symptom">Yes</ToggleButton>
                                            <ToggleButton value={false}>No</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                }
                                {
                                    !values[i].options &&
                                        <TextField disabled value="Autofilled"/>
                                }
                        </Box>
                    );
                })
            
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
            <Box>{renderQuestionsToggle()}</Box>
            <Button onClick={getResults}>Get results</Button>
            {
                startEval &&
                <FiltrexEval smoker={smoker} asbestos={asbestos}></FiltrexEval>
            }
        </Box>
    );
}