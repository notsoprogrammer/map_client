// processTextureData.js
import textureData from '../mapSources/soilTexture';


const processTextureData = (category, municipality) => {
    const titleFormats = {
        'Clay': "Soil Texture Composition in ",
        'Silt': "Soil Texture Composition in ",
        'Sand': "Soil Texture Composition in ",
        'Calcium': "Exchangeable Iron Distribution in ",
        'Iron': "Exchangeable Iron Distribution in ",
        'Organic Matter': "Organic Matter (%) Distribution in ",
        'Available P': "Available Phosphorus Levels in ",
        'Total Nitrogen': "Total Nitrogen (%) Content in ",
        'Potassium': "Exchangeable Potassium Distribution in ",
        'Acidity': "Soil pH Profile in ", 
        'Zinc': "Exchangeable Zinc Distribution in ",
        'Extra SO4': "Sulfate (SO₄) Concentration in "
      };

    const filteredData = textureData.features
      .filter(feature => feature.properties.Municipality === municipality)
      .map(feature => ({
        Brgy: feature.properties.Brgy, // Name of Barangay
        value: feature.properties[category], // Value of the selected category (Clay, Silt, or Sand)
      })).filter(feature => feature.value != null); // Ensure no null values
  
    return filteredData;
  };

  export default processTextureData;
