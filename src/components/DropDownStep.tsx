import { useStepper } from "../utils/useStepper.tsx";
import { Option } from "../types/types.ts";

export const DropDownStep = ({
  stepName,
  options,
}: {
  stepName: string;
  options: Option[];
}) => {
  const { StepsOrder } = useStepper();
  const myStep = StepsOrder[stepName];

  const handleChange = (choice: string) =>
    myStep.setValue(options.find((o) => o.name === choice));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.length > 0 ? (
        <>
          <div>{stepName}</div>

          <select
            value={myStep?.value?.name}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          >
            {options.map((o) => (
              <option value={o.name} key={o.name}>
                {o.name}
              </option>
            ))}
          </select>
          <div>value: {myStep?.value?.name}</div>
        </>
      ) : null}
    </div>
  );
};
