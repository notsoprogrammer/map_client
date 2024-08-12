import { Avatar, Box, Chip, Typography } from '@mui/material'
import { assocBar, farmerData, totalAssoc } from '../util/data'

import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'

const columns = [
  {
    field: 'avatar',
    headerName: ' ',
    width: 70,
    renderCell: (params) => (
      <Avatar alt={`$(params.value)`} src=''/>
    )
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  }, 
  {
    field: 'barangay',
    headerName: 'Barangay',
    flex: 1,
  }, 
  {
    field: 'birthDate',
    headerName: 'Birth Date',
    flex: 1,
  }, 
  {
    field: 'annualGross',
    headerName: 'Annual Gross',
    flex: 1,
  }, 
  {
    field: 'farmersAssociation',
    headerName: 'Affiliation',
    flex: 1,
  }, 
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
     <Chip label={params.value} color={params.value === 'Active' ? 'success' : 'error'}/>
    )
  }, 
];

const AssocMemberBar = ({ data }) => (
  <ResponsiveBar
      data={data}
      keys={[
          'active',
          'inactive',
      ]}
      indexBy="association"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  1.6
              ]
          ]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Associations',
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Members',
          legendPosition: 'middle',
          legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  1.6
              ]
          ]
      }}
      legends={[
          {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemTextColor: "#999",
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

      barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
  />
)

const AssocPie = ({ data /* see data tab */ }) => (
  <ResponsivePie
      data={data}
      margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.2
              ]
          ]
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor='#999'
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  2
              ]
          ]
      }}
      defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
      legends={[
          {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemTextColor: '#000'
                      }
                  }
              ]
          },
          {
              anchor: 'bottom-left',
              direction: 'column',
              justify: false,
              translateX: -50,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 20,
              itemTextColor: '#999',
              itemsSpacing: 0,
              symbolSize: 20,
              itemDirection: 'left-to-right'
          }
      ]}
  />
)


const Associations = () => {
  return (
    <Box height="calc(100vh-64px)" width="calc(100%-250px)" sx={{mt: '70px', p: 4}}>
      <Typography variant='h3'>Association Statistics</Typography>
      <Box sx={{ mt: 2, display: 'grid',
          gridTemplateColumns: 'repeat(5,1fr)',
          gridTemplateRows: 'repeat(5,1fr)',
          gap: '20px 20px',
          gridTemplateAreas: 
          `"A1 A1 A2 A2 A2"
          "A1 A1 A2 A2 A2"
          "A3 A3 A3 A4 A4"
          "A3 A3 A3 A4 A4"
          "A3 A3 A3 A4 A4"`
        }}>
          <Box sx={{ gridArea: 'A1', backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.alt : theme.palette.background.alt}}>
            <Box sx={{display: 'flex',flexDirection:'row', flexWrap: 'wrap'}}>
              <Box sx={{p:2, minWidth:'270px',border: '1px solid grey'}}>
                <Typography variant='h5'>Total Associations</Typography>
                <Box sx={{display: 'flex', py: 1, columnGap: 4, alignItems:'center'}}>
                  <Typography variant='h2'>06</Typography>
                  <Chip label='100%' color='success'/>
                </Box>
                  <Typography variant='h6'>Associations</Typography>
              </Box>
              <Box sx={{p:2, minWidth:'265px',border: '1px solid grey'}}>
                <Typography variant='h5'>Active Members</Typography>
                <Box sx={{display: 'flex', py: 1, columnGap: 4, alignItems:'center'}}>
                  <Typography variant='h2'>177</Typography>
                  <Chip label='88.5%' color='success'/>
                </Box>
                  <Typography variant='h6'>Status</Typography>
              </Box>
              <Box sx={{p:2, minWidth:'270px',border: '1px solid grey'}}>
                <Typography variant='h5'>Total Members</Typography>
                <Box sx={{display: 'flex', py: 1, columnGap: 4, alignItems:'center'}}>
                  <Typography variant='h2'>200</Typography>
                  <Chip label='100%' color='success'/>
                </Box>
                  <Typography variant='h6'>Members</Typography>
              </Box>
              <Box sx={{p:2, minWidth:'265px',border: '1px solid grey'}}>
                <Typography variant='h5'>Inactive Members</Typography>
                <Box sx={{display: 'flex',py:1, columnGap: 4, alignItems:'center'}}>
                  <Typography variant='h2'>23</Typography>
                  <Chip label='11.5%' color='error'/>
                </Box>
                  <Typography variant='h6'>Status</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{width: '100%', height: '260px', gridArea:'A2',border: '1px solid grey', backgroundColor: (theme) => theme.palette.mode === 'darl' ? theme.palette.background.alt : theme.palette.background.alt}}>
            <AssocMemberBar data={assocBar}/>
          </Box>
          <Box sx={{width: '100%', height:'40vh', gridArea:'A3'}}>
            <Typography pb={2} variant='h3'>Members List</Typography>
            <DataGrid rows={farmerData} columns={columns}/>
          </Box>
          <Box sx={{width: '100%', height: '300px', gridArea:'A4'}}>
            <Typography variant='h3'>Top Associations</Typography>
            <AssocPie data={totalAssoc}/>
          </Box>
      </Box>
    </Box>
  )
}

export default Associations