import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAddress } from "../redux/user/userSlice";

function AddressList() {
  const { user, status, error, addresses } = useSelector((state) => state.user);
  console.log(addresses, "addresses");
  const dispatch = useDispatch();

  return (
    <div>
      {addresses &&
        addresses.map((address, index) => (
          <>
            <div
              key={address.addressId}
              className="mt-5 bg-white shadow cursor-pointer rounded-xl"
            >
              <div className="flex">
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <ul>
                    {/* <li className="text-xs text-gray-600 uppercase ">
                      Receiver
                    </li> */}
                    <li>{address?.street}</li>

                    <li>{address?.state}</li>
                    <li>{address?.pincode}</li>
                  </ul>
                </div>
                <div className="flex-1 py-5 pl-1 overflow-hidden">
                  <ul>
                    {/* <li className="text-xs text-gray-600 uppercase">Sender</li> */}
                    <li>{address?.city}</li>
                    <li>{address?.country}</li>
                  </ul>
                </div>
                <div className="flex-none pt-2.5 pr-2.5 pl-1">
                  <button
                  onClick={() => dispatch(removeAddress(address))}
                    type="button"
                    className="px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 focus:outline-none active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 focus:outline-none active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none"></path>
                      <path
                        d="M5 18.08V19h.92l9.06-9.06-.92-.92z"
                        opacity=".3"
                      ></path>
                      <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
    </div>
  );
}

export default AddressList;
