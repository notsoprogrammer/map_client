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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgotPasswordOpen = () => {
    handleClose(); // Close the login modal
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
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
      console.error(error.response?.data?.message || error.message);
      alert("Login failed: " + (error.response?.data?.message || "An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
          <Box sx={{ padding: '5px' }} >
            <Stack sx={{ width: 400, marginLeft: '1rem' }} spacing={2} direction="column" justifyContent="center" alignItems='center'>
              <img src={geomap} alt='logo' style={{ height: 54, width: 54 }} />
              <h2>Welcome back!</h2>
              <TextField
                sx={{ width: '100%' }}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress} // Attach keypress handler
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
              />
              <TextField
                sx={{ width: '100%' }}
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress} // Attach keypress handler
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
              <Button onClick={handleForgotPasswordOpen} sx={{ textTransform: 'none' }}>Forgot Password?</Button>

              <Button sx={{ width: '100%' }} type='submit' onClick={submitHandler} variant="contained" color='success' disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
              <Button sx={{ width: '100%' }} onClick={handleClose} variant="text">cancel</Button>
            </Stack>
          </Box>
      </Box>
    </Modal>

      <ForgotPasswordModal open={forgotPasswordOpen} handleClose={handleForgotPasswordClose} />
    </>
  );
};

export default LoginModal;
