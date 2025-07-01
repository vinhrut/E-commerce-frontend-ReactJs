import Footer from "../../../src/component/Footer/Footer";
import MyHeader from "../../../src/component/Header/Header";
import Layout from "../../../src/component/Layout/LayoutForm";
import CountViewCart from "./countViewCart";
import { FaTrashAlt } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa6";
import { FaCcVisa } from "react-icons/fa6";

import {
  stepBox,
  stepLeft,
  stepMiddle,
  number,
  numberHighlight,
  formRight,
  formContainer,
  formLeft,
  formField,
  formFieldRight,
  formRightHigh,
  formRightLow,
  headline,
  btnProceed,
  btnContinue,
} from "./style.module.scss";

function ViewCart() {
  return (
    <>
      <MyHeader />
      <Layout>
        <div className={stepBox}>
          <div className={stepLeft}>
            <div className={numberHighlight}>1</div>
            <div>SHOPPING CART</div>
            <div>---------------</div>
          </div>
          <div className={stepMiddle}>
            <div className={numberHighlight}>2</div>
            <div>CHECK OUT</div>
            <div>---------------</div>
          </div>
          <div className={stepLeft}>
            <div className={number}>3</div>
            <div>ORDER STATUS</div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>Hurry up, these products are limited, checkout within</div>
          <CountViewCart minutes={10} fontSize={20} fontWeight={600} />
        </div>
        <div className={formContainer}>
          <div className={formLeft}>
            <div className={formField}>
              <div>PRODUCT</div>
              <div className={formFieldRight}>
                <div>PRICE</div>
                <div>SKU</div>
                <div>QUANTITY</div>
                <div>SUBTOTAL</div>
              </div>
            </div>
            <div className={headline}></div>
            <div style={{ height: "150px" }}></div>
            <div className={headline}></div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <input
                  type="text"
                  placeholder="Coupon code"
                  style={{ height: "25px", padding: "5px" }}
                />
                <div
                  style={{
                    padding: "5px",
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "14px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "3px",
                  }}
                >
                  APPLY
                </div>
              </div>
              <div
                style={{
                  border: "1px solid black",
                  padding: "5px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                <FaTrashAlt /> CLEAR SHOPPING CART
              </div>
            </div>
          </div>
          <div className={formRight}>
            <div className={formRightHigh}>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                CART TOTALS
              </span>
              <div className={headline}></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <div>Subtotal</div>
                <div>$Price</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                <div>Total</div>
                <div>$Price</div>
              </div>
              <div className={btnProceed}>PROCEED TO CHECKOUT</div>
              <div className={btnContinue}>CONTINUE SHOPPING</div>
            </div>
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Guaranteed safe checkout
            </div>
            <div className={formRightLow}>
              <FaCcPaypal style={{ fontSize: "50px", marginRight: "10px" }} />
              <FaCcMastercard
                style={{ fontSize: "50px", marginRight: "10px" }}
              />
              <FaCcVisa style={{ fontSize: "50px", marginRight: "10px" }} />
              <FaBitcoin style={{ fontSize: "50px", marginRight: "10px" }} />
              <SiAmericanexpress
                style={{ fontSize: "45px", marginRight: "10px" }}
              />
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}

export default ViewCart;
