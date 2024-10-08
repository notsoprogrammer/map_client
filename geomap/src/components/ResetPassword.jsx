import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState(''); // State to hold the user's email
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch user email from backend using token
        const fetchEmail = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/get-email`, { token });
                setEmail(response.data.email);
            } catch (error) {
                console.error('Failed to fetch email:', error);
                setMessage('Failed to load user information.');
            }
        };

        fetchEmail();
    }, [token]);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'password') {
            setPassword(value);
            validatePassword(value);
        } else {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
                token,
                password,
            });

            setMessage(response.data.message);

            // Redirect after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage('Failed to reset password. Please try again later.');
            setLoading(false);
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;
        setPasswordError(
            regex.test(password) ? '' : 'Password must be 8-16 characters, include one uppercase, one number, and one special character.'
        );
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '50px auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Reset Your Password
            </Typography>
            {email && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {/* <img src="https://via.placeholder.com/24" alt="user icon" style={{ marginRight: 8 }} /> Placeholder for user icon */}
                    <Typography variant="body1">{email}</Typography>
                </Box>
            )}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="New Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleInputChange}
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Reset Password'}
                </Button>
                {message && (
                    <Typography color="secondary" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
                {loading && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Redirecting...
                    </Typography>
                )}
            </form>
        </Box>
    );
}

export default ResetPassword;
