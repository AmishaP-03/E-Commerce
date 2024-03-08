/**
 * Using component composition to avoid creating the unnecessary 'onAddItemToCart' prop
 */
export default function Shop({children}) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <ul id="products">{children}</ul>
    </section>
  );
}
