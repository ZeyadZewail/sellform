import { useSteps } from "./useSteps.tsx";

export const useCheckers = () => {
  const { make, model } = useSteps();

  const makeCheck = () => {
    return false;
  };

  const modelCheck = () => {
    return make === "";
  };

  return { makeCheck, modelCheck };
};
