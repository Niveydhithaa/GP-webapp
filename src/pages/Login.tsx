import { Box, Typography, Card, TextField, Button } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Link } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const handleOnSignin = () => {
    const uname = (document.getElementById("username_input") as HTMLInputElement).value
    const pswd = (document.getElementById("password_input") as HTMLInputElement).value
    console.log(uname)
    console.log(pswd)
    const input_dict : Record<string, string> = {};
    input_dict['uname_input'] = uname
    input_dict['pswd_input'] = pswd
    // API work
    navigate("/dashboard")
  }
  const bull = (
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
      >
        •
      </Box>
  );
  
  const card = (
        <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Welcome to GP
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Kindly Login here to proceed
        </Typography>
      </CardContent>
  );
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Box ml={20} width="40%">
        <Card variant="outlined">{card}</Card>
      </Box>
      <Box ml={20}>
          <Box px={3} py={4}>
            <Typography fontSize={16} mb={2}>
              Sign in
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField label="Username" variant="outlined" type="text" id="username_input"/>
              <TextField label="Password" variant="outlined" type="password" id="password_input"/>
              <Button variant="contained" sx={{ borderRadius: "50px" }} onClick={handleOnSignin}>
                Sign in
              </Button>
            </Box>
          </Box>
      </Box>
    </Box>
  );
};
