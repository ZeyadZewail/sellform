import { useAtom } from "jotai";
import { makeAtom, modelAtom } from "../store/stepAtoms.ts";

export const useCheckers = () => {
  const [make] = useAtom(makeAtom);
  const [model] = useAtom(modelAtom);

  const makeCheck = () => {
    return false;
  };

  const modelCheck = () => {
    return make !== null;
  };

  const bannedModels = ["Austin", "A3"];

  const SkipYearIfBanned = () => {
    return !!model && bannedModels.includes(model.name);
  };

  return { makeCheck, modelCheck, SkipYearIfBanned };
};
