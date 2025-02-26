"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Dialog,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { useBookmark } from "../../Context/BookMarkContext"; // Adjust path
import BookmarkDialog from "./BookmarkDialog";
import CartDialog from "./CartDialog";
import Signup from "../Signup/Signup";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase/config";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { bookmarkedItems, cartItems } = useBookmark();
  const [bookmarkDialogOpen, setBookmarkDialogOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // True if user exists, false otherwise
      console.log("User logged in status:", !!user); // Debug log
    });
    return () => unsubscribe();
  }, []);

  // Animation effect
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Modal handlers
  const handleBookmarkDialogOpen = () => setBookmarkDialogOpen(true);
  const handleBookmarkDialogClose = () => setBookmarkDialogOpen(false);
  const handleCartDialogOpen = () => setCartDialogOpen(true);
  const handleCartDialogClose = () => setCartDialogOpen(false);
  const handleSignupDialogOpen = () => setSignupDialogOpen(true);
  const handleSignupDialogClose = () => setSignupDialogOpen(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Handle Dashboard click with authentication check
  const handleDashboardClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      setSignupDialogOpen(true); // Open login modal if not logged in
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#2A2C2E",
          borderRadius: "10px",
          width: { xs: "100%", sm: "95%" },
          mt: 2,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/">
            <Box
              component="img"
              sx={{ height: { xs: "25px", sm: "35px" }, flexShrink: 0 }}
              src="/logo.png"
              alt="Logo"
            />
          </Link>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            sx={{ display: { xs: "block", sm: "none" }, ml: "auto" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Link href="/books" passHref>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  display: { xs: "none", sm: "block" },
                  padding: "6px 12px",
                  borderRadius: "8px",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#F4CE47",
                    color: "white",
                    cursor: "pointer",
                  },
                }}
              >
                Books
              </Typography>
            </Link>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                display: { xs: "none", sm: "block" },
                padding: "6px 12px",
                borderRadius: "8px",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#F4CE47",
                  color: "white",
                  cursor: "pointer",
                },
              }}
              onClick={handleDashboardClick} // Use same handler as login for consistency
            >
              Dashboard
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              color="inherit"
              size="small"
              onClick={handleBookmarkDialogOpen}
            >
              <Badge badgeContent={bookmarkedItems?.length} color="error">
                <FaRegBookmark size={21} />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              onClick={handleCartDialogOpen}
            >
              <Badge badgeContent={cartItems?.length} color="error">
                <IoBagCheckOutline size={21} />
              </Badge>
            </IconButton>
            {isLoggedIn ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "white",
                  "&:hover": { backgroundColor: "#B71C1C" },
                }}
                onClick={() => signOut(auth)}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#F4CE47",
                  color: "black",
                  "&:hover": { backgroundColor: "#e0b832" },
                }}
                onClick={handleSignupDialogOpen}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Signup Modal */}
      <Dialog open={signupDialogOpen} onClose={handleSignupDialogClose}>
        <Signup onClose={handleSignupDialogClose} redirectToCheckout={false} />
      </Dialog>

      {/* Cart and Bookmark Modals */}
      <CartDialog open={cartDialogOpen} onClose={handleCartDialogClose} />
      <BookmarkDialog open={bookmarkDialogOpen} onClose={handleBookmarkDialogClose} />

      {/* Drawer Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={handleBookmarkDialogOpen}>
            <ListItemIcon>
              <IconButton>
                <Badge badgeContent={bookmarkedItems.length} color="error">
                  <FaRegBookmark />
                </Badge>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Bookmarks" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IoSearchSharp />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button onClick={handleCartDialogOpen}>
            <ListItemIcon>
              <Badge badgeContent={cartItems.length} color="error">
                <IoBagCheckOutline />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
          <ListItem />
        </List>
      </Drawer>

      <Box
        component="img"
        src="/H1.png"
        sx={{
          width: { xs: "100%", sm: "95%" },
          mt: 2,
          height: "auto",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      />
    </Box>
  );
};

export default NavBar;