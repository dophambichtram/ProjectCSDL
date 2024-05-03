// App.js
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Loading } from "./components";
import { ROUTE } from "./constants/route";

const Login = React.lazy(() => import("./pages/Login/Login"));
const Error = React.lazy(() => import("./pages/Error/Error"));
const ProtectedRoute = React.lazy(() =>
  import("./pages/ProtectedRoute/ProtectedRoute")
);
const FixedLayout = React.lazy(() => import("./pages/FixedLayout/FixedLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const Order = React.lazy(() => import("./pages/Order/Order"));
const Product = React.lazy(() => import("./pages/Product/Product"));
const Customer = React.lazy(() => import("./pages/Customer/Customer"));

function App() {
  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          {/* <Sidebar /> */}
          <Routes>
            <Route
              path={ROUTE.INDEX}
              element={
                <ProtectedRoute>
                  <FixedLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<Loading center />}>
                    <Order />
                  </Suspense>
                }
              ></Route>
              <Route
                path={ROUTE.CUSTOMER}
                element={
                  <Suspense fallback={<Loading center />}>
                    <Customer />
                  </Suspense>
                }
              ></Route>
              <Route
                index
                path={ROUTE.ORDER}
                element={
                  <Suspense fallback={<Loading center />}>
                    <Order />
                  </Suspense>
                }
              ></Route>
              <Route
                path={ROUTE.PRODUCT}
                element={
                  <Suspense fallback={<Loading center />}>
                    <Product />
                  </Suspense>
                }
              ></Route>
            </Route>
            {/* <Route path="/dashboard" element={<MainDash />} />
            <Route path="/products" element={<Product />} /> */}
            <Route
              path={ROUTE.LOGIN}
              element={
                <Suspense fallback={<Loading center />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path={ROUTE.ALL}
              element={
                <Suspense fallback={<Loading center />}>
                  <Error />
                </Suspense>
              }
            ></Route>
          </Routes>
          {/* <RightSide /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
