import * as React from "react";
import {useState} from "react"
import {
    Box,
    Typography,
    Button,
    CardContent,
    CardActions,
    Card,
    IconButton,
    TextField,
    Stack,
    Paper
}
from "@mui/material"
import {Close as CloseIcon, FileUpload as FileUploadIcon} from '@mui/icons-material';
import AlertMUI from "components/alerts/AlertMUI"
import SelectHospitalStatic from "components/hooks/SelectHospitalStatic"
import SelectPatientStatic from "components/hooks/SelectPatientStatic"

interface Props {
    cause_of_immediate: string | null
}

export default function ImmediateReferral({cause_of_immediate, ...props} : Props) {
    const [finalSummary, setFinalSummary] = useState<boolean>(false);
    const handleImmediateRefer = () => {
      setFinalSummary(true)
    }
    return (
        <Box>
            {/* <Typography>Immediate Referral!!</Typography>
            <Typography>{cause_of_immediate}</Typography> */}
            
            <Box width="50%" mt={2}>
                {/* onco popup */}
                <Card >
                    <CardContent>
                    <Box display="flex" >
                        <Box display="flex" width="100%">
                           Oncology referral  (Coming Soon...)
                        </Box>
                        <Box justifyContent="flex-end" sx={{alignSelf: "center", textAlign:"center" }}>
                         {/* <IconButton ><CloseIcon /> </IconButton> */}
                         {/* todo: icon button */}
                        </Box>
                      </Box>
                        <AlertMUI></AlertMUI>
                        <Box>
                          <Stack display="flex" >
                            <br></br>
                              <SelectHospitalStatic></SelectHospitalStatic>
                              <br></br>
                              <TextField label="Doctor"></TextField>
                              <br></br>
                              <TextField multiline={true} label="Notes about patient"></TextField>
                              
                          </Stack>
                          <Box mt={2}>
                            <Button variant="outlined" component="label">
                              <FileUploadIcon/>
                              <Box ml={1}>Upload Medical File</Box>
                              <input hidden accept="image/*" multiple type="file" />
                            </Button>
                          </Box>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={handleImmediateRefer}>Submit</Button>
                    </CardActions>
                </Card>
            </Box>
            {finalSummary && 
                <Box>
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        {/* <Typography>All steps completed - you&apos;re finished</Typography> */}
                        <Typography fontSize="10px">Symptom Investigation completed on 17/10/2022</Typography>
                        <Typography color="red">{cause_of_immediate}</Typography>
                        {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button> */}
                    </Paper>
                </Box>
            }
        </Box>
    )
}