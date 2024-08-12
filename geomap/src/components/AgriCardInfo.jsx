import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';

const AgricultureInfoCard = () => {
  // Access the current mode from the Redux state
  const mode = useSelector((state) => state.mode);

  const cardStyle = {
    mt: 2,
    boxShadow: 3,
    bgcolor: mode === 'dark' ? 'background.paper' : 'background.default', // Adjust the background color based on the mode
  };

  const textStyle = {
    textAlign: 'justify',
    lineHeight: '1.5',
    marginBottom: '10px',
  };

  const sourceStyle = {
    fontSize: '0.8rem',
    fontStyle: 'italic',
    textAlign: 'left',
    marginTop: '2px',
  };

  return (
    <Card sx={cardStyle}>
      <CardContent>
      <Typography gutterBottom variant="h4" component="div" fontStyle="bold">
          Catbalogan City Agriculture
        </Typography>
            <Typography variant="body1" style={textStyle}>
            The City of Catbalogan has a total land area of 18,411.66 hectares of which 9,781.08 hectares or 53.12% is agricultural land. About 4,350.06 hectares are planted as agricultural crops while 5.421.33 hectares is grassland/pastureland. It has a population of 103, 879 with almost 5,000 or 4.81% are farmers and farm laborers; 6, 383 or 6.14% are fishermen and fishing laborers. It has 57 barangays comprising 13 Poblacion, 11 upland and 23 coastal and mainland barangays respectively.
            </Typography>
            <Typography variant="body1" style={textStyle}>
            Coconut, rice, and root crops are the major agricultural produce of the farmers in Catbalogan, also Banana and many kinds of vegetables. Depending on its location - either uplands or in the lowlands, these agricultural products are always exposed to natural forms of calamities such as floods and typhoons.
            </Typography>
            <Typography variant="body1" style={textStyle}>
            Barangay 13 Poblacion and all the other rural barangays produce copra and raw coconut, upland and lowland rice, vegetable, root crops and banana as major agricultural products of the locality. Planted in over 1,500 hectares, coconut represents the largest crop area in Catbalogan generating around P217,993,500.00 in revenues for local coconut farmers. Upland rice is planted too in 278 hectares with a total production value of P12,173,437.00, too. About 682 hectares of lowland rice produces around P105.136 million worth of clean rice. The 26-hectare vegetable farms produce about P26.17 million worth of products. Root crop areas has a total of 176 hectares with a production value of 39.604,500.00 per year. Lastly, banana farms produce 19.481 million worth produced in 298 hectares. 
            </Typography>
            <Typography variant="body1" style={textStyle}>
            There are support facilities and services provided to most farmers by the respective agencies who champion the different banner crops and the farming practices adopted also depend on the type of crop. Coconut farmers and upland rice producers use traditional practices while rice farmers in the lowlands adopt modern technologies.
            </Typography>

            <Typography style={sourceStyle}>
          Source: Catbalogan City Comprehensive Land Use Plan, Vol.3
        </Typography>
        
      </CardContent>
    </Card>
  );
};

export default AgricultureInfoCard;
