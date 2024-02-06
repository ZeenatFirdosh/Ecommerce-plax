import React from 'react'

function OrderSuccess() {
  return (
    <section>
    <div className="pt-12 pb-24 bg-blueGray-100">
      <div className="container px-4 mx-auto">
        <ul className="flex flex-wrap items-center mb-10 xl:mb-0">
          <li className="mr-6">
            <a className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-500" href="#">
              <span>Home</span>
              <svg className="ml-6" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.150291 0.898704C-0.0500975 0.692525 -0.0500975 0.359292 0.150291 0.154634C0.35068 -0.0507836 0.674443 -0.0523053 0.874831 0.154634L3.7386 3.12787C3.93899 3.33329 3.93899 3.66576 3.7386 3.8727L0.874832 6.84594C0.675191 7.05135 0.35068 7.05135 0.150292 6.84594C-0.0500972 6.63976 -0.0500972 6.30652 0.150292 6.10187L2.49888 3.49914L0.150291 0.898704Z" fill="currentColor"></path>
              </svg>
            </a>
          </li>
          <li className="mr-6">
            <a className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-500" href="#">
              <span>Store</span>
              <svg className="ml-6" width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.150291 0.898704C-0.0500975 0.692525 -0.0500975 0.359292 0.150291 0.154634C0.35068 -0.0507836 0.674443 -0.0523053 0.874831 0.154634L3.7386 3.12787C3.93899 3.33329 3.93899 3.66576 3.7386 3.8727L0.874832 6.84594C0.675191 7.05135 0.35068 7.05135 0.150292 6.84594C-0.0500972 6.63976 -0.0500972 6.30652 0.150292 6.10187L2.49888 3.49914L0.150291 0.898704Z" fill="currentColor"></path>
              </svg>
            </a>
          </li>
          <li><a className="text-sm font-medium text-indigo-500 hover:text-indigo-600" href="#">Your cart</a></li>
        </ul>
        <div className="pb-9 mb-7 text-center border-b border-black border-opacity-5">
          <h2 className="text-9xl xl:text-10xl leading-normal font-heading font-medium text-center">Your order</h2>
        </div>
        <div className="md:flex md:flex-wrap">
          <div className="w-full md:w-7/12 xl:w-9/12 md:pr-7 mb-14 md:mb-0">
            <div className="sm:flex sm:items-center p-8 xl:py-10 xl:px-20 mb-4 bg-white rounded-3xl">
              <img className="mb-6 sm:mb-0 mx-auto sm:ml-0 sm:mr-0" src="uinel-assets/elements/ecommerce-order/accept.svg" alt="" />
              <h3 className="sm:ml-10 text-lg xl:text-xl font-heading font-medium text-center md:text-left">Payment completed successfully!</h3>
            </div>
            <div className="p-8 xl:py-12 xl:px-16 mb-10 xl:mb-16 bg-white rounded-3xl">
              <p className="sm:pl-7 mb-11 text-gray-400 font-medium">What you ordered:</p>
              <div className="sm:flex sm:items-center pb-7 mb-7 border-b border-black border-opacity-5">
                <a href="#">
                  <img className="h-16 sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 object-cover" src="uinel-assets/images/ecommerce-order/iphone.png" alt="" />
                </a>
                <div>
                  <a className="inline-block mb-1 text-lg hover:underline font-heading font-medium" href="#">Apple iPhone 12 Pro (128GB)</a>
                  <div className="flex flex-wrap">
                    <p className="mr-4 text-sm font-medium">
                      <span className="font-heading">Color:</span>
                      <span className="ml-2 text-gray-400">Silver</span>
                    </p>
                    <p className="text-sm font-medium">
                      <span>Qty:</span>
                      <span className="ml-2 text-gray-400">1</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:flex sm:items-center">
                <a href="#">
                  <img className="h-16 sm:pl-7 mb-6 sm:mb-0 sm:mr-12 mx-auto sm:ml-0 object-cover" src="uinel-assets/images/ecommerce-order/headphones.png" alt="" />
                </a>
                <div>
                  <a className="inline-block mb-1 text-lg hover:underline font-heading font-medium" href="#">Apple iPhone 12 Pro (128GB)</a>
                  <div className="flex flex-wrap">
                    <p className="mr-4 text-sm font-medium">
                      <span className="font-heading">Color:</span>
                      <span className="ml-2 text-gray-400">Silver</span>
                    </p>
                    <p className="text-sm font-medium">
                      <span>Qty:</span>
                      <span className="ml-2 text-gray-400">1</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:w-96"><a className="block py-5 px-10 w-full text-lg xl:text-xl leading-6 font-medium tracking-tighter font-heading text-center bg-white focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl" href="#">Back to shop</a></div>
          </div>
          <div className="w-full md:w-5/12 xl:w-3/12 md:pl-7">
            <h2 className="mb-7 md:mt-6 text-3xl font-heading font-medium">Details</h2>
            <div className="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
              <span>Subtotal</span>
              <span className="flex items-center text-xl">
                <span className="mr-2 text-base">$</span>
                <span>710,70</span>
              </span>
            </div>
            <div className="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
              <span>Shipping</span>
              <span className="flex items-center text-xl">
                <span className="mr-2 text-base">$</span>
                <span>10,00</span>
              </span>
            </div>
            <div className="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white font-heading font-medium rounded-3xl">
              <span>Total</span>
              <span className="flex items-center text-xl text-blue-500">
                <span className="mr-2 text-base">$</span>
                <span>720,70</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default OrderSuccess