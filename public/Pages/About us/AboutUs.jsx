import Footer from "../../../src/component/Footer/Footer";
import MyHeader from "../../../src/component/Header/Header";
import Layout from "../../../src/component/Layout/LayoutForm";
import { AboutUsProvider } from "../../../src/contexts/AboutUsProvider";
import ContentItem from "./component/ContentItem";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import Question from "./component/Question";
function AboutUs() {
  const {
    container,
    functionBox,
    specialText,
    btnBack,
    btnHome,
    titleBox,
    headline,
    middleTitleBox,
    contentBox,
    logoBox,
  } = style;

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  const handleBackHome = () => {
    navigate("/");
  };
  return (
    <>
      <AboutUsProvider>
        <MyHeader />
        <Layout>
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
            <span>We try our best for you</span>
            <div className={titleBox}>
              <div className={headline}></div>
              <div className={middleTitleBox}>
                <h2>Welcome to the Vrut04 Shop</h2>
              </div>
              <div className={headline}></div>
            </div>
            <div className={contentBox}>
              <div>
                <ContentItem
                  image="../../../src/assets/icon/images/About_1.webp"
                  text="Ac eget cras augue nisi neque lacinia in aliquam. Odio pellentesque sed ultrices dolor amet nunc habitasse proin consec. tur feugiat egestas eget."
                />
              </div>
              <div>
                <ContentItem
                  image="../../../src/assets/icon/images/about_1.webp"
                  text="Arcu volutpat sollicitudin sapien sit justo tellus eu fames aenean. Faucibus at eu nulla adipiscing. Ipsum a morbi tortor ullamcorper sit semper."
                />
              </div>
              <div>
                <ContentItem
                  image="../../../src/assets/icon/images/about_1.webp"
                  text="Nibh luctus eu dignissim sit. Lorem netus ultrices neque elementum. Et convallis consectetur lacus luctus iaculis quisque sed."
                />
              </div>
            </div>
            <div className={logoBox}>
              <img
                src="../../../src/assets/icon/images/logoAbout 1.webp"
                alt=""
              />
              <img
                src="../../../src/assets/icon/images/logoAbout 2.webp"
                alt=""
              />
              <img
                src="../../../src/assets/icon/images/logoAbout 3.webp"
                alt=""
              />
              <img
                src="../../../src/assets/icon/images/logoAbout 4.webp"
                alt=""
              />
              <img
                src="../../../src/assets/icon/images/logoAbout 5.webp"
                alt=""
              />
            </div>
            <span>WE ARE HAPPING TO HELP YOU</span>
            <div className={titleBox}>
              <div className={headline}></div>
              <div className={middleTitleBox}>
                <h2>Have Any Questions?</h2>
              </div>
              <div className={headline}></div>
            </div>
            <Question />
          </div>
        </Layout>
        <Footer />
      </AboutUsProvider>
    </>
  );
}

export default AboutUs;
