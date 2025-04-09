"use client";
import React, { useState, useEffect } from "react";
import { AppBar, Box, IconButton, Modal } from "@mui/material";
import { IoHomeOutline, IoBookOutline, IoCartOutline, IoBookmarkOutline, IoPersonOutline, IoStatsChart } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase/config";
import { motion } from "framer-motion";
import Signup from "../Signup/Signup"; // Assuming you have this component
import CartDialog from "./CartDialog"; // Assuming you have this component
import BookmarkDialog from "./BookmarkDialog"; // Assuming you have this component
import { useBookmark } from "../../Context/BookMarkContext"; // Import the context

const MobileNavBar = () => {
  const [activePage, setActivePage] = useState("home");
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [bookmarkDialogOpen, setBookmarkDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();
  const { cartItems, bookmarkedItems } = useBookmark(); // Access cart and bookmarks from context

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    if (page === "home") {
      router.push("/");
    } else if (page === "books") {
      router.push("/books");
    } else if (page === "dashboard" && isLoggedIn) {
      router.push("/dashboard");
    } else if (page === "login") {
      setSignupDialogOpen(true); // Open Login/Signup Modal
    }
  };

  const handleCartClick = () => {
    if (cartItems.length > 0) {
      setCartDialogOpen(true); // Open Cart Dialog
    }
  };

  const handleBookmarkClick = () => {
    if (bookmarkedItems.length > 0) {
      setBookmarkDialogOpen(true); // Open Bookmark Dialog
    }
  };

  const handleSignupDialogClose = () => setSignupDialogOpen(false);
  const handleCartDialogClose = () => setCartDialogOpen(false);
  const handleBookmarkDialogClose = () => setBookmarkDialogOpen(false);

  const handleSignOut = () => {
    signOut(auth);
    setIsLoggedIn(false);
  };

  const handlePersonIconClick = () => {
    if (isLoggedIn) {
      // Show Logout Popup if user is logged in
      if (window.confirm("Do you want to log out?")) {
        handleSignOut();
      }
    } else {
      setSignupDialogOpen(true); // Open Login Modal if user is not logged in
    }
  };

  return (
    <Box sx={{ display: { xs: "flex", sm: "none" }, position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 1200 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2A2C2E",
          borderRadius: "10px",
          boxShadow: "none",
          display: "flex",
          justifyContent: "center",
          padding: "0",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 20px" }}>
          <IconButton
            color={activePage === "home" ? "#FFB84D" : "inherit"} // Active color mustard
            onClick={() => handlePageChange("home")}
          >
            <IoHomeOutline size={24} />
          </IconButton>
          <IconButton
            color={activePage === "books" ? "#FFB84D" : "inherit"} // Active color mustard
            onClick={() => handlePageChange("books")}
          >
            <IoBookOutline size={24} />
          </IconButton>
          <IconButton
            color={activePage === "dashboard" ? "#FFB84D" : "inherit"} // Active color mustard
            onClick={() => handlePageChange("dashboard")}
          >
            <IoStatsChart size={24} />
          </IconButton>
          <IconButton
            color={activePage === "cart" ? "#FFB84D" : "inherit"} // Active color mustard
            onClick={handleCartClick} // Open Cart Dialog
          >
            <IoCartOutline size={24} />
          </IconButton>
          <IconButton
            color={activePage === "bookmarks" ? "#FFB84D" : "inherit"} // Active color mustard
            onClick={handleBookmarkClick} // Open Bookmark Dialog
          >
            <IoBookmarkOutline size={24} />
          </IconButton>
          <IconButton
            color={activePage === "login" ? "#FFB84D" : "inherit"} // Active color mustard
            onClick={handlePersonIconClick} // Open login/logout dialog
          >
            <IoPersonOutline size={24} />
          </IconButton>
        </Box>
      </AppBar>

      {/* Modal for login/signup */}
      <Modal open={signupDialogOpen} onClose={handleSignupDialogClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Signup onClose={handleSignupDialogClose} />
          </motion.div>
        </Box>
      </Modal>

      {/* Cart Modal */}
      <Modal open={cartDialogOpen} onClose={handleCartDialogClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <CartDialog onClose={handleCartDialogClose} />
          </motion.div>
        </Box>
      </Modal>

      {/* Bookmark Modal */}
      <Modal open={bookmarkDialogOpen} onClose={handleBookmarkDialogClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <BookmarkDialog onClose={handleBookmarkDialogClose} />
          </motion.div>
        </Box>
      </Modal>
    </Box>
  );
};

export default MobileNavBar;
