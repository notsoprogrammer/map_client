  import React, { useEffect, useState } from 'react';
  import { useLocation, useNavigate } from "react-router-dom";
  import { useDispatch } from 'react-redux';
  import { setMode } from '../slices/modeSlice';
  import { clearCredentials } from '../slices/authSlice';
  import { useLogoutMutation } from '../slices/usersApiSlice';
  import { useUser } from './userContext';
  import {Groups2Outlined,HomeOutlined,DarkModeOutlined,LightModeOutlined,SettingsOutlined,ShoppingCartOutlined,ExitToAppOutlined,ReceiptLongOutlined,PublicOutlined,ChevronRightOutlined, // Import the icon for logout button
  Person
  } from "@mui/icons-material";
import { Avatar,Box,Divider, Drawer,IconButton,Button,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Typography,useTheme,Menu,MenuItem,Stack} from "@mui/material";


  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
        text: "Maps",
        icon: <PublicOutlined />,
    },
    {
      text: "Farmers",
      icon: <Groups2Outlined />,
    },
    // {
    //   text: "Associations",
    //   icon: <Groups2Outlined />,
    // },
    {
      text: "Rice",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "Crops",
      icon: <ReceiptLongOutlined />,
    },

    {
      text: "MapUploads",
      icon: <PublicOutlined />,
    },
    {
        text: "ImageUpload",
        icon: <PublicOutlined />,
      },
  ];


  const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
      const { pathname } = useLocation();
      const [active, setActive] = useState("");
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const theme = useTheme();
      const {user} =useUser();  
      const [anchorEl, setAnchorEl] = useState(null);
      const isOpen = Boolean(anchorEl);
      const handleClick = (event) => setAnchorEl(event.currentTarget);
      const handleClose = () => setAnchorEl(null);
    //   const goToProfileUpload = () => {
    //     navigate('/profile-upload'); // Path to the profile upload page
    //     };
      const [logoutApiCall] = useLogoutMutation();
      const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap(); // Ensure this calls the correct endpoint
            dispatch(clearCredentials());
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally set an error state and display a message to the user
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
                          <Box display="flex" alignItems="center" mb={'20px'} >
                            <Typography variant="h4" fontWeight="bold">
                              MAPULON
                            </Typography>
                          </Box>
                          {/* User Profile */}
                          <Avatar alt={user.name} src={user.profilePicture} sx={{ width: 56, height: 56 }} />
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
