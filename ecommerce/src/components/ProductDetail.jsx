
// ProductDetail.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { fetchSingleProduct } from "../redux/product/productsSlice";
import { addRatingAndReview } from "../redux/rating/ratingsAndReviews";
import { MessageDialog } from "./MessageDialog";
import Comment from "./Comment";
import { addToCart } from "../redux/cart/cartSlice";
import { Spinner } from "@material-tailwind/react";
import Loader from "../utils/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const dispatch = useDispatch();

  const { singleProduct, status } = useSelector((state) => state.product);
  // const { singleProduct, status } = useSelector((state) => state.ratingsAndReviews);
  console.log(singleProduct, status);
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  let reviews = useSelector((state) => state.ratingsAndReviews);
  console.log(reviews, "reviews1");

  reviews = reviews?.RatingAndReview.filter((item) => item.id === id);
  console.log(reviews, "reviews");


  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  if (status == "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    ); // Loader here
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddRatingAndReview = ({ rating, review }) => {
    dispatch(addRatingAndReview({ id, rating, review }));
    closeModal();
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item added to cart successfully!");

  };

  

  return (
  
  <>
     <ToastContainer />
  <div className="min-h-full bg-gray-100">
  <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Detail Page:</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"><div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <div
                
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {singleProduct?.title}
              </div>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={singleProduct?.images[0]}
              alt="singleProduct"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={singleProduct?.images[1]}
                alt="singleProduct"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={singleProduct?.images[2]}
                alt="singleProduct"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={singleProduct?.images[3]}
              alt="singleProduct"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* singleProduct info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {singleProduct?.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              $
              {parseFloat(
                singleProduct?.price *
                  (1 - singleProduct?.discountPercentage / 100)
              ).toFixed(2)}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        singleProduct?.rating > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="">{singleProduct?.rating} out of 5 stars</p>
                {/* <div  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  5 reviews
                </div> */}

                
              </div>
            </div>

            {/* <form className="mt-10"> */}
            


            <button
              onClick={() => handleAddToCart(singleProduct)}
              // type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to cart
            </button>
            {/* </form> */}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {singleProduct?.description}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-10">
            <div className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Reviews:</div>
            
            <MessageDialog id={id} />
            </div>
            <div className="mt-10">
              <Comment reviews={reviews} />
            </div>
          </div>
        </div>
      </div>
    </div></div>
        </main>

  </div>
  
    
  </>
  );
}
