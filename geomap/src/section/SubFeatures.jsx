import { Box, Container, Typography } from '@mui/material'

import React from 'react'
import blob from '../assets/blob.png'
import handPhone from '../assets/handPhone.png'

const SubFeatures = () => {
  return (
    <section style={{ width: '100%', height: '100vh'}}>
        <Container maxWidth='xl' sx={{ paddingTop: '10rem', position: 'relative'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Typography sx={{fontSize: '30px', fontWeight: 700, width: '400px', lineHeight: '1.2'}}>Simplify Your Agricultural Management Process</Typography>
                <Typography sx={{color: '#6E6D7A', fontSize: '1rem', width: '600px'}}>Users can gain a comprehensive view of farmers and
                    organizations, as well as access important information about
                    land characteristics and conditions to determine the best crops
                    to plant in specific areas.
                </Typography>
            </Box>
            <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'center'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '2rem', justifyContent: 'center'}}>
                    <Box sx={{ display: 'flex', columnGap: '1.5rem'}}>
                        <span style={{ fontSize: '50px', color:'rgba(0,0,0,.3)', paddingRight: '10px'}}>01 </span>
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth:'380px'}}>
                            <Typography variant='h5' sx={{paddingTop:'0.7rem'}}>Soil Property Map</Typography>
                            <span>Provides important information about the
                                characteristics and condition of the land.
                            </span>
                        </div>
                    </Box>

                    <Box sx={{ display: 'flex', columnGap: '1.5rem'}}>
                        <span style={{ fontSize: '50px', color:'rgba(0,0,0,.3)'}}>02</span>
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth:'380px'}}>
                            <Typography variant='h5' sx={{paddingTop:'0.7rem'}}>Crop Suitability Map</Typography>
                            <span>Shows what crops are best to plant in a 
                                specific area to attain maximum yield.
                            </span>
                        </div>
                    </Box>

                    <Box sx={{ display: 'flex', columnGap: '1.5rem'}}>
                        <span style={{ fontSize: '50px', color:'rgba(0,0,0,.3)'}}>03</span>
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth:'380px'}}>
                            <Typography variant='h5' sx={{paddingTop:'0.7rem'}}>Overview Dashboard</Typography>
                            <span>Turn your daily records into detailed reports
                                like crops production, farmers and
                                organizations, helping you make better decisions.
                            </span>
                        </div>
                    </Box>
                </Box>
                <Box sx={{ zIndex: 99 }}>
                    <img src={handPhone} alt="" style={{ height: 'auto', width: '750px'}} />

                </Box>
            </Box>
            <div style={{ position: 'absolute', bottom: 0, right: "5%"}}>
                <img src={blob} alt="" height='auto' width='1000px'/>
            </div>
        </Container>
    </section>
  )
}

export default SubFeatures