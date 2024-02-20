import { ReactNode } from "react";
import { useStepper } from "../utils/useStepper.tsx";

export const Stepper = ({
  UI_steps,
}: {
  UI_steps: { [key: string]: ReactNode };
}) => {
  const { StepsOrder, Next, currentIndex, Back } = useStepper();

  const renderSteps = () => {
    const elements: ReactNode[] = [];

    const values = Object.values(StepsOrder);
    const keys = Object.keys(StepsOrder);

    for (let i = currentIndex; i >= 0; i--) {
      elements.unshift(UI_steps[keys[i]]);

      if (i !== 0 && values[i - 1].replaceAllOnNext) {
        break;
      }
    }

    return elements;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {renderSteps()}
      {currentIndex > 0 ? (
        <button
          onClick={() => {
            Back();
          }}
        >
          Back
        </button>
      ) : null}
      <button
        onClick={() => {
          const currentStep = Object.values(StepsOrder)[currentIndex];
          if (currentStep.value !== currentStep.defaultValue) {
            Next();
          }
        }}
      >
        Next
      </button>

      <div>{`Current Index: ${currentIndex}`}</div>
    </div>
  );
};
