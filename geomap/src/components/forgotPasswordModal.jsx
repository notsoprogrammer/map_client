import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const ForgotPasswordModal = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleResetRequest = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
                { email },
                { headers: { 'Content-Type': 'application/json' } }
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to send reset email.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Reset Your Password</Typography>
                <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                {message && <Typography color="secondary" sx={{ mb: 2 }}>{message}</Typography>}
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleResetRequest}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : 'Send Reset Email'}
                </Button>
            </Box>
        </Modal>
    );
};

export default ForgotPasswordModal;
