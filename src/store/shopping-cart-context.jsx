import { createContext, useReducer, useState } from "react";
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

/**
 * Defined outside as it should not be re-created everytime the component function executes
 */
function shoppingCartReducer(state, action) {
    if(action.type === 'ADD_ITEM') {
        // While executing the reducer function upon dispatch of an action, React makes sure to pass the latest state to it.
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
            updatedItems.push({
                id: action.payload.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            items: updatedItems,
        };

    }

    if(action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
        };
    }
    return state;
}

export default function CartContextProvider({children}) {
    const [shoppingCartState, shoppingCartActionDispatch] = useReducer(
        shoppingCartReducer,
        {
            items: [],
        }
    );

    function handleAddItemToCart(id) {
        shoppingCartActionDispatch({
            type: 'ADD_ITEM',
            payload: {
                id
            }
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartActionDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId,
                amount
            }
        });
    }

    const contextValue = {
        items: shoppingCartState.items,
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
