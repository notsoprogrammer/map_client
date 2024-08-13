
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

const { tableau } = window;

const RiceStat = () => {
  const tableauVizRef = useRef(null);
  const [riceDashboardLink, setRiceDashboardLink] = useState('');

  // Set up axios to use cookies
  axios.defaults.withCredentials = true;

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
    if (riceDashboardLink) {
      const initViz = () => {
        const vizUrl = riceDashboardLink;
        const options = {
          hideTabs: true,
          hideToolbar: true,
          onFirstInteractive: () => {
            console.log('Tableau dashboard is interactive');
          }
        };

        new tableau.Viz(tableauVizRef.current, vizUrl, options);
      };

      initViz();

      return () => {
        if (tableauVizRef.current) {
          tableauVizRef.current.dispose();
        }
      };
    }
  }, [riceDashboardLink]);

  return (
    <Box
      height="100vh"
      width="100%"
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        ref={tableauVizRef}
        style={{
          height: '100vh',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'transparent'
        }}
      />
    </Box>
  );
};

export default RiceStat;
