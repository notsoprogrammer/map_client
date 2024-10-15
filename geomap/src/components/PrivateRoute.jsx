import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import Appbar from './Appbar';
import Sidebar from './Sidebar';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from '../theme';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isDemoRoute = window.location.pathname === '/demo';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {userInfo || isDemoRoute ? (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
          <Sidebar
            user={userInfo || {}}
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Box flexGrow={1}>
            <Appbar
              user={userInfo || {}}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet />
          </Box>
        </Box>
      ) : (
        <Navigate to="/" replace />
      )}
    </ThemeProvider>
  );
};

export default PrivateRoute;
