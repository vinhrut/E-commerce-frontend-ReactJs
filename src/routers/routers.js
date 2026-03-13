import Homepage from "../component/Homepage/Homepage";
import Blog from "../blog/Blog";
import OurShop from "../../public/Pages/OurShop/OurShop";
import AboutUs from "../../public/Pages/About us/AboutUs";
import Contact from "../../public/Pages/Contact/Contact";
import ViewCart from "../../public/Pages/ViewCart/ViewCart";
import ProductDetail from "../../public/Pages/ProductDetail/ProductDetail";
import Checkout from "../../public/Pages/Checkout/Checkout";
import PaymentReturn from "../../public/Pages/PaymentReturn/PaymentReturn";
import MyOrders from "../../public/Pages/MyOrders/MyOrders";

const routers = [
  { path: "/", component: Homepage },
  { path: "/blog", component: Blog },
  { path: "/shop", component: OurShop },
  { path: "/aboutUs", component: AboutUs },
  { path: "/contact", component: Contact },
  { path: "/viewCart", component: ViewCart },
  { path: "/product/:id", component: ProductDetail },
  { path: "/checkout", component: Checkout },
  { path: "/payment-return", component: PaymentReturn },
  { path: "/my-orders", component: MyOrders },
];

export default routers;
