import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const AdminDashboard = () => {
    return (
        <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Admin Dashboard</h1>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 3 }}>
                <Link to="/admin/usermanagement">
                    <Button variant="contained" color="primary">Manage Users</Button>
                </Link>
                <Link to="/admin/mapuploads">
                    <Button variant="contained" color="primary">Upload Maps</Button>
                </Link>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
