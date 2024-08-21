import {
  AppBar, Box, Button, CircularProgress, CssBaseline, Divider, Drawer, FormControl, IconButton,
  List, ListItem, ListItemButton, ListItemText, Modal, Stack, TextField, Toolbar, Typography 
} from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ScrollLink } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import geomap from '../assets/geomap.png';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../slices/usersApiSlice';
import ForgotPasswordModal from './forgotPasswordModal';
import axios from 'axios';

const drawerWidth = 240;
const navItems = ['Home', 'Features', 'About', 'Contact Us', 'Sign In'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#F6F4F4',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navbar = (props) => {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [navbarColor, setNavbarColor] = useState('transparent');
  const [navbarTextColor, setNavbarTextColor] = useState('white');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const handleForgotPasswordOpen = () => {
    handleClose(); // Close the login modal
    setForgotPasswordOpen(true);
  };
  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/auth`, { email, password }, {
      });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token); // Store the token
      }
      dispatch(setCredentials({ ...res.data }));
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert("Login failed: " + (err.response?.data?.message || "An error occurred"));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop >= 845) {
        setNavbarColor('#282F44'); // Change to your desired background color
        setNavbarTextColor('#fff'); // Change to your desired text color
      } else {
        setNavbarColor('#282F44');
        setNavbarTextColor('white');
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: navbarTextColor }}>
        <RouterLink to="/">
          GEOMAP SAMAR
        </RouterLink>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitHandler(e);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={{ backgroundColor: navbarColor, transition: 'background-color 0.3s ease-in-out', boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)' }} position='fixed'>
        <Toolbar width='500px' style={{ color: navbarTextColor }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ marginLeft: '5rem', fontWeight: 700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            GEOMAP SAMAR
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ marginRight: '4rem', color: '#fff' }}>
                Home
              </Button>
            </RouterLink>
            <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
              <Button sx={{ marginRight: '4rem', color: '#fff' }}>
                Contact Us
              </Button>
            </RouterLink>

            <Button onClick={handleOpen} sx={{ marginRight: '4rem', color: '#fff' }}>
              Sign In
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box sx={{ padding: '5px' }} >
                  <Stack sx={{ width: 400, marginLeft: '1rem' }} spacing={2} direction="column" justifyContent="center" alignItems='center'>
                    <img src={geomap} alt='logo' style={{ height: 54, width: 54 }} />
                    <h2>Welcome back!</h2>
                    <TextField
                      sx={{ width: '100%' }}
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress} // Attach keypress handler
                      id="outlined-basic"
                      label="Email Address"
                      variant="outlined"
                    />
                    <TextField
                      sx={{ width: '100%' }}
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress} // Attach keypress handler
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                    />
                    <Button onClick={handleForgotPasswordOpen} sx={{ textTransform: 'none' }}>Forgot Password?</Button>

                    <span> </span>

                    <Button sx={{ width: '100%' }} type='submit' onClick={submitHandler} variant="contained" color='success'               disabled={isLoading}
                      startIcon={isLoading ? <HourglassEmptyIcon /> : null}
                    >
                    {isLoading ? 'Logging In...' : 'Sign In'}
                  </Button>
                    <Button sx={{ width: '100%' }} onClick={handleClose} variant="text">cancel</Button>
                  </Stack>
                </Box>
              </Box>
            </Modal>
            <ForgotPasswordModal open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} />
          </Box>
        </Toolbar>
      </AppBar>

      <div>
      </div>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

export default Navbar;
