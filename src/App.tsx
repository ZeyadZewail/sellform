import "./App.css";
import { ReactNode, useEffect, useState } from "react";
import { InputStep } from "./components/InputStep.tsx";
import axios from "axios";
import { DropDownStep } from "./components/DropDownStep.tsx";
import { MobileUIStepper } from "./components/MobileUIStepper.tsx";
import { useAtom } from "jotai";
import { makeAtom } from "./store/stepAtoms.ts";
import { Make } from "./types/types.ts";
import { Debugger } from "./components/Debugger.tsx";

export const App = () => {
  const [makesData, setMakesData] = useState<Make[]>([]);

  const [modelsData, setModelsData] = useState([]);

  const [make] = useAtom(makeAtom);

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

  const mobileUI_steps: { [key: string]: ReactNode } = {
    year: <InputStep stepName={"year"} key={"year"} />,
    kilometer: <InputStep stepName={"kilometer"} key={"kilometer"} />,
    make: <DropDownStep options={makesData} stepName={"make"} key={"make"} />,
    model: (
      <DropDownStep options={modelsData} stepName={"model"} key={"model"} />
    ),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <MobileUIStepper UI_steps={mobileUI_steps} />
      <Debugger />
    </div>
  );
};
