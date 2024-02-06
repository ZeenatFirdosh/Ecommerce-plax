/* eslint-disable react/prop-types */
import React from "react";
import { Alert, Button } from "@material-tailwind/react";
 
export function AlertDismissible({alert}) {
  const [open, setOpen] = React.useState(true);
 
  return (
    <>      
      <Alert open={open} onClose={() => setOpen(false)}>
        {alert}
      </Alert>
    </>
  );
}