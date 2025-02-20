import React from "react";
import { IconButton, Box } from "@mui/material";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useBookmark } from "../../Context/BookMarkContext";

const ProductActionIcons = ({ product }) => {
  const router = useRouter();
  const { addCart } = useBookmark();

  const handleIconClick = (path) => {
    router.push(path); // Navigate to the selected path
  };

  // Handle adding the product to the cart
  const handleAddCartClick = () => {
    addCart(product); // Add product to cart using productId
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
        width: 90,
      }}
    >
      <IconButton
        sx={{ fontSize: "20px", color: "#2A2C2E" }}
        onClick={() => router.push(`/${product.id}`)} // Redirect to product details page
        alt="details"
      >
        <IoIosInformationCircleOutline />
      </IconButton>
      <IconButton
        sx={{ fontSize: "17px", color: "#2A2C2E" }}
        onClick={handleAddCartClick} // Add to cart
        alt="Buy Now"
      >
        <MdOutlineShoppingCartCheckout />
      </IconButton>
      {/* <IconButton
        sx={{ fontSize: "17px", color: "#2A2C2E" }}
        onClick={() => handleIconClick("/payment")} // Exchange
        alt="Exchange"
      >
        <LiaExchangeAltSolid />
      </IconButton> */}
    </Box>
  );
};

export default ProductActionIcons;
