import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../slices/modeSlice';
import { clearCredentials } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {
    Groups2Outlined, HomeOutlined, DarkModeOutlined, LightModeOutlined,
    SettingsOutlined, ShoppingCartOutlined, ExitToAppOutlined, ReceiptLongOutlined,
    PublicOutlined, UploadFileOutlined, ManageAccountsOutlined
} from "@mui/icons-material";
import {
    Avatar, Box, Divider, Drawer, IconButton, Button, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Typography, useTheme, Menu,
    MenuItem, Stack
} from "@mui/material";
import Basey from '../Municipality Images/Basey.png';
import Calbiga from '../Municipality Images/Calbiga.png';
import Catbalogan from '../Municipality Images/Catbalogan.png';
import Gandara from '../Municipality Images/Gandara.png';
import Paranas from '../Municipality Images/Paranas.png';
import SanJorge from '../Municipality Images/SanJorge.png';

const normalizeMunicipalityName = (name) => {
    return name.replace(/\s+/g, '').toLowerCase();
};

const municipalityImages = {
    basey: Basey,
    calbiga: Calbiga,
    catbalogan: Catbalogan,
    gandara: Gandara,
    paranas: Paranas,
    sanjorge: SanJorge // 'San Jorge' becomes 'sanjorge'
};

const navItems = [
    { text: "Dashboard", icon: <HomeOutlined /> },
    { text: "Maps", icon: <PublicOutlined /> },
    { text: "Farmers", icon: <Groups2Outlined /> },
    { text: "Rice", icon: <ReceiptLongOutlined /> },
    { text: "Crops", icon: <ReceiptLongOutlined /> },
];

// Admin-specific navigation items
const adminNavItems = [
    { text: "Map Uploads", icon: <UploadFileOutlined />, path: '/admin/mapuploads' },
    { text: "User Management", icon: <ManageAccountsOutlined />, path: '/admin/usermanagement' },
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const user = useSelector(state => state.auth.userInfo);
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const [logoutApiCall] = useLogoutMutation();

    const normalizedMunicipality = normalizeMunicipalityName(user.municipality || '');
    const profileImageUrl = user?.municipality ? municipalityImages[normalizeMunicipalityName(user.municipality)] || '/default-avatar.png' : '/default-avatar.png';

    const logoutHandler = async () => {
        try {
            const authToken = localStorage.getItem('authToken'); // Retrieve the token

            if (!authToken) {
                throw new Error('Token not found');
            }

            await logoutApiCall().unwrap();

            localStorage.removeItem('authToken');
            dispatch(clearCredentials());

            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    const buttonStyle = {
        justifyContent: "flex-start",
        textTransform: "none",
        color: theme.palette.text.primary,
        width: '100%',
        my: 1,
    };

    return (
        <Box component="nav">
            {isSidebarOpen && (
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: '1.5rem',
                        pb: '1.5rem'
                    }}>
                        <Avatar src={profileImageUrl} alt={user?.name} sx={{ width: 100, height: 100 }} />
                        <Typography variant="h6" noWrap>
                            {user.name}
                        </Typography>
                        <Typography variant="body2" noWrap>
                            {user.job}
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
                                        <ListItemIcon>
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                        {user.role === 'admin' && adminNavItems.map(({ text, icon, path }) => {
                            const isSelected = pathname === path;

                            return (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton
                                        selected={isSelected}
                                        onClick={() => {
                                            navigate(path);  // Navigate using the correct path
                                            setActive(path);
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
                                        <ListItemIcon>
                                            {icon}
                                        </ListItemIcon>
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
                            onClick={() => dispatch(setMode())}
                            sx={buttonStyle}
                        >
                            {theme.palette.mode === "dark" ? "Dark Mode" : "Light Mode"}
                        </Button>
                        <Button
                            startIcon={<SettingsOutlined />}
                            onClick={() => navigate('/settings')}
                            sx={buttonStyle}
                        >
                            Settings
                        </Button>
                        <Button
                            startIcon={<ExitToAppOutlined />}
                            onClick={logoutHandler}
                            sx={buttonStyle}
                        >
                            Log Out
                        </Button>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
}

export default Sidebar;
