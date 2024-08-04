import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const StackedBarComponent = ({ data, property,colors,textColor,gridColor,isPaginated,municipality,titleFormats }) => {
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

    const colorMapping = {
        'Clay': '#A88D66',
        'Silt': '#E9A026',
        'Sand': '#E5DB52',
        // Add more mappings as necessary
      };
      

    return (
    <div>  
            <h4>{chartTitle}</h4>
            {/* <button onClick={() => setShowAllTextures(true)}>Show All Soil Textures</button> */}
            
            <div style={{ border: '0.5px solid grey' ,background: 'rgba(217, 217, 217, 0.1)', height: "300px", marginBottom:'3%'}}> 
                <ResponsiveBar
                    data={paginatedData}
                    keys={['Clay', 'Silt', 'Sand']} // Assuming these are the categories you want to stack
                    tooltip={({ data, color }) => (
                        <div style={{
                            padding: '9px 9px',
                            color: 'black',
                            background: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '2px',
                        }}>
                            <strong>Municipality:</strong> {data.Municipality}<br/>
                            <strong>Texture Class:</strong> {data.TextClass}<br/>
                            
                        </div>
                    )}
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
                                background: 'white',
                                color: 'black',
                                fontSize: '11px',
                                borderRadius: '2px',
                                boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                                // Preventing overflow with the tooltip
                                overflow: 'hidden',
                                position: 'absolute'
                            }
                        
                        },
                        legends: {
                            text: {
                                fill: textColor // Set the legend text color
                            }
                        }
                        
                    }}
                    indexBy="Brgy" // Assuming 'Brgy' is the common index for all stacks
                    margin={{ top: 10, right: 90, bottom:60, left: 60}}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={bar => colorMapping[bar.id] || '#FACC89'} 
                    borderColor={{ from: colors, modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Barangay',
                        legendPosition: 'middle',
                        legendOffset: 40
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Value',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={'#262626'}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 90,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 80,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
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

export default StackedBarComponent;
