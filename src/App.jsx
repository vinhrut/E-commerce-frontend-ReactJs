import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routers from "./routers/routers.js";
import { SidebarProvider } from "./contexts/SidebarProvider.jsx";
import SideBar from "./component/sidebar/SideBar.jsx";
import { ToastProvider } from "./contexts/ToastProvider.jsx";
import { StoreProvider } from "./contexts/storeProvider.jsx";
import "../src/assets/styles/main.scss";
import AdminLayout from "./component/AdminLayout/AdminLayout.jsx";
import AdminDashboard from "../public/Pages/Admin/Dashboard/AdminDashboard.jsx";
import AdminProducts from "../public/Pages/Admin/Products/AdminProducts.jsx";
import AdminOrders from "../public/Pages/Admin/Orders/AdminOrders.jsx";
import AdminInvoices from "../public/Pages/Admin/Invoices/AdminInvoices.jsx";
import AdminUsers from "../public/Pages/Admin/Users/AdminUsers.jsx";

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ToastProvider>
          <Routes>
            {/* Admin routes */}
            <Route path="/admin" element={<SidebarProvider><AdminLayout /></SidebarProvider>}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="invoices" element={<AdminInvoices />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>

            {/* Public / shop routes */}
            <Route
              path="*"
              element={
                <SidebarProvider>
                  <SideBar />
                  <Routes>
                    {routers.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        element={<route.component />}
                      />
                    ))}
                  </Routes>
                </SidebarProvider>
              }
            />
          </Routes>
        </ToastProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
