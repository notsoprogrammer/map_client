import React, { useState } from 'react';
import { Box, Button, CircularProgress, Modal, Stack, TextField } from '@mui/material';
import geomap from '../assets/geomap.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import ForgotPasswordModal from './forgotPasswordModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#F6F4F4',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LoginModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [tableauAuthenticated, setTableauAuthenticated] = useState(false); // State to manage Tableau authentication status

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgotPasswordOpen = () => {
    handleClose(); // Close the login modal
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/tableau`; // This URL should start the OAuth process on the backend
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitHandler(e);
    }
  };
  const handleLoginWithTableau = () => {
    const tableauAuthUrl = "https://prod-apsoutheast-a.online.tableau.com"; // Customize with your actual Tableau URL
    const windowFeatures = "toolbar=no, menubar=no, width=500, height=700, top=100, left=100";
    const authWindow = window.open(tableauAuthUrl, '_blank', windowFeatures);

    // Monitor the window status to close it programmatically
    const timer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(timer);
        setTableauAuthenticated(true); // Assuming authentication is successful once the window is closed
        alert("Tableau Authentication complete. You may now proceed.");
      }
    }, 1000);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/auth`, { email, password });
      localStorage.setItem('authToken', response.data.authToken);
      dispatch(setCredentials({ ...response.data }));

      navigate(response.data.role === 'admin' ? '/admin/usermanagement' : '/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert("Login failed: " + (error.response?.data?.message || "An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!tableauAuthenticated) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Please authenticate with Tableau first.</h2>
          <Button onClick={handleLoginWithTableau} variant="contained" color="primary">
            Authenticate with Tableau
          </Button>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack spacing={2} direction="column" alignItems='center'>
          <TextField type='email' label="Email Address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} />
          <TextField type='password' label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
          <Button onClick={handleLogin} disabled={isLoading || !tableauAuthenticated}>
            {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          <Button onClick={handleForgotPasswordOpen}>Forgot Password?</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Stack>
      </Box>
      <ForgotPasswordModal open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} />
    </Modal>
  );
};

export default LoginModal;
