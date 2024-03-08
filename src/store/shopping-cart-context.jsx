import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

/**
 * createContext() function will return an object containing a react component (named Provider)
 * The initial value of the state should be passed to it. This just helps with the defining the object structure and properities, helps in autocompletion of code.
 * 
 * Its purpose is to store the shopping cart items
 */
export const CartContext = createContext({
    items: [],
    onAddItemToCart: () => {},
    onUpdateCartItemQuantity: () => {}
});

export default function CartContextProvider({children}) {
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });

    function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (cartItem) => cartItem.id === id
            );
            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                const product = DUMMY_PRODUCTS.find((product) => product.id === id);
                updatedItems.push({
                    id: id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }

            return {
                items: updatedItems,
            };
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === productId
            );

            const updatedItem = {
                ...updatedItems[updatedItemIndex],
            };

            updatedItem.quantity += amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
            };
        });
    }

    const contextValue = {
        items: shoppingCart.items,
        onAddItemToCart: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity
    }

    /** Value is a mandatory prop on Provider component. 
     *  1. It is used to set a default value and is used only if a comp that was
        not wrapped by the Provider comp tries to access the context value 

        2. It is used to link the state's properities to the context
    **/
    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}
