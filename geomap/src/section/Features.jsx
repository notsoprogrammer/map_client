import { Box, Card, CardContent, CardHeader, CardMedia, Container, Stack, Typography } from '@mui/material'

import React from 'react'
import f1 from '../assets/f1.svg'
import f2 from '../assets/f2.svg'
import f3 from '../assets/f3.svg'

const Features = () => {
  return (
    <section id="product-insights" style={{ width: '100%', height: '100vh', backgroundColor: '#D9D9D9'}}>
        <Container maxWidth='xl' sx={{ paddingTop: '10rem'}}>
            <Box  sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Typography sx={{fontSize: '30px', fontWeight: 700, width: '400px', lineHeight: '1.2'}}>We Make Your Records
                More Well Organized </Typography>
                <Typography sx={{color: '#6E6D7A', fontSize: '1rem', width: '400px'}}>We have features that will make it easier for you 
                to turn your daily records into detailed reports,
                helping you make better decisions.</Typography>
            </Box>
            <Box sx={{ paddingTop: '6rem', display: 'flex', justifyContent: 'center' }}>
                <Stack direction="row" spacing={8}>
                    <Card sx={{ maxWidth: 345, padding: '2rem 0.5rem', borderRadius: '25px' }}>
                        <CardContent sx={{ paddingBottom: '3rem'}}>
                            <Box>
                                <img src={f1} alt="" style={{ backgroundColor: 'rgba(76,175,80,0.15)', padding: '0.8rem', borderRadius: '10px'}}/>
                            </Box>
                        </CardContent>
                        <CardHeader
                            title="Product Insights"
                        />
                        <CardContent>
                            <Typography>
                                Easy to run reports on farmer profiles, crops yield, organizations and more.
                            </Typography>
                        </CardContent>
                    </Card>
                    
                    <Card sx={{ maxWidth: 345, padding: '2rem 0.5rem', borderRadius: '25px' }}>
                        <CardContent sx={{ paddingBottom: '3rem'}}>
                            <Box>
                                <img src={f2} alt="" style={{ backgroundColor: 'rgba(0,188,212,.15)', padding: '0.8rem', borderRadius: '10px'}}/>
                            </Box>
                        </CardContent>
                        <CardHeader
                            title="Increase Visibility"
                        />
                        <CardContent>
                            <Typography>
                            Invite farmers, organizations, partners and more to keep everyone informed.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 345, padding: '2rem 0.5rem', borderRadius: '25px' }}>
                        <CardContent sx={{ paddingBottom: '3rem'}}>
                            <Box>
                                <img src={f3} alt="" style={{ backgroundColor: 'rgba(96,125,139,.15)', padding: '0.8rem', borderRadius: '10px'}}/>
                            </Box>
                        </CardContent>
                        <CardHeader
                            title="Digital Farmer Profile"
                        />
                        <CardContent>
                            <Typography>
                            Different social and demographic features to help us know what members of a group have in common.
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </Container>
    </section>
  )
}

export default Features