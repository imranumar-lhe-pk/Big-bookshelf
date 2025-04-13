"use client";
import React, { useEffect, useState, useCallback } from "react";
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
  InputBase,
  Collapse,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { useBookmark } from "../../Context/BookMarkContext";
import BookmarkDialog from "./BookmarkDialog";
import CartDialog from "./CartDialog";
import Signup from "../Signup/Signup";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import debounce from "lodash/debounce"; // Import debounce from lodash

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { bookmarkedItems, cartItems, allBooks } = useBookmark();
  const [bookmarkDialogOpen, setBookmarkDialogOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  // Check user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Animation effect for banner
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

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      setSignupDialogOpen(true);
    }
  };

  // Search toggle and handler
  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
    if (searchOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  // Debounced search function
  const performSearch = useCallback(
    debounce((query) => {
      if (query.trim() === "") {
        setSearchResults([]);
        setIsSearching(false);
      } else {
        setIsSearching(true);
        const filteredBooks = allBooks.filter((book) =>
          book.title?.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredBooks);
        setIsSearching(false);
      }
    }, 300), // 300ms debounce delay
    [allBooks] // Dependency array
  );

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    performSearch(query); // Call debounced search
  };

  const handleResultClick = (bookId) => {
    router.push(`/${bookId}`);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
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
              onClick={handleDashboardClick}
            >
              Dashboard
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
              position: "relative",
            }}
          >
            <IconButton
              color="inherit"
              size="small"
              onClick={handleSearchToggle}
              sx={{ p: 1 }}
            >
              <IoSearchSharp size={21} />
            </IconButton>
            <Collapse in={searchOpen} orientation="horizontal" timeout={300}>
              <InputBase
                placeholder="Search books…"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  width: { xs: "150px", sm: "200px" },
                  transition: "width 0.3s ease-in-out, background-color 0.2s",
                  "&:focus-within": {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                  },
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </Collapse>
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
                onClick={() => {
                  signOut(auth);
                  router.replace("/");
                }}
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

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            sx={{ display: { xs: "block", sm: "none" }, ml: "auto" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Search Results Dropdown */}
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: "78px",
            right: "20%",
            width: "200px",
            backgroundColor: "#1E1F21",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
            zIndex: 1300,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#F4CE47",
                borderRadius: "4px",
              },
            }}
          >
            {isSearching ? (
              <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={24} sx={{ color: "#F4CE47" }} />
              </Box>
            ) : searchResults.length > 0 ? (
              searchResults.map((book) => (
                <Box
                  key={book.id}
                  onClick={() => handleResultClick(book.id)}
                  sx={{
                    p: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(244, 206, 71, 0.15)",
                    },
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Box sx={{ width: { xs: "100%", md: "47%" } }}>
                    <CardMedia
                      component="img"
                      loading="lazy"
                      image={
                        book?.imageBase64 || "https://via.placeholder.com/150"
                      }
                      alt={book?.title || "Product Image"}
                      sx={{
                        width: { md: "90%", sm: "80%" },
                        height: "auto",
                        borderRadius: "8px",
                      }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                        console.error(
                          "Image loading failed, fallback triggered."
                        );
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: 1.2,
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "12px",
                        mt: "4px",
                      }}
                    >
                      {book.author}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "13px",
                        fontWeight: 700,
                        mt: "4px",
                      }}
                    >
                      Rs: {book.price}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : searchQuery.trim() !== "" ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  No results found
                </Typography>
              </Box>
            ) : (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Start typing to search
                </Typography>
              </Box>
            )}
          </Box>
        </motion.div>
      )}

      <Dialog open={signupDialogOpen} onClose={handleSignupDialogClose}>
        <Signup onClose={handleSignupDialogClose} redirectToCheckout={false} />
      </Dialog>

      <CartDialog open={cartDialogOpen} onClose={handleCartDialogClose} />
      <BookmarkDialog
        open={bookmarkDialogOpen}
        onClose={handleBookmarkDialogClose}
      />

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
          <ListItem button onClick={handleSearchToggle}>
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
