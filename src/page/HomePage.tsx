"use client";

import React, {FC, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {grey} from "@mui/material/colors";
import StepNavigatorButtons from "@/components/StepNavigator";

const HomePage: FC = () => {

  const numberOfPages: number = 4;
  const [currentStep, setCurrentStep] = useState(1);

  const handleOnStepChange = (updatedStep: number) => {
    setCurrentStep(updatedStep);
  }

  return (
    <Box>
      <Typography variant="caption" sx={{
        color: grey[600]
      }}>
        {currentStep} / {numberOfPages} {" "}
      </Typography>
      <StepNavigatorButtons steps={numberOfPages}
                            onStepChange={handleOnStepChange}/>
    </Box>
  )
}

export default HomePage;
