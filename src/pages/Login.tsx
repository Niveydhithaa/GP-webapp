import { Box, Typography, Card, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Box width="50%">
        <Typography fontSize={16}>Welcome to</Typography>
        <Typography fontSize={24}>GP</Typography>
      </Box>
      <Box>
        <Card>
          <Box px={3} py={4}>
            <Typography fontSize={16} mb={2}>
              Sign in
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField label="username" variant="outlined" type="text" />
              <TextField label="password" variant="outlined" type="password" />
              <Button variant="contained" sx={{ borderRadius: "50px" }}>
                <Link to="/dashboard">Sign in</Link>
              </Button>
            </Box>
            <Box textAlign="center" mt={4}>
              <Typography fontSize={14}>Forget Password?</Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
