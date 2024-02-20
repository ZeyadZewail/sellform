import { useStepper } from "../utils/useStepper.tsx";

export const Debugger = () => {
  const { StepsOrder, currentIndex } = useStepper();

  return (
    <>
      <div>{`Current Index: ${currentIndex}`}</div>
      {Object.values(StepsOrder).map((step) => (
        <div>{`${step.name}: ${step.value?.name || step.value}`}</div>
      ))}
    </>
  );
};
