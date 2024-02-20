import { atom, useAtom } from "jotai/index";
import { Step } from "../useStepper.tsx";
import { useCheckers } from "../useCheckers.tsx";

const modelAtom = atom("");
export const useModelStep = () => {
  const [model, setModel] = useAtom(modelAtom);
  const { makeCheck, modelCheck } = useCheckers();

  const modelStep: Step<string> = {
    name: "model",
    value: model,
    setValue: setModel,
    checkSkip: [modelCheck, makeCheck],
    defaultValue: "",
    replaceAllOnNext: true,
  };

  return { modelStep };
};
