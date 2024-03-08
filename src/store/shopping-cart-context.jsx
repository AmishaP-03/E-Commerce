import { createContext } from "react";

/**
 * createContext() function will return an object containing a react component (named Provider)
 * The required initial value of the state should be passed to it.
 * 
 * Its purpose is to store the shopping cart items
 */
export const CartContext = createContext({
    items: []
});