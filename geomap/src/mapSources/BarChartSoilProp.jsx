// BarChartComponent.jsx
import { ResponsiveBar } from '@nivo/bar';
import React, { useState, useEffect, useRef } from 'react';

const BarChartComponent = ({ data, property,colors,textColor,gridColor,isPaginated,municipality,category,titleFormats}) => {

// Define a function to determine the classification of the soil property
const classifySoilProperty = (property, value) => {
    // Convert string to a number if it's not already
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
    // Define the classification thresholds
    const thresholds = {
      'Acidity': { low: [null, 5.0], moderate: [5.0, 5.5], high: [5.5, 7.5], veryLow: [8, null] },
      'Organic Matter': { low: [null, 1], moderate: [1, 3], high: [3,null] },
      'Calcium': {low:[null,1000],moderate:[1000,2000],high:[2000,null]},
      'Iron': {low:[null,2.5],moderate:[2.5,5.0],high:[5,null]},
      'Available P':{low:[null,25.0],moderate:[26,35],high:[35,null]},
      'Total Nitrogen':{low:[null,0.15],moderate:[0.15,0.25],high:[0.25,null]},
      'Potassium':{low:[null,150],moderate:[150,250],high:[250,null]},
      'Zinc':{low:[null,1.0],moderate:[1.0,1.5],high:[1.5,null]},
      'Extra SO4':{low:[null,5.0],moderate:[5.0,10.],high:[10,null]},
    };
  
    const threshold = thresholds[property];
    if (!threshold) return 'Unknown property';
  
    // Check if value is within 'low', 'moderate', or 'high' thresholds
    if ((threshold.low[0] === null && numericValue < threshold.low[1]) ||
        (threshold.veryLow && numericValue > threshold.veryLow[0])) {
      return 'Low';
    } else if (numericValue >= threshold.moderate[0] && numericValue <= threshold.moderate[1]) {
      return 'Moderate';
    } else if ((threshold.high[1] === null && numericValue > threshold.high[0]) ||
               (numericValue >= threshold.high[0] && numericValue <= threshold.high[1])) {
      return 'High';
    }
  
    return 'Out of range'; // Fallback if value does not match any range
  };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set how many items you want per page
    const maxPage = Math.ceil(data.length / itemsPerPage);
    // Data slicing based on current page
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const chartTitle = titleFormats[property] + municipality;

    // Handlers for pagination
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, maxPage));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    useEffect(() => {
        setCurrentPage(1);
    }, [municipality]);
    return (
    <div>  
         <h4>{chartTitle}</h4>
         <div style={{ border: '0.5px solid grey' ,background: 'rgba(217, 217, 217, 0.1)',height: "330px", marginBottom:'3%', padding:'1%'}}> 
        <ResponsiveBar
            data={paginatedData}
            keys={[property]}
            tooltip={({ data }) => {
                const classification = classifySoilProperty(property, data[property]);
                return (
                  <div style={{ padding: '12px', color: 'black', background: 'rgba(255, 255, 255, 0.5)' }}>
                    <strong>Municipality:</strong> {data.Municipality}<br/>
                    {/* <strong>{property}:</strong> {data[property]}<br/> */}
                    <strong>{property}:</strong> {classification}
                  </div>
                );
              }}
            theme={{
                axis: {
                    ticks: {
                        text: { fill: textColor }
                    },
                    legend: {
                        text: { fill: textColor }
                    }
                },
                grid: {
                    line: {
                        stroke: gridColor, // Set the grid line color
                        strokeWidth: 1
                    }
                },
                tooltip: {
                    container: {
                        background: 'rgba(255, 255, 255, 0.5)', 
                        color: 'black',  
                    },
                },
                legends: {
                    text: {
                        fill: textColor // Set the legend text color
                    }
                }
                
            }}
            
                indexBy="Brgy"
                margin={{ top: 10, right: 10, bottom:60, left: 60 }}
                padding={0.25}
                groupMode="grouped"
                colors={{ scheme: 'set2' }}
                borderColor={{ from: colors, modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickValues: 'every 2',
                    tickSize: 5,
                    tickPadding: 5,
                    // legend:'Barangay',
                    tickRotation: isPaginated ? 15 : 0, // Rotate labels by 45 degrees if paginated
                    legend: isPaginated ? '' : 'Barangay',
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Value',
                    legendPosition: 'middle',
                    legendOffset: -50
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={'#262626'} // Set the label text color
                // legends={[
                //     {
                //         dataFrom: 'keys',
                //         anchor: 'top-left', // Changed to 'top-right'
                //         direction: 'row',    // Use 'row' for horizontal layout
                //         justify: false,
                //         translateX: -20,
                //         translateY: -30,
                //         itemsSpacing: 1,
                //         itemWidth: 20,
                //         itemHeight: 20,
                //         itemDirection: 'left-to-right',
                //         itemOpacity: 0.85,
                //         symbolSize: 20,
                //         effects: [
                //             {
                //                 on: 'hover',
                //                 style: {
                //                     itemOpacity: 1
                //                 }
                //             }
                //         ]
                //     }
                // ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
        {isPaginated && <div>
                {/* Pagination Controls */}
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}> {/* Conditional cursor style */}
                    Prev
                    </button>

                    <span> Page {currentPage} of {maxPage} </span>

                    <button 
                    onClick={nextPage} 
                    disabled={currentPage === maxPage}
                    style={{ cursor: currentPage === maxPage ? 'default' : 'pointer' }}> {/* Conditional cursor style */}
                    Next
                </button>
            </div>} 

    </div>  
);
};
export default BarChartComponent;