import React, { useState } from 'react';
import { Box, Button, CircularProgress, Modal, Snackbar, Stack, TextField } from '@mui/material';
import axios from 'axios';
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
  const [isTableauAuthenticated, setIsTableauAuthenticated] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

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

    const timer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(timer);
        setIsLoading(false);
        setIsTableauAuthenticated(true); // Assuming authentication was successful
        setSnackbar({ open: true, message: 'Tableau Authentication successful!' });
      }
    }, 1000);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitHandler(e);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/auth`, { email, password });
      if (response.data && response.data.authToken) {
        localStorage.setItem('authToken', response.data.authToken);
        dispatch(setCredentials({ ...response.data }));
        handleClose();
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
          <Stack spacing={2} direction="column" alignItems='center'>
            {isTableauAuthenticated ? (
              <>
                <TextField
                  sx={{ width: '100%' }}
                  type='email'
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress} // Attach keypress handler
  
                />
                <TextField
                  sx={{ width: '100%' }}
                  type='password'
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
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
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleLoginWithTableau}
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                Authenticate with Tableau
              </Button>
            )}
            <Button onClick={handleModalClose}>Close</Button>
          </Stack>
        </Box>
      </Modal>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackBarClose} message={snackbar.message} />
      <ForgotPasswordModal open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} />
    </>
  );
};

export default LoginModal;
