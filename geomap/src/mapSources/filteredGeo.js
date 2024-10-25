
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
                  
                  fillColor = '#D8D8D8';
                  fillOpacity = 0.2;
                } else if (cropValue >= 1 && cropValue <= 4) {
                  
                  switch (cropValue) {
                    case 1:
                      fillColor = '#A1D99C'; 
                      break;
                    case 2:
                      fillColor = '#42AB5D'; 
                      break;
                    case 3:
                      fillColor = '#006B27'; 
                      break;
                    case 4:
                      fillColor = '#D9E900'; 
                      break;
                    default:
                      fillColor = 'gray'; 
                  }
                  fillOpacity = 0.9;
                } else {
                  
                  fillColor = 'gray';
                  fillOpacity = 0.2;
                }
      
                return {
                    weight: 0.1, 
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


