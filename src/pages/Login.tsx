import { Box, Typography, Card, TextField, Button } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState} from "react"
import { Link } from "react-router-dom";

interface Login {
  Username: string,
  Password: string
}
export default function Login() {
  const navigate = useNavigate();
  const handleOnSignin = () => {
    const uname = (document.getElementById("username_input") as HTMLInputElement).value
    const pswd = (document.getElementById("password_input") as HTMLInputElement).value
    console.log(uname)
    console.log(pswd)
    const input_dict : Record<string, string> = {};
    input_dict['Username'] = uname
    input_dict['Password'] = pswd
    // API work
    axios
        .post('https://localhost:44370/GPValues/GPLogin', input_dict)
        .then(result => {
            // console.log(result);
            console.log(result.data);
            let res_Dict = result.data
            let isSuccess = res_Dict.isSuccess
            console.log(isSuccess)
            // if(isSuccess) {
            //   navigate("/home")
            // }
            // ({
            //     repos: result.data,
            //     isLoading: false
            // });
            return String(result.data);
        })
        .catch(error =>
            console.log(error)
        );
    navigate("/home")
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
      style={{backgroundColor: "#1F51B1"}}
    >
      <Box ml={20} width="40%">
        {/* <Card variant="outlined">{card}</Card> */}
        <Box>
          <img src="Optimal Oncology Logo - Full.png"></img>
        </Box>
      </Box>
      <Box ml={16}>
          <Card variant="outlined" sx={{minWidth: 450, minHeight: 420, borderRadius:"30px"}} >
          <Box px={3} py={4}>
            <Typography fontSize={32} mb={2}>
              Sign in
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField label="Username" variant="outlined" type="text" id="username_input"/>
              <TextField label="Password" variant="outlined" type="password" id="password_input"/>
              <Button variant="contained" sx={{ borderRadius: "50px" }} onClick={handleOnSignin}>
                <Typography fontSize="16px">Sign in</Typography>
              </Button>
              <Box margin="auto">
                <Typography fontSize="10px">@Copyright Optimal Oncology</Typography>
              </Box>
            </Box>
          </Box>
          </Card>
      </Box>
    </Box>
  );
};
