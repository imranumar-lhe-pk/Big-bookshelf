"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const BookMarkContext = createContext();

const GetItems = () => {
  const storedItems = localStorage.getItem("Cart");
  return storedItems ? JSON.parse(storedItems) : [];
};
const GetBookmarkItems = () => {
  const storedItems = localStorage.getItem("Bookmark");
  return storedItems ? JSON.parse(storedItems) : [];
};
export const BookMarkProvider = ({ children }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState(GetBookmarkItems());
  const [cartItems, setCartItems] = useState(GetItems());
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutPrice, setCheckoutPrice] = useState(0);

  // Add item to bookmarks
  const addBookmark = (product) => {
    setBookmarkedItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  //total for bookmark
  const totalPrice = useMemo(() => {
    localStorage.setItem("Bookmark", JSON.stringify(bookmarkedItems));
    return bookmarkedItems.reduce((total, item) => total + item.priceNew, 0);
  }, [bookmarkedItems]);
  //total for cart
  const totalCartPrice = useMemo(() => {
    localStorage.setItem("Cart", JSON.stringify(cartItems));
    return cartItems.reduce((total, item) => total + item.priceNew, 0);
  }, [cartItems]);

  // Add item to cart
  const addCart = (product) => {
    setCartItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  // Remove item from bookmarks
  const removeBookmark = (productId) => {
    setBookmarkedItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Remove item from cart
  const removeCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };
  const Checkout = (items) => {
    const calculateTotal = (items) => {
      if (Array.isArray(items)) {
        return items.reduce((sum, item) => sum + item.priceNew, 0);
      } else {
        return items.priceNew; // Single item case
      }
    };
  
    const totalAmount = calculateTotal(items);
    const deduction = totalAmount * 0.02; // 2% deduction
    const finalAmount = totalAmount + deduction;
  
   
    // Remove the items paid for
    if (Array.isArray(items)) {
      items.forEach((item) => {
        removeCart(item.id); // If they were already in the cart
      });
    } else {
      removeCart(items.id); // If it was already in the cart
    }
  
    setCheckoutItems(items); // Update the checkout state
    setCheckoutPrice(finalAmount); // Update the total price with deduction
  };

  // Clear all cart and bookmark items
  const clearAllCartAndBookmarks = () => {
    setCartItems([]);

    localStorage.removeItem("Cart");

    console.log("All items cleared from cart and bookmarks.");
  };

  // Remove a single item from cart or bookmarks
  const clearItemFromCartOrBookmarks = (product) => {
    // Check and remove from cart
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.filter(
        (item) => item.id !== product.id
      );
      localStorage.setItem("Cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    // Check and remove from bookmarks
    setBookmarkedItems((prevBookmarkedItems) => {
      const updatedBookmarks = prevBookmarkedItems.filter(
        (item) => item.id !== product.id
      );
      localStorage.setItem("Bookmark", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });

    console.log(`Removed item with ID: ${product.id} from cart or bookmarks.`);
  };

  return (
    <BookMarkContext.Provider
      value={{
        bookmarkedItems,
        addBookmark,
        removeBookmark,
        cartItems,
        addCart,
        removeCart,
        totalPrice,
        totalCartPrice,
        Checkout,
        setCheckoutItems,
        checkoutItems,
        checkoutPrice,
      }}
    >
      {children}
    </BookMarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookMarkContext);
