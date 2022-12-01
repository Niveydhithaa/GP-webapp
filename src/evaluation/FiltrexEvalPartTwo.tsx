import {
    Box,
    Autocomplete,
    TextField,
    Button,
    Typography,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material"
import {useState} from "react"
// import siteJson from "data/sites_master_mod.json"
// import { compileExpression } from "filtrex"
interface Props {
    smoker: boolean | undefined
    asbestos: boolean | undefined
}

export default function FiltrexEvalPartTwo({smoker, asbestos} : Props) {
//     const [cough, setCough] = useState<number>()
//     const [fatigue, setFatigue] = useState<number>()
//     const [shortness_breath, setShortnessBreath]= useState<number>()
//     const [buttonText, setButtonText] = useState<string>()
//     const [offer, setOffer] = useState<string[]>()
//     const [consider, setConsider] = useState<string[]>()
//     const age =45;
//     const getResults = () => {
//         //#region Getexpressions from backend
//         console.log(siteJson[0].screens[2].condition?.at(0))
//         var screen3_expr1 = siteJson[0].screens[2].condition?.at(0)?.at(0)
//         var screen3_expr2 = siteJson[0].screens[2].condition?.at(1)?.at(0)
//         var screen3_expr3 = siteJson[0].screens[2].condition?.at(2)?.at(0)
//         var screen3_expr4 = siteJson[0].screens[2].condition?.at(3)?.at(0)
//         console.log(screen3_expr1)
//         console.log(screen3_expr2)
//         console.log(screen3_expr3)
//         console.log(screen3_expr4)
//         //#endregion
        
//         //#region Construct User input dictinoary
//         let offer_lungcancer_list = siteJson[0].screens[2].offer_symptoms_lung_cancer
//         var offer_lungcancer_dict: Record<string, boolean> = {};
//         for(let i in offer_lungcancer_list)
//         {
//             var key = offer_lungcancer_list[Number(i)]
//             offer_lungcancer_dict[key] = false
//         }
//         setOffer(offer_lungcancer_list)
//         // the part where the input needs to be read. for that we need to dynamically render the ui items
//         let consider_lungcancer_list = siteJson[0].screens[2].offer_symptoms_lung_cancer
//         var consider_lungcancer_dict: Record<string, boolean> = {};
//         for(let i in consider_lungcancer_list)
//         {
//             var key = consider_lungcancer_list[Number(i)]
//             consider_lungcancer_dict[key] = false
//         }
//         setConsider(consider_lungcancer_list)
//         //#endregion
        
//         //#region Rule Engine
//         if(screen3_expr1!=undefined && screen3_expr2!=undefined && screen3_expr3!=undefined && screen3_expr4!=undefined)
//         {
//             var screen3_filter1 = compileExpression(screen3_expr1)
//             var screen3_filter2 = compileExpression(screen3_expr2)
//             var screen3_filter3 = compileExpression(screen3_expr3)
//             var screen3_filter4 = compileExpression(screen3_expr4)
//             console.log(cough)
//             console.log(fatigue)
//             console.log(age)
//             console.log(shortness_breath)
//             let count_offer = [cough, fatigue, shortness_breath].filter(x=> x==1).length
//             var mp_dict = {smoker: smoker, asbestos:false, age: age, count_offer: count_offer, count_consider: 0, count_offer_mes: 0, count_consider_mes: 0}
//             var termin_val_arr = []
//             var a2 = screen3_filter1(mp_dict)
//             console.log("FILTER 1 :" + a2)
//             var a2_2 = screen3_filter2(mp_dict)
//             console.log("FILTER 2 :" + a2_2)
//             var a2_3 = screen3_filter3(mp_dict)
//             console.log("FILTER 3 :" + a2_3)
//             var a2_4 = screen3_filter4(mp_dict)
//             console.log("FILTER 4 :" + a2_4)
//             termin_val_arr.push(a2)
//             termin_val_arr.push(a2_2)
//             termin_val_arr.push(a2_3)
//             termin_val_arr.push(a2_4)

//             var terminal_result = siteJson[0].screens[2].termination_button_text
//             for(let i=0; i<terminal_result.length; i++)
//             {
//                 // if(termin_val_arr[i]==true)
//                 // {
//                 //     setButtonText(terminal_result[i])
//                 // }
                
//             }
//             console.log(termin_val_arr.filter(x => x===true))
//         }
//         //#endregion
//     }
    return (
//         <Box>
//             <Box>
//             <Typography>{siteJson[0].screens[2].display_name}</Typography>
//             </Box>
//             <Box>
//                 <Typography>{siteJson[0].screens[2].values.cough?.options[0]}</Typography>
//                 <ToggleButtonGroup
//                     color="primary"
//                     value={cough}
//                     exclusive
//                     onChange={(e: any, newValue: number ) => setCough(newValue)}
//                     aria-label="Platform"
//                     >
//                     <ToggleButton value={1} id="toggle_symptom">Yes</ToggleButton>
//                     <ToggleButton value={0}>No</ToggleButton>
//                 </ToggleButtonGroup>
//             </Box>
//             <Box>
//                 <Typography>{siteJson[0].screens[2].values.fatigue?.options[0]}</Typography>
//                 <ToggleButtonGroup
//                     color="primary"
//                     value={fatigue}
//                     exclusive
//                     onChange={(e: any, newValue: number ) => setFatigue(newValue)}
//                     aria-label="Platform"
//                     >
//                     <ToggleButton value={1} id="toggle_symptom">Yes</ToggleButton>
//                     <ToggleButton value={0}>No</ToggleButton>
//                 </ToggleButtonGroup>
//             </Box>
//             <Box>
//                 <Typography>{siteJson[0].screens[2].values["shortness_of_breath"]?.options[0]}</Typography>
//                 <ToggleButtonGroup
//                     color="primary"
//                     value={shortness_breath}
//                     exclusive
//                     onChange={(e: any, newValue: number ) => setShortnessBreath(newValue)}
//                     aria-label="Platform"
//                     >
//                     <ToggleButton value={1} id="toggle_symptom">Yes</ToggleButton>
//                     <ToggleButton value={0}>No</ToggleButton>
//                 </ToggleButtonGroup>
//             </Box>
//             <Button onClick={getResults}>Get results</Button>
//         </Box>
        <Box>
            <Typography>Further Investigation - screen 3</Typography>
            <Box mt={2}>
                <Button variant="contained">Complete</Button>
            </Box>
        </Box>
    )
}