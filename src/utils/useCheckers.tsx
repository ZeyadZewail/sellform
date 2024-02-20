import { useAtom } from "jotai";
import { makeAtom, modelAtom } from "../store/stepAtoms.ts";

export const useCheckers = () => {
  const [make] = useAtom(makeAtom);
  const [model] = useAtom(modelAtom);

  const makeCheck = () => {
    return false;
  };

  const modelCheck = () => {
    return make === "";
  };

  const bannedModels = ["kia"];

  const SkipYearIfBanned = () => {
    return bannedModels.includes(model);
  };

  return { makeCheck, modelCheck, SkipYearIfBanned };
};
