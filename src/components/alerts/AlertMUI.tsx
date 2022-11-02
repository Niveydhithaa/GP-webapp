import Alert from "@mui/material/Alert"

export default function AlertMUI() {
    return (
        <div>
            <Alert severity="info" sx={{mt: "1rem", width:"100%"}}>
            Not integrated with the host facility's EMR/HIS. For display purposes only!
            </Alert>
        </div>
    )
}