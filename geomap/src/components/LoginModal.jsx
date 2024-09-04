import React, { useState } from 'react';
import { Box, Button, CircularProgress, Modal, Stack, TextField, Snackbar } from '@mui/material';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to manage if authenticated
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

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
    const tableauAuthUrl = "https://prod-apsoutheast-a.online.tableau.com";
    const windowFeatures = "toolbar=no, menubar=no, width=500, height=700, top=100, left=100";
    const authWindow = window.open(tableauAuthUrl, '_blank', windowFeatures);

    const timer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(timer);
        setIsAuthenticated(true);
        setSnackbarMessage("Tableau Authentication complete. You may now proceed.");
        setSnackbarOpen(true);
      }
    }, 1000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/auth`, { email, password });
      localStorage.setItem('authToken', response.data.authToken);
      dispatch(setCredentials({ ...response.data }));
      handleClose();
    } catch (error) {
      console.error('Login failed:', error);
      setSnackbarMessage("Login failed: " + (error.response?.data?.message || "An error occurred"));
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Button onClick={handleLoginWithTableau} variant="contained" color="primary">Authenticate with Tableau</Button>;
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Stack spacing={2} direction="column" justifyContent="center" alignItems='center'>
            <TextField label="Email Address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={submitHandler} disabled={isLoading}>Sign In</Button>
            <Button onClick={handleForgotPasswordOpen}>Forgot Password?</Button>
            <ForgotPasswordModal open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} />
            <Button onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default LoginModal;
