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

enum Colors {
    PRIMARY = "primary",
    ERROR  = "error"
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
    const [ruleEvalResults, setRuleEvalResults] = useState<boolean[]>([])
    const [buttonMapping, setButtonMapping] = useState<Record<any, any>>();
    //#endregion
    const [nextScreen, setNextScreen] = useState<boolean>(false)
    let initialState = { name: [] };
    const [inputFieldsScreenTwo, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        // Run! Like go get some data from an API.
        setNextScreen(false)
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
        console.log(inputFieldsScreenTwo.name)
    };
    const clickHandler = () => {
        if(site!==undefined)
        {
            console.log("Click handler")
            var screen2_conditions_arr = siteJson[site-1].screens[1].condition
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
            for(let i in Object.keys(totalDict)) {
                if(Object.keys(totalDict)[i] == "age")
                {
                    totalDict["age"] = 45;
                }
            }
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
            if (resultsArray.filter(x => x===true).length >= 1) {
                setImmediate(true)
                setFurther(false)
            }
            else  {
                setFurther(true)
                setImmediate(false)
            }
            //get true indices

            //#region Commented
            // var screen2_expr2 = siteJson[site-1].screens[1].condition?.at(0)?.at(0)
            // console.log(typeof (screen2_expr2))
            // console.log(screen2_expr2)
            // if (screen2_expr2 != undefined && !Array.isArray(screen2_expr2)) {
            //     //xrayfindings=0 : normal
            //     //xrayfindings=1 : abnormal
            //     var screen2_filter2 = compileExpression(screen2_expr2)
            //     console.log(xray)
            //     console.log(unhaemo)
            //     var compareList:any[] = []
            //     inputFieldsScreenTwo.name.map((item: any, index: any) => {

            //         let a = item.title
            //         let compareDict = {[a] : item.value}
            //         console.log(compareDict)
            //         compareList.push(compareDict)
            //     })
            //     inputFields.name.map((item: any, index: any) => {
            //         let a = item.title
            //         let compareDict = {[a] : item.value}
            //         console.log(compareDict)
            //         compareList.push(compareDict)
            //     })
            //     // iterate data array and use empty object "a" as accumulator
            //     let totalDict = compareList.reduce((a, e) => 
            //     // iterate each object entry as [key, value] and use "a" as accumulator
            //     Object.entries(e).reduce((a, t) => {
            //         // create an empty array on "a" for each key (if it does not exist yet)
            //         // then push current value to it
            //         a[t[0]] = t[1];
            //         return a;
            //     }, a), {});

            //     console.log(totalDict);
            //     var a2 = screen2_filter2(totalDict)
            //     console.log(a2)
            //     if (a2) {
            //         setImmediate(true)
            //         setFurther(false)
            //     }
            //     else if (!a2) {
            //         setFurther(true)
            //         setImmediate(false)
            //     }
            // }
            //#endregion
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
            <Button onClick={clickHandler}>Get results</Button>
            <Box>
                {/* <Button disabled={!furtherInvest} color="secondary" variant="contained" onClick={clickFurther}>{siteJson[0].screens[1].termination_button_text?.at(1)}</Button>
                <Button disabled={!immediate} color="error" variant="contained">{siteJson[0].screens[1].termination_button_text?.at(0)}</Button> */}
                <Box>
                    { (site!==undefined) &&
                        siteJson[site - 1].screens[1].termination_button_text?.map((item: any, index: number ) => {
                            if(siteJson[site-1].screens[1].condition_satisfied_actions!==undefined)
                            {
                                // let a = siteJson[site-1].screens[1].condition_satisfied_actions[index].color
                                // setButtonMapping({})
                            }
                            return (
                                <Box>
                                    {/* <Button color={`${immediate?Colors.ERROR : Colors.PRIMARY}`} variant="contained" onClick={clickFurther} key={index}>{item}</Button> */}
                                    <Button color="primary" variant="contained" onClick={clickFurther} key={index}>{item}</Button>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
            {/* section for further offer screen */}
            {
                nextScreen &&
                <RenderQuestions smoker={smoker} asbestos={asbestos} />
            }
        </Box>
    )
}