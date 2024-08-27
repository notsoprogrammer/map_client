import React, { useState } from 'react';
import { TextField, Button, Box, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';

const UserManagement = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [job, setJob] = useState('');
    const [role, setRole] = useState('user');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleAddUser = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/addUser`,{
                name, email, password, municipality, job, role,
            });
            setSuccess(true);
            setError('');
            setName('');
            setEmail('');
            setPassword('');
            setMunicipality('');
            setJob('');
            setRole('user');
        } catch (error) {
            console.error("Error adding user:", error);
            setSuccess(false);
            setError("Failed to add user");
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
                <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <TextField label="Municipality" value={municipality} onChange={(e) => setMunicipality(e.target.value)} />
                <TextField label="Job" value={job} onChange={(e) => setJob(e.target.value)} />
                <TextField label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                <Button variant="contained" color="primary" onClick={handleAddUser}>Add User</Button>
            </Box>
        </Box>
    );
};

export default UserManagement;
