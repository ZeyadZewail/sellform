import { atom, useAtom } from "jotai";
import { useSteps } from "./useSteps.tsx";

export interface Step<T> {
  name: string;
  value: T;
  setValue: (arg: T) => void;
  checkSkip: (() => boolean)[];
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

    const index = arg + 1;

    if (
      Object.values(StepsOrder)[index].checkSkip.reduce(
        (acc, func) => acc && func(),
        Object.values(StepsOrder)[index].checkSkip.length > 0,
      )
    ) {
      Next(index);
    } else {
      setCurrentIndexAtom(index);
    }
  };

  const Back = (arg?: number): void => {
    arg = arg ?? currentIndex;

    if (currentIndex === 0) {
      return;
    }

    const index = arg - 1;

    if (
      Object.values(StepsOrder)[index].checkSkip.reduce(
        (acc, func) => acc && func(),
        Object.values(StepsOrder)[index].checkSkip.length > 0,
      )
    ) {
      Back(index);
    } else {
      setCurrentIndexAtom(index);
    }
  };

  return { StepsOrder, currentIndex, Next, Back };
};
