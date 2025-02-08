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
  DialogContent,
  Dialog,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import CreateAccountDialog from "./CreateAccountDialog";
import Link from "next/link";
import { useBookmark } from "../../Context/BookMarkContext";
import BookmarkDialog from "./BookmarkDialog";
import CartDialog from "./CartDialog";
import Signup from "../Signup/Signup";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase/config";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const { bookmarkedItems, cartItems } = useBookmark();
  const [bookmarkDialogOpen, setBookmarkDialogOpen] = useState();
  const [cartDialogOpen, setCartDialogOpen] = useState();

  const handleLogin = () => {
    setIsLogedIn(true);
    setDialogOpen(false);
  };

  const auth = getAuth(app);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // If user exists, set true; otherwise, false
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleBookmarkDialogOpen = () => {
    setBookmarkDialogOpen(true);
  };
  const handleBookmarkDialogClose = () => {
    setBookmarkDialogOpen(false);
  };
  const handleCartDialogOpen = () => {
    setCartDialogOpen(true);
  };
  const handleCartDialogClose = () => {
    setCartDialogOpen(false);
  };
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);

  const handleSignupDialogOpen = () => {
    setSignupDialogOpen(true);
  };

  const handleSignupDialogClose = () => {
    setSignupDialogOpen(false);
  };
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleSidebar = (open) => () => {
    setSidebarOpen(open);
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

            <Link href="/dashboard" passHref>
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
                Dashboard
              </Typography>
            </Link>
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
                onClick={() => signOut(auth)} // Logout Functionality
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
                onClick={handleSignupDialogOpen} // Open Signup/Login Modal
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Signup Modal */}
      <Dialog open={signupDialogOpen} onClose={handleSignupDialogClose}>
        <Signup onClose={handleSignupDialogClose} />
      </Dialog>
      <CreateAccountDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onLoginSuccess={handleLogin}
      />

      {/* Cart modal */}
      <CartDialog open={cartDialogOpen} onClose={handleCartDialogClose} />
      {/* Bookmark modal */}
      <BookmarkDialog
        open={bookmarkDialogOpen}
        onClose={handleBookmarkDialogClose}
      />

      {/* Drawer Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={toggleSidebar(true)}>
            {" "}
            {/* Button to open the BookmarkSidebar */}
            <ListItemIcon>
              <IconButton onClick={handleBookmarkDialogOpen}>
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
          <ListItem>
            <ListItemIcon>
              <Badge badgeContent={cartItems.length} color="error">
                <IoBagCheckOutline />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
          <ListItem></ListItem>
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
