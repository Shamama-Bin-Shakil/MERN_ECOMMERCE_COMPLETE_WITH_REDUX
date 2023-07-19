import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const step = [
    {
      label: <Typography>Shipping Detail</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyle = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {step.map((item, index) => {
          return (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                style={{
                  color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
                }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
