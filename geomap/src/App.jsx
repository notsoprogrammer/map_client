import 'react-toastify/dist/ReactToastify.css'

import { About, Contact, Footer, Navbar } from './components/index'
import { Box, CssBaseline } from '@mui/material';
import { Download, Features, Hero, SubFeatures } from './section/index'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import React from 'react';
import { ToastContainer } from 'react-toastify';

const theme = createTheme();

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <ToastContainer />
        <Navbar />
        <Hero  />
        <Features />
        <SubFeatures />
        {/* <Download /> */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
