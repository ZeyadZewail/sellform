import { useCheckers } from "./useCheckers.tsx";
import { atom, useAtom } from "jotai/index";
import { Step } from "./useStepper.tsx";

const makeAtom = atom("");
const modelAtom = atom("");
export const useSteps = () => {
  const { makeCheck, modelCheck } = useCheckers();
  const [make, setMake] = useAtom(makeAtom);
  const [model, setModel] = useAtom(modelAtom);

  const makeStep: Step<string> = {
    name: "make",
    value: make,
    setValue: setMake,
    checkSkip: [makeCheck],
    defaultValue: "",
    replaceAllOnNext: false,
  };

  const modelStep: Step<string> = {
    name: "model",
    value: model,
    setValue: setModel,
    checkSkip: [modelCheck, makeCheck],
    defaultValue: "",
    replaceAllOnNext: true,
  };

  return { make, model, makeStep, modelStep };
};
