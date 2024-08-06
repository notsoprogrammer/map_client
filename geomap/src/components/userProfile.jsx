import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Avatar, Box, Grid, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { useUser } from './userContext'; 

const Input = styled('input')({
  display: 'none',
});

function UserProfile() {
    const { user, updateUser } = useUser();
    const [editMode, setEditMode] = useState(false);
    const [localUser, setLocalUser] = useState({
        ...user,
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    
    useEffect(() => {
        fetchUserData(); // Initial fetch on component mount
    }, []);

    useEffect(() => {
        setLocalUser({ ...user, newPassword: '', confirmPassword: '' });
    }, [user]);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/users/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                updateUser(data);  // Update global user context
                setLocalUser(data); // Set local user state
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
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
    
    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setLocalUser(prevState => ({
    //                 ...prevState,
    //                 profileImg: reader.result
    //             }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/users/profile/image', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            updateUser({ ...user, profileImg: data.file.url });  // Update context with new image URL
            setLocalUser({ ...localUser, profileImg: data.file.url });  // Update local state
            alert('Image uploaded successfully');
        } else {
            alert('Failed to upload image: ' + data.message);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEdit = () => {
        setEditMode(true);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (localUser.newPassword !== localUser.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        if (passwordError) {
            alert("Please fix password issues before submitting.");
            return;
        }
    
        const formData = new FormData();
        Object.keys(localUser).forEach(key => {
            if (key !== 'profileImg' && key !== 'newPassword' && key !== 'confirmPassword') {
                formData.append(key, localUser[key]);
            }
        });
    
        if (localUser.newPassword && localUser.newPassword === localUser.confirmPassword && !passwordError) {
            formData.append('password', localUser.newPassword);
        }
    
        const fileInput = document.getElementById('icon-button-file');
        if (fileInput && fileInput.files.length > 0) {
            formData.append('profileImg', fileInput.files[0]);
        }
    
        const response = await fetch('/api/users/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                // 'Content-Type': 'application/json'  // Removed to let the browser set it with the correct boundary
            },
            body: formData
        });
    
        const data = await response.json();
        if (response.ok) {
            updateUser(data);  // Update global user context
            setLocalUser(data);  // Update local state to reflect the new data
            alert('Profile Updated Successfully');
            setEditMode(false);
            fetchUserData();  // Re-fetch data here to ensure UI is updated
        } else {
            alert(data.message);
        }
    };
    
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
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
                        <Avatar src={localUser.profileImg || '/default-avatar.png'} sx={{ width: 90, height: 90 }} />
                        {editMode && (
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImageUpload} />
                                <IconButton color="primary" component="span" style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                    <EditIcon />
                                </IconButton>
                            </label>
                        )}
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

export default UserProfile;
