import { Box, Slider } from '@mui/material'
import React from 'react'
import Product from './Header'
import Sidebar from './Sidebar'
import Header from './Header'
import Products from './Products'
import NavBarr from './NavBarr'
import TopBar from './Topbar'

function ProductsPage() {
  return (
   <Box>
    <NavBarr />
    <Header />
    <Box display="flex" flexDirection="column" width="100%" bgcolor={'  '}>
      {/* TopBar spans the full width */}
      <TopBar />
      
      {/* Sidebar and Products are placed below TopBar */}
      <Box display="flex" flexDirection="row" width="100%">
        <Products style={{ flex: '1' }} /> {/* Products take up the remaining space */}
      </Box>
    </Box>
   </Box>
  )
}

export default ProductsPage