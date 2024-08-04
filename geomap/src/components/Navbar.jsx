import { AppBar, Box, Button, CircularProgress, CssBaseline, Divider, Drawer, FormControl, IconButton, List, ListItem, ListItemButton, ListItemText, Modal, Stack, TextField, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MenuIcon from '@mui/icons-material/Menu'
import geomap from '../assets/geomap.png'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../slices/usersApiSlice'

const drawerWidth = 240;
const navItems = ['Home','Features','About', 'Contact Us', 'Sign In'];

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
    
    useEffect(() => {
      if(userInfo) {
        navigate('/dashboard');
      }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await login({ email, password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate('/dasboard');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      };
    }
  
    useEffect(() => {
      const handleScroll = () => {
        if (document.documentElement.scrollTop >= 845) {
          setNavbarColor('#282F44'); // Change to your desired background color
          setNavbarTextColor('#fff'); // Change to your desired text color
        } else {
          setNavbarColor('transparent');
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
                <Link to="/">
                GEOMAP SAMAR
                </Link>
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" style={{ backgroundColor: navbarColor, transition: 'background-color 0.3s ease-in-out', boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'}} position='fixed'>
            <Toolbar width='500px' style={{ color: navbarTextColor}}>
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
            sx={{ marginLeft: '5rem', fontWeight:700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            
              GEOMAP SAMAR
           
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* {navItems.map((item) => (
              <Button key={item} sx={{marginRight: '4rem', color: '#fff' }}>
                {item}
              </Button>
            ))} */}
              <Link  to="/">
                <Button sx={{marginRight: '4rem', color: '#fff' }}>
                  Home
                </Button>
              </Link>

              <Link to="/">
                <Button sx={{marginRight: '4rem', color: '#fff' }}>
                  Features
                </Button>
              </Link>

              <Link to="/about">
                <Button sx={{marginRight: '4rem', color: '#fff' }}>
                  About
                </Button>
              </Link>

              <Link to="/contact">
                <Button sx={{marginRight: '4rem', color: '#fff', ":hover": { color: '#fff'} }}>
                Contact Us
                </Button>
              </Link>


              <Button onClick={handleOpen} sx={{marginRight: '4rem', color: '#fff' }}>
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
                    <img src={geomap} alt='logo' style={{ height: 54, width: 54}} />
                    <h2>Welcome back!</h2>
                    <TextField sx={{width: '100%'}} type='email' value={email} onChange={ (e) => setEmail(e.target.value)} id="outlined-basic" label="Email Address" variant="outlined" />                
                    <TextField sx={{width: '100%'}} type='password' value={password} onChange={ (e) => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />                
                    <span> </span>
                    {isLoading && <CircularProgress/>}
                    <Button sx={{ width: '100%'}} type='submit' onClick={submitHandler} variant="contained" color='success'>Sign In</Button>
                    <Button sx={{ width: '100%'}} onClick={handleClose} variant="text">cancel</Button>
                </Stack>
              </Box>
            </Box>
        </Modal>


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

export default Navbar