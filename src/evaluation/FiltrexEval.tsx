import { compileExpression } from 'filtrex';
import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material"
import {useState, useEffect} from "react";
import siteJson from "data/sites_master_mod.json"
import { isUndefined } from 'util';
import {useNavigate} from "react-router-dom"
import RenderQuestions from 'evaluation/FiltrexEvalPartTwo';

interface Props {
    smoker: boolean | undefined
    asbestos: boolean | undefined
}

export default function FiltrexEval({smoker, asbestos} : Props) {
    const navigate = useNavigate()
    //#region state variables
    const [xray, setXray] = useState<number>();
    const [unhaemo, setUnHaemo] = useState<number>();
    const [furtherInvest, setFurther] = useState<boolean>(false)
    const [immediate, setImmediate] = useState<boolean>(false)
    //#endregion
    const [nextScreen, setNextScreen] = useState<boolean>(false)
    useEffect(() => {
        // Run! Like go get some data from an API.
        setNextScreen(false)
      }, []);
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
        console.log(typeof(screen2_expr2))
        if(screen2_expr2!=undefined && !Array.isArray(screen2_expr2))
        {
            //xrayfindings=0 : normal
            //xrayfindings=1 : abnormal
            var screen2_filter2 = compileExpression(screen2_expr2)
            console.log(xray)
            console.log(unhaemo)
            
            var a2 = screen2_filter2({xray_findings: xray, unexplained_heamoptysis: unhaemo})
            console.log(a2)
            if(a2)
            {
                setImmediate(true)
                setFurther(false)
            }
            else if(!a2)
            {
                setFurther(true)
                setImmediate(false)
            }
        }
        
    }
    const clickFurther = () => {
        // navigate("/filtrex/screen3")
        setNextScreen(true)
    }
    return (
        <Box>
            <Typography>{siteJson[0].screens[1].display_name}</Typography>
            <Box>
                {/* <Typography>XRay findings abnormal?</Typography> */}
                <Typography>{siteJson[0].screens[1].values['xray_findings']?.display_name}</Typography>
                <Typography fontSize={10}>Choose 'No' For normal ; 'Yes' for Abnormal findings ; 'Not available' if so</Typography>
                <ToggleButtonGroup
                    color="primary"
                    value={xray}
                    exclusive
                    onChange={(e: any, newValue: number ) => setXray(newValue)}
                    aria-label="Platform"
                    >
                    <ToggleButton value={1} id="toggle_symptom">Yes (Lung cancer)</ToggleButton>
                    <ToggleButton value={-1} id="toggle_symptom">Yes (Mesathelioma)</ToggleButton>
                    <ToggleButton value={0}>No</ToggleButton>
                    <ToggleButton value={2}>Not available</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box>
                <Typography>{siteJson[0].screens[1].values['unexplained_heamoptysis']?.display_name}</Typography>
                {/* <Typography>Unexplained Haemopthysis</Typography> */}
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
            <Button onClick={clickHandler}>Get results</Button>
            <Box>
            <Button disabled={!furtherInvest} color="secondary" variant="contained" onClick={clickFurther}>{siteJson[0].screens[1].termination_button_text?.at(1)}</Button>
            <Button disabled={!immediate} color="error" variant="contained">{siteJson[0].screens[1].termination_button_text?.at(0)}</Button>
            </Box>
            {/* section for further offer screen */}
            {
                nextScreen && 
                <RenderQuestions smoker={smoker} asbestos={asbestos}/>
            }
        </Box>
    )
}