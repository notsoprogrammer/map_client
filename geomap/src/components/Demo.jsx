import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Button, Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Drawer } from '@mui/material';
import { HomeOutlined, Groups2Outlined, ReceiptLongOutlined, PublicOutlined, DarkModeOutlined, LightModeOutlined, ExitToAppOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { setMode } from '../slices/modeSlice';
import Dashboard from '../Demo components/DashboardDemo';
import Maps from './Maps';
import Rice from '../Demo components/RiceDemo';
import Crops from '../Demo components/CropsDemo';
import Farmers from '../Demo components/FarmersDemo';
import Calbiga from '../Municipality Images/Calbiga.png';

// Import tokens and theme settings from theme.js
import { tokensDark, tokensLight, themeSettings } from '../theme';

// Demo user mock data
const demoUser = {
  name: "Demo User",
  municipality: "Calbiga",
  role: "guest",
};

// Navigation items
const navItems = [
  { text: "Dashboard", icon: <HomeOutlined />, component: <Dashboard /> },
  { text: "Maps", icon: <PublicOutlined />, component: <Maps /> },
  { text: "Farmers", icon: <Groups2Outlined />, component: <Farmers /> },
  { text: "Rice", icon: <ReceiptLongOutlined />, component: <Rice /> },
  { text: "Crops", icon: <ReceiptLongOutlined />, component: <Crops /> },
];

const Demo = ({ drawerWidth = 240, isSidebarOpen = true, setIsSidebarOpen, isNonMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.global.mode);

  // Use imported themeSettings to create the theme
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

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
      <Box display="flex" width="100vw" height="100vh" sx={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        {/* Sidebar for navigation */}
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: '1.5rem',
              pb: '1.5rem'
            }}
          >
            <Avatar src={Calbiga} alt="Profile" sx={{ width: 100, height: 100 }} />
            <Typography variant="h6" noWrap>
              {demoUser.name}
            </Typography>
            <Typography variant="body2" noWrap>
              {demoUser.municipality}
            </Typography>
          </Box>

          <List>
            {navItems.map(({ text, icon, component }) => {
              const isSelected = activeItem === text;

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => handleNavClick(component, text)}
                    sx={{
                      backgroundColor: isSelected ? theme.palette.secondary[300] : "transparent",
                      color: isSelected ? theme.palette.primary[600] : theme.palette.secondary[100],
                      '.MuiListItemIcon-root': {
                        color: isSelected ? theme.palette.primary[600] : theme.palette.secondary[200],
                      },
                      '&:hover': {
                        backgroundColor: isSelected ? theme.palette.secondary[300] : theme.palette.action.hover,
                        '.MuiListItemIcon-root': {
                          color: theme.palette.primary[600],
                        },
                      },
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.secondary[300],
                        color: theme.palette.primary[600],
                        '.MuiListItemIcon-root': {
                          color: theme.palette.primary[600],
                        },
                        '&:hover': {
                          backgroundColor: theme.palette.secondary[300],
                        },
                      },
                    }}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Box sx={{ mt: 'auto', width: '100%', p: '1.5rem' }}>
            <Divider sx={{ mb: 2 }} />
            <Button
              startIcon={mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
              onClick={() => dispatch(setMode())}
              sx={buttonStyle}
            >
              {mode === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
            </Button>

            <Button
              startIcon={<ExitToAppOutlined />}
              onClick={handleLogout}
              sx={buttonStyle}
            >
              Log Out
            </Button>
          </Box>
        </Drawer>

        {/* Main content area */}
        <Box flexGrow={1} p={0} sx={{ overflowY: 'auto', height: '100vh', boxSizing: 'border-box' }}>
          {currentComponent}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Demo;
