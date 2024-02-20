import { useCheckers } from "./useCheckers.tsx";
import { useAtom } from "jotai/index";
import { Step } from "./useStepper.tsx";
import {
  kilometerAtom,
  makeAtom,
  modelAtom,
  yearAtom,
} from "../store/stepAtoms.ts";
import { Make, Model } from "../types/types.ts";

export const useSteps = () => {
  const { makeCheck, modelCheck, SkipYearIfBanned } = useCheckers();
  const [make, setMake] = useAtom(makeAtom);
  const [model, setModel] = useAtom(modelAtom);
  const [year, setYear] = useAtom(yearAtom);
  const [kilometer, setKilometer] = useAtom(kilometerAtom);

  const makeStep: Step<Make | null> = {
    name: "make",
    value: make,
    setValue: setMake,
    checkSkip: [makeCheck],
    defaultValue: null,
    replaceAllOnNext: false,
  };

  const modelStep: Step<Model | null> = {
    name: "model",
    value: model,
    setValue: setModel,
    checkSkip: [modelCheck, makeCheck],
    defaultValue: null,
    replaceAllOnNext: true,
  };

  const yearStep: Step<number | null> = {
    name: "year",
    value: year,
    setValue: setYear,
    checkSkip: [SkipYearIfBanned],
    defaultValue: null,
    replaceAllOnNext: true,
  };

  const kilometerStep: Step<number | null> = {
    name: "kilometer",
    value: kilometer,
    setValue: setKilometer,
    checkSkip: [],
    defaultValue: null,
    replaceAllOnNext: true,
  };

  return { makeStep, modelStep, yearStep, kilometerStep };
};
