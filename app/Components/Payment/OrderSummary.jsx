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
import { useBookmark } from "../../Context/BookMarkContext"; // Adjust path
import { useSearchParams } from "next/navigation";

const OrderSummary = () => {
  const { checkoutItems, cartItems } = useBookmark();
  const searchParams = useSearchParams();
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [checkoutPrice, setCheckoutPrice] = useState(0);

  useEffect(() => {
    console.log("OrderSummary - CheckoutItems from context:", checkoutItems);
    console.log("OrderSummary - CartItems from context:", cartItems);
    console.log("OrderSummary - SearchParams checkoutIds:", searchParams.get("checkoutIds"));

    // Get checkoutIds from URL or localStorage
    const checkoutIds = searchParams.get("checkoutIds") || localStorage.getItem("pendingCheckoutIds") || "";
    const idsArray = checkoutIds ? checkoutIds.split(",") : [];

    // Use checkoutItems if available, otherwise fall back to cartItems or localStorage
    let items = checkoutItems.length > 0
      ? checkoutItems
      : cartItems.length > 0
      ? cartItems
      : JSON.parse(localStorage.getItem("CheckoutItems")) || [];

    if (idsArray.length > 0) {
      items = items.filter((item) => idsArray.includes(item.id));
    }

    if (items.length > 0) {
      setItemsToDisplay(items);
      const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
      setCheckoutPrice(total);
      console.log("OrderSummary - Items to display:", items);
    } else {
      setItemsToDisplay([]);
      setCheckoutPrice(0);
      console.log("OrderSummary - No items to display");
    }
  }, [checkoutItems, cartItems, searchParams]);

  const platformFee = (checkoutPrice * 0.02).toFixed(2);
  const finalTotal = (checkoutPrice + parseFloat(platformFee)).toFixed(2);

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
          {itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title || "Untitled"}</TableCell>
                <TableCell align="right">Rs {item.price || "N/A"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No items selected for checkout</TableCell>
            </TableRow>
          )}
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
        <Typography variant="body1">+Rs {platformFee}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
        <Typography variant="h6" fontWeight={"bold"}>
          TOTAL:
        </Typography>
        <Typography variant="h6">Rs {finalTotal}</Typography>
      </Box>
    </Box>
  );
};

export default OrderSummary;