import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const OrderSummary = ({ total }) => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutPrice, setCheckoutPrice] = useState(0);

  useEffect(() => {
    // Retrieve items from localStorage
    const storedItems = JSON.parse(localStorage.getItem("checkoutItems"));
    const storedPrice = parseFloat(localStorage.getItem("checkoutPrice"));

    if (storedItems) setCheckoutItems(storedItems);
    if (!isNaN(storedPrice)) setCheckoutPrice(storedPrice);
  }, []);

  const platformFee = (checkoutPrice * 0.02).toFixed(2); // 2% platform fee
  const finalTotal = (checkoutPrice + parseFloat(platformFee)).toFixed(2); // Final amount after adding platform fee

  return (
    <Box bgcolor="#333" p={3} borderRadius={2} color="#fff">
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        ORDER SUMMARY
      </Typography>
      <Table
        size="small"
        sx={{ "& .MuiTableCell-root": { borderBottom: "none", color: "#fff" } }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>BOOKS</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              PRICE
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(checkoutItems || []).map((item, id) => (
            <TableRow key={id}>
              <TableCell>{item.title}</TableCell>
              <TableCell align="right">${item.priceNew}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
        <Typography variant="body1" fontWeight={"bold"}>
          Shipping:
        </Typography>
        <Typography variant="body1">FREE</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
        <Typography variant="body1" fontWeight={"bold"}>
          Platform Fee (2%):
        </Typography>
        <Typography variant="body1">+${platformFee}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography variant="h6" fontWeight={"bold"}>
          TOTAL:
        </Typography>
        <Typography variant="h6">${finalTotal}</Typography>
      </Box>
    </Box>
  );
};

export default OrderSummary;
