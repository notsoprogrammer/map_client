import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const { tableau } = window;

const Farmers = () => {
  const tableauVizRef = useRef(null);

  useEffect(() => {
    let viz;

    const initViz = () => {
      const vizUrl ='https://public.tableau.com/views/CalbigaFarmersProgram/Calbiga_Farmers-Viz'; // Replace with actual public Tableau URL

      const options = {
        width: '100%',
        height: '100%',
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: () => {
          console.log('Tableau dashboard is interactive');
        }
      };

      viz = new tableau.Viz(tableauVizRef.current, vizUrl, options);
    };

    initViz();

    const handleResize = () => {
      if (viz) {
        viz.setFrameSize(undefined, tableauVizRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
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

export default Farmers;
