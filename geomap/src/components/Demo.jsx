import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
  Groups2Outlined, HomeOutlined, DarkModeOutlined, LightModeOutlined,
  ReceiptLongOutlined, PublicOutlined
} from "@mui/icons-material";
import {
  Avatar, Box, Divider, Drawer, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Typography, Button, useTheme
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { setMode } from '../slices/modeSlice';
import Dashboard from '../Demo components/DashboardDemo';  // Importing your Dashboard component
import Maps from './Maps';
import Rice from '../Demo components/RiceDemo';
import Crops from '../Demo components/CropsDemo';
import Farmers from '../Demo components/FarmersDemo';

import Calbiga from '../Municipality Images/Calbiga.png'; // Assuming you have this mock image

// Demo user mock data
const demoUser = {
  name: "Demo User",
  municipality: "Calbiga",
  role: "guest",
};

// Sidebar navigation items
const navItems = [
  { text: "Dashboard", icon: <HomeOutlined />, component: <Dashboard /> },
  { text: "Maps", icon: <PublicOutlined />, component: <Maps/> },
  { text: "Farmers", icon: <Groups2Outlined />, component: <Farmers/> },
  { text: "Rice", icon: <ReceiptLongOutlined />, component: <Rice/> },
  { text: "Crops", icon: <ReceiptLongOutlined />, component: <Crops/> },
];

const Demo = ({ drawerWidth = 240 }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Dashboard"); // Default to Dashboard
  const [currentComponent, setCurrentComponent] = useState(<Dashboard />); // Default to Dashboard component

  // Handle navigation when a sidebar item is clicked
  const handleNavClick = (text, component) => {
    setActiveItem(text);
    setCurrentComponent(component);
  };

  const toggleTheme = () => {
    dispatch(setMode());
  };

  return (
    <Box display="flex" width="100%">
      {/* Sidebar */}
      <Drawer
        open
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '1.5rem' }}>
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
            startIcon={theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
            onClick={toggleTheme}
            sx={{ justifyContent: "flex-start", textTransform: "none", color: theme.palette.text.primary, width: '100%', my: 1 }}
          >
            {theme.palette.mode === "dark" ? "Dark Mode" : "Light Mode"}
          </Button>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box flexGrow={1} p={2}>
        {currentComponent}
      </Box>
    </Box>
  );
};

export default Demo;
