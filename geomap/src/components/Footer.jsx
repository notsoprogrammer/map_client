import { Box, Container, Icon, Typography } from '@mui/material'

import FacebookIcon from '@mui/icons-material/Facebook'
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{ height: '', background: 'linear-gradient(360deg, rgba(54,60,81,0.9) 0%, rgba(54,60,81,1) 100%)' }}>
        <Container maxWidth="xl" sx={{padding: '3rem 0', display: 'flex', justifyContent: 'center', columnGap: '10rem', color: '#fff'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <h3 style={{ letterSpacing: '2px'}}>GEOMAP SAMAR</h3>
                <Typography variant='p' sx={{ fontSize: '14px'}}>Copyright &copy; {new Date().getFullYear()} SIGISDAC. All rights reserved.</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <h4>FOLLOW US</h4>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '10px'}}>
                    <FacebookIcon />
                    <p>FB.COM/SIGISDAC</p>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <h4>LOCATION</h4>
                <Box sx={{display: 'flex', justifyContent: 'center', columnGap: '10px'}}>
                    <PinDropRoundedIcon sx={{ margin: '16px 0' }} />
                    <p style={{ width: '250px'}}>RIC 2nd Floor<br></br>
                        Samar State University
                        Arteche Blvd. Brgy. Guindapunan
                        Catbalogan City, Samar, PH
                    </p>
                </Box>
            </Box>
        </Container>
    </Box>
  )
}

export default Footer