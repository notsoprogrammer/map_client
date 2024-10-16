import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TextField, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Footer, Navbar } from './index';
import axios from 'axios';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Function to validate a generic phone number format (digits and optional formatting characters)
  const validatePhoneNumber = (number) => {
    const regex = /^[0-9\s\-()]+$/; // Allows digits, spaces, dashes, and parentheses
    return regex.test(number);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check for empty fields
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.message) newErrors.message = 'Message is required';

    // Check if the phone number is valid
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number. Use only digits, spaces, dashes, or parentheses.';
    }

    // If there are errors, stop the submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/email/send`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data.message);
      alert(response.data.message);
      
      // Reset form data and errors after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
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
                  <CustomTextField 
                    name="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                    label="First name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                  <CustomTextField 
                    name="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    label="Last name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                  <CustomTextField 
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <CustomTextField 
                    name="phoneNumber"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                  <CustomTextField 
                    name="message"
                    onChange={handleChange}
                    value={formData.message}
                    label="Message"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                  <Button type="submit" sx={{ mt: 3, color: '#000', bgcolor: '#fff' }} variant="contained" fullWidth disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Send Message'}
                  </Button>
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
