// contexts/BookMarkContext.js
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
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    localStorage.setItem("Bookmark", JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addBookmark = (product) => {
    setBookmarkedItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const addCart = (product) => {
    setCartItems((prevItems) => {
      if (!prevItems.some((item) => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeBookmark = (productId) => {
    setBookmarkedItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const removeCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const totalPrice = useMemo(() => {
    return bookmarkedItems.reduce((total, item) => total + (item.price || 0), 0);
  }, [bookmarkedItems]);

  const totalCartPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  }, [cartItems]);

  const Checkout = (items) => {
    const calculateTotal = (items) => {
      if (Array.isArray(items)) {
        return items.reduce((sum, item) => sum + (item.price || 0), 0);
      } else {
        return items.price || 0;
      }
    };

    const totalAmount = calculateTotal(items);
    const deduction = totalAmount * 0.02;
    const finalAmount = totalAmount + deduction;

    if (Array.isArray(items)) {
      items.forEach((item) => removeCart(item.id));
    } else {
      removeCart(items.id);
    }

    setCheckoutItems(items);
    setCheckoutPrice(finalAmount);
  };

  const clearAllCartAndBookmarks = () => {
    setCartItems([]);
    setBookmarkedItems([]);
    localStorage.removeItem("Cart");
    localStorage.removeItem("Bookmark");
  };

  const clearItemFromCartOrBookmarks = (product) => {
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
    setBookmarkedItems((prev) => prev.filter((item) => item.id !== product.id));
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
        setAllBooks,
        allBooks,
        clearAllCartAndBookmarks,
        clearItemFromCartOrBookmarks,
      }}
    >
      {children}
    </BookMarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookMarkContext);