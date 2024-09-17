import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LoginModal from './LoginModal';
import PrjGeomapLogo from '../assets/PrjGeomapLogo.png'

const drawerWidth = 240;

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const [navbarColor, setNavbarColor] = useState('white');
  const [navbarTextColor, setNavbarTextColor] = useState('#282F44');

  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarColor('white');
      setNavbarTextColor('#282F44'); // Set the text color to dark for contrast, adjust as needed
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
        <RouterLink to="/" style={{ textDecoration: 'none', color: navbarTextColor }}>
          Mapulon
        </RouterLink>
      </Typography>
      <Divider />
      <List>
        <RouterLink to="/" style={{ textDecoration: 'none', color: navbarTextColor }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </RouterLink>
        <RouterLink to="/contact" style={{ textDecoration: 'none', color: navbarTextColor }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </ListItem>
        </RouterLink>
        <ListItem disablePadding onClick={handleLoginOpen}>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Sign In" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        style={{
          backgroundColor: 'white', // Fixed white background
          transition: 'background-color 0.3s ease-in-out',
          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
        }}
        position="fixed"
      >
        <Toolbar
          sx={{
            height: 64,
            color: 'rgba(0, 0, 0, 0.87)', 
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
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
            {/* Adjust logo size */}
            <img 
              src={PrjGeomapLogo} 
              alt="Mapulon Logo" 
              style={{ height: '90px', maxWidth: '124px', objectFit: 'contain' }} 
            />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ marginRight: '2rem', color: navbarTextColor }}>
                Home
              </Button>
            </RouterLink>
            <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
              <Button sx={{ marginRight: '2rem', color: navbarTextColor }}>
                Contact Us
              </Button>
            </RouterLink>
            <Button onClick={handleLoginOpen} sx={{ color: navbarTextColor }}>
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
