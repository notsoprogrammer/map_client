import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const { tableau } = window;

const Dashboard = () => {
  const tableauVizRef = useRef(null);

  useEffect(() => {
    // Fetch the JWT token from localStorage
    const tableauToken = localStorage.getItem('tableauToken');
    if (!tableauToken) {
      console.error('Tableau token is missing.');
      return;
    }

    // Tableau URL with JWT token
    const tableauVizUrl = `https://prod-apsoutheast-a.online.tableau.com/t/geomapsamar/views/Agri-RiceProgram/RiceProgram_TestAuto?:embed=y&:showVizHome=no&:jwt=${tableauToken}`;

    const options = {
      hideTabs: true,
      hideToolbar: true,
    };

    // Embed Tableau viz
    new tableau.Viz(tableauVizRef.current, tableauVizUrl, options);

    return () => {
      tableauVizRef.current?.dispose();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'hidden', paddingTop: '5px', boxSizing: 'border-box' }}>
      <Box sx={{ flex: 1, padding: '2px', overflowY: 'hidden' }}>
        <div ref={tableauVizRef} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Box>
  );
};

export default Dashboard;
