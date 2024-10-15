import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Farmers from './Farmers';
import Rice from './RiceStat';
import Crops from './Crops';
import Maps from './Maps';
import Sidebar from './Sidebar';
import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import Appbar from './Appbar';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from '../theme';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Demo = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dummy data for demo purposes
  const demoUser = {
    name: 'Demo User',
    municipality: 'Demo Town',
    role: 'guest',
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          user={demoUser}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <Appbar
            user={demoUser}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Box padding="1rem">
            <button onClick={toggleTheme}>
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <h1>Demo Page</h1>
            <Dashboard />
            <Farmers />
            <Rice />
            <Crops />
            <Maps />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Demo;
