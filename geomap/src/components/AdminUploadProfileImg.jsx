import React, { useState } from 'react';
import { Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function AdminProfileImageUpload() {
    const municipalities = ["Basey", "Gandara", "Jiabong", "Paranas", "San Jorge", "Catbalogan"];
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [file, setFile] = useState(null);

    const handleMunicipalityChange = (event) => {
        setSelectedMunicipality(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !selectedMunicipality) {
            alert('Please select a file and a municipality.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('municipality', selectedMunicipality);

        try {
            const response = await fetch('/admin/upload-profile-image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                alert('Image uploaded successfully');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            alert('Upload failed: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <InputLabel id="municipality-label">Municipality</InputLabel>
                <Select
                    labelId="municipality-label"
                    value={selectedMunicipality}
                    label="Municipality"
                    onChange={handleMunicipalityChange}
                >
                    {municipalities.map((municipality) => (
                        <MenuItem key={municipality} value={municipality}>
                            {municipality}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Upload Image</Button>
        </form>
    );
}

export default AdminProfileImageUpload;
