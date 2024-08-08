import { Box, Button, Container, Typography } from "@mui/material"

import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useScrollToTop } from "../util/ScrollTop";

import data from "../assets/data.svg"
import hero from "../assets/hero.png"
import information from "../assets/information.svg"
import insights from "../assets/insights.svg"
import maskmap from "../assets/maskmap.png"
const Hero = () => {
  useScrollToTop();
  return (
    <section id="hero" style={{position: 'relative', width: '100%', height: '100vh', backgroundColor: 'rgb(54,60,81)', background: 'linear-gradient(180deg, rgba(54,60,81,0.9) 0%, rgba(54,60,81,1) 100%)'}}>
        <Box sx={{ margin: '0 10rem',display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
          <Box sx={{width: 500, color: '#fff', display:'flex', flexWrap: 'wrap', flexDirection:'column', rowGap: '1.5rem'}}>
            <Typography variant="h1" sx={{ fontSize: '35px', fontWeight: '700', lineHeight:'1.4'}}>
              Unlock the Full Potential of Your Agricultural Land with Our Geo-Reference Mapping Solution
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '16px'}}>A User-friendly Monitoring System</Typography>
            <Typography variant="p" sx={{color:'#CCC9C9', fontSize: '14px'}}>Provides information of crops, land use, and soil quality. Crop condition
                assessment, crop yield forecasting, soil mapping, etc.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', columnGap: '5rem', justifyContent: 'center', alignItems: 'center'}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '0.8rem' }}>
                <img src={insights} alt="insight" />
                <Box sx={{height: '9px', width:'65px', borderRadius: '10px', backgroundColor: '#D5DF31'}}></Box>
                <Typography variant="p" sx={{ color: '#CCC9C9', fontSize: '12px'}}>Insights</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '0.8rem' }}>
                <img src={information} alt='information'/>
                <Box sx={{height: '9px', width:'65px', borderRadius: '10px', backgroundColor: '#D5DF31'}}></Box>
                <Typography variant="p" sx={{ color: '#CCC9C9', fontSize: '12px'}}>Information</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '0.8rem' }}>
                <img src={data} alt='data'/>
                <Box sx={{height: '9px', width:'65px', borderRadius: '10px', backgroundColor: '#D5DF31'}}></Box>
                <Typography variant="p" sx={{ color: '#CCC9C9', fontSize: '12px'}}>Demographics</Typography>
              </Box>
            </Box>
            <Typography variant="p" sx={{color: '#CCC9C9', fontSize:'12px', mt: 2}}>
              To those interested to register or apply, click the button below
            </Typography>
              <RouterLink to="/contact">
                <Button sx={{ borderRadius: '15px', backgroundColor: '#D9D9D9', width: 150, padding: '0.6rem', fontWeight: 700}}>
                    Contact Us
                </Button>
              </RouterLink>  
          </Box>
              <Box sx={{ zIndex: 99,flex: '4', display: {xs : 'none', md: 'flex'}}}>
                <img src={hero} alt="" style={{marginTop: '-6rem', marginLeft: '6rem', filter: 'drop-shadow(0px 35px 35px rgba(0,0,0,0.8))'}} height={640} width={640} />
              </Box>
        </Box>
        <div style={{position: 'absolute', bottom: 0, right: '8rem'}}>
          <img src={maskmap} alt="" style={{ height: "auto", width: '1000px'}}/>
        </div>

        <div style={{position: 'absolute', top: '6rem', left: '42%', width: '200px'}}>
          <Typography variant="span" sx={{ fontSize: '11px', color: '#fff'}}>SUSTAIN AGRICULTURAL RESOURCES</Typography>
          <p style={{position: 'relative', color: '#E1E0E0', fontSize: '10px', marginTop: '0.2rem' }}>Long term crops and livestock. Enhanced
            soil quality. Contributes to environmental
            conservation.</p>
        </div>
        <div style={{position: 'absolute',top: '21%', left: '53%', height: '2rem', width:'4rem', borderTop: '1px solid #fff', borderLeft: '1px solid #fff' }}></div>
        
        <div style={{position: 'absolute', bottom: 0, right: '8rem'}}>
          <img src={maskmap} alt="" style={{ height: "auto", width: '1000px'}}/>
        </div>
        <div style={{position: 'absolute', top: '8rem', right: '10%', width: '200px'}}>
          <Typography variant="span" sx={{ fontSize: '11px', color: '#fff'}}>REVITALIZE ECONOMIC PRODUCTIVITY</Typography>
          <p style={{position: 'relative', color: '#E1E0E0', fontSize: '10px', fontWeight: 400, marginTop: '0.2rem' }}>Provide greater employment opportunities
          both rural and urban areas. Higher incomes can increase the consumer
          demand for goods and services.
          </p>
        </div>
        <div style={{position: 'absolute',top: '25%', right: '23%', height: '2rem', width:'4rem', borderTop: '1px solid #fff', borderRight: '1px solid #fff' }}></div>
        
        <div style={{position: 'absolute', bottom: 0, right: '8rem'}}>
          <img src={maskmap} alt="" style={{ height: "auto", width: '1000px'}}/>
        </div>
        <div style={{position: 'absolute', top: '45%', right: '5.5%', width: '200px'}}>
          <Typography variant="span" sx={{ fontSize: '11px', color: '#fff', textAlign: 'right'}}>REDUCED POVERTY</Typography>
          <p style={{position: 'relative', color: '#E1E0E0', fontSize: '10px', fontWeight: 400, marginTop: '0.2rem', textAlign: 'left' }}>Create jobs and livelihood for farmers
          and the landless.
          Boosting the productivity of foods and raw
          materials to eradicate poverty.</p>
        </div>
        <div style={{position: 'absolute',top: '48%', right: '18%', height: '2rem', width:'3rem', borderBottom: '1px solid #fff', borderRight: '1px solid #fff' }}></div>
    </section>
  )
}

export default Hero
