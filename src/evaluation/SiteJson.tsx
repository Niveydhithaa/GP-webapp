import config from "config.json"
import {
    Box,
    Autocomplete,
    TextField,
    Button,
    Typography,
    ToggleButtonGroup,
    ToggleButton
} from "@mui/material"
import {useState, useEffect} from "react"
import axios from "axios";
import RenderQuestions from "evaluation/RenderQuestions_Main"
var siteData : string[];

interface Props {
    age_prefilled: number
    gender_prefilled: any
}

export default function SiteJson({age_prefilled, gender_prefilled, ...props} : Props) {
    const [siteChanged, setSiteChanged] = useState<boolean>()
    const [siteJson_blob, setSiteJson_blob]  = useState<any[]>([])
    const [siteOptions, setSiteOptions] = useState<string[]>([])
    const [site, setSite] = useState<string | null>()
    const [getData, setGetData] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [siteId, setSiteId] = useState<number>();
    function getOptionsArray(siteJson_blob_up:any)
    {
        console.log(siteJson_blob_up)
        console.log(typeof(siteJson_blob_up))
        var site_options = [];
        if(siteJson_blob_up!=undefined)
        {
            for(let i=0; i<siteJson_blob_up.length; i++)
            {
                site_options.push(siteJson_blob_up[i].site)
            }
            console.log(site_options)
        }
        setSiteOptions(site_options)
        return site_options;
    }
    function constructDict() {
        var temp_dict : Record<string, any> = {};
        var temp_array = [];
        for(let i=0; i<siteJson_blob.length; i++)
        {
            temp_dict['id'] = siteJson_blob[i].site_id
            temp_dict['site'] = siteJson_blob[i].site
            console.log(temp_dict)
            temp_array.push(temp_dict)
            temp_dict = {}
        }
    }
    const getIdFromSiteName = () => {
        for(let i in siteJson_blob) {
            if(siteJson_blob[i].site==site){
                console.log(i)
                return Number(i)
            }
        }
        return -1;
    }
    useEffect(() => {
        var blobUrl = config.bloburl
        var url = config.url
        var getsitedata_api = "/GetSitedatadetials"
        axios
            .get(url+getsitedata_api)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                console.log(typeof(res))
                setSiteJson_blob(res.data)
                getOptionsArray(res.data)
                // let id_name_dict = constructDict()
                return res.data;
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }, []);
    
    // constructDict()
    const getIdFromSite = (site: string) => {
    }
    const getDataHandler = () => {
        let ans : number = getIdFromSiteName()
        console.log(ans)
        if (ans!==-1) setSiteId(ans+1)
        setGetData(true)
    }
    
    return (
        <Box>
            <>
            {console.log(siteJson_blob)}
            </>
            
            <Box padding={2}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={siteOptions}
                    sx={{ width: 300 }}
                    // value={site}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        console.log("new site chosen: " + newInputValue)
                    }}
                    onChange={(e: any, newValue: string | null) => {
                        if(site!=null && site!=newValue)
                        {
                            console.log("site changed")
                            setSiteChanged(true)
                        }
                        setSite(newValue)
                        setGetData(false)
                    }}
                    renderInput={(params) => <TextField {...params} label="Search" />}
                />
                <Button onClick={getDataHandler} variant="contained" color="info">Next</Button>
                {
                    getData &&
                    // <RenderQuestions />
                    <RenderQuestions condition={true} site={siteId} siteJson_blob = {siteJson_blob} age_prefilled={age_prefilled} gender_prefilled={gender_prefilled}/>
                }
            </Box>
        </Box>
    )
}