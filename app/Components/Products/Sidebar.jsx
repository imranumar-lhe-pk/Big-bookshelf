import { Box, Typography, List, ListItem, Checkbox, Divider, Slider, FormControl, Select, MenuItem, TextField, Button } from '@mui/material';

export default function Sidebar() {
  return (
    <Box sx={{ width: 240, padding: '16px', borderRadius: '13px', backgroundColor: 'white', m: 5 }}>
      {/* Categories Section */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Categories</Typography>
      <TextField
        variant="outlined"
        placeholder="Find Category"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
      />
      <List>
        <ListItem>
          <Typography>Imaginative Literature</Typography>
        </ListItem>
        <ListItem>
          <Typography>Scientific Literature</Typography>
        </ListItem>
        <ListItem>
          <Typography>Business</Typography>
        </ListItem>
        <ListItem>
          <Typography>Educational</Typography>
        </ListItem>
        <ListItem>
          <Typography>Other</Typography>
        </ListItem>
      </List>

      <Divider sx={{ marginY: 2 }} />

      {/* Publish Date Section */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Publish Date</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          defaultValue="all-years"
          size="small"
        >
          <MenuItem value="all-years">All Years</MenuItem>
          {/* Add more years if needed */}
        </Select>
      </FormControl>

      <Divider sx={{ marginY: 2 }} />

      {/* Language Section */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Language</Typography>
      <List>
        <ListItem>
          <Checkbox />
          <Typography>English</Typography>
        </ListItem>
        <ListItem>
          <Checkbox />
          <Typography>Russian</Typography>
        </ListItem>
        <ListItem>
          <Checkbox />
          <Typography>Azerbaijani</Typography>
        </ListItem>
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>View All</Typography>
      </List>

      <Divider sx={{ marginY: 2 }} />

      {/* Price Section */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Price</Typography>
      <Slider
        defaultValue={30}
        aria-labelledby="price-range-slider"
        valueLabelDisplay="auto"
        min={5}
        max={50}
        sx={{ mb: 1 }}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>$5</Typography>
        <Typography>$50</Typography>
      </Box>
      <Button variant="text" sx={{ mt: 1 }}>Reset</Button>

      <Divider sx={{ marginY: 2 }} />

      {/* Publishing House Section */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Publishing House</Typography>
      <List>
        <ListItem>
          <Checkbox />
          <Typography>Rib Knit</Typography>
        </ListItem>
        <ListItem>
          <Checkbox />
          <Typography>Reme Velvet</Typography>
        </ListItem>
        <ListItem>
          <Checkbox />
          <Typography>Rashguard Fabrics</Typography>
        </ListItem>
        <ListItem>
          <Checkbox />
          <Typography>Doted Swiss</Typography>
        </ListItem>
        <ListItem>
          <Checkbox />
          <Typography>Double Knit</Typography>
        </ListItem>
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>View All</Typography>
      </List>

      <Divider sx={{ marginY: 2 }} />

      {/* Cover Style Section */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Cover Style</Typography>
      <List>
        <ListItem>
          <Checkbox />
          <Typography>Hardcover</Typography>
        </ListItem>
        <ListItem>
          <Checkbox />
          <Typography>Softcover</Typography>
        </ListItem>
      </List>

      <Divider sx={{ marginY: 2 }} />

      {/* Other Section */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Other</Typography>
      <List>
        <ListItem>
          <Checkbox />
          <Typography>4+ stars</Typography>
        </ListItem>
      </List>
    </Box>
  );
}
