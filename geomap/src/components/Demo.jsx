import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
  Groups2Outlined, HomeOutlined, DarkModeOutlined, LightModeOutlined,
  ReceiptLongOutlined, PublicOutlined
} from "@mui/icons-material";
import {
  Avatar, Box, Divider, Drawer, IconButton, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Typography, Button, useTheme
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../slices/modeSlice';

// Mock municipality images, can be removed if not needed in demo
import Basey from '../Municipality Images/Basey.png';

const normalizeMunicipalityName = (name) => name.replace(/\s+/g, '').toLowerCase();

// Mock user for demo purposes
const demoUser = {
  name: "Demo User",
  municipality: "Basey",
  role: "guest",
};

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Maps", icon: <PublicOutlined /> },
  { text: "Farmers", icon: <Groups2Outlined /> },
  { text: "Rice", icon: <ReceiptLongOutlined /> },
  { text: "Crops", icon: <ReceiptLongOutlined /> },
];

const Demo = ({ drawerWidth = 240, isNonMobile = true }) => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname.substring(1));
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const profileImageUrl = Basey; // Placeholder for demo

  const buttonStyle = {
    justifyContent: "flex-start",
    textTransform: "none",
    color: theme.palette.text.primary,
    width: '100%',
    my: 1,
  };

  const toggleTheme = () => {
    dispatch(setMode());
  };

  return (
    <Box component="nav" display="flex" width="100%">
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: '1.5rem',
            pb: '1.5rem',
          }}
        >
          <Avatar src={profileImageUrl} alt="Profile" sx={{ width: 100, height: 100 }} />
          <Typography variant="h6" noWrap>
            {demoUser.name}
          </Typography>
          <Typography variant="body2" noWrap>
            {demoUser.municipality}
          </Typography>
        </Box>
        <List>
          {navItems.map(({ text, icon }) => {
            const lcText = text.toLowerCase();
            const isSelected = active === lcText;

            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={isSelected}
                  onClick={() => {
                    navigate(`/${lcText}`);
                    setActive(lcText);
                  }}
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
            startIcon={theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
            onClick={toggleTheme}
            sx={buttonStyle}
          >
            {theme.palette.mode === "dark" ? "Dark Mode" : "Light Mode"}
          </Button>
        </Box>
      </Drawer>
      <Box flexGrow={1} p={2}>
        <Typography variant="h4" gutterBottom>
          Demo Page Content
        </Typography>
        {/* Placeholder for the content (e.g., Dashboard, Maps, etc.) */}
      </Box>
    </Box>
  );
};

export default Demo;
