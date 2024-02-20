import { atom, useAtom } from "jotai";
import { useMakeStep } from "./steps/useMakeStep.tsx";
import { useModelStep } from "./steps/useModelStep.tsx";

const currentIndexAtom = atom(0);

export interface Step<T> {
  name: string;
  value: T;
  setValue: (arg: T) => void;
  checkSkip: (() => boolean)[];
  defaultValue: T;
  replaceAllOnNext: boolean;
}

export const useStepper = () => {
  const { makeStep } = useMakeStep();
  const { modelStep } = useModelStep();
  const [currentIndex, setCurrentIndexAtom] = useAtom(currentIndexAtom);

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

    if (Object.values(Steps)[index].checkSkip()) {
      Next(index);
    } else {
      setCurrentIndexAtom(index);
    }
  };

  return { Steps, currentIndex, Next };
};
