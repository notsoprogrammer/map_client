import { Footer, Navbar } from './index'

import { Box } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <>
        <Navbar/>
            <section style={{position: 'relative', width: '100%', height: '100vh', backgroundColor: 'rgb(54,60,81)', background: 'linear-gradient(180deg, rgba(54,60,81,0.9) 0%, rgba(54,60,81,1) 100%)'}}>
               <Box sx={{ margin: '0 10rem',display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                    <h1 style={{color: '#fff'}}>Sorry, due to undetermined error because of unnecessary revisions, this page can't display any data.</h1>
                    <br/>
                    <h3 style={{color: '#fff'}}>Currently under maintenance... Check it out later</h3>
               </Box>
            </section>
        <Footer />
    </>
  )
}

export default About