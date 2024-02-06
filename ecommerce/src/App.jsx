import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import CategoryFilters from "./components/CategoryFilters";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Checkout from "./stripe/Checkout";
import Success from "./stripe/Success";
import Cancel from "./stripe/Cancel";
import StripePayment from "./stripe/StripePayment";
import { CheckoutForm, Return } from "./stripe/stripeApp";
import StripeHome from "./stripe/stripe2/StripeHome";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import ProdDetail from "./pages/ProdDetail";
import User2 from "./components/User2";
import UserProfile from "./components/UserProfile";
import UserDetail from "./pages/UserDetail";
import ProdList from "./pages/ProdList";
import Page404 from "./pages/Page404";
import Account from "./components/Account";
import OrderSuccess from "./pages/OrderSuccess";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUs from "./pages/ContactUs";

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  useEffect(() => {
    () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setisAuthenticated(true);
          // to do save local storage
        } else {
          setisAuthenticated(false);
        }
      });
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserDetail />} />
          <Route path="/userProfile" element={<UserProfile />} />
          {/* <Route path="/checkout" element={<Checkout/>} /> */}
          {/* <Route path="/checkout" element={<StripePayment/>} /> */}
          <Route path="/return" element={<Return />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orderSuccess" element={<OrderSuccess />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/product/:id" element={<ProdDetail />} />
          <Route path="/product" element={<ProdList />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* <Route path="about" element={<AboutPage />} /> */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="account" element={<Account />} />
          <Route path="checkout" element={<StripeHome />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
