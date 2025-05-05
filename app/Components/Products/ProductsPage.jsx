import { Box, Slider } from '@mui/material'
import React from 'react'

import Products from './Products'
import NavBar from '../../Components/LandingPage/NavBar'

function ProductsPage() {
  return (
   <Box>
    <NavBar />
    
  
      {/* Sidebar and Products are placed below TopBar */}
      <Box display="flex" flexDirection="row" width="100%">
        <Products style={{ flex: '1' }} /> {/* Products take up the remaining space */}
      </Box>
    </Box>
  
  )
}

export default ProductsPage