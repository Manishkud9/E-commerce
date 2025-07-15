import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    const retrieveCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(retrieveCart);
  }, []);

  // Login
  const login = (email, password) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
      toast.success("User Logged In Successfully..");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
    } else {
      toast.error("Invalid Credentials..");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  // Add item to cart
  const addToCart = (cartItem) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${cartItem.title} Added to Cart..`);
    setCart(updatedCart);
  };

  return (
    <authContext.Provider
      value={{ login, user, logout, addToCart, cart, setCart, search, setSearch }}
    >
      {children}
    </authContext.Provider>
  );
};