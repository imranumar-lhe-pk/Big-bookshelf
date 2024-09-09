import { Grid, Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Drawer, List, ListItem, Checkbox, Slider, Divider } from '@mui/material';

 function Header() {
  return (
    <Box display="flex" flexDirection="column" height="20vh">
      {/* Header Section */}
      <Box sx={{ backgroundColor: '#F4CE47', padding: '16px', textAlign: 'center',mt:3 }}>
        <Typography variant="h4" fontWeight="bold">ALL BOOKS</Typography>
      </Box>

     

     
    </Box>
  );
}

export default Header