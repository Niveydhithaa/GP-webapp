import { compileExpression } from 'filtrex';
import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography, 
    TextField
} from "@mui/material"
import { useState, useEffect, useReducer, useCallback } from "react";
import siteJson from "data/sites_master_mod.json"
import { isUndefined } from 'util';
import { useNavigate } from "react-router-dom"
import RenderQuestions from 'evaluation/FiltrexEvalPartTwo';

enum ActionKind {
    STATE = "state",
    UPDATE = "update"
}
interface ActionProp {
    type: ActionKind
    payload: { title: string, value: boolean, question: string }
    index?: number
}
interface Props {
    smoker: boolean | undefined
    asbestos: boolean | undefined
    site: number | undefined
    inputFields: any
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
export default function FiltrexEval({ smoker, asbestos, site, inputFields, ...props }: Props) {
    const navigate = useNavigate()
    //#region state variables
    const [xray, setXray] = useState<number>();
    const [unhaemo, setUnHaemo] = useState<number>();
    const [furtherInvest, setFurther] = useState<boolean>(false)
    const [immediate, setImmediate] = useState<boolean>(false)
    //#endregion
    const [nextScreen, setNextScreen] = useState<boolean>(false)
    let initialState = { name: [] };
    const [inputFieldsScreenTwo, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        // Run! Like go get some data from an API.
        setNextScreen(false)
        renderQuestionsToggle()
    }, []);
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
            payload: { title: state_name, value: state_value, question: question },
            index: index
        });
        console.log(inputFieldsScreenTwo.name)
    };
    const clickHandler = () => {
        //#region Sample Expression Evaluation
        // Input from user (e.g. search filter)
        // var expression = 'transactions < 3 and abs(profit) > 20.5';
        // // Compile expression to executable function
        // var myfilter = compileExpression(expression);
        // var a = myfilter({transactions: 3, profit:-40.5}); // returns 1
        // var b = myfilter({transactions: 2, profit:-49.5}); // returns 0
        // console.log(a)
        // console.log(b)
        // //#endregion
        // var screen2_expr = 'xrayfindings==0 or xrayfindings==-1 or unexplained_heamoptysis==present';
        // var screen2_filter = compileExpression(screen2_expr)
        // var a1 = screen2_filter({xrayfindings: 0, unexplained_haemoptysis: "present"})
        // console.log(a1)

        var screen2_expr2 = siteJson[0].screens[1].condition?.at(0)
        console.log(typeof (screen2_expr2))
        if (screen2_expr2 != undefined && !Array.isArray(screen2_expr2)) {
            //xrayfindings=0 : normal
            //xrayfindings=1 : abnormal
            var screen2_filter2 = compileExpression(screen2_expr2)
            console.log(xray)
            console.log(unhaemo)

            var a2 = screen2_filter2({ xray_findings: xray, unexplained_heamoptysis: unhaemo })
            console.log(a2)
            if (a2) {
                setImmediate(true)
                setFurther(false)
            }
            else if (!a2) {
                setFurther(true)
                setImmediate(false)
            }
        }

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
            console.log(site)
            let totalDict = siteJson[site - 1].screens[1].values
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
            console.log(" Input field after loop: " + JSON.stringify(inputFieldsScreenTwo))
            console.log("driver function exit")
        }
        return questionsList;
    }
    return (
        <Box>

            {
                (site !== undefined) &&
                <Box>
                    <Typography>{siteJson[site - 1].screens[1].display_name}</Typography>
                    {inputFieldsScreenTwo.name.map((item: any, index: number) => {
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
                                            <ToggleButton value={true} id="toggle_symptom">Yes</ToggleButton>
                                            <ToggleButton value={false}>No</ToggleButton>
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

            {/*}
            <Box>
                <Typography>{siteJson[0].screens[1].values['unexplained_heamoptysis']?.display_name}</Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={unhaemo}
                    exclusive
                    onChange={(e: any, newValue: number ) => setUnHaemo(newValue)}
                    aria-label="Platform"
                    >
                    <ToggleButton value={1} id="toggle_symptom">Yes</ToggleButton>
                    <ToggleButton value={0}>No</ToggleButton>
                </ToggleButtonGroup>
            </Box>
             */}
            <Button onClick={clickHandler}>Get results</Button>
            <Box>
                <Button disabled={!furtherInvest} color="secondary" variant="contained" onClick={clickFurther}>{siteJson[0].screens[1].termination_button_text?.at(1)}</Button>
                <Button disabled={!immediate} color="error" variant="contained">{siteJson[0].screens[1].termination_button_text?.at(0)}</Button>
            </Box>
            {/* section for further offer screen */}
            {
                nextScreen &&
                <RenderQuestions smoker={smoker} asbestos={asbestos} />
            }
        </Box>
    )
}