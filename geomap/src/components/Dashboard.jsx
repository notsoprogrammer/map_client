import React, { useState, useEffect, useRef } from 'react';
import WeatherWidget from './WeatherWidget';
import { Box } from '@mui/material';
import axios from 'axios';
import useTokenValidation from '../util/useTokenValidation';

const { tableau } = window;

const Dashboard = () => {
  const [coords, setCoords] = useState(null);
  const [links, setLinks] = useState(null);
  const tableauAgriInfo = useRef(null);
  const tableauMapDashboard = useRef(null);
  const [municipality, setMunicipality] = useState('');
  
  useTokenValidation();

  useEffect(() => {
    const fetchLinks = async () => {
      const authToken = localStorage.getItem('authToken');
      const tableauToken = localStorage.getItem('tableauToken');
  
      console.log("authToken:", authToken);
      console.log("tableauToken:", tableauToken);
  
      if (!authToken || !tableauToken) {
        console.error('Authentication or Tableau token is missing.');
        return;
      }
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/links`, {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true
        });
        setLinks(response.data);
        setMunicipality(response.data.municipality); // Assuming municipality is returned here
      } catch (error) {
        console.error('Error fetching dashboard links:', error);
      }
    };

    fetchLinks();
  }, []);
  
  useEffect(() => {
    if (links) {
      const tableauToken = localStorage.getItem('tableauToken');
      if (!tableauToken) {
        console.error('Tableau token is missing.');
        return;
      }
  
      const mainDashboardUrl = `${links.mainDashboardLink}?:jwt=${tableauToken}`;
      const weatherDashboardUrl = `${links.weatherDashboardLink}?:jwt=${tableauToken}`;
  
      console.log("Embedding Tableau dashboards with URLs:");
      console.log("Main Dashboard URL:", mainDashboardUrl);
      console.log("Weather Dashboard URL:", weatherDashboardUrl);
  
      const options = {
        hideTabs: true,
        hideToolbar: true,
      };
  
      new tableau.Viz(tableauAgriInfo.current, mainDashboardUrl, options);
      new tableau.Viz(tableauMapDashboard.current, weatherDashboardUrl, options);
  
      return () => {
        tableauAgriInfo.current?.dispose();
        tableauMapDashboard.current?.dispose();
      };
    }
  }, [links]);
  

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
      <Box sx={municipality === 'Catbalogan' ? { width: '50%', height: '100%', overflowY: 'scroll' } : { width: '50%', height: '100%',overflow: 'hidden' }}>
        <div ref={tableauAgriInfo} style={municipality === 'Catbalogan' ? { width: '100%', height: '210%' } : { width: '100%', height: '100%' }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
