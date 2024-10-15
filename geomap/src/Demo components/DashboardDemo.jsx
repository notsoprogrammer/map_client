import React, { useState, useEffect, useRef } from 'react';
import WeatherWidget from '../components/WeatherWidget';
import { Box } from '@mui/material';

const { tableau } = window;

const Dashboard = () => {
  const [coords, setCoords] = useState(null);
  const tableauAgriInfo = useRef(null);
  const tableauMapDashboard = useRef(null);
  const [municipality, setMunicipality] = useState('Demo Municipality');  // Set default for demo mode
  
  // Geolocation functionality
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        // Default geolocation coordinates
        setCoords({
          latitude: 11.7888905913845, // Default latitude for the demo
          longitude: 124.879792127437, // Default longitude for the demo
        });
      }
    );
  }, []);

  // Static Tableau links for the demo mode
  useEffect(() => {
    const mainDashboardUrl = 'https://public.tableau.com/views/Overall_Dashboard_Public/CropandRiceMainDashboard?:toolbar=no&:tabs=no';  // Replace with actual demo link
    const weatherDashboardUrl = 'https://public.tableau.com/views/RicePrice_17282930517210/RiceEstimatedPAYandPrice?:toolbar=no&:tabs=no';  // Replace with actual demo link

    const options = {
      hideTabs: true,
      hideToolbar: true,
    };

    // Initialize Tableau visualizations
    const agriViz = new tableau.Viz(tableauAgriInfo.current, mainDashboardUrl, options);
    const mapViz = new tableau.Viz(tableauMapDashboard.current, weatherDashboardUrl, options);

    // Clean up Tableau visualizations
    return () => {
      agriViz.dispose();
      mapViz.dispose();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '99vh', overflowY: 'hidden', paddingTop: '5px', boxSizing: 'border-box' }}>
      {/* Left Side - Weather and Tableau Map */}
      <Box sx={{ width: '49.9%', padding: '0 5px', display: 'flex', flexDirection: 'column' }}>
        {/* Weather Widget based on geolocation */}
        <Box>
          {coords && <WeatherWidget coords={coords} />}
        </Box>
        {/* Tableau Map Dashboard */}
        <Box sx={{ flex: 1, padding: '2px', overflowY: 'hidden' }}>
          <div ref={tableauMapDashboard} style={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>
      
      {/* Right Side - Agricultural Info Tableau Dashboard */}
      <Box sx= {{ width: '50%', height: '100%', overflow: 'hidden' }}>
        <div ref={tableauAgriInfo} style= { {width: '100%', height: '100%' }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
