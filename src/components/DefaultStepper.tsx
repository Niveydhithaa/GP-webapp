import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import configData from "config.json"
const debugMode = configData.debug
interface Props {
  possible_cancer: string
  // any props that come into the component
}
export default function VerticalLinearStepper({possible_cancer, ...props} : Props) {
  const steps = [
    {
      label: 'Possible Cancer',
      description: `${possible_cancer}`,
    },
    {
      label: 'Test/Investigation',
      description:
        'Measure Serum CA125',
    },
    {
      label: 'Serum CA125',
      description: ``,
    },
    {
      label: 'Serum CA125 level is less than 35 IU/ml',
      description: `Perform Ultrasound`,
    },
    {
      label: 'Ultrasound',
      description: ``,
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSerumLess = () => {
      if(debugMode) console.log("less than click!!!!!!")
  }

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 4 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
            <Typography>{step.description}</Typography>
            {index==2 && 
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Results</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio onClick={handleSerumLess}/>} label="Serum CA125 level is less than 35 IU/ml" />
                    <FormControlLabel value="male" control={<Radio />} label="Serum CA125 level is more than 35 IU/ml" />
                </RadioGroup>
              </FormControl>
            
            }
            {index==4 && 
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Results</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio onClick={handleSerumLess}/>} label="Normal" />
                    <Typography fontSize="12px">Assess her carefully for other causes</Typography>
                    <FormControlLabel value="male" control={<Radio />} label="Abnormal"/>
                    <Typography fontSize="12px" color="red">Refer to oncologist</Typography>
                </RadioGroup>
              </FormControl>
            
            }
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
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
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          {/* <Typography>All steps completed - you&apos;re finished</Typography> */}
          <Typography fontSize="10px">Symptom Investigation completed on 17/10/2022</Typography>
          <Typography color="red">Findings = Refer to oncologist</Typography>
          {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button> */}
        </Paper>
      )}
    </Box>
  );
}
