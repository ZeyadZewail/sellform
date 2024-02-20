import { useAtom } from "jotai";
import { modelAtom } from "../store/stepAtoms.ts";

export const useCheckers = () => {
  const [model] = useAtom(modelAtom);

  const bannedModels = ["Austin", "A3"];

  const SkipYearIfBanned = () => {
    return !!model && bannedModels.includes(model.name);
  };

  return { SkipYearIfBanned };
};
