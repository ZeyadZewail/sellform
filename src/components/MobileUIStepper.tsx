import { ReactNode } from "react";
import { reduceCheckSkip, useStepper } from "../utils/useStepper.tsx";

export const MobileUIStepper = ({
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
      if (!reduceCheckSkip(values[i].checkSkipArray)) {
        elements.unshift(UI_steps[keys[i]]);
      }

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
