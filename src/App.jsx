import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routers from "./routers/routers.js";
import { SidebarProvider } from "./contexts/SidebarProvider.jsx";
import SideBar from "./component/sidebar/SideBar.jsx";
import { ToastProvider } from "./contexts/ToastProvider.jsx";
import { StoreProvider } from "./contexts/storeProvider.jsx";
import "../src/assets/styles/main.scss";
function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ToastProvider>
          <SidebarProvider>
            <SideBar />

            <Routes>
              {routers.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.component />}
                  />
                );
              })}
            </Routes>
          </SidebarProvider>
        </ToastProvider>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
