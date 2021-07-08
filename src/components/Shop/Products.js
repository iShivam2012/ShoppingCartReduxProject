import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DummyData = [
  { id: "p1", title: "First Book", price: 5, description: "My first book" },
  {
    id: "p2",
    title: "Second Book",
    price: 10,
    description: "My Second book",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DummyData.map((data) => (
          <ProductItem
            key={data.id}
            id={data.id}
            title={data.title}
            price={data.price}
            description={data.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
