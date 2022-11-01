import Alert from "@mui/material/Alert"

export default function AlertMUI() {
    return (
        <div>
            <Alert severity="info">
            This simulates interactions with the host facility EMR systems. Currently EMR systems are not integrated hence only simulate those interactions, and the actions do not have any effect
            </Alert>
        </div>
    )
}