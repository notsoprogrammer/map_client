// Legend data (you can replace this with your own legend data structure)
const legendData = {
  'Samar': {
    'Soil Properties': {
      'Organic Matter': {
        legendTitle: 'Organic Matter (%)',        
        legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
        legendItems: [
          { label: '1.283-1.945', color: '#008CCC' },
          { label: '1.946-2.608', color: '#29AE37' },
          { label: '2.609-3.271', color: '#DAD409' },
          { label: '3.272-3.851', color: '#F39006' },
          { label: '3.852', color: '#F34242' },
        ],
      },
      'Total Nitrogen': {
        legendTitle: 'Total Nitrogen (%)',
        legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
        legendItems: [
          { label: '0.129-0.188', color: '#008CCC' },
          { label: '0.189-0.247', color: '#29AE37' },
          { label: '0.248-0.307', color: '#DAD409' },
          { label: '0.308-0.359', color: '#F39006' },
          { label: '0.360', color: '#F34242' },
          
        ],
      },
      'Potassium': {
        legendTitle: 'Exchangeable Potassium',
        legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
        legendItems: [
          { label: '42.9-93.0', color: '#008CCC' },
          { label: '93.1-143.1', color: '#29AE37' },
          { label: '143.2-193.3', color: '#DAD409' },
          { label: '193.4-237.2', color: '#F39006' },
          { label: '237.3', color: '#F34242' },
          
        ],
      },
      'Calcium': {
        legendTitle: 'Exchangeable Calcium',
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
        legendItems: [
          { label: '584.7-2254.1', color: '#008CCC' },
          { label: '2254.2-3923.7', color: '#29AE37' },
          { label: '3923.8-5593.3', color: '#DAD409' },
          { label: '5593.4-7054.2', color: '#F39006' },
          { label: '7054.3', color: '#F34242' },
          
        ],
      },
      'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
        legendItems: [
          { label: '4.4-67.3', color: '#008CCC' },
          { label: '67.4-130.2', color: '#29AE37' },
          { label: '130.3-193.2', color: '#DAD409' },
          { label: '193.3-248.2', color: '#F39006' },
          { label: '248.3', color: '#F34242' },
          
        ],
      },
      'Zinc': {
        legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
        legendItems: [
          { label: '0.20-0.83', color: '#008CCC' },
          { label: '0.84-1.47', color: '#29AE37' },
          { label: '1.48-2.11', color: '#DAD409' },
          { label: '2.12-2.68', color: '#F39006' },
          { label: '2.69', color: '#F34242' },
          
        ],
      },
      'Extra SO4': {
        legendTitle: 'Sulphate Content',
        legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
        legendItems: [
          { label: '15.5-39.1', color: '#008CCC' },
          { label: '39.2-62.8', color: '#29AE37' },
          { label: '62.9-86.4', color: '#DAD409' },
          { label: '86.5-107.2', color: '#F39006' },
          { label: '107.3', color: '#F34242' },
          
        ],
      },
      'Acidity': {
        legendTitle: 'pH Content',
        legendCategories: [
          { label: 'High', range: '5.5-7.5' },
          { label: 'Moderate', range: '5.0-5.5' },
          { label: 'Low', range: '< 5.0 & > 8' },
        ],
        legendItems: [
          { label: '4.5-5.2', color: '#008CCC' },
          { label: '5.3-6.0', color: '#29AE37' },
          { label: '6.1-6.8', color: '#DAD409' },
          { label: '6.9-7.4', color: '#F39006' },
          { label: '7.5', color: '#F34242' },
          
        ],
      },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
        legendItems: [
          { label: '0.9-8.3', color: '#008CCC' },
          { label: '8.4-15.8', color: '#29AE37' },
          { label: '15.9-23.3', color: '#DAD409' },
          { label: '23.4-29.9', color: '#F39006' },
          { label: '30.0', color: '#F34242' },
        ],
      },
      // Add legends for other crops in Samar...
    },
    'Soil Texture': {
        'Clay': {
        legendTitle: 'Clay',
        legendItems: [
          { label: '7.140-17.038', color: '#FFF491' },
          { label: '17.039-26.319', color: '#BF6D0E' },
          { label: '26.320', color: '#482000' },

        ],
      },  
      'Sand': {
        legendTitle: 'Sand',
        legendItems: [
          { label: '35-52.547', color: '#FFE6C3' },
          { label: '52.548-68.99', color: '#EDDC30' },
          { label: '69.00', color: '#712700' },
        ],
      },
      'Silt': {
        legendTitle: 'Silt',
        legendItems: [
          { label: '15.56-37.01', color: '#8A4C00' },
          { label: '37.02-57.13', color: '#F9EB00' },
          { label: '57.14', color: '#595959' },
        ],
      },  
    },
    'Crop Suitability': {
      'Ampalaya': {
        legendTitle: 'Ampalaya Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Banana': {
        legendTitle: 'Banana Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Corn': {
        legendTitle: 'Corn Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Cassava': {
        legendTitle: 'Cassava Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Sitaw': {
        legendTitle: 'Sitaw Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Okra': {
        legendTitle: 'Okra Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Eggplant': {
        legendTitle: 'Eggplant Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Pineapple': {
        legendTitle: 'Pineapple Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'UplandRice': {
        legendTitle: 'UplandRice Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Ginger': {
        legendTitle: 'Ginger Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'SweetPotato': {
        legendTitle: 'SweetPotato Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Taro': {
        legendTitle: 'Taro Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Pili': {
        legendTitle: 'Pili Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },
      'Lansones': {
        legendTitle: 'Lansones Level of Suitability',
        legendItems: [
          { label: 'No Data', color: '#D9D9D9' },
          { label: 'Marginally Suitable', color: '#4FB4D3' },
          { label: 'Moderately Suitable', color: '#42AE76' },
          { label: 'Highly Suitable', color: '#47C04A' },
          { label: 'Recommended Crop', color: '#F4EB3A' },
        ],
      },

      // Add legends for other crops in Samar...
    },
  },
  
  'Calbiga': {
    'Soil Properties': {
      'Organic Matter': {
        legendTitle: 'Organic Matter (%)',        
        legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
        legendItems: [
          { label: '1.567-1.936', color: '#008CCC' },
          { label: '1.937-2.306', color: '#29AE37' },
          { label: '2.307-2.675', color: '#DAD409' },
          { label: '2.676-2.999', color: '#F39006' },
          { label: '3.000', color: '#F34242' },
        ],
      },
      'Total Nitrogen': {
        legendTitle: 'Total Nitrogen (%)',
        legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
        legendItems: [
          { label: '0.158-0.180', color: '#008CCC' },
          { label: '0.181-0.203', color: '#29AE37' },
          { label: '0.204-0.226', color: '#DAD409' },
          { label: '0.227-0.246', color: '#F39006' },
          { label: '0.247', color: '#F34242' },
        ],
      },
      'Potassium': {
        legendTitle: 'Exchangeable Potassium',
        legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
        legendItems: [
          { label: '73.563-96.551', color: '#008CCC' },
          { label: '96.552-119.539', color: '#29AE37' },
          { label: '119.540-142.528', color: '#DAD409' },
          { label: '142.529-162.643', color: '#F39006' },
          { label: '162.644', color: '#F34242' },
        ],
      },
      'Calcium': {
        legendTitle: 'Exchangeable Calcium',
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
        legendItems: [
          { label: '1303.7-2433.4', color: '#008CCC' },
          { label: '2433.5-3563.2', color: '#29AE37' },
          { label: '3563.3-4693.1', color: '#DAD409' },
          { label: '4693.2-5681.6', color: '#F39006' },
          { label: '5681.7', color: '#F34242' },
        ],
      },
      'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
        legendItems: [
          { label: '23.7-50.6', color: '#008CCC' },
          { label: '50.7-77.6', color: '#29AE37' },
          { label: '77.7-104.6', color: '#DAD409' },
          { label: '104.7-128.2', color: '#F39006' },
          { label: '128.3', color: '#F34242' },
        ],
      },
      'Zinc': {
        legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
        legendItems: [
          { label: '0.46-0.99', color: '#008CCC' },
          { label: '1.00-1.53', color: '#29AE37' },
          { label: '1.54-2.08', color: '#DAD409' },
          { label: '2.09-2.55', color: '#F39006' },
          { label: '2.56', color: '#F34242' },
        ],
      },
      'Extra SO4': {
        legendTitle: 'Sulphate Content',
        legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
        legendItems: [
          { label: '16.9-26.4', color: '#008CCC' },
          { label: '26.5-36.1', color: '#29AE37' },
          { label: '36.2-45.7', color: '#DAD409' },
          { label: '45.8-54.2', color: '#F39006' },
          { label: '54.3', color: '#F34242' },
        ],
      },
      'Acidity': {
        legendTitle: 'pH Content',
        legendCategories: [
          { label: 'High', range: '5.5-7.5' },
          { label: 'Moderate', range: '5.0-5.5' },
          { label: 'Low', range: '< 5.0 & > 8' },
        ],
        legendItems: [
          { label: '5.2-5.6', color: '#008CCC' },
          { label: '5.7-6.1', color: '#29AE37' },
          { label: '6.2-6.7', color: '#DAD409' },
          { label: '6.8-7.1', color: '#F39006' },
          { label: '7.2', color: '#F34242' },
        ],
      },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
        legendItems: [
          { label: '1.3-4.8', color: '#008CCC' },
          { label: '4.9-8.4', color: '#29AE37' },
          { label: '8.5-11.9', color: '#DAD409' },
          { label: '12.0-15.0', color: '#F39006' },
          { label: '15.1', color: '#F34242' },
        ],
      },
      // Add legends for other crops in Samar...
    },
    'Soil Texture': {
        'Clay': {
        legendTitle: 'Clay',
        legendItems: [
          { label: '11.0-16.7', color: '#FFF491' },
          { label: '16.8-22.2', color: '#BF6D0E' },
          { label: '22.3', color: '#F34242' },

        ],
      },  
      'Sand': {
        legendTitle: 'Sand',
        legendItems: [
          { label: '52.3-60.8', color: '#FFE6C3' },
          { label: '60.9-68.9', color: '#EDDC30' },
          { label: '69.0', color: '#712700' },
        ],
      },
      'Silt': {
        legendTitle: 'Silt',
        legendItems: [
          { label: '20.0-23.9', color: '#8A4C00' },
          { label: '24.0-27.6', color: '#F9EB00' },
          { label: '27.7', color: '#595959' },
        ],
      },  
    },
    'Crop Suitability': {
      'Pineapple': {
        legendTitle: 'Abaca Level of Suitability',
        legendItems: [
          { label: 'Low', color: '#FF0000' },
          { label: 'Medium', color: '#FFFF00' },
          { label: 'High', color: '#00FF00' },
        ],
      },
      // Add legends for other crops in Samar...
    },
  },

  'Basey': {
    'Soil Properties': {
      'Organic Matter': {
        legendTitle: 'Organic Matter (%)',        
        legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
        legendItems: [
          { label: '2.182-2.528', color: '#008CCC' },
          { label: '2.529-2.875', color: '#29AE37' },
          { label: '2.876-3.222', color: '#DAD409' },
          { label: '3.223-3.526', color: '#F39006' },
          { label: '3.527', color: '#F34242' },          
        ],
      },
      'Total Nitrogen': {
        legendTitle: 'Total Nitrogen (%)',
        legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
        legendItems: [
          { label: '0.198-0.220', color: '#008CCC' },
          { label: '0.221-0.243', color: '#29AE37' },
          { label: '0.244-0.266', color: '#DAD409' },
          { label: '0.267-0.286', color: '#F39006' },
          { label: '0.287', color: '#F34242' },          
        ],
      },
      'Potassium': {
        legendTitle: 'Exchangeable Potassium',
        legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
        legendItems: [
          { label: '62.8-73.4', color: '#008CCC' },
          { label: '73.5-84.2', color: '#29AE37' },
          { label: '84.3-94.9', color: '#DAD409' },
          { label: '95.0-104.3', color: '#F39006' },
          { label: '104.4', color: '#F34242' },          
        ],
      },
      'Calcium': {
        legendTitle: 'Exchangeable Calcium',
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
        legendItems: [
          { label: '1346.0-1900.5', color: '#008CCC' },
          { label: '1900.6-2455.1', color: '#29AE37' },
          { label: '2455.2-3009.8', color: '#DAD409' },
          { label: '3009.9-3495.0', color: '#F39006' },
          { label: '3495.1', color: '#F34242' },                   
        ],
      },
      'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
        legendItems: [
          { label: '85.6-127.5', color: '#008CCC' },
          { label: '127.6-169.5', color: '#29AE37' },
          { label: '169.6-211.5', color: '#DAD409' },
          { label: '211.6-248.2', color: '#F39006' },
          { label: '248.3', color: '#F34242' },                   
        ],
      },
      'Zinc': {
        legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
        legendItems: [
          { label: '1.06-1.47', color: '#008CCC' },
          { label: '1.48-1.89', color: '#29AE37' },
          { label: '1.90-2.31', color: '#DAD409' },
          { label: '2.32-2.68', color: '#F39006' },
          { label: '2.69', color: '#F34242' },                 
        ],
      },
      'Extra SO4': {
        legendTitle: 'Sulphate Content',
        legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
        legendItems: [
          { label: '32.5-51.7', color: '#008CCC' },
          { label: '51.8-71.0', color: '#29AE37' },
          { label: '71.1-90.3', color: '#DAD409' },
          { label: '90.4-107.2', color: '#F39006' },
          { label: '107.3', color: '#F34242' },                  
        ],
      },
      'Acidity': {
        legendTitle: 'pH Content',
        legendCategories: [
          { label: 'High', range: '5.5-7.5' },
          { label: 'Moderate', range: '5.0-5.5' },
          { label: 'Low', range: '< 5.0 & > 8' },
        ],
        legendItems: [
          { label: '4.6-4.9', color: '#008CCC' },
          { label: '5.0-5.2', color: '#29AE37' },
          { label: '5.3-5.6', color: '#DAD409' },
          { label: '5.7-5.9', color: '#F39006' },
          { label: '6.0', color: '#F34242' },          
        ],
      },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
        legendItems: [
          { label: '1.0-8.3', color: '#008CCC' },
          { label: '8.4-15.8', color: '#29AE37' },
          { label: '15.9-23.3', color: '#DAD409' },
          { label: '23.4-29.9', color: '#F39006' },
          { label: '30.0', color: '#F34242' },          
        ],
      },
      // Add legends for other crops in Samar...
    },
    'Soil Texture': {
        'Clay': {
        legendTitle: 'Clay',
        legendItems: [
          { label: '17.2-18.5', color: '#FFF491' },
          { label: '18.6-19.8', color: '#BF6D0E' },
          { label: '19.9', color: '#F34242' },          

        ],
      },  
      'Sand': {
        legendTitle: 'Sand',
        legendItems: [
          { label: '55.9-56.5', color: '#FFE6C3' },
          { label: '56.6-57.3', color: '#EDDC30' },
          { label: '57.4', color: '#712700' },          
        ],
      },
      'Silt': {
        legendTitle: 'Silt',
        legendItems: [
          { label: '25.7-26.6', color: '#8A4C00' },
          { label: '26.7-27.5', color: '#F9EB00' },
          { label: '27.6', color: '#595959' },          
        ],
      },  
    },
    'Crop Suitability': {
      'Abaca': {
        legendTitle: 'Abaca Level of Suitability',
        legendItems: [
          { label: 'Low', color: '#FF0000' },
          { label: 'Medium', color: '#FFFF00' },
          { label: 'High', color: '#00FF00' },
        ],
      },
      // Add legends for other crops in Samar...
    },
  },

  'Calbayog': {
      'Soil Properties': {
        'Organic Matter': {
          legendTitle: 'Organic Matter (%)',        
          legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
          legendItems: [
            { label: '1.283-1.698', color: '#008CCC' },
            { label: '1.699-2.115', color: '#29AE37' },
            { label: '2.116-2.531', color: '#DAD409' },
            { label: '2.532-2.896', color: '#F39006' },
            { label: '2.897', color: '#F34242' },            
          ],
        },
        'Total Nitrogen': {
          legendTitle: 'Total Nitrogen (%)',
          legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
          legendItems: [
            { label: '0.129-0.147', color: '#008CCC' },
            { label: '0.148-0.166', color: '#29AE37' },
            { label: '0.167-0.185', color: '#DAD409' },
            { label: '0.186-0.202', color: '#F39006' },
            { label: '0.203', color: '#F34242' },            
          ],
        },
        'Potassium': {
          legendTitle: 'Exchangeable Potassium',
          legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
          legendItems: [
            { label: '74.8-101.8', color: '#008CCC' },
            { label: '101.9-129.0', color: '#29AE37' },
            { label: '129.1-156.1', color: '#DAD409' },
            { label: '156.2-179.8', color: '#F39006' },
            { label: '179.9', color: '#F34242' },            
          ],
        },
        'Calcium': {
          legendTitle: 'Exchangeable Calcium',
          legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
          legendItems: [
            { label: '1312.3-1671.8', color: '#008CCC' },
            { label: '1671.9-2031.4', color: '#29AE37' },
            { label: '2031.5-2391.1', color: '#DAD409' },
            { label: '2391.2-2705.7', color: '#F39006' },
            { label: '2705.8', color: '#F34242' },            
          ],
        },
        'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
          legendItems: [
            { label: '62.4-101.7', color: '#008CCC' },
            { label: '101.8-141.1', color: '#29AE37' },
            { label: '141.2-180.5', color: '#DAD409' },
            { label: '180.6-215.0', color: '#F39006' },
            { label: '215.1', color: '#F34242' },            
          ],
        },
        'Zinc': {
legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
          legendItems: [
            { label: '0.60-1.06', color: '#008CCC' },
            { label: '1.07-1.54', color: '#29AE37' },
            { label: '1.55-2.01', color: '#DAD409' },
            { label: '2.02-2.42', color: '#F39006' },
            { label: '2.43', color: '#F34242' },            
          ],
        },
        'Extra SO4': {
          legendTitle: 'Sulphate Content',
          legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
          legendItems: [
            { label: '23.5-32.2', color: '#008CCC' },
            { label: '32.3-41.0', color: '#29AE37' },
            { label: '41.1-49.8', color: '#DAD409' },
            { label: '49.9-57.5', color: '#F39006' },
            { label: '57.6', color: '#F34242' },            
          ],
        },
        'Acidity': {
          legendTitle: 'Acidity (pH)',
          legendCategories: [
            { label: 'High', range: '5.5-7.5' },
            { label: 'Moderate', range: '5.0-5.5' },
            { label: 'Low', range: '< 5.0 & > 8' },
          ],
          legendItems: [
            { label: '5.5-5.7', color: '#008CCC' },
            { label: '5.8-6.0', color: '#29AE37' },
            { label: '6.1-6.3', color: '#DAD409' },
            { label: '6.4-6.6', color: '#F39006' },
            { label: '6.7', color: '#F34242' },            
          ],
        },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
          legendItems: [
            { label: '3.5-7.5', color: '#008CCC' },
            { label: '7.6-11.7', color: '#29AE37' },
            { label: '11.8-15.9', color: '#DAD409' },
            { label: '16.0-19.5', color: '#F39006' },
            { label: '19.6', color: '#F34242' },            
          ],
        },
        // Add legends for other crops in Samar...
      },
      'Soil Texture': {
          'Clay': {
          legendTitle: 'Clay',
          legendItems: [
            { label: '13.7-14.6', color: '#FFF491' },
            { label: '14.7-15.5', color: '#BF6D0E' },
            { label: '15.6', color: '#F34242' },            
          ],
        },  
        'Sand': {
          legendTitle: 'Sand',
          legendItems: [
            { label: '44.7-51.6', color: '#FFE6C3' },
            { label: '51.7-58.2', color: '#EDDC30' },
            { label: '58.3', color: '#712700' },            


          ],
        },
        'Silt': {
          legendTitle: 'Silt',
          legendItems: [
            { label: '26.1-34.0', color: '#8A4C00' },
            { label: '34.1-41.5', color: '#F9EB00' },
            { label: '41.6', color: '#595959' },            
          ],
        },  
      },
      'Crop Suitability': {
        'Abaca': {
          legendTitle: 'Abaca Level of Suitability',
          legendItems: [
            { label: 'Low', color: '#FF0000' },
            { label: 'Medium', color: '#FFFF00' },
            { label: 'High', color: '#00FF00' },
          ],
        },
        // Add legends for other crops in Samar...
      },
  },

  'Gandara': {
    'Soil Properties': {
      'Organic Matter': {
        legendTitle: 'Organic Matter (%)',        
        legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
        legendItems: [
          { label: '1.592-2.146', color: '#008CCC' },
          { label: '2.147-2.702', color: '#29AE37' },
          { label: '2.703-3.257', color: '#DAD409' },
          { label: '3.258-3.743', color: '#F39006' },
          { label: '3.744', color: '#F34242' },          
        ],
      },
      'Total Nitrogen': {
        legendTitle: 'Total Nitrogen (%)',
        legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
        legendItems: [
          { label: '0.131-0.189', color: '#008CCC' },
          { label: '0.190-0.248', color: '#29AE37' },
          { label: '0.249-0.307', color: '#DAD409' },
          { label: '0.308-0.359', color: '#F39006' },
          { label: '0.360', color: '#F34242' },          
        ],
      },
      'Potassium': {
        legendTitle: 'Exchangeable Potassium',
        legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
        legendItems: [
          { label: '52.6-66.8', color: '#008CCC' },
          { label: '66.9-81.0', color: '#29AE37' },
          { label: '81.1-95.2', color: '#DAD409' },
          { label: '95.3-107.7', color: '#F39006' },
          { label: '107.8', color: '#F34242' },          
        ],
      },
      'Calcium': {
        legendTitle: 'Exchangeable Calcium',
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
        legendItems: [
          { label: '1044.4-1792.3', color: '#008CCC' },
          { label: '1792.4-2540.4', color: '#29AE37' },
          { label: '2540.5-3288.4', color: '#DAD409' },
          { label: '3288.5-3942.9', color: '#F39006' },
          { label: '3943.0', color: '#F34242' },          
        ],
      },
      'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
        legendItems: [
          { label: '38.7-81.3', color: '#008CCC' },
          { label: '81.4-124.0', color: '#29AE37' },
          { label: '124.1-166.7', color: '#DAD409' },
          { label: '166.8-204.1', color: '#F39006' },
          { label: '204.2', color: '#F34242' },          
        ],
      },
      'Zinc': {
        legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
        legendItems: [
          { label: '0.47-0.93', color: '#008CCC' },
          { label: '0.94-1.39', color: '#29AE37' },
          { label: '1.40-1.86', color: '#DAD409' },
          { label: '1.87-2.26', color: '#F39006' },
          { label: '2.27', color: '#F34242' },          
        ],
      },
      'Extra SO4': {
        legendTitle: 'Sulphate Content',
        legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
        legendItems: [
          { label: '18.3-35.1', color: '#008CCC' },
          { label: '35.2-52.1', color: '#29AE37' },
          { label: '52.2-69.1', color: '#DAD409' },
          { label: '69.2-83.9', color: '#F39006' },
          { label: '84.0', color: '#F34242' },          
        ],
      },
      'Acidity': {
        legendTitle: 'pH Content',
        legendCategories: [
          { label: 'High', range: '5.5-7.5' },
          { label: 'Moderate', range: '5.0-5.5' },
          { label: 'Low', range: '< 5.0 & > 8' },
        ],
        legendItems: [
          { label: '5.4-5.7', color: '#008CCC' },
          { label: '5.8-6.2', color: '#29AE37' },
          { label: '6.3-6.6', color: '#DAD409' },
          { label: '6.7-7.0', color: '#F39006' },
          { label: '7.1', color: '#F34242' },          
        ],
      },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
        legendItems: [
          { label: '2.7-5.2', color: '#008CCC' },
          { label: '5.3-7.7', color: '#29AE37' },
          { label: '7.8-10.2', color: '#DAD409' },
          { label: '10.3-12.4', color: '#F39006' },
          { label: '12.5', color: '#F34242' },          
        ],
      },
      // Add legends for other crops in Samar...
    },
    'Soil Texture': {
        'Clay': {
        legendTitle: 'Clay',
        legendItems: [
          { label: '7.1-15.0', color: '#FFF491' },
          { label: '15.1-22.4', color: '#BF6D0E' },
          { label: '22.5', color: '#F34242' },          

        ],
      },  
      'Sand': {
        legendTitle: 'Sand',
        legendItems: [
          { label: '35.0-50.8', color: '#FFE6C3' },
          { label: '50.9-65.6', color: '#EDDC30' },
          { label: '65.7', color: '#712700' },          
        ],
      },
      'Silt': {
        legendTitle: 'Silt',
        legendItems: [
          { label: '18.9-38.5', color: '#8A4C00' },
          { label: '38.6-57.0', color: '#F9EB00' },
          { label: '57.1', color: '#595959' },          
        ],
      },  
    },
    'Crop Suitability': {
      'Abaca': {
        legendTitle: 'Abaca Level of Suitability',
        legendItems: [
          { label: 'Low', color: '#FF0000' },
          { label: 'Medium', color: '#FFFF00' },
          { label: 'High', color: '#00FF00' },
        ],
      },
      // Add legends for other crops in Samar...
    },
  },

  'Jiabong': {
    'Soil Properties': {
      'Organic Matter': {
        legendTitle: 'Organic Matter (%)',        
        legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
        legendItems: [
          { label: '1.618-2.194', color: '#008CCC' },
          { label: '2.195-2.770', color: '#29AE37' },
          { label: '2.771-3.347', color: '#DAD409' },
          { label: '3.348-3.851', color: '#F39006' },
          { label: '3.852', color: '#F34242' },          
        ],
      },
      'Total Nitrogen': {
        legendTitle: 'Total Nitrogen (%)',
        legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
        legendItems: [
          { label: '0.132-0.164', color: '#008CCC' },
          { label: '0.165-0.197', color: '#29AE37' },
          { label: '0.198-0.229', color: '#DAD409' },
          { label: '0.230-0.258', color: '#F39006' },
          { label: '0.259', color: '#F34242' },          
        ],
      },
      'Potassium': {
        legendTitle: 'Exchangeable Potassium',
        legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
        legendItems: [
          { label: '62.6-69.6', color: '#008CCC' },
          { label: '69.7-76.7', color: '#29AE37' },
          { label: '76.8-83.8', color: '#DAD409' },
          { label: '83.9-90.0', color: '#F39006' },
          { label: '90.1', color: '#F34242' },          
        ],
      },
      'Calcium': {
        legendTitle: 'Exchangeable Calcium',
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
        legendItems: [
          { label: '2127.7-3009.5', color: '#008CCC' },
          { label: '3009.6-3891.4', color: '#29AE37' },
          { label: '3891.5-4773.3', color: '#DAD409' },
          { label: '4773.4-5544.9', color: '#F39006' },
          { label: '5545.0', color: '#F34242' },          
        ],
      },
      'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
        legendItems: [
          { label: '38.5-46.5', color: '#008CCC' },
          { label: '46.6-54.5', color: '#29AE37' },
          { label: '54.6-62.5', color: '#DAD409' },
          { label: '62.6-69.5', color: '#F39006' },
          { label: '69.6', color: '#F34242' },          
        ],
      },
      'Zinc': {
        legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
        legendItems: [
          { label: '0.54-0.57', color: '#008CCC' },
          { label: '0.58-0.61', color: '#29AE37' },
          { label: '0.62-0.64', color: '#DAD409' },
          { label: '0.65-0.67', color: '#F39006' },
          { label: '0.68', color: '#F34242' },          
        ],
      },
      'Extra SO4': {
        legendTitle: 'Sulphate Content',
        legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
        legendItems: [
          { label: '22.1-38.3', color: '#008CCC' },
          { label: '38.4-54.5', color: '#29AE37' },
          { label: '54.6-70.7', color: '#DAD409' },
          { label: '70.8-84.9', color: '#F39006' },
          { label: '85.0', color: '#F34242' },          
        ],
      },
      'Acidity': {
        legendTitle: 'pH Content',
        legendCategories: [
          { label: 'High', range: '5.5-7.5' },
          { label: 'Moderate', range: '5.0-5.5' },
          { label: 'Low', range: '< 5.0 & > 8' },
        ],
        legendItems: [
          { label: '5.7-6.0', color: '#008CCC' },
          { label: '6.1-6.5', color: '#29AE37' },
          { label: '6.6-7.0', color: '#DAD409' },
          { label: '7.1-7.4', color: '#F39006' },
          { label: '7.5', color: '#F34242' },          
        ],
      },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
        legendItems: [
          { label: '2.7-5.2', color: '#008CCC' },
          { label: '5.3-7.7', color: '#29AE37' },
          { label: '7.8-10.2', color: '#DAD409' },
          { label: '10.3-12.4', color: '#F39006' },
          { label: '12.5', color: '#F34242' },          
        ],
      },
      // Add legends for other crops in Samar...
    },
    'Soil Texture': {
        'Clay': {
        legendTitle: 'Clay',
        legendItems: [
          { label: '15.8-17.9', color: '#FFF491' },
          { label: '18.0-20.0', color: '#BF6D0E' },
          { label: '20.1', color: '#F34242' },          

        ],
      },  
      'Sand': {
        legendTitle: 'Sand',
        legendItems: [
          { label: '49.5-55.2', color: '#FFE6C3' },
          { label: '55.3-60.7', color: '#EDDC30' },
          { label: '60.8', color: '#712700' },          
        ],
      },
      'Silt': {
        legendTitle: 'Silt',
        legendItems: [
          { label: '23.4-28.1', color: '#8A4C00' },
          { label: '28.2-32.6', color: '#F9EB00' },
          { label: '32.7', color: '#595959' },          
        ],
      },  
    },
    'Crop Suitability': {
      'Abaca': {
        legendTitle: 'Abaca Level of Suitability',
        legendItems: [
          { label: 'Low', color: '#FF0000' },
          { label: 'Medium', color: '#FFFF00' },
          { label: 'High', color: '#00FF00' },
        ],
      },
      // Add legends for other crops in Samar...
    },
  },

  'Matuguinao': {
    'Soil Properties': {
      'Organic Matter': {
        legendTitle: 'Organic Matter (%)',        
        legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
        legendItems: [
          { label: '1.409-1.534', color: '#008CCC' },
          { label: '1.535-1.660', color: '#29AE37' },
          { label: '1.661-1.786', color: '#DAD409' },
          { label: '1.787-1.897', color: '#F39006' },
          { label: '1.898', color: '#F34242' },          
        ],
      },
      'Total Nitrogen': {
        legendTitle: 'Total Nitrogen (%)',
        legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
        legendItems: [
          { label: '0.153-0.161', color: '#008CCC' },
          { label: '0.162-0.170', color: '#29AE37' },
          { label: '0.171-0.180', color: '#DAD409' },
          { label: '0.181-0.188', color: '#F39006' },
          { label: '0.189', color: '#F34242' },          
        ],
      },
      'Potassium': {
        legendTitle: 'Exchangeable Potassium',
        legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
        legendItems: [
          { label: '64.1-75.1', color: '#008CCC' },
          { label: '75.2-86.2', color: '#29AE37' },
          { label: '86.3-97.3', color: '#DAD409' },
          { label: '97.4-107.0', color: '#F39006' },
          { label: '107.1', color: '#F34242' },          
        ],
      },
      'Calcium': {
        legendTitle: 'Exchangeable Calcium',
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
        legendItems: [
          { label: '2156.0-3420.0', color: '#008CCC' },
          { label: '3420.1-4684.1', color: '#29AE37' },
          { label: '4684.2-5948.2', color: '#DAD409' },
          { label: '5948.3-7054.2', color: '#F39006' },
          { label: '7054.3', color: '#F34242' },          
        ],
      },
      'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
        legendItems: [
          { label: '15.4-30.0', color: '#008CCC' },
          { label: '30.1-44.7', color: '#29AE37' },
          { label: '44.8-59.4', color: '#DAD409' },
          { label: '59.5-72.3', color: '#F39006' },
          { label: '72.4', color: '#F34242' },          
        ],
      },
      'Zinc': {
        legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
        legendItems: [
          { label: '0.21-0.34', color: '#008CCC' },
          { label: '0.35-0.49', color: '#29AE37' },
          { label: '0.50-0.63', color: '#DAD409' },
          { label: '0.64-0.76', color: '#F39006' },
          { label: '0.77', color: '#F34242' },          
        ],
      },
      'Extra SO4': {
        legendTitle: 'Sulphate Content',
        legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
        legendItems: [
          { label: '18.4-19.9', color: '#008CCC' },
          { label: '20.0-21.5', color: '#29AE37' },
          { label: '21.6-23.1', color: '#DAD409' },
          { label: '23.2-24.6', color: '#F39006' },
          { label: '24.7', color: '#F34242' },          
        ],
      },
      'Acidity': {
        legendTitle: 'pH Content',
        legendCategories: [
          { label: 'High', range: '5.5-7.5' },
          { label: 'Moderate', range: '5.0-5.5' },
          { label: 'Low', range: '< 5.0 & > 8' },
        ],
        legendItems: [
          { label: '4.8-5.0', color: '#008CCC' },
          { label: '5.1-5.3', color: '#29AE37' },
          { label: '5.4-5.6', color: '#DAD409' },
          { label: '5.7-5.8', color: '#F39006' },
          { label: '5.9', color: '#F34242' },          
        ],
      },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
        legendItems: [
          { label: '1.3-4.2', color: '#008CCC' },
          { label: '4.3-7.3', color: '#29AE37' },
          { label: '7.4-10.3', color: '#DAD409' },
          { label: '10.4-12.9', color: '#F39006' },
          { label: '13.0', color: '#F34242' },          
        ],
      },
      // Add legends for other crops in Samar...
    },
    'Soil Texture': {
        'Clay': {
        legendTitle: 'Clay',
        legendItems: [
          { label: '14.6-15.9', color: '#FFF491' },
          { label: '16.0-17.1', color: '#BF6D0E' },
          { label: '17.2', color: '#F34242' },          

        ],
      },  
      'Sand': {
        legendTitle: 'Sand',
        legendItems: [
          { label: '56.3-59.2', color: '#FFE6C3' },
          { label: '59.3-62.0', color: '#EDDC30' },
          { label: '62.1', color: '#712700' },          
        ],
      },
      'Silt': {
        legendTitle: 'Silt',
        legendItems: [
          { label: '20.7-24.8', color: '#8A4C00' },
          { label: '24.9-28.7', color: '#F9EB00' },
          { label: '28.8', color: '#595959' },          
        ],
      },  
    },
    'Crop Suitability': {
      'Abaca': {
        legendTitle: 'Abaca Level of Suitability',
        legendItems: [
          { label: 'Low', color: '#FF0000' },
          { label: 'Medium', color: '#FFFF00' },
          { label: 'High', color: '#00FF00' },
        ],
      },
      // Add legends for other crops in Samar...
    },
  },

  'Paranas': {
      'Soil Properties': {
        'Organic Matter': {
          legendTitle: 'Organic Matter (%)',        
          legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
          legendItems: [
            { label: '1.536-1.808', color: '#008CCC' },
            { label: '1.809-2.081', color: '#29AE37' },
            { label: '2.082-2.353', color: '#DAD409' },
            { label: '2.354-2.592', color: '#F39006' },
            { label: '2.593', color: '#F34242' },            
          ],
        },
        'Total Nitrogen': {
          legendTitle: 'Total Nitrogen (%)',
          legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
          legendItems: [
            { label: '0.143-0.157', color: '#008CCC' },
            { label: '0.158-0.171', color: '#29AE37' },
            { label: '0.172-0.186', color: '#DAD409' },
            { label: '0.187-0.199', color: '#F39006' },
            { label: '0.200', color: '#F34242' },            
          ],
        },
        'Potassium': {
          legendTitle: 'Exchangeable Potassium',
          legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
          legendItems: [
            { label: '42.9-92.1', color: '#008CCC' },
            { label: '92.2-141.4', color: '#29AE37' },
            { label: '141.5-190.6', color: '#DAD409' },
            { label: '190.7-233.7', color: '#F39006' },
            { label: '233.8', color: '#F34242' },            
          ],
        },
        'Calcium': {
          legendTitle: 'Exchangeable Calcium',
          legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
          legendItems: [
            { label: '1958.5-2889.2', color: '#008CCC' },
            { label: '2889.3-3820.0', color: '#29AE37' },
            { label: '3820.1-4750.7', color: '#DAD409' },
            { label: '4750.8-5565.2', color: '#F39006' },
            { label: '5565.3', color: '#F34242' },            
          ],
        },
        'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
          legendItems: [
            { label: '24.1-46.4', color: '#008CCC' },
            { label: '46.5-68.9', color: '#29AE37' },
            { label: '69.0-91.3', color: '#DAD409' },
            { label: '91.4-110.9', color: '#F39006' },
            { label: '111.0', color: '#F34242' },            
          ],
        },
        'Zinc': {
legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
          legendItems: [
            { label: '0.48-1.01', color: '#008CCC' },
            { label: '1.02-1.56', color: '#29AE37' },
            { label: '1.57-2.10', color: '#DAD409' },
            { label: '2.11-2.58', color: '#F39006' },
            { label: '2.59', color: '#F34242' },            
          ],
        },
        'Extra SO4': {
          legendTitle: 'Sulphate Content',
          legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
          legendItems: [
            { label: '21.5-28.1', color: '#008CCC' },
            { label: '28.2-34.8', color: '#29AE37' },
            { label: '34.9-41.5', color: '#DAD409' },
            { label: '41.6-47.4', color: '#F39006' },
            { label: '47.5', color: '#F34242' },            
          ],
        },
        'Acidity': {
          legendTitle: 'Acidity (pH)',
          legendCategories: [
            { label: 'High', range: '5.5-7.5' },
            { label: 'Moderate', range: '5.0-5.5' },
            { label: 'Low', range: '< 5.0 & > 8' },
          ],
          legendItems: [
            { label: '5.5-5.7', color: '#008CCC' },
            { label: '5.8-6.0', color: '#29AE37' },
            { label: '6.1-6.3', color: '#DAD409' },
            { label: '6.4-6.6', color: '#F39006' },
            { label: '6.7', color: '#F34242' },            
          ],
        },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
          legendItems: [
            { label: '0.9-2.1', color: '#008CCC' },
            { label: '2.2-3.4', color: '#29AE37' },
            { label: '3.5-4.7', color: '#DAD409' },
            { label: '4.8-5.8', color: '#F39006' },
            { label: '5.9', color: '#F34242' },            
          ],
        },
        // Add legends for other crops in Samar...
      },
      'Soil Texture': {
          'Clay': {
          legendTitle: 'Clay',
          legendItems: [
            { label: '21.0-28.7', color: '#FFF491' },
            { label: '28.8-36.1', color: '#BF6D0E' },
            { label: '36.2', color: '#F34242' },            
          ],
        },  
        'Sand': {
          legendTitle: 'Sand',
          legendItems: [
            { label: '48.7-56.5', color: '#FFE6C3' },
            { label: '56.6-28.7', color: '#EDDC30' },
            { label: '28.8', color: '#712700' },            


          ],
        },
        'Silt': {
          legendTitle: 'Silt',
          legendItems: [
            { label: '10.6-16.2', color: '#8A4C00' },
            { label: '16.3-21.5', color: '#F9EB00' },
            { label: '21.6', color: '#595959' },            
          ],
        },  
      },
      'Crop Suitability': {
        'Abaca': {
          legendTitle: 'Abaca Level of Suitability',
          legendItems: [
            { label: 'Low', color: '#FF0000' },
            { label: 'Medium', color: '#FFFF00' },
            { label: 'High', color: '#00FF00' },
          ],
        },
        // Add legends for other crops in Samar...
      },
  },

  'San Jorge': {   
    'Soil Properties': {
      'Organic Matter': {
        legendTitle: 'Organic Matter (%)',        
        legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
        legendItems: [
          { label: '1.422-1.975', color: '#008CCC' },
          { label: '1.976-2.529', color: '#29AE37' },
          { label: '2.530-3.083', color: '#DAD409' },
          { label: '3.084-3.567', color: '#F39006' },
          { label: '3.568', color: '#F34242' },          
        ],
      },
      'Total Nitrogen': {
        legendTitle: 'Total Nitrogen (%)',
        legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
        legendItems: [
          { label: '0.168-0.183', color: '#008CCC' },
          { label: '0.184-0.198', color: '#29AE37' },
          { label: '0.199-0.214', color: '#DAD409' },
          { label: '0.215-0.228', color: '#F39006' },
          { label: '0.229', color: '#F34242' },
                
        ],
      },
      'Potassium': {
        legendTitle: 'Exchangeable Potassium',
        legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
        legendItems: [
          { label: '63.7-81.7', color: '#008CCC' },
          { label: '81.8-99.8', color: '#29AE37' },
          { label: '99.9-117.8', color: '#DAD409' },
          { label: '117.9-133.6', color: '#F39006' },
          { label: '133.7', color: '#F34242' },
                 
        ],
      },
      'Calcium': {
        legendTitle: 'Exchangeable Calcium',
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
        legendItems: [
          { label: '584.7-1883.6', color: '#008CCC' },
          { label: '1883.7-3182.7', color: '#29AE37' },
          { label: '3182.8-4481.8', color: '#DAD409' },
          { label: '4481.9-5618.5', color: '#F39006' },
          { label: '5618.6', color: '#F34242' },
                
        ],
      },
      'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
        legendItems: [
          { label: '28.0-58.4', color: '#008CCC' },
          { label: '58.5-88.9', color: '#29AE37' },
          { label: '89.0-119.5', color: '#DAD409' },
          { label: '119.6-146.2', color: '#F39006' },
          { label: '146.3', color: '#F34242' },
           
        ],
      },
      'Zinc': {
        legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
        legendItems: [
          { label: '0.39-0.83', color: '#008CCC' },
          { label: '0.84-1.28', color: '#29AE37' },
          { label: '1.29-1.73', color: '#DAD409' },
          { label: '1.74-2.13', color: '#F39006' },
          { label: '2.14', color: '#F34242' },          
        ],
      },
      'Extra SO4': {
        legendTitle: 'Sulphate Content',
        legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
        legendItems: [
          { label: '17.1-33.1', color: '#008CCC' },
          { label: '33.2-49.2', color: '#29AE37' },
          { label: '49.3-65.4', color: '#DAD409' },
          { label: '65.5-79.5', color: '#F39006' },
          { label: '79.6', color: '#F34242' }          
        ],
      },
      'Acidity': {
        legendTitle: 'pH Content',
        legendCategories: [
          { label: 'High', range: '5.5-7.5' },
          { label: 'Moderate', range: '5.0-5.5' },
          { label: 'Low', range: '< 5.0 & > 8' },
        ],
        legendItems: [
          { label: '5.2-5.7', color: '#008CCC' },
          { label: '5.8-6.3', color: '#29AE37' },
          { label: '6.4-6.9', color: '#DAD409' },
          { label: '7.0-7.4', color: '#F39006' },
          { label: '7.5', color: '#F34242' },          
        ],
      },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
        legendItems: [
          { label: '0.9-4.7', color: '#008CCC' },
          { label: '4.8-8.6', color: '#29AE37' },
          { label: '8.7-12.5', color: '#DAD409' },
          { label: '12.6-15.9', color: '#F39006' },
          { label: '16.0', color: '#F34242' },          
        ],
      },
      // Add legends for other crops in Samar...
    },
    'Soil Texture': {
        'Clay': {
        legendTitle: 'Clay',
        legendItems: [
          { label: '7.6-17.2', color: '#FFF491' },
          { label: '17.3-26.2', color: '#BF6D0E' },
          { label: '26.3', color: '#F34242' },          

        ],
      },  
      'Sand': {
        legendTitle: 'Sand',
        legendItems: [
          { label: '35.6-52.7', color: '#FFE6C3' },
          { label: '52.8-68.8', color: '#EDDC30' },
          { label: '68.9', color: '#712700' },          
        ],
      },
      'Silt': {
        legendTitle: 'Silt',
        legendItems: [
          { label: '15.6-36.3', color: '#8A4C00' },
          { label: '36.4-55.8', color: '#F9EB00' },
          { label: '55.9', color: '#595959' },          
        ],
      },  
    },
    'Crop Suitability': {
      'Abaca': {
        legendTitle: 'Abaca Level of Suitability',
        legendItems: [
          { label: 'Low', color: '#FF0000' },
          { label: 'Medium', color: '#FFFF00' },
          { label: 'High', color: '#00FF00' },
        ],
      },
      // Add legends for other crops in Samar...
    },
  },

  'San Jose De Buan': {
    'Soil Properties': {
      'Organic Matter': {
        legendTitle: 'Organic Matter (%)',        
        legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
        legendItems: [
          { label: '1.526-1.798', color: '#008CCC' },
          { label: '1.799-2.070', color: '#29AE37' },
          { label: '2.071-2.343', color: '#DAD409' },
          { label: '2.344-2.581', color: '#F39006' },
          { label: '2.582', color: '#F34242' },          
        ],
      },
      'Total Nitrogen': {
        legendTitle: 'Total Nitrogen (%)',
        legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
        legendItems: [
          { label: '0.129-0.188', color: '#008CCC' },
          { label: '0.189-0.247', color: '#29AE37' },
          { label: '0.248-0.307', color: '#DAD409' },
          { label: '0.308-0.359', color: '#F39006' },
          { label: '0.360', color: '#F34242' },                         
        ],
      },
      'Potassium': {
        legendTitle: 'Exchangeable Potassium',
        legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
        legendItems: [
          { label: '44.1-93.9', color: '#008CCC' },
          { label: '94.0-143.7', color: '#29AE37' },
          { label: '143.8-193.6', color: '#DAD409' },
          { label: '193.7-237.2', color: '#F39006' },
          { label: '237.3', color: '#F34242' },          
        ],
      },
      'Calcium': {
        legendTitle: 'Exchangeable Calcium',
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
        legendItems: [
          { label: '584.7-2254.1', color: '#008CCC' },
          { label: '2254.2-3923.7', color: '#29AE37' },
          { label: '3923.8-5593.3', color: '#DAD409' },
          { label: '5593.4-7054.2', color: '#F39006' },
          { label: '7054.3', color: '#F34242' },                  
        ],
      },
      'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
        legendItems: [
          { label: '4.4-17.2', color: '#008CCC' },
          { label: '17.3-30.1', color: '#29AE37' },
          { label: '30.2-43.0', color: '#DAD409' },
          { label: '43.1-54.3', color: '#F39006' },
          { label: '54.4', color: '#F34242' },          
        ],
      },
      'Zinc': {
legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
        legendItems: [
          { label: '0.20-0.39', color: '#008CCC' },
          { label: '0.40-0.59', color: '#29AE37' },
          { label: '0.60-0.79', color: '#DAD409' },
          { label: '0.80-0.97', color: '#F39006' },
          { label: '0.98', color: '#F34242' },          
        ],
      },
      'Extra SO4': {
        legendTitle: 'Sulphate Content',
        legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
        legendItems: [
          { label: '15.5-19.9', color: '#008CCC' },
          { label: '20.0-24.4', color: '#29AE37' },
          { label: '24.5-28.8', color: '#DAD409' },
          { label: '28.9-32.8', color: '#F39006' },
          { label: '32.9', color: '#F34242' },          
        ],
      },
      'Acidity': {
        legendTitle: 'pH Content',
        legendCategories: [
          { label: 'High', range: '5.5-7.5' },
          { label: 'Moderate', range: '5.0-5.5' },
          { label: 'Low', range: '< 5.0 & > 8' },
        ],
        legendItems: [
          { label: '4.5-4.7', color: '#008CCC' },
          { label: '4.8-5.0', color: '#29AE37' },
          { label: '5.1-5.3', color: '#DAD409' },
          { label: '5.4-5.6', color: '#F39006' },
          { label: '5.7', color: '#F34242' },          
        ],
      },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
        legendItems: [
          { label: '0.9-8.3', color: '#008CCC' },
          { label: '8.4-15.8', color: '#29AE37' },
          { label: '15.9-23.3', color: '#DAD409' },
          { label: '23.4-29.9', color: '#F39006' },
          { label: '30.0', color: '#F34242' },          
        ],
      },
      // Add legends for other crops in Samar...
    },
    'Soil Texture': {
        'Clay': {
        legendTitle: 'Clay',
        legendItems: [
          { label: '14.0-14.8', color: '#FFF491' },
          { label: '14.9-15.7', color: '#BF6D0E' },
          { label: '15.8', color: '#F34242' },          

        ],
      },  
      'Sand': {
        legendTitle: 'Sand',
        legendItems: [
          { label: '60.8-64.9', color: '#FFE6C3' },
          { label: '65.0-68.8', color: '#EDDC30' },
          { label: '68.9', color: '#712700' },          
        ],
      },
      'Silt': {
        legendTitle: 'Silt',
        legendItems: [
          { label: '15.6-19.8', color: '#8A4C00' },
          { label: '19.9-23.8', color: '#F9EB00' },
          { label: '23.9', color: '#595959' },          
        ],
      },  
    },
    'Crop Suitability': {
      'Abaca': {
        legendTitle: 'Abaca Level of Suitability',
        legendItems: [
          { label: 'Low', color: '#FF0000' },
          { label: 'Medium', color: '#FFFF00' },
          { label: 'High', color: '#00FF00' },
        ],
      },
      // Add legends for other crops in Samar...
    },
  },

  'San Sebastian': {
      'Soil Properties': {
        'Organic Matter': {
          legendTitle: 'Organic Matter (%)',        
          legendCategories: [
          { label: 'High', range: '> 3.0' },
          { label: 'Moderate', range: '1.0-3.0' },
          { label: 'Low', range: '< 1.0' },
        ],
          legendItems: [
            { label: '2.195-2.260', color: '#008CCC' },
            { label: '2.261-2.326', color: '#29AE37' },
            { label: '2.327-2.391', color: '#DAD409' },
            { label: '2.392-2.449', color: '#F39006' },
            { label: '2.450', color: '#F34242' },            
          ],
        },
        'Total Nitrogen': {
          legendTitle: 'Total Nitrogen (%)',
          legendCategories: [
          { label: 'High', range: '> 0.25' },
          { label: 'Moderate', range: '0.15-0.25' },
          { label: 'Low', range: '< 0.15' },
        ],
          legendItems: [
            { label: '0.158-0.169', color: '#008CCC' },
            { label: '0.170-0.180', color: '#29AE37' },
            { label: '0.181-0.192', color: '#DAD409' },
            { label: '0.193-0.202', color: '#F39006' },
            { label: '0.203', color: '#F34242' },            
          ],
        },
        'Potassium': {
          legendTitle: 'Exchangeable Potassium',
          legendCategories: [
          { label: 'High', range: '> 250.0' },
          { label: 'Moderate', range: '150.0-250.0' },
          { label: 'Low', range: '< 150' },
        ],
          legendItems: [
            { label: '90.0-103.5', color: '#008CCC' },
            { label: '103.6-117.1', color: '#29AE37' },
            { label: '117.2-130.6', color: '#DAD409' },
            { label: '130.7-142.5', color: '#F39006' },
            { label: '142.6', color: '#F34242' },            
          ],
        },
        'Calcium': {
          legendTitle: 'Exchangeable Calcium',
          legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
          legendItems: [
            { label: '1131.7-1430.2', color: '#008CCC' },
            { label: '1430.3-1728.7', color: '#29AE37' },
            { label: '1728.8-2027.3', color: '#DAD409' },
            { label: '2027.4-2288.5', color: '#F39006' },
            { label: '2288.6', color: '#F34242' },
                      
          ],
        },
        'Iron': {
          legendTitle: 'Exchangeable Iron',
          legendCategories: [
            { label: 'High', range: '> 5.0' },
            { label: 'Moderate', range: '2.5-5.0' },
            { label: 'Low', range: '< 2.5' },
          ],
          legendItems: [
            { label: '103.8-110.7', color: '#008CCC' },
            { label: '110.8-117.8', color: '#29AE37' },
            { label: '117.9-124.8', color: '#DAD409' },
            { label: '124.9-131.0', color: '#F39006' },
            { label: '131.1', color: '#F34242' },            
          ],
        },
        'Zinc': {
legendTitle: 'Exchangeable Zinc',
          legendCategories: [
            { label: 'High', range: '-' },
            { label: 'Moderate', range: '> 1.5' },
            { label: 'Low', range: '< 1.0' },
          ],
          legendItems: [
            { label: '0.80-1.16', color: '#008CCC' },
            { label: '1.17-1.53', color: '#29AE37' },
            { label: '1.54-1.90', color: '#DAD409' },
            { label: '1.91-2.22', color: '#F39006' },
            { label: '2.23', color: '#F34242' },            
          ],
        },
        'Extra SO4': {
          legendTitle: 'Sulphate Content',
          legendCategories: [
          { label: 'High', range: '10.0-20.0' },
          { label: 'Moderate', range: '5.0-10.0' },
          { label: 'Low', range: '< 5.0' },
        ],
          legendItems: [
            { label: '16.0-27.2', color: '#008CCC' },
            { label: '27.3-38.5', color: '#29AE37' },
            { label: '38.6-49.9', color: '#DAD409' },
            { label: '50.0-59.8', color: '#F39006' },
            { label: '59.9', color: '#F34242' },            
          ],
        },
        'Acidity': {
          legendTitle: 'Acidity (pH)',
          legendCategories: [
            { label: 'High', range: '10.0-20.0' },
            { label: 'Moderate', range: '5.0-10.0' },
            { label: 'Low', range: '< 5.0' },
          ],
          legendItems: [
            { label: '5.2-5.3', color: '#008CCC' },
            { label: '5.4-5.5', color: '#29AE37' },
            { label: '5.6-5.7', color: '#DAD409' },
            { label: '5.8-5.9', color: '#F39006' },
            { label: '6.0', color: '#F34242' },            
          ],
        },
      'Available P': {
        legendTitle: 'Available Phosphorus',
        legendCategories: [
          { label: 'High', range: '> 35.0' },
          { label: 'Moderate', range: '26.0-35.0' },
          { label: 'Low', range: '< 25.0' },
        ],
          legendItems: [
            { label: '1.1-1.4', color: '#008CCC' },
            { label: '1.5-1.8', color: '#29AE37' },
            { label: '1.9-2.2', color: '#DAD409' },
            { label: '2.3-2.6', color: '#F39006' },
            { label: '2.7', color: '#F34242' },            
          ],
        },
        // Add legends for other crops in Samar...
      },
      'Soil Texture': {
          'Clay': {
          legendTitle: 'Clay',
          legendItems: [
            { label: '11.6-13.5', color: '#FFF491' },
            { label: '13.6-15.4', color: '#BF6D0E' },
            { label: '15.5', color: '#F34242' },            
          ],
        },  
        'Sand': {
          legendTitle: 'Sand',
          legendItems: [
            { label: '59.6-63.8', color: '#FFE6C3' },
            { label: '63.9-67.9', color: '#EDDC30' },
            { label: '68.0', color: '#712700' },            


          ],
        },
        'Silt': {
          legendTitle: 'Silt',
          legendItems: [
            { label: '20.4-22.8', color: '#8A4C00' },
            { label: '22.9-25.1', color: '#F9EB00' },
            { label: '25.2', color: '#595959' },            
          ],
        },  
      },
      'Crop Suitability': {
        'Abaca': {
          legendTitle: 'Abaca Level of Suitability',
          legendItems: [
            { label: 'Low', color: '#FF0000' },
            { label: 'Medium', color: '#FFFF00' },
            { label: 'High', color: '#00FF00' },
          ],
        },
        // Add legends for other crops in Samar...
      },
  },

//   'Basey': {
//     'Soil Properties': {
//       'Calcium': {
//         legendTitle: 'Exchangeable Calcium',
        legendCategories: [
          { label: 'High', range: '> 2000' },
          { label: 'Moderate', range: '1000-2000' },
          { label: 'Low', range: '< 1000' },
        ],
//         legendItems: [
//           { label: '1346-1831', color: '#008CCC' },
//           { label: '1831-1900', color: '#29AE37' },
//           { label: '1900-2455', color: '#DAD409' },
//           { label: '2455-3009', color: '#F39006' },
//           { label: '3009-3495', color: '#F34242' },
//         ],
//       },
//       // Add legends for other soil properties in Samar...
//     },
//   },
//   // Add legends for other municipalities...
};

// Add default legends for 'Soil Properties' and 'Crop Suitability' if they don't exist
if (!legendData['Default']) {
  legendData['Default'] = {
    'Soil Properties': {
      'Default': {
        legendTitle: 'Default Soil Properties Level of Suitability',
        legendItems: [
          { label: 'Low', color: '#FF0000' },
          { label: 'Medium', color: '#FFFF00' },
          { label: 'High', color: '#00FF00' },
          { label: 'Very Low', color: '#FF6347' },
          { label: 'Very High', color: '#228B22' },
        ],
      },
      // Add default legends for other soil properties...
    },
    'Crop Suitability': {
      'Default': {
        legendTitle: 'Default Crop Suitability Level of Suitability',
        legendItems: [
          { label: 'Low', color: '#FF0000' },
          { label: 'Medium', color: '#FFFF00' },
          { label: 'High', color: '#00FF00' },
          { label: 'Very Low', color: '#FF6347' },
          { label: 'Very High', color: '#228B22' },
        ],
      },
      // Add default legends for other crops...
    },
    // Add default legends for other map types...
  };
}

export default legendData;
