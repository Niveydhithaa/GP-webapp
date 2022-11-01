import Alert from "@mui/material/Alert"

export default function AlertMUI() {
    return (
        <div>
            <Alert variant="filled" severity="warning">
            Your hospital ERP system is not configured. Please contact your admin
            </Alert>
        </div>
    )
}