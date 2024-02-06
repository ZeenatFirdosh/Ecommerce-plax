/* eslint-disable react/prop-types */
import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/product/productsSlice";
 
export function Pagination() {
  const currentPage = useSelector((state) => state.product.currentPage);
    const dispatch = useDispatch();
    const { totalPages} = useSelector((state) => state.product);
    
//   const [currentPage, setcurrentPage] = React.useState(1);
console.log(currentPage,"currentPage");

  const next = () => {
    if (currentPage === totalPages) return;
    dispatch(setCurrentPage(currentPage + 1));
    console.log(currentPage,"currentPage");

    // setcurrentPage(currentPage + 1);
  };
 
  const prev = () => {
    if (currentPage === 1) return;
    dispatch(setCurrentPage(currentPage - 1));
    console.log(currentPage,"currentPage");
    // setcurrentPage(currentPage - 1);
  };
 
  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}