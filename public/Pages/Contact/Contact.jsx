import Footer from "../../../src/component/Footer/Footer";
import MyHeader from "../../../src/component/Header/Header";
import Layout from "../../../src/component/Layout/LayoutForm";
import style from "./style.module.scss";
import { IoHomeOutline } from "react-icons/io5";
import { TbPhoneOutgoing } from "react-icons/tb";
import { IoTimeOutline } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { MdFacebook } from "react-icons/md";

function Contact() {
  const {
    container,
    imgContact,
    table,
    tableLeft,
    tableRight,
    headline,
    iconBox,
    input1,
    message,
    buttonBox,
  } = style;
  return (
    <>
      <MyHeader />
      <Layout>
        <div className={container}>
          <div className={imgContact}></div>
          <div className={table}>
            <div className={tableLeft}>
              <div>
                <h2>Information</h2>
              </div>
              <div className={headline}></div>
              <div>
                <div>
                  <IoHomeOutline /> Address
                </div>
                7895 Piermont Dr NE Albuquerque, NM 198866
              </div>
              <div>
                <div>
                  <TbPhoneOutgoing /> Phone
                </div>
                +391 (0)35 2568 4593 hello@domain.com
              </div>
              <div>
                <div>
                  <IoTimeOutline /> Working hours
                </div>
                Monday - Friday 9:00 - 18:00
              </div>
              <div className={iconBox}>
                <MdFacebook style={{ fontSize: "40px" }} />
                <BiLogoInstagramAlt style={{ fontSize: "40px" }} />
                <IoLogoYoutube style={{ fontSize: "40px" }} />
                <FaTelegram style={{ fontSize: "35px" }} />
              </div>
            </div>
            <div className={tableRight}>
              <div style={{ fontSize: "30px" }}>Contact Us</div>
              <div className={headline}></div>
              <div>
                If you’ve got great products your looking to work with us then
                drop us a line.
              </div>
              <div className={input1}>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
              </div>
              <div className={message}>
                <textarea type="text" placeholder="Message" />
              </div>
              <div className={buttonBox}>Send Message</div>
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}

export default Contact;
