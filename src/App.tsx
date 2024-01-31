import "./App.css";
import { useStepper } from "./utils/useStepper.tsx";
import { ReactNode } from "react";
import { InputStep } from "./components/InputStep.tsx";

export const App = () => {
  const { currentIndex, Next, Steps } = useStepper();

  const UI_steps: { [key: string]: ReactNode } = {
    make: <InputStep stepName={"make"} key={"make"} />,
    model: <InputStep stepName={"model"} key={"model"} />,
  };

  const renderSteps = () => {
    const elements: ReactNode[] = [];

    const values = Object.values(Steps);
    const keys = Object.keys(Steps);

    for (let i = currentIndex; i >= 0; i--) {
      elements.unshift(UI_steps[keys[i]]);

      if (i !== 0 && values[i - 1].replaceAllOnNext) {
        break;
      }
    }

    return elements;
  };

  return (
    <div>
      {renderSteps()}
      <button
        onClick={() => {
          Next();
        }}
      >
        Next
      </button>
      {currentIndex}
    </div>
  );
};
