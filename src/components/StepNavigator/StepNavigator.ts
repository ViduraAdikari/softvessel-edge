/**
 * @author Vidura Adikari https://www.viduraadikari.com/
 */

export const ERROR_INVALID_INITIAL_STEP: string = "initialStep must be less than or equal to number of steps";
export const ERROR_INVALID_INITIAL_VALUES: string = "invalid value for initialStep or steps";

type StepControlSide = "left" | "right";

/**
 * StepControl controls a button that increment or decrement the step in StepNavigatorButtons group.
 */
class StepControl {
  /** In button group, which side is this button */
  private readonly _side: StepControlSide;
  /** Active to click or inactive if it is the end of steps this side */
  private _isActive: boolean;

  get side(): StepControlSide {
    return this._side;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  /**
   * Set control button active or inactive on navigation.
   * @param isActive whether active or inactive
   */
  set isActive(isActive: boolean) {
    this._isActive = isActive;
  }

  constructor(side: StepControlSide, isActive?: boolean) {
    this._side = side;
    this._isActive = isActive ? isActive : false;
  }
}

/**
 * Button group that increment or decrement steps
 * | < | > |
 */
class StepNavigator {
  /** Total number of steps in the StepNavigatorButtons */
  steps: number;
  /** Currently active step in the StepNavigatorButtons  */
  currentStep: number;
  /** Step down UI button */
  stepDownControl: StepControl;
  /** Step up UI button*/
  stepUpControl: StepControl;

  constructor(steps: number, initialStep: number = 1) {
    if (initialStep > steps) {
      throw new RangeError(ERROR_INVALID_INITIAL_STEP);
    }

    if (initialStep <= 0 || steps <= 0) {
      throw new RangeError(ERROR_INVALID_INITIAL_VALUES);
    }

    this.steps = steps;
    this.currentStep = initialStep;
    this.stepDownControl = new StepControl("left", initialStep !== 1 && steps > 1);
    this.stepUpControl = new StepControl("right", initialStep !== steps);
  }

  stepUp() {
    if (this.currentStep === this.steps) {
      return;
    }

    this.currentStep++;
    this.updateControlActiveStatus();
  }

  stepDown() {
    if (this.currentStep === 1) {
      return;
    }

    this.currentStep--;
    this.updateControlActiveStatus();
  }

  private updateControlActiveStatus() {
    this.stepDownControl.isActive = this.currentStep !== 1;
    this.stepUpControl.isActive = this.currentStep !== this.steps;
  }
}

export {StepControl, StepNavigator};
