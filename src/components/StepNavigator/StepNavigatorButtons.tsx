/**
 * @author Vidura Adikari https://www.viduraadikari.com/
 */

import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import PlayArrow from "@mui/icons-material/PlayArrow";
import {StepNavigator} from "./StepNavigator";

type StepNavigatorButtonsProps = {
  /** how many steps are there in the step navigation */
  steps: number
  /** background color of the buttons */
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"

  /** optional step change handler to get the updated step after a change in the step */
  onStepChange?: (updatedStep: number) => void
}

const StepNavigatorButtons: React.FC<StepNavigatorButtonsProps> = (props: StepNavigatorButtonsProps) => {
  const {
    steps,
    color,
    onStepChange
  } = props;

  const buttonColor = color ? color : "info";

  const [stepNavigator, setStateNavigator] = useState(new StepNavigator(steps));

  const handleOnDecrement = () => {
    const stepNav: StepNavigator = getStepNavClone();
    stepNav.stepDown();
    setStateNavigator(stepNav);
  }

  const handleOnIncrement = () => {
    const stepNav: StepNavigator = getStepNavClone();
    stepNav.stepUp();
    setStateNavigator(stepNav);
  }

  const handleOnStepChange = () => {
    onStepChange && onStepChange(stepNavigator.currentStep);
  }

  const getStepNavClone = (): StepNavigator => {
    const stepNav: StepNavigator = Object.assign({}, stepNavigator);
    Object.setPrototypeOf(stepNav, StepNavigator.prototype);
    return stepNav;
  }

  useEffect(() => {
    setStateNavigator(new StepNavigator(steps));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  useEffect(() => {
    handleOnStepChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepNavigator]);

  return (
    <ButtonGroup variant="outlined" color={buttonColor} size="small" aria-label="step navigator button group"
                 sx={{
                   borderRadius: "10px",
                 }}>
      <Button title="previous-step"
              variant={stepNavigator.stepDownControl.isActive ? "contained" : "outlined"}
              disabled={!stepNavigator.stepDownControl.isActive}
              onClick={handleOnDecrement}>
        <PlayArrow sx={{transform: "rotate(180deg)"}}/>
      </Button>

      <Button title="next-step"
              variant={stepNavigator.stepUpControl.isActive ? "contained" : "outlined"}
              disabled={!stepNavigator.stepUpControl.isActive}
              onClick={handleOnIncrement}>
        <PlayArrow/>
      </Button>
    </ButtonGroup>
  );
};


export default StepNavigatorButtons;
