import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Stepper,
    Step,
    StepLabel,
    StepContent,
  } from "@mui/material";


const steps = [
  {
    label: 'Possible Cancer',
    description: `Breast`,
  },
  {
    label: 'Investigation',
    description:
      'Measure Serum CA125',
  },
  {
    label: 'Serum CA125 level is less than 35 IU/ml',
    description: `Perform Ultrasound`,
  },
  {
    label: 'Abnormal Ultrasound',
    description: `Refer to Oncologist`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label} active={true}>
            <StepLabel
            >
              <b>{step.label}</b>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  {/* <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button> */}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button> */}
        </Paper>
    </Box>
  );
}
