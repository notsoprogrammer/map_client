import { AppBar, Avatar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme, } from '@mui/material';
import {ArrowDropDownOutlined, DarkModeOutlined, LightModeOutlined, Menu as MenuIcon, Search, SettingsOutlined} from '@mui/icons-material';
import React, { useState } from 'react'

import FlexBetween from './FlexBetween';
import { clearCredentials } from '../slices/authSlice';
import { setMode } from '../slices/modeSlice'
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';

const Appbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [logoutApiCall] = useLogoutMutation();
  const logoutHanlder = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
  <AppBar
    sx={{
        position: "fixed",
        
        background: theme.palette.background.default,
        boxShadow: "none",
    }}
  >
        <FlexBetween>

        </FlexBetween>


  </AppBar>
)}

export default Appbar