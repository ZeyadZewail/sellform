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
    checkSkipArray: [makeCheck],
    defaultValue: null,
    replaceAllOnNext: true,
  };

  const modelStep: Step<Model | null> = {
    name: "model",
    value: model,
    setValue: setModel,
    checkSkipArray: [modelCheck, makeCheck],
    defaultValue: null,
    replaceAllOnNext: false,
  };

  const yearStep: Step<number | null> = {
    name: "year",
    value: year,
    setValue: setYear,
    checkSkipArray: [SkipYearIfBanned],
    defaultValue: null,
    replaceAllOnNext: false,
  };

  const kilometerStep: Step<number | null> = {
    name: "kilometer",
    value: kilometer,
    setValue: setKilometer,
    checkSkipArray: [],
    defaultValue: null,
    replaceAllOnNext: true,
  };

  return { makeStep, modelStep, yearStep, kilometerStep };
};
