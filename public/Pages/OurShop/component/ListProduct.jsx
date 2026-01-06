import { useContext } from "react";
import { OurShopContext } from "../../../../src/contexts/OurShopProvider";
import ProductItem from "../../../../src/component/ProductItem/ProductItem";
import Layout from "../../../../src/component/Layout/LayoutForm";
import styles from "../../OurShop/style.module.scss";

function ListProduct() {
  const { products, isShowGrid, isLoading, handleLoadMore, total, isLoadMore } =
    useContext(OurShopContext);
  const { containerProduct, boxLoadMore, btnLoadMore, listProductSession } =
    styles;

  return (
    <>
      <Layout>
        <div className={listProductSession}>
          {isLoading ? (
            <>Đang tải... </>
          ) : (
            <>
              <div className={isShowGrid ? containerProduct : ""}>
                {products.map((item, index) => (
                  <ProductItem
                    key={index}
                    src={item.images[0]}
                    prevSrc={item.images[1]}
                    name={item.name}
                    priceItem={item.price}
                    details={item}
                    isHomePage={false}
                  />
                ))}
              </div>
              {total > products.length && (
                <div className={boxLoadMore}>
                  <button className={btnLoadMore} onClick={handleLoadMore}>
                    {isLoadMore ? "Đang tải..." : "Xem thêm"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
}

export default ListProduct;
