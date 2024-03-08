import { createContext } from "react";

/**
 * createContext() function will return an object containing a react component (named Provider)
 * The required initial value of the state should be passed to it. This just helps with the defining the object structure and properities, helps in autocompletion of code.
 * 
 * Its purpose is to store the shopping cart items
 */
export const CartContext = createContext({
    items: [],
    onAddItemToCart: () => {}
});