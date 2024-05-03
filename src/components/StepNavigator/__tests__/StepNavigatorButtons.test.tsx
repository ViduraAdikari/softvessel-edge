import {fireEvent, render, screen} from "@/util/test-utils";
import StepNavigatorButtons from "../StepNavigatorButtons";

it("StepNavigatorButtons with 3 steps renders with decrement button disabled and increment button enabled",
  () => {
    render(<StepNavigatorButtons steps={3}/>);

    const decrementButton = screen.getByTitle("previous-step");
    expect(decrementButton).toBeInTheDocument();
    expect(decrementButton).toHaveAttribute("disabled");

    fireEvent.click(decrementButton);
    expect(decrementButton).toHaveAttribute("disabled");

    const incrementButton = screen.getByTitle("next-step");
    expect(incrementButton).toBeInTheDocument();
    expect(incrementButton).not.toHaveAttribute("disabled");

    fireEvent.click(incrementButton);
    expect(decrementButton).not.toHaveAttribute("disabled");
    expect(incrementButton).not.toHaveAttribute("disabled");

    fireEvent.click(incrementButton);
    expect(incrementButton).toHaveAttribute("disabled");
    expect(decrementButton).not.toHaveAttribute("disabled");

    fireEvent.click(decrementButton);
    expect(decrementButton).not.toHaveAttribute("disabled");
    expect(incrementButton).not.toHaveAttribute("disabled");
  });

it("StepNavigatorButtons gives IOC current step to the parent onStepChange", () => {
  let step = 0;
  const handleClick = jest.fn((updatedStep: number) => {
    step = updatedStep
  });

  render(<StepNavigatorButtons steps={3} onStepChange={handleClick}/>);
  const incrementButton = screen.getByTitle("next-step");
  fireEvent.click(incrementButton);

  expect(handleClick).toHaveBeenCalled();
  expect(step).toBe(2);

  fireEvent.click(incrementButton);
  expect(step).toBe(3);

  const decrementButton = screen.getByTitle("previous-step");
  fireEvent.click(decrementButton);
  expect(step).toBe(2);

  fireEvent.click(decrementButton);
  expect(step).toBe(1);

  fireEvent.click(decrementButton);
  expect(step).toBe(1);
});
