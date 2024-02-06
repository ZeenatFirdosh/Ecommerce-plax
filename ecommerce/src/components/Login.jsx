import { Link } from "react-router-dom/dist";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, setToken } from "../redux/user/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AlertRed from "../utils/AlertRed";
import { AlertDismissible } from "../utils/AlertDismissible";
import { setUser } from "../redux/user/userSlice";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Login() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setAlert(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log(userCredentials, "userCredentials");
      const user = userCredentials.user;
      console.log(user, "userlogin");
      // Dispatch action to save user data
      dispatch(setUser(user));
      dispatch(setToken(user.accessToken));
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      Navigate("/"); // Redirect to login page after signup
    } catch (error) {
      console.error(error);
      toast.warning(error.message);
      setAlert(error.message);
    }
    // dispatch(loginUser(formData));
  };
  const handleForgetPw = async (e) => {
    e.preventDefault();
    try {
      // const userCredentials = await signInWithEmailAndPassword(auth,formData.email, formData.password)
      const userCredentials = await sendPasswordResetEmail(
        auth,
        formData.email
      );
      console.log(userCredentials, " Password reset email sent!");
      // Show a success toast message
      toast.success("Password reset email sent!");
      toast.success("Please check your email");

      // Navigate('/'); // Redirect to login page after signup
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      Navigate("/login");
    }
    // dispatch(loginUser(formData));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(loginUser(formData));
  //   Navigate('/home'); // Redirect to login page after signup
  // };
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      {/* Toast container */}
      <ToastContainer />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <button
                    onClick={handleForgetPw}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* alert */}
            {alert && <AlertDismissible alert={alert} />}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
            <Link to="/" className="text-center">
          <div className="flex justify-center mt-3 bg-gray-900 text-white rounded-md py-1">
              Back
          </div>
            </Link>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start by creating an account
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
