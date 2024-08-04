import { Box, Button, FormControl, Grid, Paper, TextField, Typography } from '@mui/material'
import { Footer, Navbar } from './index'

import React from 'react'
import { styled } from '@mui/material/styles'

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
      },    
});

const Contact = () => {
  return (
    <>
        <Navbar/>
            <section style={{position: 'relative', width: '100%', height: '100vh', backgroundColor: 'rgb(54,60,81)', background: 'linear-gradient(180deg, rgba(54,60,81,0.9) 0%, rgba(54,60,81,1) 100%)'}}>
               <Box sx={{ margin: '0 10rem',display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                <Grid container spacing={20}>
                    <Grid item xs={4} md={6}>
                        <Paper sx={{ color: '#fff', backgroundColor: 'transparent'}}>
                            <Typography variant='h4' sx={{padding: '0.5em', fontWeight: 700}}>Contact us</Typography>
                            <h3 style={{padding: '0 0.5em'}}>Our friendly team would love to hear from you!</h3>
                            <Box sx={{padding: '0.5em'}}>
                                <CustomTextField sx={{ margin: '0 1rem' }} id="outlined-basic" label="First name" variant="outlined" />
                                <CustomTextField sx={{ margin: '0 1rem' }} id="outlined-basic" label="Last name" variant="outlined" />
                                <CustomTextField sx={{ margin: '2.5rem 1rem' }} id="outlined-basic" label="Email Address" variant="outlined" />
                                <CustomTextField sx={{ margin: '2.5rem 1rem' }} id="outlined-basic" label="Phone Number" variant="outlined" />
                                <CustomTextField sx={{ margin: '0 1rem', width: '80%' }} id="outlined-textarea" label="Message" multiline rows={4} />
                            </Box>
                            <Button sx={{ color: '#000', bgcolor: '#fff', margin: '2rem 1rem', width: '80%'}} variant="contained">Send Message</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={4} md={6}>
                        <Paper sx={{ height: '650px'}}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15623.655410885765!2d124.87714737653738!3d11.771116363214208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3309cac0018a1485%3A0x5426e9e36a9980cd!2sSamar%20State%20University!5e0!3m2!1sen!2sph!4v1671084981548!5m2!1sen!2sph" style={{height: '100%', width: '100%'}} frameBorder="0" allowFullScreen></iframe>
                        </Paper>
                    </Grid>
                </Grid>
               </Box>
            </section>
        <Footer />
    </>
  )
}

export default Contact