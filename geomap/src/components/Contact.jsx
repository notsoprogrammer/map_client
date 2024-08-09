import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Footer, Navbar } from './index';
import axios from 'axios'; // Notice you've imported axios but are using fetch

const CustomTextField = styled(TextField)({
    'label': {
        color: '#FFF',
    },
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
    }
});

// Correcting baseURL to point to the backend if it's different from frontend


const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); // This expects the response to be in JSON format
      console.log(data.message);
      alert(data.message);
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message: ' + error.message);
    }
  };
  

  return (
    <>
      <Navbar />
      <section style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'rgb(54,60,81)', background: 'linear-gradient(180deg, rgba(54,60,81,0.9) 0%, rgba(54,60,81,1) 100%)' }}>
        <Box sx={{ margin: '0 10rem', display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 3, color: '#fff', backgroundColor: 'transparent', overflow: 'hidden' }}>
                <Typography variant='h4' sx={{ marginBottom: 2, fontWeight: 700 }}>Contact us</Typography>
                <Typography sx={{ marginBottom: 3 }}>Our friendly team would love to hear from you!</Typography>
                <form onSubmit={handleSubmit}>
                  <CustomTextField name="firstName" onChange={handleChange} value={formData.firstName} label="First name" variant="outlined" fullWidth margin="normal" />
                  <CustomTextField name="lastName" onChange={handleChange} value={formData.lastName} label="Last name" variant="outlined" fullWidth margin="normal" />
                  <CustomTextField name="email" onChange={handleChange} value={formData.email} label="Email Address" variant="outlined" fullWidth margin="normal" />
                  <CustomTextField name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} label="Phone Number" variant="outlined" fullWidth margin="normal" />
                  <CustomTextField name="message" onChange={handleChange} value={formData.message} label="Message" multiline rows={4} fullWidth margin="normal" />
                  <Button type="submit" sx={{ mt: 3, color: '#000', bgcolor: '#fff' }} variant="contained" fullWidth>Send Message</Button>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ height: 650 }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15623.655410885765!2d124.87714737653738!3d11.771116363214208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3309cac0018a1485%3A0x5426e9e36a9980cd!2sSamar%20State%20University!5e0!3m2!1sen!2sph!4v1671084981548" style={{ width: '100%', height: '100%', border: 0 }} allowFullScreen></iframe>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
