import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box, CssBaseline, Button, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import {
  HomeOutlined, Groups2Outlined, ReceiptLongOutlined, PublicOutlined, DarkModeOutlined, LightModeOutlined, ExitToAppOutlined
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'; // Import navigate hook
import { setMode } from '../slices/modeSlice';
import Dashboard from '../Demo components/DashboardDemo';
import Maps from './Maps';
import Rice from '../Demo components/RiceDemo';
import Crops from '../Demo components/CropsDemo';
import Farmers from '../Demo components/FarmersDemo';
import Calbiga from '../Municipality Images/Calbiga.png';

// Demo user mock data
const demoUser = {
  name: "Demo User",
  municipality: "Calbiga",
  role: "guest",
};

// Sidebar navigation items
const navItems = [
  { text: "Dashboard", icon: <HomeOutlined />, component: <Dashboard /> },
  { text: "Maps", icon: <PublicOutlined />, component: <Maps /> },
  { text: "Farmers", icon: <Groups2Outlined />, component: <Farmers /> },
  { text: "Rice", icon: <ReceiptLongOutlined />, component: <Rice /> },
  { text: "Crops", icon: <ReceiptLongOutlined />, component: <Crops /> },
];

const Demo = ({ drawerWidth = 240 }) => {  // Default drawer width set to 240px
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for logout redirect
  const mode = useSelector((state) => state.global.mode); // Get the mode from Redux

  // Updated theme settings to match dark mode in the first image
  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
      ...(mode === 'dark' && {
        background: {
          default: '#1C2536',  // Dark navy for main background
          alt: '#1A2236',  // Slightly darker for the sidebar
        },
        primary: {
          main: '#FFA726',  // Accent color for buttons and active states
        },
        secondary: {
          main: '#9E9E9E',  // For text, icons, etc.
        },
        text: {
          primary: '#E0E0E0',  // Light text for dark background
          secondary: '#B0BEC5',  // Dimmer text
        },
      }),
      ...(mode === 'light' && {
        background: {
          default: '#F9F9F9',
          alt: '#FFFFFF',
        },
        primary: {
          main: '#388E3C',  // Primary color for light mode
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
        },
      }),
    },
  }), [mode]);

  const [activeItem, setActiveItem] = useState("Dashboard");
  const [currentComponent, setCurrentComponent] = useState(<Dashboard />);

  const handleNavClick = (component, text) => {
    setCurrentComponent(component);
    setActiveItem(text);  // Update active item state
  };

  const handleLogout = () => {
    navigate("/contact");  // Redirect to contact page
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
          width={drawerWidth}  // Apply customizable drawer width here
          bgcolor={theme.palette.background.alt}
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
              color: mode === 'dark' ? '#FFA726' : '#424242',  // Accent color for the button
              backgroundColor: mode === 'dark' ? '#1A2236' : '#F5F5F5',  // Button background color
              '&:hover': {
                backgroundColor: mode === 'dark' ? '#263248' : '#E0E0E0',
              },
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
