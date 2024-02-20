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
  const { makeStep, modelStep } = useSteps();

  const Steps: { [key: string]: Step<string> } = {
    make: makeStep,
    model: modelStep,
  };

  const Next = (arg?: number): void => {
    arg = arg ?? currentIndex;

    if (arg === Object.values(Steps).length - 1) {
      return;
    }

    const index = arg + 1;

    if (
      Object.values(Steps)[index].checkSkip.reduce(
        (acc, func) => acc && func(),
        true,
      )
    ) {
      Next(index);
    } else {
      setCurrentIndexAtom(index);
    }
  };

  return { Steps, currentIndex, Next };
};
