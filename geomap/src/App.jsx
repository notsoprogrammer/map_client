import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Button } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { setMode } from '../slices/modeSlice'; // Redux action to toggle mode
import Maps from './Maps'; // Assuming this uses MUI's `useTheme()`
import Dashboard from '../Demo components/DashboardDemo';
import Rice from '../Demo components/RiceDemo';
import Crops from '../Demo components/CropsDemo';
import Farmers from '../Demo components/FarmersDemo';

// Demo user mock data
const demoUser = {
  name: "Demo User",
  municipality: "Calbiga",
  role: "guest",
};

// Sidebar navigation items
const navItems = [
  { text: "Dashboard", component: <Dashboard /> },
  { text: "Maps", component: <Maps /> },
  { text: "Farmers", component: <Farmers /> },
  { text: "Rice", component: <Rice /> },
  { text: "Crops", component: <Crops /> },
];

const Demo = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.global.mode); // Get the mode from Redux
  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
      // You can customize the theme specifically for the demo here
    }
  }), [mode]);

  const [activeItem, setActiveItem] = useState("Dashboard");
  const [currentComponent, setCurrentComponent] = useState(<Dashboard />);

  const handleNavClick = (component) => {
    setCurrentComponent(component);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" width="100%" height="100vh" sx={{ overflow: 'hidden' }}>
        {/* Sidebar and other UI elements for the Demo */}
        <Box component="aside" width={250} bgcolor={theme.palette.background.default} p={2}>
          {navItems.map((item, index) => (
            <Button key={index} onClick={() => handleNavClick(item.component)}>
              {item.text}
            </Button>
          ))}

          {/* Dark/Light Mode Toggle */}
          <Button
            startIcon={mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
            onClick={() => dispatch(setMode())}
          >
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
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
