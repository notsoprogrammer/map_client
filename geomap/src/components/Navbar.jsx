import React, { useEffect, useState } from 'react';
import {
  AppBar, Box, Button, CircularProgress, CssBaseline, Divider, Drawer, IconButton,
  List, ListItem, ListItemButton, ListItemText, Modal, Stack, TextField, Toolbar, Typography
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import geomap from '../assets/geomap.png';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
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
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleForgotPasswordOpen = () => {
    handleClose();
    setForgotPasswordOpen(true);
  };
  const handleForgotPasswordClose = () => setForgotPasswordOpen(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/auth`, { email, password });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        dispatch(setCredentials({ ...res.data }));
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error("Login failed: " + (err.response?.data?.message || "An error occurred"), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
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

  const container = window !== undefined ? window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GEOMAP SAMAR
          </Typography>
          <Button onClick={handleOpen}>Sign In</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Stack spacing={2} alignItems='center'>
                <img src={geomap} alt='logo' style={{ height: 54, width: 54 }} />
                <h2>Welcome back!</h2>
                <TextField
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  variant="outlined"
                  fullWidth
                />
                <Button onClick={handleForgotPasswordOpen} sx={{ textTransform: 'none' }}>
                  Forgot Password?
                </Button>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" onClick={submitHandler} variant="contained" fullWidth>
                    Sign In
                  </Button>
                )}
                <Button onClick={handleClose} variant="text" fullWidth>
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Modal>
          <ForgotPasswordModal open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} />
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
