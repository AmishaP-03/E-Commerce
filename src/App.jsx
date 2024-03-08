import CartContextProvider from './store/shopping-cart-context.jsx';
import Header from './components/Header.jsx';
import Product from './components/Product.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {
  return (
    // Wrapping the concerned components (which are making use of the cart state) with CartContext
    // CartContext.Provider -> React component which provides the context
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
