import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { addAddress } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export function AddressModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const generateRandomAddressId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 8;
    let orderId = "";
    for (let i = 0; i < length; i++) {
      orderId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return orderId;
  };

  const [addressDetails, setAddressDetails] = useState({
    id: generateRandomAddressId(),    
    name: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any of the input fields are empty
  if (  
    
  
    !addressDetails.email ||
    !addressDetails.street ||
    !addressDetails.city ||
    !addressDetails.state ||
    !addressDetails.pinCode
  ) {
    // Show an alert to fill in all details
    alert('Please fill in all details before submitting.');
    return; // Exit the function early
  }

    dispatch(addAddress(addressDetails));
    setAddressDetails({
      id: generateRandomAddressId(),
      name: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    });
    handleOpen();
  };

  return (
    <>
      <Button onClick={handleOpen} className="w-fit">
        {" "}
        + Add Address
      </Button>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none  text-sm"
      >
        <Card className="mx-auto w-full max-w-[30rem] ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Address+
            </Typography>

            {/* <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input label="Email" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input label="Password" size="lg" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}

            <label className="block ">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                name="name"
                value={addressDetails.name}
                onChange={handleChange}
                placeholder="Name"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              />
            </label>
            <label className="block ">
              <span className="text-gray-700">Email</span>
              <input
                type="text"
                name="email"
                value={addressDetails.email}
                onChange={handleChange}
                placeholder="email"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              />
            </label>
            

            <label className="block ">
              <span className="text-gray-700">Mobile No.</span>
              <input
                type="number"
                name="phone"
                value={addressDetails.phone}
                onChange={handleChange}
                placeholder="Mobile No."
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              />
            </label>

            <label className="block ">
              <span className="text-gray-700">City</span>
              <input
                type="text"
                name="city"
                value={addressDetails.city}
                onChange={handleChange}
                placeholder="City"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              />
            </label>
            <label className="block ">
              <span className="text-gray-700">State/Province</span>
              <input
                name="state"
                type="text"
                value={addressDetails.state}
                onChange={handleChange}
                placeholder="State"
                className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              />
            </label>
            <label className=" ">
              <span className="text-gray-700 text-sm">Zip/Postal code</span>
              <input
                type="number"
                name="pinCode"
                value={addressDetails.pinCode}
                onChange={handleChange}
                placeholder="Pin Code"
                className="
            block
            text-sm
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
              />
            </label>
         
          </CardBody>
          <CardFooter className="pt-0 flex justify-evenly">
            
            <Button variant="gradient" color="green" onClick={handleSubmit}>
            Add
          </Button>

            <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
