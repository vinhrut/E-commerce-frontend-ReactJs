import MyHeader from "../../component/Header/Header";
import AdvanceHeading from "../AdvanceHeading/AdvanceHeading";
import Banner from "../Banner/Banner";
import style from "./style.module.scss";
import Info from "../Info/Info";
import HeadingListProduct from "../HeadingListProduct/HeadingListProduct";
import { useEffect, useState } from "react";
import { getProducts } from "../../../src/apis/productsService";
import PopularProduct from "../PopularProduct/PopularProduct";
import SaleHomePage from "../SaleHomePage/SaleHomePage";
import Footer from "../Footer/Footer";

function Homepage() {
  const { container } = style;

  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        // Backend trả: { code: 1000, message: "...", result: ProductResponse[] }
        if (response.code === 1000) {
          setListProducts(response.result);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className={container}>
        <MyHeader />
        <Banner />
        <Info />
        <AdvanceHeading />
        <HeadingListProduct data={listProducts.slice(0, 2)} />
        <PopularProduct data={listProducts.slice(2, 10)} />
        <SaleHomePage />
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
