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
import site_json from "../data/sites_master_data.json"
import FiltrexEval from "evaluation/FiltrexEval"

export default function RenderQuestions_MAIN() {
    const [smoker, setSmoker] = useState<boolean>()
    const [asbestos, setAsbestos] = useState<boolean>()
    const [startEval, setStartEval] = useState<boolean>(false)
    const age = 45;
    const getResults = () => {
        console.log("smoker val:" + smoker)
        console.log("asbestos val:" + asbestos)
        console.log("age: "+ age)
        if(smoker==false && asbestos==false)
        {
            
            return(
                <div>
                    <Typography>No further investigation needed! </Typography>
                </div>
            )
        }
        else if (smoker==true && asbestos==false) {
            // console.log(site_json[0].screens)
            console.log(site_json[0].screens[2])
            localStorage.setItem("screenname", site_json[0].screens[2].screen_name)
            console.log(site_json[0].screens[2].screen_name)
            let screen3obj = site_json[0].screens[2]
            let total_symps = screen3obj.values.symptoms
            // Operate.initialize(verbose);
            // var myObject = {a: 5, b: 7, c: true};
            // var myExpression = "a < b && c";
            // var result = Operate.parse(myObject, myExpression);
            // console.log(result);
        }
        setStartEval(true)
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
                    onChange={(e: any, newValue: boolean ) => setSmoker(newValue)}
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
                    onChange={(e: any, newValue: boolean ) => setAsbestos(newValue)}
                    aria-label="Platform"
                    >
                    <ToggleButton value={true} id="toggle_symptom">Yes</ToggleButton>
                    <ToggleButton value={false}>No</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Button onClick={getResults}>Get results</Button>
            {
                startEval && 
                    <FiltrexEval smoker={smoker} asbestos={asbestos}></FiltrexEval>
            }
        </Box>
    );
}