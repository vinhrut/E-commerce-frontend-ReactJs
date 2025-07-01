import Footer from "../../../src/component/Footer/Footer";
import MyHeader from "../../../src/component/Header/Header";
import Layout from "../../../src/component/Layout/LayoutForm";
import { OurShopProvider } from "../../../src/contexts/OurShopProvider";
import Banner from "./component/Banner";
import Filter from "./component/Filter";
import ListProduct from "./component/ListProduct";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";

function OurShop() {
  const { container, functionBox, specialText, btnBack, btnHome } = style;
  const navigate = useNavigate();
  const handleBackPage = () => {
    navigate(-1);
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <>
      <OurShopProvider>
        <Layout>
          <MyHeader />
          <div className={container}>
            <div className={functionBox}>
              <div>
                <span className={btnHome} onClick={() => handleBackHome()}>
                  Home
                </span>{" "}
                &gt; <span className={specialText}>Shop</span>
              </div>
              <div className={btnBack} onClick={() => handleBackPage()}>
                &lt; Return to previous page
              </div>
            </div>
            <Banner />
            <div>
              <Filter />
              <ListProduct />
            </div>
          </div>
        </Layout>
        <Footer />
      </OurShopProvider>
    </>
  );
}

export default OurShop;
