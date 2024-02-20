import { useStepper } from "../utils/useStepper.tsx";

export const InputStep = ({ stepName }: { stepName: string }) => {
  const { StepsOrder } = useStepper();
  const myStep = StepsOrder[stepName];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div>{stepName}</div>
      <input
        value={myStep.value}
        onChange={(e) => myStep.setValue(e.target.value)}
      />
      <div>value: {myStep.value}</div>
    </div>
  );
};
