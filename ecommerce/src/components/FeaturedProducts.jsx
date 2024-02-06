import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeaturedProducts } from "../redux/product/productsSlice";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  const dispatch = useDispatch();
  const { featuredProducts, featuredProductsStatus } = useSelector((state) => state.product);
  console.log(featuredProducts,"featuredProducts");

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
},[dispatch]  );


  return (
    <div>
    {featuredProductsStatus === 'loading' ? (
      <div>Loading...</div>
    ) : (
      <div>
        <div className="bg-white">
      <div>
        

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <div className='flex flex-1 justify-center'>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Featured Products</h1>
            </div>

            <div className="flex items-center">
             
              
              {/* <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button> */}
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

              

              {/* Product grid */}
              <div className="lg:col-span-4">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts &&
            featuredProducts?.map((product) => (
              <div key={product.id} className=" relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.thumbnail}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full  hover:scale-110"
                    />
                  </Link>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/product/${product.id}`}>
                        <span aria-hidden="true" className=" inset-0" />
                        {product.title.slice(0, 15)}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                      <div>
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFE234" className="w-5 h-5">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>

                      </div>
                      <div>{product.rating}</div>
                    </p>
                  </div>
                  {/* <div>
                    <p className="text-sm font-medium text-gray-900">
                    $
                          {parseFloat(
                            product.price * (1 - product.discountPercentage / 100)
                          ).toFixed(2)}
                    </p>
                    <HeartIcon onClick={() => handleAddToWishList(product)} className="h-6 w-6  bg-red-200 rounded-full" aria-hidden="true" />

                    <button onClick={() => handleAddToCart(product)} className="hover:bg-gray-400 mt-1 h-6 w-6 flex bg-gray-100 justify-center items-center text-[5px]  rounded-lg ">
                      
                      <img src={cartAdd} alt="" className="h-4  " />
                    </button>
                  </div> */}
                  <div className="flex  flex-col ">
                    <p className="text-sm font-medium text-gray-900">
                      $
                      {parseFloat(
                        product.price * (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </p>
                    {/* <div className="flex mt-1  gap-2">
                     
                      <button onClick={() => toggleWishlist(product)}>
                        {wishlistMap[product.id] ? (
                          <img src={RedHeart2} alt="" className="h-5"/>
                        ) : (
                          <HeartIcon
                            className="h-5 w-5 top-2 end-2 text-gray-500 bg-white rounded-full hover:scale-125 hover:bg-yellow-100"
                            aria-hidden="true"
                            // onClick={() => handleAddToWishList(product)}
                          />
                        )}
                      </button>

                      <ShoppingCartIcon
                        className="h-5 w-5 top-2 end-2 text-gray-500 bg-white rounded-full cursor-pointer hover:bg-yellow-100 hover:scale-125"
                        aria-hidden="true"
                        onClick={() => handleAddToCart(product)}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    
        
      </div>
    )}
  </div>
  )
}

export default FeaturedProducts