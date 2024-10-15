import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const { tableau } = window;

const Rice = () => {
  const tableauVizRef = useRef(null); // Reference to the div where the viz will be embedded

  useEffect(() => {
    let viz; // Variable to hold the viz instance

    const initViz = () => {
      // Static Tableau dashboard link for the demo
      const vizUrl = 'https://public.tableau.com/views/CalbigaRiceProgram_Public/CalbigaRice_DB?:toolbar=no&:tabs=no'; // Replace with actual public Tableau URL

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
  }, []);

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

export default Rice;
