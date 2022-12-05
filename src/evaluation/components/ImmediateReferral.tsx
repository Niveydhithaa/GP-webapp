import * as React from "react";
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

}
from "@mui/material"
import {Close as CloseIcon, FileUpload as FileUploadIcon} from '@mui/icons-material';
import AlertMUI from "components/alerts/AlertMUI"
import SelectHospitalStatic from "components/hooks/SelectHospitalStatic"
import SelectPatientStatic from "components/hooks/SelectPatientStatic"

interface Props {
    cause_of_immediate: string
}

export default function ImmediateReferral({cause_of_immediate, ...props} : Props) {
    return (
        <Box>
            {/* <Typography>Immediate Referral!!</Typography>
            <Typography>{cause_of_immediate}</Typography> */}
            
            <Box>
                {/* onco popup */}
                <Card>
                    <CardContent>
                    <Box display="flex">
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
                        <Button>Cancel</Button>
                        <Button variant="contained">Submit</Button>
                    </CardActions>
                </Card>
            </Box>
        </Box>
    )
}