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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from "react-router-dom"

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
    <AppBar position="static">
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
            <img src="App Bar Logo.png"></img>
            <Typography className="beta" >BETA</Typography>
          </Typography>
          <Box flexGrow={1}></Box>
          <Box flexGrow={0}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="https://picsum.photos/200" />
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
                <Typography textAlign="center">About GP</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogoutUser}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Dialog open={gpAbtDialog} onClose={handleCloseGPProfile}>
                    <DialogTitle>About GP</DialogTitle>
                    <DialogContent >
                        <Box>
                          <Typography>GP Module Version: 1.1</Typography>
                          <Typography>Based on NICE Guidlines Version 2022.1</Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseGPProfile}>Close</Button>
                    </DialogActions>
                </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
