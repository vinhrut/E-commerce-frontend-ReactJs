import Layout from "../Layout/LayoutForm";
import ProductItem from "../ProductItem/ProductItem";
import { container } from "./style.module.scss";

function PopularProduct({ data }) {
  return (
    <Layout>
      <div className={container}>
        {data.map((item, index) => (
          <ProductItem
            key={index}
            src={item.images[0]}
            prevSrc={item.images[1]}
            name={item.name}
            priceItem={item.price}
            details={item}
          />
        ))}
      </div>
    </Layout>
  );
}

export default PopularProduct;
