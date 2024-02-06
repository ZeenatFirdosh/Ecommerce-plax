/* eslint-disable react/prop-types */
import { Rating } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import userProfile from "../assets/images/profile-user.png";
function Comment({ reviews }) {
  const { user, status, error, addresses } = useSelector((state) => state.user);

  console.log(user, "user");
  console.log(addresses, "addresses");

  return (
    <div className="grid grid-cols-3 gap-1">
      {reviews &&
        reviews.map((review) => (
          <>
            <div
              key={review.id}
              className=" bg-white shadow grid min-h-[90px]  place-items-center overflow-x-scroll rounded-lg p-4 lg:overflow-visible"
            >
              <div className="px-8 text-center">
                
                <img
                  src={userProfile}
                  alt="image"
                  className="relative inline-block h-[30px] w-[30px] !rounded-full object-cover object-center "
                />
                <h6 className="block mt-1 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
                  {user?.displayName}
                </h6>
                <p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  {review.review}
                </p>
                <div className="inline-flex items-center">
                  <Rating value={review.rating} readonly />
                </div>
              </div>
            </div>
          </>
        ))}
      {/* <div className="grid min-h-[90px] w-1/2 place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <div className="px-8 text-center">
        <h2 className="mb-6 block font-sans text-xl font-medium leading-[1.3] tracking-normal text-blue-gray-900 antialiased">
          This is an excellent product, the documentation is excellent and
          helped me get things done more efficiently.
        </h2>
        <img
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
          alt="image"
          className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center "
        />
        <h6 className="block mt-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
          Tania Andrew
        </h6>
        <p className="block mb-4 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          Lead Frontend Developer
        </p>
        <div className="inline-flex items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-700 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-700 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-700 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-700 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-700 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
      </div>
        </div> */}
    </div>
  );
}

export default Comment;
