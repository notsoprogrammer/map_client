import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

const ForgotPasswordModal = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleResetRequest = async () => {
        setIsLoading(true);
        try {
            // Perform fetch or axios request here
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            setMessage(data.message);
            setIsLoading(false);
        } catch (error) {
            setMessage('Failed to send reset email.');
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
