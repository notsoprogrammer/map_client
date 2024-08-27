import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const UserManagement = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [job, setJob] = useState('');
    const [role, setRole] = useState('user');

    const handleAddUser = async () => {
        try {
            const response = await axios.post('/api/users/register', {
                name, email, password, municipality, job, role,
            });
            alert(response.data.message);
            // Reset form fields
            setName('');
            setEmail('');
            setPassword('');
            setMunicipality('');
            setJob('');
            setRole('user');
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Failed to add user");
        }
    };

    return (
        <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Manage Users</h2>
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
