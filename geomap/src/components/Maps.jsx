import 'leaflet/dist/leaflet.css';
import '../App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select,Chip, Typography,Avatar,Checkbox,FormControlLabel } from '@mui/material';
import L from 'leaflet';
import Button from '@mui/material/Button';
import { MapContainer, LayersControl, TileLayer, ImageOverlay, useMap,LayerGroup } from 'react-leaflet';
import FlexBetween from './FlexBetween';
import axios from 'axios';
import legendData from '../mapSources/legendData';
import Boundary from '../assets/Boundary.svg';
import geojsonData from '../mapSources/geojson';
import soilgeodata from '../mapSources/soilData';
import textureData from '../mapSources/soilTexture';
import { GeoJSON, Popup, Marker } from 'react-leaflet';
import BarChartComponent from '../mapSources/BarChartSoilProp';
import TextureBarChart from '../mapSources/BarChartSoilText';
import StackedBarComponent from '../mapSources/StackedBarComponent';
import { useSelector } from 'react-redux';
import { tokensDark,tokensLight } from '../theme';
import PieChartComponent from '../mapSources/PieChartCrop';
import analysesData from '../mapSources/Analyses';
//when I made this code, only God, chatGPT and I knows. If you're having problem, only God can answer you :)

// Component definition
const Maps = () => {

  const [mapType, setMapType] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [category, setCategory] = useState('');
  const [imgLayer, setImgLayer] = useState(null);
  const [muniCoords, setMuniCoords] = useState([]);
  const [extent, setExtent] = useState([]);
  const [labelText, setLabelText] = useState("Province");
  const [showAllTextures, setShowAllTextures] = useState(false);
  const mapRef = useRef(null);
  const [opacity, setOpacity] = useState(0.8);
  const center = [11.710469619751, 124.725933776856];
  const boundaryBounds = [[11.0855703353881, 124.145217895508], [12.3353204727172, 125.30655670166]];
  const [boundaryVisible, setBoundaryVisible] = useState(false);
  const [clickedFeature, setClickedFeature] = useState(null);
  const [geoJsonLayer, setGeoJsonLayer] = useState(null);
  const mode = useSelector((state) => state.global.mode);
  const chartTextColors = {
    dark: tokensDark.grey[0], 
    light: tokensDark.grey[900], 
  };
  const discussionAvailable = analysesData[municipality]?.[category];

  const [showSoilMarkers, setShowSoilMarkers] = useState(false);

  const getFilteredMarkers = () => {
    return soilgeodata.features.filter((feature) => {
      return feature.properties.Municipality === municipality && feature.properties[category] !== null;
    });
  };
  const handleMapType = (event) => {
    const selectedMapType = event.target.value;
    setMapType(selectedMapType);

    if (selectedMapType === 'Crop Suitability') {
      setMunicipality('Samar');
    } else {
      setMunicipality('');
    }};
  const handleMunicipality = (event) => {
    const newMunicipality = event.target.value;
  
    // Update the municipality state
    setMunicipality(newMunicipality);
    
    if (newMunicipality === 'Samar') {
      setLabelText('Province');
    } else {
      setLabelText('Municipality');
    }
    if (mapType !== 'Crop Suitability') {
      setMunicipality(event.target.value);
    }};

    const handlePolygonClick = (feature) => {
      const clickedMunicipality = feature.properties.Municipality;
      setSelectedMunicipality(clickedMunicipality);
    };
    let discussionText;
    if (mapType === 'Crop Suitability' && selectedMunicipality) {
        discussionText = analysesData[selectedMunicipality]?.['Crop Suitability']?.general;
    } else {
        discussionText = analysesData[municipality]?.[mapType]?.[category];
    }
  const handleCategory = (event) => setCategory(event.target.value);

  const [pieChartData, setPieChartData] = useState(null);
  const processMunicipalityData = (properties) => {
    const categories = {
      'Highly Suitable': { count: 0, crops: [] },
      'Moderately Suitable': { count: 0, crops: [] },
      'Marginally Suitable': { count: 0, crops: [] },
      'Recommended Crops': { count: 0, crops: [] }
    };
  
    Object.keys(properties).forEach(key => {
      if (typeof properties[key] === 'number') {
        if (properties[key] === 3.0) {
          categories['Highly Suitable'].count += 1;
          categories['Highly Suitable'].crops.push(key);
        } else if (properties[key] === 2.0) {
          categories['Moderately Suitable'].count += 1;
          categories['Moderately Suitable'].crops.push(key);
        } else if (properties[key] === 1.0) {
          categories['Marginally Suitable'].count += 1;
          categories['Marginally Suitable'].crops.push(key);
        } else if (properties[key] === 4.0) {
          categories['Recommended Crops'].count += 1;
          categories['Recommended Crops'].crops.push(key);
        }
      }
    });
  
    return categories;
  };
  

  const Legend = ({ municipality, mapType, category }) => {
    const selectedLegend = legendData[municipality]?.[mapType]?.[category];

    if (!selectedLegend) {
      return null;
    }

    return (
      <div style={{
        ...legendStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '8px',
        padding: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ccc',
        maxWidth: '300px', 
        maxHeight: '500px',
      }}>
        <h4 style={{ marginTop: '-5px',marginBottom: '2px', fontSize: '16px',alignContent:'start', fontWeight: 'bold', color: '#333' }}>
          {selectedLegend.legendTitle}
        </h4>


        {selectedLegend.legendCategories && (
          <div style={{ marginBottom: '8px', fontSize: '14px', color: '#555' }}>
            {selectedLegend.legendCategories.map((categoryInfo, index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                <strong>{categoryInfo.label}</strong> {categoryInfo.range}
              </div>
            ))}
          </div>
        )}


        {selectedLegend.legendItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: item.color,
                marginRight: '4px',
                borderRadius: '3px',
              }}
            />
            <span style={{ fontSize: '12px', color: '#555' }}>{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  // Styles for legend
  const legendStyle = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '8px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    marginTop: '1px', 
  };

  const propertyKeyMap = {
    'Acidity': 'pH',
    'Calcium': 'Calcium',
    'Iron': 'Iron',
    'Organic Matter': 'Organic_Matter',
    'Available P': 'Phosphorus',
    'Total Nitrogen': 'Nitrogen',
    'Potassium': 'Potassium',
    'Zinc': 'Zinc',
    'Extra SO4': 'Sulphate',
  };

  const displayLocation = municipality === 'Samar' ? 'Province of Samar' : `Municipality of ${municipality}`;
  const textColor = mode === 'dark' ? chartTextColors.dark : chartTextColors.light;
  const chartColors = mode === 'dark' ? tokensDark.primary[400] : tokensLight.primary[400];
  const gridColor = mode === 'dark' ? tokensDark.grey[100] : 'gray'; 

  const prepareChartData = () => {
    const propertyKey = propertyKeyMap[category]; 

    const filteredData = soilgeodata.features
      .filter(feature => 
        (municipality === "Samar" || feature.properties.Municipality === municipality) 
        && feature.properties[propertyKey] != null)
      .map(feature => ({
        "Brgy": feature.properties.Brgy,
        [category]: feature.properties[propertyKey],
        "Municipality": feature.properties.Municipality
      }));

    return filteredData;
  };

  const TextureChartData = () => {
    const filteredData = textureData.features
      .filter(feature =>
        (municipality === "Samar" || feature.properties.Municipality === municipality)
        && (feature.properties['Clay'] != null || feature.properties['Silt'] != null || feature.properties['Sand'] != null))
      .map(feature => ({
        "Brgy": feature.properties.Brgy,
        "Clay": showAllTextures ? feature.properties.Clay : (category === 'Clay' ? feature.properties.Clay : 0),
        "Silt": showAllTextures ? feature.properties.Silt : (category === 'Silt' ? feature.properties.Silt : 0),
        "Sand": showAllTextures ? feature.properties.Sand : (category === 'Sand' ? feature.properties.Sand : 0),
        "Municipality": feature.properties.Municipality,
        "TextClass": feature.properties.TextureClass,
        "LandCondition":feature.properties.LandCondition
      }));
  
    return filteredData;
  };
  

  const titleFormats = {
    'Clay': "Soil Texture Composition (%) in ",
    'Silt': "Soil Texture Composition (%) in ",
    'Sand': "Soil Texture Composition (%) in ",
    'Calcium': "Exchangeable Calcium Distribution in ",
    'Iron': "Exchangeable Iron Distribution in ",
    'Organic Matter': "Organic Matter (%) Distribution in ",
    'Available P': "Available Phosphorus Levels in ",
    'Total Nitrogen': "Total Nitrogen (%) Content in ",
    'Potassium': "Exchangeable Potassium Distribution in ",
    'Acidity': "Soil pH Profile in ", 
    'Zinc': "Exchangeable Zinc Distribution in ",
    'Extra SO4': "Sulfate (SO₄) Concentration in "
  };

  // Data lists
  const MuniList = ['Samar', 'Basey', 'Calbayog', 'Calbiga', 'Gandara', 'Jiabong', 'Matuguinao', 'Paranas', 'San Jorge', 'San Jose De Buan', 'San Sebastian'];
  const propertyList = ['Acidity', 'Iron', 'Organic Matter', 'Available P', 'Total Nitrogen', 'Potassium','Calcium' , 'Zinc', 'Extra SO4'];
  const cropList = ['Ampalaya', 'Banana', 'Corn', 'Cassava', 'Coconut', 'Sitaw', 'Okra','Eggplant', 'Pineapple', 'Upland Rice', 'Ginger', 'Sweet Potato', 'Taro','Pili','Lansones'];

  const dataTypes = {
    'Soil Properties': ['Acidity', 'Iron', 'Organic Matter', 'Available P', 'Total Nitrogen', 'Potassium','Calcium' , 'Zinc', 'Extra SO4'],
    'Crop Suitability': ['Ampalaya', 'Banana', 'Corn', 'Cassava', 'Coconut', 'Sitaw', 'Okra','Eggplant', 'Pineapple', 'Upland Rice', 'Ginger', 'Sweet Potato', 'Taro','Pili','Lansones'],
    'Soil Texture': ['Clay', 'Silt', 'Sand'],
    };

    useEffect(() => {
      let isMounted = true;
  
      const createGeoJsonLayer = () => {
          if (geoJsonLayer) {
            geoJsonLayer.removeFrom(mapRef.current);
            setGeoJsonLayer(null);
          }
        
          if (mapType === 'Crop Suitability' && municipality === 'Samar') {
            const filteredFeatures = geojsonData.features.filter((feature) => {
              const cropValue = feature.properties[category];
              return cropValue !== undefined && cropValue >= 1 && cropValue <= 4;
            });
        
            if (filteredFeatures.length > 0 && filteredFeatures[0]?.geometry?.coordinates) {
              const newGeoJsonLayer = L.geoJSON(filteredFeatures, {
                style: (feature) => {
                  const cropValue = feature.properties[category];
                  let fillColor, fillOpacity;
        
                  if (cropValue === 0) {
                    
                    fillColor = '#D8D8D8';
                    fillOpacity = 0.2;
                  } else if (cropValue >= 1 && cropValue <= 4) {
                    
                    switch (cropValue) {
                      case 1:
                        fillColor = '#4FB4D3';
                        break;
                      case 2:
                        fillColor = '#42AE76';
                        break;
                      case 3:
                        fillColor = '#47C04A';
                        break;
                      case 4:
                        fillColor = '#F4EB3A'; 
                        break;
                      default:
                        fillColor = 'gray'; 
                    }
                    fillOpacity = 0.9;
                  } else {
                    fillColor = 'gray';
                    fillOpacity = 0.4;
                  }
        
                  return {
                      weight: 0.2, 
                      opacity: 1,
                      color: 'black',
                      fillColor: fillColor,
                      fillOpacity: fillOpacity,
                    };
                  },
                  onEachFeature: (feature, layer) => {
                      layer.on('mouseover', () => {
                        layer.setStyle({
                          color: 'blue', 
                          weight: 2,      
                        });
                      });
                          layer.on('mouseout', () => {
                             layer.setStyle(layer.options.originalStyle);
                       });
                  
                      layer.on('mouseout', () => {
                        layer.setStyle({
                          color: 'black', 
                          weight: 0.1,     
                        });
                      });
                      
                  
                      
                      layer.on('click', () => {
                        handlePolygonClick(feature);
                        if (!clickedFeature || (clickedFeature.properties.Municipality !== feature.properties.Municipality)) {
                          const chartData = processMunicipalityData(feature.properties);
                          setPieChartData(chartData);
                          setClickedFeature(feature);
                        }
                        layer.setStyle({
                          opacity: '90',
                        });

                      });
                      const popupContent = `
                      <style>
                          .para{
                              font-weight:bold; 
                          }
                      </style>
                      <div >
                        <h2>${feature.properties.Municipality}</h2>
                        <p><span class="para">Barangay: </span> ${feature.properties.Brgy}</p>
                        <p><span class="para">Topography: </span> ${feature.properties.Topography}</p>
                      </div>
                    `;
      
                     layer.bindPopup(popupContent);
                    },
                    
                    
                  });
  
            newGeoJsonLayer.addTo(mapRef.current);
            setGeoJsonLayer(newGeoJsonLayer);
            mapRef.current.fitBounds(newGeoJsonLayer.getBounds());
          }
        }
      };
      
      createGeoJsonLayer();
  
      return () => {
        if (geoJsonLayer) {
          geoJsonLayer.removeFrom(mapRef.current);
          setGeoJsonLayer(null);
        }
  
        if (mapType === 'Crop Suitability' && isMounted) {
          setImgLayer(null);
        }
      };
    }, [geojsonData, mapType, municipality, category]);

    
    // Effect for fetching map data
    useEffect(() => {
      if (mapType === 'Soil Properties') {
        setMunicipality('Samar'); 
        setCategory(propertyList[0]); 
      }
      else if (mapType === 'Crop Suitability') {
        setMunicipality('Samar'); 
        setCategory(cropList[0]);
      }
      else if (mapType === 'Soil Texture') {
        setMunicipality('Samar'); 
        setCategory(dataTypes[mapType][0]); 
      }
    }, [mapType]);

    useEffect(() => {
      let isMounted = true;

      if (mapType && municipality && category) {
        const apiEndpoint = `http://localhost:5000/api/get/map/${municipality}/${mapType}/${category}`;
        axios
          .get(apiEndpoint, { responseType: 'blob' })
          .then((response) => {
            axios
              .get(`http://localhost:5000/api/get/metadata/${municipality}/${mapType}/${category}`)
              .then((metadataResponse) => {
                const blob = response.data;
                const metadata = metadataResponse.data;
                const latLongArr = metadata.latLong.split(',').map(parseFloat);
                setMuniCoords(latLongArr);
                const boundsArr = metadata.extent.map((extentStr) => extentStr.split(',').map(parseFloat));
                setExtent(boundsArr);

                const legendDataAvailable =
                  legendData[municipality] &&
                  legendData[municipality][mapType] &&
                  legendData[municipality][mapType][category] &&
                  legendData[municipality][mapType][category].legendItems;

                if (isMounted && legendDataAvailable) {
                  const reader = new FileReader();
                  reader.onload = () => setImgLayer(reader.result);
                  reader.readAsDataURL(blob);

                  if (mapRef.current) {
                    mapRef.current.flyTo(latLongArr, 11, { duration: 1.0 });
                  }
                } else if (isMounted) {
                  setImgLayer(null);
                }
              })
              .catch((error) => console.error('Error fetching metadata', error));
          })
          .catch((error) => console.error('Error fetching image data:', error));
      } else if (isMounted) {
        setImgLayer(null);
      }

      return () => {
        isMounted = false;
      };
    }, [mapType, municipality, category,geojsonData]);

  // JSX structure
  return (
      <Box>
        <FlexBetween>
            <MapContainer center={center} zoom={9} ref={mapRef} style={{ zIndex: 100, position: 'relative'}}>

              <LayersControl position="topright" className="custom-layers-control">
                <LayersControl.BaseLayer checked name="Street Map">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Topography">
                  <TileLayer
                    url="https://opentopomap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.opentopomap.org/">OpenTopoMap</a> contributors'
                  />
                </LayersControl.BaseLayer>

                <LayersControl.Overlay name="Municipality Boundary" checked={boundaryVisible}>
                  <ImageOverlay url={Boundary} bounds={boundaryBounds} opacity={1.0}  style={{zIndex:1}}/>
                </LayersControl.Overlay>
                {mapType === 'Soil Properties' && category && municipality && (
                    <LayersControl.Overlay name="Soil Markers" checked={showSoilMarkers}>
                      <LayerGroup>
                        {soilgeodata.features
                          .filter(feature => 
                            (feature.properties["Municipality"] === municipality || feature.properties["Province"] === municipality) && 
                            feature.properties[propertyKeyMap[category]] !== null // Use propertyKeyMap to access the correct property
                          )
                          .map((feature, index) => (
                            <Marker 
                              key={index} 
                              position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]} // Coordinates are [latitude, longitude]
                            >
                              <Popup>
                                {category}: {feature.properties[propertyKeyMap[category]]}
                              </Popup>
                            </Marker>
                          ))
                        }
                      </LayerGroup>
                    </LayersControl.Overlay>
                  )}

                  {mapType === 'Soil Texture' && category && municipality && (
                    <LayersControl.Overlay name="Soil Markers" checked={showSoilMarkers}>
                    <LayerGroup>
                      {textureData.features
                        .filter(feature => 
                          (feature.properties["Municipality"] === municipality || feature.properties["Province"] === municipality) && 
                          feature.properties[category] !== null
                        )
                        .map((feature, index) => (
                          <Marker 
                            key={index} 
                            position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]} // Coordinates are [latitude, longitude]
                          >
                            <Popup>
                              
                              The {category} value in {feature.properties.Brgy} is {feature.properties[category]}
                            </Popup>
                          </Marker>
                        ))
                      }
                    </LayerGroup>
                  </LayersControl.Overlay>
                  
                )}

              </LayersControl>

              {mapType === 'Crop Suitability' && geojsonData.features && (
                <GeoJSON
                  data={geojsonData}
                  onEachFeature={(feature, layer) => {
                  }}
                  style={{fillColor: '#D8D8D8', fillOpacity:0.7, weight: 0.3, opacity: 0.7, color: 'black'}} //line
                />
              )}

              {/* Image Overlay Layer */}
              {imgLayer && <ImageOverlay url={imgLayer} bounds={extent} opacity={opacity} style={{zIndex:99}}/>}
            
              {/* Main Tile Layer */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
                {mapType === 'Crop Suitability' && (
                  <LayersControl.Overlay name="Crop Suitability" checked={true}>
                    <GeoJSON data={geojsonData} style={{ fillColor: '#ffD8D8D8', fillOpacity: 0.4, color: 'black', weight: 0.1 }} />
                  </LayersControl.Overlay>
                )}
              {/* Legend */}
              {mapType && municipality && category && <Legend municipality={municipality} mapType={mapType} category={category} />}

            </MapContainer>

        {/* Sidebar for Controls and Information */}
        <Box height="calc(100vh - 10px)" sx={{ display: 'flex', flexDirection: 'column', px: 2, width: '47%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <h4>Select a Map</h4>
            <FormControl variant='filled' sx={{ m: 1, minWidth: 250 }}>
              <InputLabel id="map-type">Map</InputLabel>
              <Select labelId='map-type' value={mapType} onChange={handleMapType}>
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value='Soil Properties'>Soil Properties</MenuItem>
                <MenuItem value='Crop Suitability'>Crop Suitability</MenuItem>
                <MenuItem value='Soil Texture'>Soil Texture</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
            <InputLabel sx={{ marginRight: '10px' }}>Opacity</InputLabel>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              style={{
                width: '150px',
                cursor: 'pointer',
                appearance: 'none',
                height: '5px',
                borderRadius: '5px',
                background: `linear-gradient(to right, #007BFF 0%, #007BFF ${(opacity * 100)}%, #d3d3d3 ${(opacity * 100)}%, #d3d3d3 100%)`,
              }}
            />
            <span sx={{ marginLeft: '10px' }}>{opacity.toFixed(1)}</span>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h4>Select a Municipality</h4>
              <FormControl variant='filled' sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="municipal">{labelText}</InputLabel>

                <Select labelId='municipal' value={municipality} onChange={handleMunicipality}  disabled={mapType === 'Crop Suitability'}> {/* disable cropsuitability dropdown */}
                  <MenuItem value=""><em>None</em></MenuItem>
                  {MuniList.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'flex-start' }}>
              {municipality && mapType === 'Soil Properties' ? (
                <>
                  <h4>Select a Property</h4>
                  <FormControl variant='filled' sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="categories">Property</InputLabel>
                    <Select labelId='categories' value={category} onChange={handleCategory}>
                      <MenuItem value=""><em>None</em></MenuItem>
                      {propertyList.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : municipality && mapType === 'Crop Suitability' ? (
                <>
                  <h4>Select a Crop</h4>
                  <FormControl variant='filled' sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="categories">Crop</InputLabel>
                    <Select labelId='categories' value={category} onChange={handleCategory}>
                      <MenuItem value=""><em>None</em></MenuItem>
                      {cropList.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : municipality && mapType === 'Soil Texture' ? (
                <>
                  <h4>Select a Soil Texture</h4>
                  <FormControl variant='filled' sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="categories">Soil Texture</InputLabel>
                    <Select labelId='categories' value={category} onChange={handleCategory}>
                      <MenuItem value=""><em>None</em></MenuItem>
                      {dataTypes[mapType].map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              ) : (
                ""
              )}
            </Box>
          </Box>
          {mapType && municipality && category ? <hr style={{ marginTop: '2rem', height: '0.5px', width: '99.9%'}}/> : ""}
          {
            mapType && category && municipality && 
            <>
              <h2>{displayLocation}</h2> 
                {mapType === 'Soil Texture' && (
                  <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShowAllTextures(prev => !prev)}
                  sx={{
                    backgroundColor: 'secondary.main',
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    },
                    py: 1,
                    px: 2,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    boxShadow: 1,
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  {showAllTextures ? "Show Individual Texture" : "Show All Soil Textures"}
                </Button>
                </div>
                )}

              <Box
                sx={{
                  maxHeight: 'calc(100vh - 200px)',
                  overflowY: 'auto',
                  p: 1,
                  borderRadius: '4px',
                  mb: 2,
                }}
              >

              {mapType === 'Soil Texture' &&
                <>
                  {
                    showAllTextures
                    ? <StackedBarComponent
                        data={TextureChartData()}
                        property={category}  
                        colors={chartColors} 
                        textColor={textColor}
                        gridColor={gridColor}
                        isPaginated={municipality === "Samar"} 
                        municipality={municipality}
                        titleFormats={titleFormats}
                      />
                    : <TextureBarChart 
                        data={TextureChartData()}
                        property={category}  
                        colors={chartColors} 
                        textColor={textColor}
                        gridColor={gridColor}
                        isPaginated={municipality === "Samar"} 
                        municipality={municipality}
                        titleFormats={titleFormats}
                      />
                  }
                </>
              }


              {mapType === 'Soil Properties' &&
                <BarChartComponent 
                  data={prepareChartData()}
                  property={category}  
                  colors={chartColors} 
                  textColor={textColor}
                  gridColor={gridColor}
                  isPaginated={municipality === "Samar"} 
                  municipality={municipality}
                  titleFormats={titleFormats}
                  setShowAllTextures={setShowAllTextures}
                  
                />
                
              }

              {mapType === 'Crop Suitability' && pieChartData && (
                <>
                  <h3>Components of Crop Suitability in  {clickedFeature ? clickedFeature.properties.Municipality : 'No municipality selected'}</h3>

                  <PieChartComponent 
                    data={pieChartData}
                    colors={chartColors} 
                    textColor={textColor}
                    municipality={municipality}
                    titleFormats={titleFormats} />
                    
                </>
              )}
                  
                  <h4>Discussion</h4>
                    {discussionText ? (
                      <Typography variant="body2" sx={{ mt: 2 }}>
                          {discussionText}
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                          No discussion available for the selected category/municipality.
                      </Typography>
                    )}

                </Box>  
          
            </>
            
          }

        </Box>
      </FlexBetween>
    </Box>
  );
};

export default Maps;
