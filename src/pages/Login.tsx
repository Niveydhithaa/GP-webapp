import { Box, Typography, Card, TextField, Button, Grid } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Spinner from "components/hooks/Spinner"
import configData from "config.json"

interface Login {
  Username: string,
  Password: string
}

export default function Login() {
  const navigate = useNavigate();
  const [openLoginFail, setOpenLoginFail] = useState(false)
  const [openUnameFail, setOpenUnameFail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleClose = () => {
    setOpenLoginFail(false);
  }
  const onEnterPressCallSubmit = (event: any) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      handleOnSignin()
    }
  }
  const handleOnSignin = () => {
    setIsLoading(true)
    const uname = (document.getElementById("username_input") as HTMLInputElement).value
    const pswd = (document.getElementById("password_input") as HTMLInputElement).value
    // console.log(uname)
    // console.log(pswd)
    const input_dict: Record<string, string> = {};
    input_dict['Username'] = uname
    input_dict['Password'] = pswd
    const url1 = configData.url + '/GPLogin';
    // API work
    axios
      .post(url1, input_dict)
      .then(result => {
        setIsLoading(false)
        console.log(result);
        console.log(result.data);
        let res_Dict = result.data
        let isSuccess = res_Dict.isSuccess
        console.log(isSuccess)
        if (isSuccess) {

          sessionStorage.setItem("user", "true")
          sessionStorage.setItem("userid", res_Dict.userDetails.userId)
          sessionStorage.setItem("doctorsname", res_Dict.userDetails.doctors_name)
          navigate("/home")
        }
        else {
          //fail scenario: two branches 
          if (res_Dict.message == "Please Register this User!") {
            sessionStorage.setItem("user", "false")
            setOpenUnameFail(true)
          }
          if (res_Dict.message == "Incorrect Password") {
            sessionStorage.setItem("user", "false")
            setOpenLoginFail(true)
          }
        }
        // ({
        //     repos: result.data,
        //     isLoading: false
        // });
        return String(result.data);
      })
      .catch(error =>
        console.log(error)
      );
    // navigate("/home")
  }
  return (
    <Box sx={{ backgroundColor: "#042b75" }}
    // width="100%"
    // height="100vh"
    // display="flex"
    // flexDirection="row"
    
    >
      <Grid >
        <Box className="parent-box">
          <Box className="card1">
          <Box>
              <img src="Optimal Oncology Logo - Full.png" ></img>
            </Box>
          </Box>
          <Box className="card2" >
            <Card variant="outlined" sx={{ borderRadius: "30px", maxWidth:"500px" }}>
              <Box px={6} py={4}>
                <Typography fontSize={32} mb={4}>
                  Sign in
                </Typography>
                <Box display="flex" flexDirection="column" gap={2} >
                  <TextField className="unamesignin" label="Username" variant="outlined" type="text" id="username_input" error={openUnameFail} onChange={(e) => setOpenUnameFail(false)} helperText={openUnameFail && "Username not found!"} />
                  <TextField className="pswdsignin" label="Password" onKeyDown={onEnterPressCallSubmit} variant="outlined" type="password" id="password_input" error={openLoginFail} onChange={(e) => setOpenLoginFail(false)} helperText={openLoginFail && "Incorrect password!"} />
                  {/* { openLoginFail &&
                <Typography fontSize="12px" color="red">Password incorrect</Typography>
              } */}
                  {/* { openUnameFail &&
                <Typography fontSize="12px" color="red">Username not found</Typography>
              } */}
                  {
                    isLoading &&
                    <Spinner></Spinner>
                  }
                  {
                    !isLoading &&
                    <Button type="submit" variant="contained" sx={{ borderRadius: "50px", marginTop: "2rem", height:"55px" }}  onClick={handleOnSignin}>
                      <Typography fontSize="16px">Sign in</Typography>
                    </Button>
                  }

                  {/* <Box margin="auto">
                <Typography fontSize="10px">@Copyright Optimal Oncology</Typography>
              </Box> */}
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
