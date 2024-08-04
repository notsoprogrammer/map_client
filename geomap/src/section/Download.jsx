import { Box, Container, Typography } from '@mui/material'

import React from 'react'
import appStore from '../assets/appStore.png'
import googlePlay from '../assets/googlePlay.png'
import twoPhones from '../assets/twoPhones.png'

const Download = () => {
  return (
    <section style={{ position: 'relative', height: '100vh', backgroundColor: '#D9D9D9'}}>
        <Container maxWidth='xl'>
            <Box sx={{ display: 'flex', columnGap: '15rem', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ height: '100vh',width: '400px'}}>
                    
                </div>
                <div style={{diplay: 'flex', flexDirection: 'column'}}>
                    <Typography variant='h4' sx={{ fontWeight: 700, width: '500px'}}>Get Our App for Improved Agricultural Management</Typography>
                    <p style={{ width: '500px', padding: '2rem 0', fontWeight: 500}}>Download now to optimize your agricultural management
and stay up-to-date with real-time data on your crops, land,
and farming operations.</p>
                    <div style={{ diplay: 'flex'}}>
                        <img src={googlePlay} alt="" style={{ paddingRight: '1rem'}} />
                        <img src={appStore} alt="" style={{ paddingLeft: '1rem'}} />
                    </div>
                </div>
            </Box>
        </Container>
        <div style={{ position: 'absolute', bottom: 0, left: '5%'}}>
            <img src={twoPhones} alt="" />
        </div>
    </section>
  )
}

export default Download