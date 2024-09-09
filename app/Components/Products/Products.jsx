"use client";
import {
  Pagination,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";  // Import your Sidebar component
import { ProductsData } from "../../static/products";

export default function Products(props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const productsPerPage = 6;
  const pageCount = Math.ceil(ProductsData.length / productsPerPage);
  const displayedProducts = ProductsData.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleProductClick = (prodIndex) => {
    router.push(`${prodIndex}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} sm={12} md={3}>
          <Sidebar />
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} sm={12} md={9}>
          <Grid container spacing={2}>
            {displayedProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card onClick={() => handleProductClick(index)} sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                      height: 330,
                      width: '100%',
                      objectFit: 'fill',
                      borderRadius: "16px",
                      p: 2
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {product.title}
                    </Typography>
                    <Typography variant="subtitle2">{product.author}</Typography>
                    <Typography variant="body2">
                      {product.priceNew} <span style={{ textDecoration: 'line-through', color: 'gray' }}>{product?.priceOld}</span>
                    </Typography>
                    <Typography variant="body2">
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid #ccc',
                          borderRadius: '16px',
                          padding: '4px 8px',
                        }}
                      >
                        {product.reviews}
                        <ChatBubbleOutlineIcon sx={{ ml: 1, width: 15 }} />
                      </Box>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
              "& .MuiPaginationItem-root": {
                color: "white",
              },
              "& .Mui-selected": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
