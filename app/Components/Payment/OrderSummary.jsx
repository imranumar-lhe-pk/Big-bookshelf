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
import { useBookmark } from "../../Context/BookMarkContext";
import { useSearchParams } from "next/navigation";

const OrderSummary = ({onSummaryCalculated }) => {
  const { checkoutItems, cartItems } = useBookmark();
  const searchParams = useSearchParams();
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [checkoutPrice, setCheckoutPrice] = useState(0);

  useEffect(() => {
    const checkoutIds =
      searchParams.get("checkoutIds") ||
      localStorage.getItem("pendingCheckoutIds") ||
      "";
    const idsArray = checkoutIds ? checkoutIds.split(",") : [];

    let items =
      checkoutItems.length > 0
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
    } else {
      setItemsToDisplay([]);
      setCheckoutPrice(0);
    }

    // Detect book type
    const hasHardCopy = items.some(item => item.type?.toLowerCase() === "hard copy");
    const hasSoftCopy = items.some(item => item.type?.toLowerCase() === "soft copy");

    let bookType = "none";
    if (hasHardCopy && hasSoftCopy) {
      bookType = "both";
    } else if (hasHardCopy) {
      bookType = "hard";
    } else if (hasSoftCopy) {
      bookType = "soft";
    }

    // Notify parent
    onSummaryCalculated &&
      onSummaryCalculated({
        finalTotal: parseFloat(finalTotal),
        bookType,
      });
  }, [checkoutItems, cartItems, searchParams]);

  const hardCopyItems = itemsToDisplay.filter(
    (item) => item.type?.toLowerCase() === "hard copy"
  );
  const hasSoftcopy = itemsToDisplay.some(
    (item) => item.type?.toLowerCase() === "soft copy"
  );

  const hardCopyCount = hardCopyItems.length;

  let shippingFee = 0;
  let platformFee = 0;

  if (hasSoftcopy && hardCopyCount > 0) {
    shippingFee = hardCopyCount * 320;
    platformFee = 0;
  } else if (hardCopyCount > 0) {
    shippingFee = hardCopyCount * 300;
    platformFee = 0;
  } else if (hasSoftcopy) {
    shippingFee = 0;
    platformFee = (checkoutPrice * 0.02).toFixed(2);
  }

  const finalTotal = (
    checkoutPrice +
    shippingFee +
    parseFloat(platformFee || 0)
  ).toFixed(2);

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
                <TableCell>
                  {item.title || "Untitled"} ({item.type})
                </TableCell>
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
        <Typography variant="body1">
          {shippingFee > 0 ? `Rs ${shippingFee}` : "FREE"}
        </Typography>
      </Box>

      {platformFee > 0 && (
        <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
          <Typography variant="body1" fontWeight={"bold"}>
            Platform Fee (2%):
          </Typography>
          <Typography variant="body1">+Rs {platformFee}</Typography>
        </Box>
      )}

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
