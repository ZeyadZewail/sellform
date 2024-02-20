import { useMakeStep } from "./steps/useMakeStep.tsx";

export const useCheckers = () => {
  const { make } = useMakeStep();

  const makeCheck = () => {
    return false;
  };

  const modelCheck = () => {
    return make === "";
  };

  return { makeCheck, modelCheck };
};
