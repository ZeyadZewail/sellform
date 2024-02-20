import { atom, useAtom } from "jotai";
import { useSteps } from "./useSteps.tsx";

export interface Step<T> {
  name: string;
  value: T;
  setValue: (arg: T) => void;
  checkSkipArray: (() => boolean)[];
  defaultValue: T;
  replaceAllOnNext: boolean;
}

const currentIndexAtom = atom(0);

export const useStepper = () => {
  const [currentIndex, setCurrentIndexAtom] = useAtom(currentIndexAtom);
  const { makeStep, modelStep, yearStep, kilometerStep } = useSteps();

  //Treated as Array (order matters)
  const StepsOrder: { [key: string]: Step<any> } = {
    make: makeStep,
    model: modelStep,
    year: yearStep,
    kilometer: kilometerStep,
  };

  const Next = (arg?: number): void => {
    arg = arg ?? currentIndex;

    if (arg === Object.values(StepsOrder).length - 1) {
      return;
    }

    const steps = Object.values(StepsOrder);
    const currentStep = steps[currentIndex];

    if (!currentStep.value || currentStep.value === currentStep.defaultValue) {
      return;
    }

    const index = arg + 1;

    const step = steps[index];

    if (
      step.checkSkipArray.reduce(
        (acc, func) => acc && func(),
        step.checkSkipArray.length > 0,
      )
    ) {
      Next(index);
    } else {
      clearAllAfterStep(index);
      setCurrentIndexAtom(index);
    }
  };

  const clearAllAfterStep = (index: number) => {
    const steps = Object.values(StepsOrder);

    for (let i = index; i < steps.length; i++) {
      steps[i].setValue(steps[i].defaultValue);
    }
  };

  const Back = (arg?: number): void => {
    arg = arg ?? currentIndex;

    if (currentIndex === 0) {
      return;
    }

    const index = arg - 1;

    const step = Object.values(StepsOrder)[index];

    if (reduceCheckSkip(step.checkSkipArray) || !step.replaceAllOnNext) {
      Back(index);
    } else {
      setCurrentIndexAtom(index);
    }
  };

  return { StepsOrder, currentIndex, Next, Back };
};

export const reduceCheckSkip = (checkSkipArray: (() => boolean)[]) => {
  if (checkSkipArray.length === 0) {
    return false;
  }

  return checkSkipArray.reduce(
    (acc, func) => acc && func(),
    checkSkipArray.length > 0,
  );
};
