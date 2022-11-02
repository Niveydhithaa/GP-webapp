import { useState } from "react";
import {
  Box,
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  const [gpAbtDialog, setOpenGPAboutDialog] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenGPProfile = () => {
    // navigate("/aboutgp")
    setOpenGPAboutDialog(true)
  };
  const handleCloseGPProfile = () => {
    // navigate("/aboutgp")
    setOpenGPAboutDialog(false)
  };
  const handleLogoutUser = () => {
    sessionStorage.setItem("user", "false")
    navigate("/")
  }
  return (
    <AppBar position="static" sx={{backgroundColor: "#042b75"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src="Early detect Logo - W.svg" height="50"></img>
            <Box mt={2} ml={2}>
              <Typography className="beta" >BETA</Typography>
            </Box>

          </Typography>
          <Box flexGrow={1}></Box>
          <Box flexGrow={0}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {/* <Avatar alt="Remy Sharp" src="https://picsum.photos/200" /> */}
              <Avatar alt="avatar">
                RP
              </Avatar>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleOpenGPProfile}>
                <Typography textAlign="center">About Early Detect</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogoutUser}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Dialog open={gpAbtDialog} onClose={handleCloseGPProfile}>
            <DialogTitle>
                    <Box display="flex">
                       <Box display="flex" width="100%">
                           About Early Detect
                        </Box>
                        <Box justifyContent="flex-end" sx={{ alignSelf: "center", textAlign: "center" }}>
                           <IconButton onClick={handleCloseGPProfile}><CloseIcon /> </IconButton>
                          {/* todo: icon button */}
                        </Box>
              </Box>
            </DialogTitle>
            <DialogContent >
              Early Detect as the name suggests, is a tool to detect cancer at early stages, based on the cancer guidelines developed by Optimal Oncology.
                                  <Box display="flex" flexWrap="nowrap" mt={2}>
                                        <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="50%">
                                            <p>Early Detect version</p>
                                            <p>:</p>
                                        </Box>
                                        <Box width="50%">
                                            v2022.1
                                        </Box>
                                    </Box>
                                    {/* <Box display="flex" flexWrap="nowrap">
                                        <Box display="flex" flexWrap="nowrap" justifyContent="space-between" width="50%">
                                            <p>NICE Guidelines version</p>
                                            <p>:</p>
                                        </Box>
                                        <Box width="50%">
                                            v2022.10
                                        </Box>
                                    </Box> */}
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={handleCloseGPProfile}>Close</Button> */}
            </DialogActions>
          </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
