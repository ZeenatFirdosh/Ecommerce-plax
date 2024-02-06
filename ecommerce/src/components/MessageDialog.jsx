/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,Rating,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { addRatingAndReview } from "../redux/rating/ratingsAndReviews";
import { useDispatch, useSelector } from "react-redux";
 
export function MessageDialog({id}) {
    const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [rating, setRated] = React.useState(4);
    const [review, setReviewText] = useState('');
    const { user, status, error, addresses } = useSelector((state) => state.user);

  console.log(user, "user");
  const handleOpen = () => setOpen(!open);
  
  const handleAddRatingAndReview = ({id,user, rating, review }) => {
    dispatch(addRatingAndReview({id,user, rating, review }));
    setOpen(!open);
  };


  return (
    <>
      <Button onClick={handleOpen}>Add Reviews</Button>
    <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Add Reviews
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Write the message and then click button.
          </Typography>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
            Rate
            </Typography>
            <Rating value={rating} onChange={(value) => setRated(value)} />
            <Textarea label="Message" value={review} onChange={e => setReviewText(e.target.value)}/>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={() => handleAddRatingAndReview({id,user, rating, review })}>
            Rate Now
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}