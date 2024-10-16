import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box, CssBaseline, Button, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import {
  HomeOutlined, Groups2Outlined, ReceiptLongOutlined, PublicOutlined, DarkModeOutlined, LightModeOutlined, ExitToAppOutlined
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { setMode } from '../slices/modeSlice';
import Dashboard from '../Demo components/DashboardDemo';
import Maps from './Maps';
import Rice from '../Demo components/RiceDemo';
import Crops from '../Demo components/CropsDemo';
import Farmers from '../Demo components/FarmersDemo';
import Calbiga from '../Municipality Images/Calbiga.png';

import { tokensDark,tokensLight,themeSettings } from '../theme';
const demoUser = {
  name: "Demo User",
  municipality: "Calbiga",
  role: "guest",
};

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined />, component: <Dashboard /> },
  { text: "Maps", icon: <PublicOutlined />, component: <Maps /> },
  { text: "Farmers", icon: <Groups2Outlined />, component: <Farmers /> },
  { text: "Rice", icon: <ReceiptLongOutlined />, component: <Rice /> },
  { text: "Crops", icon: <ReceiptLongOutlined />, component: <Crops /> },
];

const Demo = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.global.mode);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
      ...(mode === 'dark' && {
        primary: {
          ...tokensDark.primary,
          main: tokensDark.primary[400], // Sidebar active item background
        },
        secondary: {
          ...tokensDark.secondary,
          main: tokensDark.secondary[300], // Text and icon color
        },
        background: {
          default: tokensDark.grade[200], // Main background
          alt: tokensDark.grade[50], // Sidebar background color
        },
        text: {
          primary: tokensDark.grey[50], // Lighter text color for dark mode
          secondary: tokensDark.grey[200], // Dimmer text for icons
        },
      }),
      ...(mode === 'light' && {
        primary: {
          main: tokensLight.primary[400],
        },
        secondary: {
          main: tokensLight.secondary[600],
        },
        background: {
          default: tokensLight.grey[0],
          alt: tokensLight.grey[50],
        },
        text: {
          primary: tokensLight.grey[900],
          secondary: tokensLight.grey[700],
        },
      }),
    },
  }), [mode]);

  const [activeItem, setActiveItem] = useState("Dashboard");
  const [currentComponent, setCurrentComponent] = useState(<Dashboard />);

  const handleNavClick = (component, text) => {
    setCurrentComponent(component);
    setActiveItem(text);
  };

  const handleLogout = () => {
    navigate("/contact");
  };

  const buttonStyle = {
    justifyContent: "flex-start",
    textTransform: "none",
    color: theme.palette.text.primary,
    width: '100%',
    my: 1,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" width="100%" height="100vh" sx={{ overflow: 'hidden' }}>
        {/* Sidebar for navigation */}
        <Box
          component="aside"
          width={drawerWidth}
          bgcolor={theme.palette.background.alt}  // Apply tokensDark.grade[50] for Sidebar background
          p={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Demo User Avatar */}
          <Avatar src={Calbiga} alt="Profile" sx={{ width: 100, height: 100 }} />
          <Box mt={2} mb={4} textAlign="center">
            <Box>{demoUser.name}</Box>
            <Box>{demoUser.municipality}</Box>
          </Box>

          {/* Navigation List */}
          <List>
            {navItems.map(({ text, icon, component }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={activeItem === text}
                  onClick={() => handleNavClick(component, text)}
                  sx={{
                    backgroundColor: activeItem === text ? theme.palette.primary.main : "transparent",
                    color: activeItem === text ? '#FFF' : theme.palette.text.primary,
                    '.MuiListItemIcon-root': {
                      color: activeItem === text ? '#FFF' : theme.palette.text.secondary,
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      color: '#FFF',
                    },
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Dark/Light Mode Toggle */}
          <Button
            startIcon={mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
            onClick={() => dispatch(setMode())}
            sx={{
              mt: 'auto',
              justifyContent: 'flex-start',
              width: '100%',
              textTransform: 'none',
              color: mode === 'dark' ? tokensDark.secondary[50] : tokensLight.secondary[600],  // Icon and text color
              backgroundColor: mode === 'dark' ? tokensDark.primary[600] : tokensLight.grey[50],  // Button background
              '&:hover': {
                backgroundColor: mode === 'dark' ? tokensDark.primary[500] : tokensLight.grey[100],  // Hover effect
              },
              borderRadius: '8px',
              padding: '8px 16px',
            }}
          >
            {mode === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
          </Button>


          {/* Log Out Button */}
          <Button
            startIcon={<ExitToAppOutlined />}
            onClick={handleLogout}
            sx={buttonStyle}
          >
            Log Out
          </Button>
        </Box>

        {/* Main content area */}
        <Box flexGrow={1} p={2}>
          {currentComponent}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Demo;
