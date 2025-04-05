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

  useEffect(() => {
    localStorage.setItem("CheckoutItems", JSON.stringify(checkoutItems));
    localStorage.setItem("CheckoutPrice", checkoutPrice.toString());
    console.log("CheckoutItems updated in context:", checkoutItems);
  }, [checkoutItems, checkoutPrice]);

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
        return [...prevItems, { ...product, pdfBase64: product.pdfBase64 || "" }];
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

    console.log("Checkout called with items:", items);
    const checkoutArray = Array.isArray(items) ? [...items] : [items];
    setCheckoutItems(checkoutArray); // Set items first
    setCheckoutPrice(finalAmount);

    console.log("CheckoutItems set to:", checkoutArray);
    console.log("CheckoutPrice set to:", finalAmount);

    // Remove items from cart after setting checkoutItems
    if (Array.isArray(items)) {
      items.forEach((item) => removeCart(item.id));
    } else {
      removeCart(items.id);
    }
  };

  const clearAllCartAndBookmarks = () => {
    setCartItems([]);
    setBookmarkedItems([]);
    setCheckoutItems([]);
    setCheckoutPrice(0);
    localStorage.removeItem("Cart");
    localStorage.removeItem("Bookmark");
    localStorage.removeItem("CheckoutItems");
    localStorage.removeItem("CheckoutPrice");
  };

  const clearItemFromCartOrBookmarks = (product) => {
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
    setBookmarkedItems((prev) => prev.filter((item) => item.id !== product.id));
    setCheckoutItems((prev) => prev.filter((item) => item.id !== product.id));
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