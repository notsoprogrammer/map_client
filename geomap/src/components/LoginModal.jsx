import React, { useState } from 'react';
import { Box, Button, CircularProgress, Modal, Snackbar, Stack, TextField,Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';
import ForgotPasswordModal from './forgotPasswordModal';
import PrjGeomapLogo from  '../assets/PrjGeomapLogo.png';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
        setIsTableauAuthenticated(true); // Assuming authentication was successful
        setSnackbar({ open: true, message: 'Please ensure you completed authentication in the pop-up.' });
      }
    }, 1000);
  }
  };
  const reopenTableauAuth = () => {
    handleLoginWithTableau(); // Directly attempt to reopen the authentication popup
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && email && password) {
      submitHandler(e);
    }
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    <>
      <Modal open={open} onClose={handleModalClose}>
        <Box sx={style}>
            <Box sx={{ padding: '5px' }} >
              <Stack sx={{ width: 400, marginLeft: '1rem' }} spacing={2} direction="column" justifyContent="center" alignItems='center'>
                <img src={PrjGeomapLogo} alt='logo' style={{ height: 70 , width: 105 }} />
                <h2>Welcome back!</h2>

                {!isTableauAuthenticated && (
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mt: 1, color: 'text.secondary' }}>
                    <InfoIcon sx={{ mr: 1, color: 'info.main' }} />
                    Please ensure you complete authentication before closing the pop-up.
                  </Typography>
                )}
              {isTableauAuthenticated ? (
                <>
                  <TextField
                    sx={{ width: '100%', opacity: isLoading ? 0.5 : 1 }}
                    type='email'
                    label="Email Address"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    InputProps={{
                      endAdornment: isLoading ? <CircularProgress size={20} /> : null,
                      style: { cursor: isLoading ? 'not-allowed' : 'text' }
                    }}
                  />

                  <TextField
                    sx={{ width: '100%', opacity: isLoading ? 0.5 : 1 }}
                    type='password'
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    InputProps={{
                      endAdornment: isLoading ? <CircularProgress size={20} /> : null,
                      style: { cursor: isLoading ? 'not-allowed' : 'text' }
                    }}
                  />

                  <Button
                    onClick={handleForgotPasswordOpen}
                    sx={{ textTransform: 'none' }}
                  >
                    Forgot Password?
                  </Button>
                  <Button
                  sx={{ width: '100%' }}
                  onClick={submitHandler}
                  variant="contained"
                  color='success'
                  disabled={isLoading || !email || !password} // Disable if loading or email/password is empty
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>
                <Button startIcon={<ArrowBackIcon />} onClick={reopenTableauAuth} variant="outlined" sx={{ mt: 1 }}>
                  Retry Tableau Authentication
                </Button>
                </>
              ):(
                <Button onClick={handleLoginWithTableau} variant="contained" color="primary" disabled={isLoading || isTableauAuthenticated}>
                Authenticate with Tableau
              </Button>

              )}
              
              <Button onClick={handleModalClose}>Close</Button>
            </Stack>
          </Box>
        </Box>
      </Modal>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackBarClose} message={snackbar.message} />
        <ForgotPasswordModal open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} />
      </>
  );
};

export default LoginModal;
