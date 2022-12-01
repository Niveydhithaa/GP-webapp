import * as React from "react";
import {
    Box,
    Typography,
    Button
}
from "@mui/material"

interface Props {
    cause_of_immediate: string
}

export default function ImmediateReferral({cause_of_immediate, ...props} : Props) {
    return (
        <Box>
            <Typography>Immediate Referral!!</Typography>
            <Typography>{cause_of_immediate}</Typography>
            <Box mt={2}>
                <Button variant="contained">Complete</Button>
            </Box>
        </Box>
    )
}