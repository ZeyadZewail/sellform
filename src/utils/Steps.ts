import { atom, useAtom } from "jotai";

export interface Step<T> {
  name: string;
  value: T;
  setValue: (arg: T) => void;
  checkSkip: () => boolean;
  defaultValue: T;
  replaceAllOnNext: boolean;
}

const makeAtom = atom("");
export const useMakeStep = () => {
  const [make, setMake] = useAtom(makeAtom);

  const checkSkip = () => {
    return false;
  };

  const makeStep: Step<string> = {
    name: "make",
    value: make,
    setValue: setMake,
    checkSkip: checkSkip,
    defaultValue: "",
    replaceAllOnNext: false,
  };

  return { makeStep };
};

const modelAtom = atom("");
export const useModelStep = () => {
  const [model, setModel] = useAtom(modelAtom);
  const [make] = useAtom(makeAtom);
  const checkSkip = () => {
    return make === "";
  };

  const modelStep: Step<string> = {
    name: "model",
    value: model,
    setValue: setModel,
    checkSkip: checkSkip,
    defaultValue: "",
    replaceAllOnNext: true,
  };

  return { modelStep };
};
