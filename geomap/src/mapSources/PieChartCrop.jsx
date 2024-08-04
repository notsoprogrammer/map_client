import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';


const PieChartComponent = ({ data,textColor}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


    const CustomTooltip = ({ id, value, crops }) => (
        <div style={{  color: 'black',background: 'rgba(255, 255, 255, 0.5)', padding: '8px',borderRadius: '2px', }}>
          <strong>Crops</strong>
          <ul style={{ padding: '12px', margin: '1px', fontSize: '11px' }}> {/* Adjust styles here */}
            {crops.map(crop => <li key={crop}>{crop}</li>)}
          </ul>
        </div>
      );
  // Convert the `data` object into an array for the pie chart
  const dataForChart = Object.keys(data).map(key => ({
    id: key,
    label: key,
    value: data[key].count,
    crops: data[key].crops,
  }));
  const chartSize = Math.min(dimensions.width, dimensions.height) * 0.48; 
  const legendTranslateY = calculateLegendTranslateY(dimensions, chartSize);


  const colorMapping = {
    'Highly Suitable': '#47C04A',
    'Moderately Suitable': '#42AE76 ',
    'Marginally Suitable': '#4FB4D3',
    'Recommended Crops': '#F4EB3A',
    // ... other mappings
  };
  const getColor = (bar) => colorMapping[bar.id] || '#000';
  const shouldSplitLegend = chartSize >500;

  // Splitting data into two arrays for two rows
  const halfLength = Math.ceil(dataForChart.length / 2);
  const firstRowData = shouldSplitLegend ? dataForChart.slice(0, halfLength) : dataForChart;
  const secondRowData = shouldSplitLegend ? dataForChart.slice(halfLength) : [];

  return (
    <div style={{border: '0.5px solid grey' ,background: 'rgba(217, 217, 217, 0.1)', width: '100%', 
     height: shouldSplitLegend?'85%':'65%' }}>
      <div style={{ height: chartSize, width: chartSize, margin: 'auto' }}>
        <ResponsivePie
          data={dataForChart}
          tooltip={({ datum }) => (

              <CustomTooltip 
                id={datum.id}
                crops={datum.data.crops}
              />
              
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
              legends: {
                  text: {
                      fill: textColor // Set the legend text color
                  }
              },
              
          }}
          margin={{ top: -250, right: 120, bottom: -70, left:140 }}
          innerRadius={0.4}
          padAngle={0.7}
          cornerRadius={3}s
          activeOuterRadiusOffset={8}
          colors={getColor}
          borderColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={textColor} // Updated to use the textColor variable
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          // legends={[
          //   {
          //     anchor: 'bottom',
          //     direction: 'row',
          //     justify: false,
          //     translateX: shouldSplitLegend ? -90 : -20,
          //     translateY: shouldSplitLegend ? (legendTranslateY) -30 : (legendTranslateY),
          //     itemsSpacing: 20,
          //     itemWidth: 105,
          //     itemHeight: 18,
          //     itemTextColor: '#999',
          //     itemDirection: 'left-to-right',
          //     itemOpacity: 1,
          //     symbolSize: 18,
          //     symbolShape: 'circle',
          //     data: firstRowData.map(item => ({
          //       ...item,
          //       color: getColor(item), // Ensure the color mapping is used
          //     })),
          //     effects: [
          //       {
          //         on: 'hover',
          //         style: {
          //           itemTextColor: '#000'
          //         }
          //       }
          //     ]
          //   },...(shouldSplitLegend ? [{
          //     // Second row for legend (only if small screen)
          //     anchor: 'bottom',
          //     direction: 'row',
          //     justify: false,
          //     translateX: shouldSplitLegend ? -90 : -20,
          //     translateY: legendTranslateY, // Adjust based on the height of the first row
          //     itemsSpacing: 20,
          //     itemWidth: 105,
          //     itemHeight: 18,
          //     itemTextColor: '#999',
          //     itemDirection: 'left-to-right',
          //     itemOpacity: 1,
          //     symbolSize: 18,
          //     symbolShape: 'circle',
          //     data: secondRowData.map(item => ({
          //       ...item,
          //       color: getColor(item), // Ensure the color mapping is used
          //     })),
          //     // ... other props ...
          //   }] : []),
          // ]}
        />
      </div>
    </div>
  );
};

export default PieChartComponent;
function calculateLegendTranslateY(dimensions, chartSize) {
  // Implement logic to calculate the translateY value based on dimensions and chart size
  // For example:
  const spaceBelowChart = dimensions.height - chartSize;
  return Math.max(spaceBelowChart / -2.4); // Adjust this logic as needed
}