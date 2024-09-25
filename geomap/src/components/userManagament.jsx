import React, { useState } from 'react';
import { TextField, Button, Box, Alert, AlertTitle, MenuItem } from '@mui/material';
import axios from 'axios';

const UserManagement = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [job, setJob] = useState('');
    const [role, setRole] = useState('user');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const municipalities = ['Catbalogan', 'Calbiga', 'Paranas', 'Basey', 'Gandara'];

    const handleAddUser = async () => {
        // Retrieve the token from localStorage (or however you're storing it)
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error('No auth token found. Please login again.');
            setError('Authorization failed. Please login again.');
            return;
        }
        try {
            // Make a request to the backend, including the token in the headers
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/admin/addUser`,
                {
                    name, 
                    email, 
                    municipality, 
                    job, 
                    role,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
                    },
                    withCredentials: true, // If your backend requires cookies as well
                }
            );
    
            // Log the response (optional)
            console.log("User added successfully:", response.data);
    
            // Optionally, you can use response.data to update the UI or store the added user data
            const addedUser = response.data.user; // Assuming the backend sends back the created user
    
            // Handle success response
            setSuccess(true);
            setError('');
            setName('');
            setEmail('');
            setMunicipality('');
            setJob('');
            setRole('user');
    
            // Optionally, show a success message with the new user details
            console.log("Added user:", addedUser);
    
        } catch (error) {
            console.error("Error adding user:", error);
            setSuccess(false);
            setError("Failed to add user. Please check the input and try again.");
        }
    };
    
    return (
        <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Manage Users</h2>
            {success && (
                <Alert severity="success" onClose={() => setSuccess(false)} sx={{ mb: 2 }}>
                    <AlertTitle>Success</AlertTitle>
                    User has been added successfully!
                </Alert>
            )}
            {error && (
                <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px' }}>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField
                    select
                    label="Municipality"
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                >
                    {municipalities.map((mun) => (
                        <MenuItem key={mun} value={mun}>
                            {mun}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField label="Job" value={job} onChange={(e) => setJob(e.target.value)} />
                <TextField label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleAddUser}>Add User</Button>
            </Box>
        </Box>
    );
};

export default UserManagement;
