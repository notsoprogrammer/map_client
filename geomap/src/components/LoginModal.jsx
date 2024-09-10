import React, { useState } from 'react';
import { Box, Button, CircularProgress, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';
import ForgotPasswordModal from './forgotPasswordModal';
import PrjGeomapLogo from  '../assets/PrjGeomapLogo.png';

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
  const [isTableauAuthenticated, setIsTableauAuthenticated] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleSnackBarClose = () => {
    setSnackbar({ open: false, message: '' });
  };

  const handleLoginWithTableau = () => {
    setIsLoading(true);
    const tableauAuthUrl = "https://prod-apsoutheast-a.online.tableau.com";
    const windowFeatures = "toolbar=no, menubar=no, width=500, height=700, top=100, left=100";
    const authWindow = window.open(tableauAuthUrl, '_blank', windowFeatures);
  
    if (!authWindow) {
      setSnackbar({ open: true, message: 'Pop-up was blocked. Please allow pop-ups for this site and try again.' });
      setIsLoading(false);
    } else {

      const timer = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(timer);
          setIsLoading(false);
          // Simulate checking if authentication was successful
          // Typically you might check a condition here, for this example let's assume it was successful
          setIsTableauAuthenticated(true); // This should be set based on actual auth status, potentially by listening to a message as earlier discussed
          setSnackbar({ open: true, message: 'Please ensure you completed authentication in the pop-up.' });
        }
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && email && password) {
      submitHandler(e);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Dummy endpoint for example, replace with your actual API
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/auth`, { email, password });
      if (response.data && response.data.authToken && response.data.tableauToken) {
        // Store the authToken and tableauToken in localStorage
        localStorage.setItem('authToken', response.data.authToken);
        localStorage.setItem('tableauToken', response.data.tableauToken);

        dispatch(setCredentials({ ...response.data }));

        // Redirect based on user role
        if (response.data.role === 'admin') {
          navigate('/admin/usermanagement');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setSnackbar({ open: true, message: "Login failed: " + (error.response?.data?.message || "An error occurred") });
    } finally {
      setIsLoading(false);
    }
  };


  const handleModalClose = () => {
    setEmail('');
    setPassword('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack sx={{ width: '100%', margin: 'auto' }} spacing={2} direction="column" justifyContent="center" alignItems='center'>
          <img src={PrjGeomapLogo} alt='logo' style={{ height: 50, width: 150 }} />
          <h2>Welcome back!</h2>
          <Button
            onClick={handleLoginWithTableau}
            variant="contained"
            color="primary"
            disabled={isLoading || isTableauAuthenticated}
          >
            {isTableauAuthenticated ? 'Authenticated with Tableau' : 'Authenticate with Tableau'}
          </Button>
          <TextField
            sx={{ width: '100%' }}
            type='email'
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isTableauAuthenticated}
          />
          <TextField
            sx={{ width: '100%' }}
            type='password'
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isTableauAuthenticated}
          />
          <Button
            onClick={handleForgotPasswordOpen}
            sx={{ textTransform: 'none' }}
            disabled={!isTableauAuthenticated}
          >
            Forgot Password?
          </Button>
          <Button
            sx={{ width: '100%' }}
            onClick={submitHandler}
            variant="contained"
            color='success'
            disabled={isLoading || !email || !password}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          {(!email || !password) && (
            <Typography variant="caption" sx={{ color: 'red', mt: 1, textAlign: 'center' }}>
              Please fill in both email and password fields to log in.
            </Typography>
          )}
          <Button onClick={handleModalClose}>Close</Button>
        </Stack>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackBarClose} message={snackbar.message} />
      <ForgotPasswordModal open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} />
    </Modal>
  );
};

export default LoginModal;
