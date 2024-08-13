import React, { useState, useEffect, useRef } from 'react';
import WeatherWidget from './WeatherWidget';
import { Box } from '@mui/material';
import axios from 'axios';
const { tableau } = window;

const Dashboard = () => {
  const [coords, setCoords] = useState(null);
  const [links, setLinks] = useState(null);
  const tableauAgriInfo = useRef(null);
  const tableauMapDashboard = useRef(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/links`, {
          headers: { 'Authorization': `Bearer ${token}` },
          params: { municipality: 'your-municipality-name' },
          withCredentials: true // Include cookies in the request if needed
        });
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching dashboard links:', error);
      }
    };

    fetchLinks();
  }, []);

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
        setCoords({
          latitude: 11.7888905913845, // Default latitude
          longitude: 124.879792127437, // Default longitude
        });
      }
    );
  }, []);

  useEffect(() => {
    if (links) {
      const options = {
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: () => {
          console.log('Tableau dashboard is interactive');
        },
        withCredentials: true 
      };

      new tableau.Viz(tableauAgriInfo.current, links.mainDashboardLink, options);
      new tableau.Viz(tableauMapDashboard.current, links.weatherDashboardLink, options);

      return () => {
        tableauAgriInfo.current?.dispose();
        tableauMapDashboard.current?.dispose();
      };
    }
  }, [links]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '99vh', overflowY: 'hidden', paddingTop: '5px', boxSizing: 'border-box' }}>
      <Box sx={{ width: '49.9%', padding: '0 5px', display: 'flex', flexDirection: 'column' }}>
        <Box>
          {coords && <WeatherWidget coords={coords} />}
        </Box>
        <Box sx={{ flex: 1, padding: '2px', overflowY: 'hidden' }}>
          <div ref={tableauMapDashboard} style={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>
      <Box sx={{ width: '50%', height: '100%', overflowY: 'scroll' }}>
        <div ref={tableauAgriInfo} style={{ width: '100%', height: '210%' }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
