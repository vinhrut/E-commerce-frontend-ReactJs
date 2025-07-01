import Homepage from "../component/Homepage/Homepage";
import Blog from "../blog/Blog";
import OurShop from "../../public/Pages/OurShop/OurShop";
import AboutUs from "../../public/Pages/About us/AboutUs";
import Contact from "../../public/Pages/Contact/Contact";
import ViewCart from "../../public/Pages/ViewCart/ViewCart";
const routers = [
  {
    path: "/",
    component: Homepage,
  },
  {
    path: "/blog",
    component: Blog,
  },
  {
    path: "/shop",
    component: OurShop,
  },
  {
    path: "/aboutUs",
    component: AboutUs,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/viewCart",
    component: ViewCart,
  },
];

export default routers;
