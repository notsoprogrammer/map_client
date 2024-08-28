import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

const { tableau } = window;

const Dashboard = () => {
  const tableauVizRef = useRef(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tableau/generate-token`);
        setToken(response.data.token);
      } catch (error) {
        console.error('Error fetching Tableau token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      const vizUrl = 'https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/Agri-RiceProgram/RiceProgram_TestAuto';

      const tableauViz = new tableau.Viz(tableauVizRef.current, vizUrl, {
        hideTabs: true,
        hideToolbar: true,
        width: '900px',
        height: '740px',
        toolbar: 'bottom',
        token: token,
      });

      return () => {
        tableauViz.dispose();
      };
    }
  }, [token]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'hidden', paddingTop: '5px', boxSizing: 'border-box' }}>
      <Box sx={{ flex: 1, padding: '2px', overflowY: 'hidden' }}>
        <div ref={tableauVizRef} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
