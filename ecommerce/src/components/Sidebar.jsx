import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setActiveComponent, setUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase";

export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const { user, status, error } = useSelector((state) => state.user);
  console.log(user, "user");
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleClick = (component) => {
    dispatch(setActiveComponent(component));
  };
  
  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signOut(auth);
      console.log(userCredentials);

      // Dispatch action to save user data
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      Navigate("/"); // Redirect to login page after signup
    } catch (error) {
      console.error(error);
    }
    // dispatch(loginUser(formData));
  };
 
  return (
    <Card className="h-[calc(100vh-5rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          My Account
        </Typography>
      </div>
      <List>
       
        
        <ListItem onClick={() => handleClick('profile')}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem onClick={() => handleClick('orders')}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          My Orders
        </ListItem>
        <ListItem onClick={handleSignout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
     
    </Card>
  );
}