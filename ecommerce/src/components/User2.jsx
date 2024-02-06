import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { Cloudinary } from "@cloudinary/url-gen";
import { setToken, setUser } from "../redux/user/userSlice";
import axios from "axios";
import { AddressModal } from "./AddressModal";
import AddressList from "./AddressList";

function User2() {
  const dispatch = useDispatch();

  const { user, status, error, addresses } = useSelector((state) => state.user);

  console.log(user, "user");
  console.log(addresses, "addresses");
  const auth = getAuth();
  console.log(auth.currentUser, "auth.currentUser");

  // State to store the selected image file
  const [imageFile, setImageFile] = useState(null);

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Assume you have a function to upload the image to Cloudinary
  const uploadImageToCloudinary = async (imageFile) => {
    try {
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "Profile");
      data.append("cloud_name", "dc4gfoeno");
      console.log(data, "data");
      const cloudinaryResponse = await axios(
        "https://api.cloudinary.com/v1_1/dc4gfoeno/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const cloudinaryData = await cloudinaryResponse.data;
      console.log(cloudinaryData, "cloudinaryData");
      return cloudinaryData.secure_url; // Assuming you get the secure URL of the uploaded image
    } catch (error) {
      throw new Error("Error uploading image to Cloudinary: " + error.message);
    }
  };

  const handleUpdatePhoto = async () => {
    if (imageFile) {
      try {
        const photoURL = await uploadImageToCloudinary(imageFile);
        console.log(photoURL, "photoURL");
        // Use the provided Firebase function to update the user's profile
        const user = await updateProfile(auth.currentUser, { photoURL });
        console.log(user, "user by profile");
        dispatch(setUser(user));
        dispatch(setToken(user.accessToken));

        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        // Profile updated successfully
        // // Save user details to Firestore
        // saveUserDetail(currentUser);
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    }
  };

  // updateProfile(auth.currentUser, {
  //   displayName: "Zeenat", photoURL: "https://example.com/jane-q-user/profile.jpg", phoneNumber:""
  // }).then(() => {
  //   // Profile updated!
  //   // ...
  // }).catch((error) => {
  //   // An error occurred
  //   // ...
  // });
  return (
    <div>
      <div className="p-2">
        <div className="p-8 bg-white shadow ">
          {" "}
          {/* <div className="grid grid-cols-1 md:grid-cols-2">
           
            
            <div className="relative">
              
              <div className="w-48 h-48 bg-indigo-100 me-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-start text-indigo-500">
                {user?.photoURL ? (
                  <div className=" ">
                    <img
                      src={user?.photoURL}
                      alt=""
                      className="object-fill rounded-full w-48 h-48"
                    />
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>{" "}
            </div>{" "}
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className=""
                />
              </div>
              <button
                onClick={handleUpdatePhoto}
                disabled={!imageFile}
                className="text-white text-sm py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                {" "}
                Update Photo
              </button>{" "}
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Update User Details
              </button>{" "}
            </div>{" "}
          </div> */}
          {/* form */}
          <div className="">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Users Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Personal details .
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user?.displayName}
                  </dd>
                </div>
                {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Application for</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Backend Developer</dd>
          </div> */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user?.email}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user?.phone}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Addresses 
                    <span className="ms-10">
                      </span>
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <div className="flex justify-end">

                    <AddressModal className="my-2 "/>
                    </div>
                    <AddressList />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          {/* <div className="mt-20 text-center border-b pb-12">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700">
              {user?.displayName}
            </h1>{" "}
            <p className="font-light text-gray-600 mt-3">India</p>{" "}
            <p className="mt-8 text-gray-500">{user?.email}</p>{" "}
            <p className="mt-2 text-gray-500">Phone</p>{" "}
          </div>{" "}
          <div className="mt-12 flex flex-col justify-center">
            {" "}
            <h1 className="">Address</h1>
            <AddressModal />
            <AddressList />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default User2;
