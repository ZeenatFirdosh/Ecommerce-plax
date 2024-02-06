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
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let orderId = '';
    for (let i = 0; i < length; i++) {
      orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderId;
  };
  
  const [addressDetails, setAddressDetails] = useState({
    id: generateRandomAddressId(),
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: ''
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAddress(addressDetails));
    setAddressDetails({
      id: generateRandomAddressId(),
      name: '',
      phone: '',
      email: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
      country: ''
    });
    handleOpen();
  };

 
  return (
    <>
      <Button onClick={handleOpen} className="w-fit"> + Add Address</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
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
        <span className="text-gray-700">Address line 1</span>
        <input
          type="text"
          name="street"
          value={addressDetails.street}
          onChange={handleChange}
          placeholder="Street Address"
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
      <label className="block ">
        <span className="text-gray-700">Zip/Postal code</span>
        <input
          type="text"
          name="pinCode"
          value={addressDetails.pinCode}
          onChange={handleChange}
          placeholder="Postal Code"
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
        <span className="text-gray-700">Country</span>
        <input
          type="text"
          name="country"
          value={addressDetails.country}
          onChange={handleChange}
          placeholder="Country"
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
          </CardBody>
          <CardFooter className="pt-0 flex justify-evenly">
            <Button variant="gradient" onClick={handleSubmit} >
              Add 
            </Button>
            <Button variant="small"
                color="blue-gray"
                className="ml-1 font-bold" onClick={handleOpen} >
              Cancel
            </Button>
            
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}