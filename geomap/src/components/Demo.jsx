import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box, CssBaseline, Button, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import {
  HomeOutlined, Groups2Outlined, ReceiptLongOutlined, PublicOutlined, DarkModeOutlined, LightModeOutlined
} from "@mui/icons-material";
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

const Demo = ({ drawerWidth = 240 }) => {  // Default drawer width set to 250px
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.global.mode); // Get the mode from Redux
  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
      // Customize theme specifically for the demo here
    },
  }), [mode]);

  const [activeItem, setActiveItem] = useState("Dashboard");
  const [currentComponent, setCurrentComponent] = useState(<Dashboard />);

  const handleNavClick = (component, text) => {
    setCurrentComponent(component);
  };

  const buttonStyle = {
    justifyContent: "flex-start",
    textTransform: "none",
    color: theme.palette.text.primary,
    width: '100%',
    my: 1,
  };

  // Handle Log Out (redirect to /contact)
  const handleLogout = () => {
    navigate("/contact"); // Redirect to the contact page
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" width="100%" height="100vh" sx={{ overflow: 'hidden' }}>
        {/* Sidebar for navigation */}
        <Box
          component="aside"
          width={drawerWidth}  // Apply customizable drawer width here
          bgcolor={theme.palette.background.default}
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
                    backgroundColor: activeItem === text ? theme.palette.secondary[300] : "transparent",
                    color: activeItem === text ? theme.palette.primary[600] : theme.palette.text.primary,
                    '.MuiListItemIcon-root': {
                      color: activeItem === text ? theme.palette.primary[600] : theme.palette.text.secondary,
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
            sx={{ mt: 'auto' }}
          >
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
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
