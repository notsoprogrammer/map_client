import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Avatar, Box, Grid, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { useUser } from './userContext'; 
import { useDispatch,useSelector } from 'react-redux';
import { updateCredentials } from '../slices/authSlice';
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});

function Settings() {
    // const { user, updateUser } = useUser();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.auth.userInfo);
    const [editMode, setEditMode] = useState(false);
    const [localUser, setLocalUser] = useState({...userInfo,newPassword: '',confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');


    
    useEffect(() => {
        fetchUserData(); // Initial fetch on component mount
    }, []);

    useEffect(() => {
        setLocalUser({ ...userInfo, newPassword: '', confirmPassword: '' });
    }, [userInfo]);

    const fetchUserData = async () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/users/profile`; // Adjust the endpoint as necessary
        const token = localStorage.getItem('token');

        axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => {
            console.log('Data retrieved successfully:', response.data);
        })
        .catch(error => {
            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        });
    };
    
    

    const handleCancel = () => {
        setEditMode(false);
        fetchUserData(); // Refresh the user data when cancelling edits
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLocalUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    
        if (name === "newPassword") {
            validatePassword(value);
        }
    };
    
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localUser.newPassword !== localUser.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        if (passwordError) {
            alert("Please fix password issues before submitting.");
            return;
        }
    
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/users/profile`; // Ensure this is the correct API endpoint
        const token = localStorage.getItem('token');
    
        axios.put(apiUrl, {
            name: localUser.name,
            email: localUser.email,
            job: localUser.job,
            password: localUser.newPassword // Be cautious with password handling
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            dispatch(updateCredentials({
                name: response.data.name, 
                email: response.data.email,
                job: response.data.job
            }));
            alert('Profile Updated Successfully');
            setEditMode(false);
        })
        .catch(error => {
            if (error.response) {
                // Server responded with a status outside the 2xx range
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
                alert(`Failed to update profile: ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                // No response was received to the request
                console.error('Error request:', error.request);
                alert('Failed to update profile: No response from the server');
            } else {
                // An error occurred in setting up the request
                console.error('Error message:', error.message);
                alert('Update failed: ' + error.message);
            }
            console.error('Error config:', error.config);
        });
    };
    
    

    
    const validatePassword = (password) => {
        const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;
        setPasswordError(
            regex.test(password) ? '' : 'Password must be 8-16 characters, include one uppercase, one number, and one special character.'
        );
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4">Profile</Typography>
                    <div style={{ position: 'relative', marginBottom: '20px' }}>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={localUser.name}
                            onChange={handleInputChange}
                            margin="normal"
                            disabled={!editMode}
                        />
                        <TextField
                            fullWidth
                            label="Email address"
                            name="email"
                            value={localUser.email}
                            onChange={handleInputChange}
                            margin="normal"
                            disabled={!editMode}
                        />
                        <TextField
                            fullWidth
                            label="Job"
                            name="job"
                            value={localUser.job}
                            onChange={handleInputChange}
                            margin="normal"
                            disabled={!editMode}
                        />
                        <TextField
                            fullWidth
                            label="Municipality"
                            name="municipality"
                            value={localUser.municipality}
                            margin="normal"
                            InputProps={{ readOnly: true }}
                        />
                        {editMode && (
                            <>
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    name="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={localUser.newPassword}
                                    onChange={handleInputChange}
                                    margin="normal"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleTogglePasswordVisibility}
                                                    edge="end"
                                                >
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
                                    value={localUser.confirmPassword}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                                <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>Save</Button>
                                <Button onClick={handleCancel} variant="outlined" color="secondary">Cancel</Button>
                            </>
                        )}
                        {!editMode && (
                            <Button onClick={handleEdit} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                                Edit Profile
                            </Button>
                        )}
                    </form>
                    
                </Grid>
            </Grid>
        </Box>
    );
}

export default Settings;
