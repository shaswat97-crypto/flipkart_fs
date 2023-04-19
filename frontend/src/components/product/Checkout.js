import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Header from "../Header";
import { CartStore } from "../CartContext";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout() {
  const util = React.useContext(CartStore);
  const [activeStep, setActiveStep] = React.useState(0);
  const [success, stSuccess] = React.useState(false);
  const navTo = useNavigate();
  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep(activeStep + 1);
    console.log(e.currentTarget, e.target);
    if (e.target.innerText.includes("PLACE ORDER") && util.checkoutFrom == "cart") {
      console.log("from cart checkout");
      util.setIncartState(null);
      localStorage.setItem("cart", null);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const cartAlert = (
    <div className="alerted">
      <Alert sx={{ backgroundColor: "white" }} severity="success">
        Item added to cart!
      </Alert>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header></Header>
      {success && cartAlert}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
              <Button sx={{mt:3}} onClick={() => navTo("/")} variant="contained">
                Go to home
              </Button>
            </React.Fragment>
          ) : (
            <form onSubmit={handleNext}>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  type='submit'
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </form>
          )}
        </Paper>
        {/* <Copyright /> */}
      </Container>
    </ThemeProvider>
  );
}
