import React, { useState } from 'react';
import {
  Groups2Outlined, HomeOutlined, DarkModeOutlined, LightModeOutlined,
  ReceiptLongOutlined, PublicOutlined, ExitToAppOutlined
} from "@mui/icons-material";
import {
  Avatar, Box, Divider, Drawer, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Typography, Button, useTheme
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

const Demo = ({ drawerWidth = 240, isSidebarOpen = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Added for redirecting
  const currentMode = useSelector((state) => state.global.mode); // Get the current mode from Redux state
  const theme = useTheme(); // Access the current theme

  const [activeItem, setActiveItem] = useState("Dashboard"); // Default to Dashboard
  const [currentComponent, setCurrentComponent] = useState(<Dashboard />); // Default to Dashboard component

  // Handle navigation when a sidebar item is clicked
  const handleNavClick = (text, component) => {
    setActiveItem(text);
    setCurrentComponent(component);
  };

  const toggleTheme = () => {
    dispatch(setMode()); // Dispatch the action to switch between light and dark modes
  };

  // Handle Log Out (redirect to /contact)
  const handleLogout = () => {
    navigate("/contact"); // Redirect to the contact page
  };

  return (
    <Box display="flex" width="100%" height="100vh" sx={{ overflow: 'hidden' }}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <Drawer
          open
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.text.primary,
              overflowX: 'hidden', // Disable horizontal scrolling
            },
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: '1.5rem',
            pb: '1.5rem'
          }}>
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
                    onClick={() => handleNavClick(text, component)}
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

            {/* Dark/Light Mode Toggle */}
            <Button
                startIcon={theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
                onClick={() => dispatch(setMode())}
                sx={buttonStyle}
            >
                {theme.palette.mode === "dark" ? "Dark Mode" : "Light Mode"}
            </Button>

            {/* Log Out Button */}
            <Button
              startIcon={<ExitToAppOutlined />}
              onClick={handleLogout}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                color: theme.palette.text.primary,
                width: '100%',
                my: 1,
              }}
            >
              Log Out
            </Button>
          </Box>
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflowY: 'auto', // Enable vertical scroll if necessary
          backgroundColor: theme.palette.background.default,
        }}
      >
        {currentComponent}
      </Box>
    </Box>
  );
};

export default Demo;
