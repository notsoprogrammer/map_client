import React, { useEffect, useRef, useState } from 'react';
import { reset, uploadFileFailure, uploadFileRequest, uploadFileSuccess } from '../slices/fileUploadSlice';
import { Alert, Box, Button, MenuItem, Select, FormControl, InputLabel, TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const MapUploads = () => {
  // Define municipalities with coordinates
  const municipalities = [
    { name: 'Basey', coordinates: '11.4147000312805,125.141495239258', SW: '11.2541704177856,124.976486206055', NE: '11.5752296447754,125.30655670166' },
    { name: 'Calbayog', coordinates: '12.1921854019165,124.599678039551', SW: '12.0490503311157,124.356742858887', NE: '12.3353204727172,124.842613220215' },
    { name: 'Calbiga', coordinates: '11.6264653881586,125.095976429744', SW: '11.557620048523,124.972381591797', NE: '11.6866703033447,125.220703125' },
    { name: 'Gandara', coordinates: '12.0582299308777,124.820178985596', SW: '11.9409303665162,124.667236328125', NE: '12.1757402420045,124.973121643067' },
    { name: 'Jiabong', coordinates: '11.8540096931458,124.967390350342', SW: '11.7483997344972,124.924346923828', NE: '11.9597997665406,125.010360717773' },
    { name: 'Matuguinao', coordinates: '12.1999697685242,125.004683776856', SW: '12.1130199432374,124.856567382813', NE: '12.286919593811,125.152923583984' },
    { name: 'Paranas', coordinates: '11.8695224313864,125.124917157228', SW: '11.7201700210572,125.008171081543', NE: '11.9975204467773,125.269653320313' },
    { name: 'San Jose De Buan', coordinates: '12.0630297660828,125.040126800537', SW: '11.9597997665406,124.965316772461', NE: '12.1662597656251,125.114936828613' },
    { name: 'San Jorge', coordinates: '11.9800200462342,124.899692535401', SW: '11.8887100219727,124.811752319336', NE: '12.0713300704957,124.987632751465' },
    { name: 'San Sebastian', coordinates: '11.7069083435303,125.02103693638', SW: '11.6738901138306,124.993041992188', NE: '11.7373695373536,125.037490844727' },
    { name: 'Samar', coordinates: ' ', SW: '11.0855703353881,124.145217895508', NE: '12.3353204727172,125.30655670166' },
  ];
  const mapTypes = ['Soil Properties',  'Soil Texture'];
  const dataTypes = {
    'Soil Properties': ['Calcium', 'Iron', 'Organic Matter', 'Available P', 'Total Nitrogen', 'Potassium', 'Acidity', 'Zinc', 'Extra SO4'],
    'Soil Texture': ['Clay', 'Sand','Silt' ],
  };

  // Ref for file input
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  // State variables
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [mapType, setmapType] = useState('');
  const [dataType, setdataType] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);


  

  const handleMunicipality = (event) => {
    const selectedMunicipalityName = event.target.value;
    setSelectedMunicipality(selectedMunicipalityName);
   // Find the selected municipality in the list
   const selectedMunicipality = municipalities.find((municipality) => municipality.name === selectedMunicipalityName);

   if (selectedMunicipality) {
     // Set the coordinates, SW, and NE values based on the selected municipality
     setInputValue(selectedMunicipality.coordinates);
     setBounds1(selectedMunicipality.SW);
     setBounds2(selectedMunicipality.NE);

     // Split and convert coordinates, SW, and NE values to numbers
     const latLongValues = selectedMunicipality.coordinates.split(',').map((str) => parseFloat(str.trim()));
     const SWlatLongValues = selectedMunicipality.SW.split(',').map((str) => parseFloat(str.trim()));
     const NElatLongValues = selectedMunicipality.NE.split(',').map((str) => parseFloat(str.trim()));

     // Update the state with the parsed values
     setLatLong(latLongValues);
     setSWLatLong(SWlatLongValues);
     setNELatLong(NElatLongValues);
   }
 };

  // Event handler for file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Display alert message and hide after a timeout
  const showMessage = (text) => {
    setMessage(text);
    setShowAlert(true);
  };  
    setTimeout(() => {
      setShowAlert(false);
      setMessage('');
    }, 1500);
  

// Function to handle file upload
const handleFileUpload = async () => {
  if (!file || !selectedMunicipality || !mapType || !dataType) {
    showMessage('Please fill in all required fields.');
    return;
  }
  const formData = new FormData();
  formData.append('file', file);
  formData.append('municipality', selectedMunicipality);
  formData.append('mapType', mapType);
  formData.append('dataType', dataType);  ;
  formData.append('latLong', latLong.join(',')); // Convert array to string
  formData.append('SWlatLong', SWlatLong.join(',')); // Convert array to string
  formData.append('NElatLong', NElatLong.join(',')); // Convert array to string
    try {
      dispatch(uploadFileRequest());
      const url = `/api/files/upload/${selectedMunicipality}/${mapType}/${dataType}/${latLong}/${SWlatLong}/${NElatLong}`;
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { message } = response.data;
      dispatch(uploadFileSuccess(response.data.file));
      showMessage(message);
      if(fileInputRef.current) { fileInputRef.current.value = null; }

      setSelectedMunicipality('');
      setmapType('');
      setdataType('');
      setInputValue('');
      setBounds1('');
      setBounds2('');
        // Reset the coordinates after successful upload
        setLatLong([null, null]);
        setSWLatLong([null, null]);
        setNELatLong([null, null]);
      } catch (error) {
        dispatch(uploadFileFailure(error.message));
      }
    
    };
    

  // State variables for latitude and longitude
  const [inputValue, setInputValue] = useState('');
  const [bounds1, setBounds1] = useState('');
  const [bounds2, setBounds2] = useState('');
  const [latLong, setLatLong] = useState([null, null]);
  const [SWlatLong, setSWLatLong] = useState([null, null]);
  const [NElatLong, setNELatLong] = useState([null, null]);

  // Event handler for input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Split the input value by comma and convert to numbers
    const values = value.split(',').map((str) => parseFloat(str.trim()));

    // Ensure we have exactly 2 values for latitude and longitude
    if (values.length === 2 && !isNaN(values[0]) && !isNaN(values[1])) {
      setLatLong(values);
    } else {
      setLatLong([null, null]);
    }
  };

  // Event handler for bounds1 input change
  const handleBounnds1 = (event) => {
    const bounds1val = event.target.value;
    setBounds1(bounds1val);

    const bounds1vals = bounds1val.split(',').map((str) => parseFloat(str.trim()));

    if (bounds1vals.length === 2 && !isNaN(bounds1vals[0]) && !isNaN(bounds1vals[1])) {
      setSWLatLong(bounds1vals);
    } else {
      setSWLatLong([null, null]);
    }
  };

  // Event handler for bounds2 input change
  const handleBounnds2 = (event) => {
    const bounds2val = event.target.value;
    setBounds2(bounds2val);

    const bounds2vals = bounds2val.split(',').map((str) => parseFloat(str.trim()));

    if (bounds2vals.length === 2 && !isNaN(bounds2vals[0]) && !isNaN(bounds2vals[1])) {
      setNELatLong(bounds2vals);
    } else {
      setNELatLong([null, null]);
    }
  };

  // Log coordinates to console on change
  useEffect(() => {
    console.log(latLong);
    console.log(SWlatLong);
    console.log(NElatLong);
  }, [latLong, NElatLong, SWlatLong]);

  // JSX for the component
  return (
    <Box height="calc(100vh-64px)" width="calc(100%-250px)" sx={{ mt: '100px', p: 5 }}>
      <h1>Map Files Uploads</h1>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
        {/* File input */}
        <input
          ref={fileInputRef}
          type="file"
          variant="outlined"
          onChange={handleFileChange}
          accept=".jpeg, .png"
        />

        {/* Form for map upload */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            gap: 5,
            maxHeight: '350px',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'stretch',
          }}
        >
          {/* Dropdown for municipality */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="municipality">Municipality</InputLabel>
              <Select
                labelId="municipality"
                value={selectedMunicipality}
                onChange={handleMunicipality}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {municipalities.map((municipality) => (
                  <MenuItem key={municipality.name} value={municipality.name}>
                    {municipality.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Dropdown for Map Type */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="map-type">Map</InputLabel>
              <Select
                labelId="map-type"
                value={mapType}
                onChange={(e) => setmapType(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {mapTypes.map((mapTypeOption) => (
                  <MenuItem key={mapTypeOption} value={mapTypeOption}>
                    {mapTypeOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Dropdown for Data Type */}
          {mapType && (
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="data-type">Data Type</InputLabel>
                <Select
                  labelId="data-type"
                  value={dataType}
                  onChange={(e) => setdataType(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {dataTypes[mapType].map((dataTypeOption) => (
                    <MenuItem key={dataTypeOption} value={dataTypeOption}>
                      {dataTypeOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          {/* Input field for Latitude and Longitude */}
          <Box>
            <TextField
              label="Enter Latitude and Longitude"
              variant="outlined"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div>
              Latitude: {latLong[0] !== null ? latLong[0] : 'Invalid input'}
              <br />
              Longitude: {latLong[1] !== null ? latLong[1] : 'Invalid input'}
            </div>
          </Box>

          {/* Coordinates for bounds */}
          <h3>Coordinates for bounds</h3>

          {/* Textfield for South-West corner Latitude and Longitude */}
          <Box>
            <TextField
              label="South-West corner Latitude and Longitude"
              variant="outlined"
              value={bounds1}
              onChange={handleBounnds1}
            />
            <div>
              Latitude: {SWlatLong[0] !== null ? SWlatLong[0] : 'Invalid input'}
              <br />
              Longitude: {SWlatLong[1] !== null ? SWlatLong[1] : 'Invalid input'}
            </div>
          </Box>

          {/* Textfield for North-East corner Latitude and Longitude */}
          <Box>
            <TextField
              label="North-East corner Latitude and Longitude"
              variant="outlined"
              value={bounds2}
              onChange={handleBounnds2}
            />
            <div>
              Latitude: {NElatLong[0] !== null ? NElatLong[0] : 'Invalid input'}
              <br />
              Longitude: {NElatLong[1] !== null ? NElatLong[1] : 'Invalid input'}
            </div>
          </Box>
        </Box>

        {/* Upload button */}
        <Button variant="contained" onClick={handleFileUpload}>
          Upload
        </Button>

        {/* Show alert if necessary */}
        {showAlert && message !== '' ? (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            {message}
          </Alert>
        ) : null}
      </Box>
    </Box>
  );
};

export default MapUploads;
