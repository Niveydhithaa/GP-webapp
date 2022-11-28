import site_json from "../data/sites_master_data.json"
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
import RenderQuestions from "evaluation/RenderQuestions_Clone"

const siteData =  ['Lung', 'Blood']
export default function SiteJson() {
    const [site, setSite] = useState<string | null>(siteData[0])
    
    const [getData, setGetData] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const getIdFromSite = (site: string) => {
    }
    const getDataHandler = () => {
        setGetData(true)
    }
    
    return (
        <Box>
            {/* {
                site_json.map(singlesite => {
                    return (
                        <div>
                            <h1>{singlesite.site_id}</h1>
                            <p>{singlesite.site}</p>
                        </div>
                    )
                })
            } */}
            <Box>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={siteData}
                    sx={{ width: 300 }}
                    value={site}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    console.log("new site chosen: " + newInputValue)
                    }}
                    onChange={(e: any, newValue: string | null) => setSite(newValue)}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                />
                <Button onClick={getDataHandler}>Get data</Button>
                {
                    getData==true &&
                    <RenderQuestions id="1" />
                }
            </Box>
        </Box>
    )
}