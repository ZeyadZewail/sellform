import { atom, useAtom } from "jotai/index";
import { Step } from "../useStepper.tsx";
import { useCheckers } from "../useCheckers.tsx";

const makeAtom = atom("");
export const useMakeStep = () => {
  const [make, setMake] = useAtom(makeAtom);
  const { makeCheck } = useCheckers();

  const makeStep: Step<string> = {
    name: "make",
    value: make,
    setValue: setMake,
    checkSkip: [makeCheck],
    defaultValue: "",
    replaceAllOnNext: false,
  };

  return { makeStep, make };
};
