import "./App.css";
import { ReactNode, useEffect, useState } from "react";
import { InputStep } from "./components/InputStep.tsx";
import axios from "axios";
import { DropDownStep } from "./components/DropDownStep.tsx";
import { Stepper } from "./components/Stepper.tsx";
import { useAtom } from "jotai";
import { makeAtom, modelAtom } from "./store/stepAtoms.ts";
import { Make } from "./types/types.ts";

export const App = () => {
  const [makesData, setMakesData] = useState<Make[]>([]);

  const [modelsData, setModelsData] = useState([]);

  const [make] = useAtom(makeAtom);
  const [model] = useAtom(modelAtom);

  useEffect(() => {
    axios
      .get("https://web.sylndr.com/api/v3/shoppingList/make")
      .then((data) => {
        setMakesData(
          data.data.data.map((x: { id: string; enName: string }) => ({
            name: x.enName,
            id: x.id,
          })),
        );
      });
  }, []);

  useEffect(() => {
    if (make !== null) {
      axios
        .get(`https://web.sylndr.com/api/v3/shoppingList/model/${make.id}`)
        .then((data) => {
          setModelsData(
            data.data.data.map(
              (x: { id: string; enName: string; years: string[] }) => ({
                name: x.enName,
                id: x.id,
                years: x.years,
              }),
            ),
          );
        });
    }
  }, [make]);

  const UI_steps: { [key: string]: ReactNode } = {
    make: <DropDownStep options={makesData} stepName={"make"} key={"make"} />,
    model: (
      <DropDownStep options={modelsData} stepName={"model"} key={"model"} />
    ),
    year: (
      <DropDownStep
        options={
          // model && model.years
          //   ? model.years.map((year) => ({ id: year, name: year }))
          //   : []
          [
            { name: "123", id: "123" },
            { name: "234", id: "234" },
          ]
        }
        stepName={"year"}
        key={"year"}
      />
    ),
    kilometer: <InputStep stepName={"kilometer"} key={"kilometer"} />,
  };

  return <Stepper UI_steps={UI_steps} />;
};
