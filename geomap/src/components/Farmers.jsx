import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import useTokenValidation from '../util/useTokenValidation';

const { tableau } = window;

const CropStat = () => {
  const tableauVizRef = useRef(null); // Reference to the div where the viz will be embedded
  const [links, setLinks] = useState(null); // State to hold the dashboard links
  useTokenValidation(); // Custom hook to validate tokens

  useEffect(() => {
    const fetchLinks = async () => {
      const authToken = localStorage.getItem('authToken'); // Get the access token from localStorage
      try {
        // Fetching the specific links for the crops dashboard
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/links`, {
          headers: { 'Authorization': `Bearer ${authToken}` },
          params: { municipality: 'your-municipality-name' }, // Assuming API can filter links by dashboard type
          withCredentials: true
        });
        setLinks(response.data); // Setting the fetched links to state
      } catch (error) {
        console.error('Error fetching dashboard links:', error);
      }
    };

    fetchLinks();
  }, []);

  useEffect(() => {
    if (links) {
      let viz; // Variable to hold the viz instance
      const initViz = () => {
        const vizUrl = links.farmersProfileLink; // URL for the crops dashboard

        const options = {
          width: '100%',
          height: '100%',
          hideTabs: true,
          hideToolbar: true,
          onFirstInteractive: () => {
            console.log('Tableau dashboard is interactive');
          }
        };

        // Initialize the Tableau Viz in the referenced div
        viz = new tableau.Viz(tableauVizRef.current, vizUrl, options);
      };

      initViz();

      const handleResize = () => {
        if (viz) {
          // Adjust the frame size on window resize
          viz.setFrameSize(undefined, tableauVizRef.current.clientHeight);
        }
      };

      // Add window resize listener
      window.addEventListener('resize', handleResize);

      return () => {
        // Clean up on component unmount
        window.removeEventListener('resize', handleResize);
        if (viz) {
          viz.dispose();
        }
      };
    }
  }, [links]);

  return (
    <Box
      height="100vh"
      width="100%"
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        ref={tableauVizRef}
        style={{
          height: '100vh',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'transparent',
        }}
      />
    </Box>
  );
};

export default CropStat;
