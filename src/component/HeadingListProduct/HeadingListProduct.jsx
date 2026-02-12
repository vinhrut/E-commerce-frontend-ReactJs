import { container, containerItem } from "./style.module.scss";
import Layout from "../Layout/LayoutForm";
import CountdownBanner from "../CountdownBanner/CountdownBanner";
import ProductItem from "../ProductItem/ProductItem";

function HeadingListProduct({ data }) {
  const targetTime = "2025-12-31T23:59:59";
  return (
    <Layout>
      <div className={container}>
        <CountdownBanner />
        <div className={containerItem}>
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
      </div>
    </Layout>
  );
}

export default HeadingListProduct;
