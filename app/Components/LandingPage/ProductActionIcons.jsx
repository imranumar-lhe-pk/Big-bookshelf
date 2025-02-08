import React from "react";
import { IconButton, Box } from "@mui/material";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";

const ProductActionIcons = ({ productId }) => {
  const router = useRouter();

  const handleIconClick = (path) => {
    router.push(path); // Navigate to the selected path
  };

  return (
    <Box
      sx={{
        ml: -1,
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "16px",
        padding: "0px 8px",
        width:120
      }}
    >
      <IconButton
        sx={{ fontSize: "20px", color: "#2A2C2E" }}
        onClick={() => router.push(`${productId}`)} // Details
        alt='details'
      >
        <IoIosInformationCircleOutline />
      </IconButton>
      <IconButton
        sx={{ fontSize: "17px", color: "#2A2C2E" }}
        onClick={() => handleIconClick("/payment")} // Buy Now
        alt='Buy Now'
      >
        <MdOutlineShoppingCartCheckout />
      </IconButton>
      <IconButton
        sx={{ fontSize: "17px", color: "#2A2C2E" }}
        onClick={() => handleIconClick("/payment")} // Exchange
        alt='Exchange'
      >
        <LiaExchangeAltSolid />
      </IconButton>
    </Box>
  );
};

export default ProductActionIcons;
