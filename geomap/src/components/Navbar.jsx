import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LoginModal from './LoginModal';
import Mapulon_Logo from '../assets/Mapulon_Logo.png'

const drawerWidth = 240;
const navItems = ['Home', 'Features', 'About', 'Contact Us', 'Sign In'];

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [navbarColor, setNavbarColor] = useState('transparent');
  const [navbarTextColor, setNavbarTextColor] = useState('white');

  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

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
          Mapulon
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
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={Mapulon_Logo} alt="Mapulon Logo" style={{ height: '40px', marginRight: '1rem' }} />
            {/* <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}
            >
              Mapulon
            </Typography> */}
          </Box>
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

            <Button onClick={handleLoginOpen} sx={{ marginRight: '4rem', color: '#fff' }}>
              Sign In
            </Button>

            <LoginModal open={loginOpen} handleClose={handleLoginClose} />
          </Box>
        </Toolbar>
      </AppBar>

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
  );
}

export default Navbar;
