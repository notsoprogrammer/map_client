
import { useEffect } from 'react';
import L from 'leaflet';



const useGeoJsonLayer = (setImgLayer, geoJsonLayer, setGeoJsonLayer, mapRef, geojsonData, mapType, municipality, category) => {
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
                  // Value is 0
                  fillColor = '#D8D8D8';
                  fillOpacity = 0.2;
                } else if (cropValue >= 1 && cropValue <= 4) {
                  // Values 1-4
                  switch (cropValue) {
                    case 1:
                      fillColor = '#A1D99C'; // Set your desired fill color for value 1
                      break;
                    case 2:
                      fillColor = '#42AB5D'; // Set your desired fill color for value 2
                      break;
                    case 3:
                      fillColor = '#006B27'; // Set your desired fill color for value 3
                      break;
                    case 4:
                      fillColor = '#D9E900'; // Set your desired fill color for value 4
                      break;
                    default:
                      fillColor = 'gray'; // Default color for unspecified values
                  }
                  fillOpacity = 0.9;
                } else {
                  // Default for unspecified values
                  fillColor = 'gray';
                  fillOpacity = 0.2;
                }
      
                return {
                    weight: 0.1, // Set your desired border weight
                    opacity: 1,
                    color: 'black', // Set your desired border color
                    fillColor: fillColor,
                    fillOpacity: fillOpacity,
                  };
                },
                onEachFeature: (feature, layer) => {
                    // Add event listener for mouseover
                    layer.on('mouseover', () => {
                      layer.setStyle({
                        color: 'blue', // Set your desired hover color
                        weight: 2,      // Set your desired hover weight
                      });
                    });
                        layer.on('mouseout', () => {
                           layer.setStyle(layer.options.originalStyle);
                     });
                
                    // Add event listener for mouseout (reset to original style)
                    layer.on('mouseout', () => {
                      layer.setStyle({
                        color: 'black', // Set your original border color
                        weight: 0.1,     // Set your original border weight
                      });
                    });
                
                    // Your existing click event handling...
                    layer.on('click', () => {
                      setClickedFeature(feature);
                    });
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
  }, [geoJsonLayer, setGeoJsonLayer, mapRef, geojsonData, mapType, municipality, category]);

};



export default useGeoJsonLayer;


