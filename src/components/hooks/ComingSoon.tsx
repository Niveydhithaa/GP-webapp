import {
    Box,
    Typography
}
from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function ComingSoon() {
    return (
        <Box height="20%" sx={{textAlign:"center"}} mt="20%" mb="20%">
                     
                     <AccessTimeIcon fontSize="large"/>
                     <Typography>Coming soon... </Typography>
            </Box>
    )
}