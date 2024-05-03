import {ERROR_INVALID_INITIAL_STEP, StepControl, StepNavigator} from "../StepNavigator";

it ("StepControl initialize with given properties", () => {
  const control: StepControl = new StepControl("left");
  expect(control.side).toBe("left");
  expect(control.isActive).toBe(false);
});

it ("StepControl changes active status to given boolean", () => {
  const control: StepControl = new StepControl("right");
  control.isActive = true;
  expect(control.isActive).toBe(true);
  control.isActive = false;
  expect(control.isActive).toBe(false);
});

it ("StepNavigator Buttons initialize with given properties", () => {
  const stepNavigator: StepNavigator = new StepNavigator(3, 1);

  expect(stepNavigator.steps).toBe(3);
  expect(stepNavigator.currentStep).toBe(1);
  expect(stepNavigator.stepDownControl.side).toBe("left");
  expect(stepNavigator.stepDownControl.isActive).toBe(false);
  expect(stepNavigator.stepUpControl.side).toBe("right");
  expect(stepNavigator.stepUpControl.isActive).toBe(true);

  const oneStepNavigator: StepNavigator = new StepNavigator(1, 1);

  expect(oneStepNavigator.steps).toBe(1);
  expect(oneStepNavigator.currentStep).toBe(1);
  expect(oneStepNavigator.stepDownControl.side).toBe("left");
  expect(oneStepNavigator.stepDownControl.isActive).toBe(false);
  expect(oneStepNavigator.stepUpControl.side).toBe("right");
  expect(oneStepNavigator.stepUpControl.isActive).toBe(false);

  const stepNavigatorInitStepMiddle: StepNavigator = new StepNavigator(3, 2);

  expect(stepNavigatorInitStepMiddle.currentStep).toBe(2);
  expect(stepNavigatorInitStepMiddle.stepDownControl.side).toBe("left");
  expect(stepNavigatorInitStepMiddle.stepDownControl.isActive).toBe(true);
  expect(stepNavigatorInitStepMiddle.stepUpControl.side).toBe("right");
  expect(stepNavigatorInitStepMiddle.stepUpControl.isActive).toBe(true);
});

it ("StepNavigator Buttons increment step on stepUp and update activeStatus of StepControls", () => {
  const stepNavigator: StepNavigator = new StepNavigator(3);

  expect(stepNavigator.currentStep).toBe(1);

  stepNavigator.stepUp();
  expect(stepNavigator.currentStep).toBe(2);
  expect(stepNavigator.stepDownControl.isActive).toBe(true);
  expect(stepNavigator.stepUpControl.isActive).toBe(true);

  stepNavigator.stepUp();
  expect(stepNavigator.currentStep).toBe(3);
  expect(stepNavigator.stepDownControl.isActive).toBe(true);
  expect(stepNavigator.stepUpControl.isActive).toBe(false);

  stepNavigator.stepUp();
  expect(stepNavigator.currentStep).toBe(3);
  expect(stepNavigator.stepDownControl.isActive).toBe(true);
  expect(stepNavigator.stepUpControl.isActive).toBe(false);

  const oneStepNavigator: StepNavigator = new StepNavigator(1, 1);
  oneStepNavigator.stepUp();
  expect(oneStepNavigator.currentStep).toBe(1);
  expect(oneStepNavigator.stepDownControl.isActive).toBe(false);
  expect(oneStepNavigator.stepUpControl.isActive).toBe(false);
});

it ("StepNavigator Buttons decrement step on stepDown and update activeStatus of StepControls", () => {
  const stepNavigator: StepNavigator = new StepNavigator(3);

  expect(stepNavigator.currentStep).toBe(1);

  stepNavigator.stepDown();
  expect(stepNavigator.currentStep).toBe(1);
  expect(stepNavigator.stepDownControl.isActive).toBe(false);
  expect(stepNavigator.stepUpControl.isActive).toBe(true);

  stepNavigator.stepUp();
  expect(stepNavigator.currentStep).toBe(2);
  expect(stepNavigator.stepDownControl.isActive).toBe(true);
  expect(stepNavigator.stepUpControl.isActive).toBe(true);

  stepNavigator.stepDown();
  expect(stepNavigator.currentStep).toBe(1);
  expect(stepNavigator.stepDownControl.isActive).toBe(false);
  expect(stepNavigator.stepUpControl.isActive).toBe(true);

  const oneStepNavigator: StepNavigator = new StepNavigator(1, 1);
  oneStepNavigator.stepDown();
  expect(oneStepNavigator.currentStep).toBe(1);
  expect(oneStepNavigator.stepDownControl.isActive).toBe(false);
  expect(oneStepNavigator.stepUpControl.isActive).toBe(false);
});

it ("StepNavigator Buttons does not initiate with initialStep larger than number of steps", () => {
  const willThrow = () => {
    new StepNavigator(2, 3);
  }

  expect(willThrow).toThrow(RangeError);
  expect(willThrow).toThrow(ERROR_INVALID_INITIAL_STEP)
});

it ("StepNavigator Buttons throws error for negative values for initialStep or steps", () => {
  let willThrow = () => {
    new StepNavigator(2, -1);
  }

  expect(willThrow).toThrow(RangeError);

  willThrow = () => {
    new StepNavigator(0, 0);
  }

  expect(willThrow).toThrow(RangeError);

  willThrow = () => {
    new StepNavigator(1, 0);
  }

  expect(willThrow).toThrow(RangeError);

  willThrow = () => {
    new StepNavigator(0, 1);
  }

  expect(willThrow).toThrow(RangeError);

  willThrow = () => {
    new StepNavigator(-2, -1);
  }

  expect(willThrow).toThrow(RangeError);

  willThrow = () => {
    new StepNavigator(1, 1);
  }

  expect(willThrow).not.toThrow(RangeError);
});
