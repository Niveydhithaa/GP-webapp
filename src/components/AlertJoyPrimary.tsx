import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';

export default function AlertJoyPrimary() {
  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
      <Alert size="sm" color="warning" variant="solid">Your hospital ERP system is not configured. Please contact the admin</Alert>
      {/* <Alert size="md">This is an alert in the medium size.</Alert>
      <Alert size="lg">This is an alert in the large size.</Alert> */}
    </Box>
  );
}
