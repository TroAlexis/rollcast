import { Clipboard, Form, showToast, Toast } from "@raycast/api";
import React, { useState } from "react";
import { FormActions } from "components/FormActions";
import { parseCommand } from "utils/parse";
import { roll } from "utils/roll";
import { Roll } from "types";
import { RollInfo } from "components/RollInfo";
import { RollType } from "enums";
import Style = Toast.Style;

export default function main() {
  const [result, setResult] = useState<number>();
  const [rolls, setRolls] = useState<Roll[]>();
  const [type, setType] = useState<RollType>();

  const handleSubmit = async (values: Form.Values) => {
    const { dice } = values;

    const parsed = parseCommand(dice);

    if (parsed) {
      const { times, die, type } = parsed;
      const [result, allRolls] = roll({ times, die, type });

      setResult(result);
      setRolls(allRolls);
      setType(type);

      await Clipboard.copy(result);
      await showToast({ message: "Copied to clipboard. ", title: `You rolled - ${result}` });
    } else {
      await showToast({ style: Style.Failure, message: `Incorrect format`, title: "Error" });
    }
  };

  return (
    <Form actions={<FormActions onSubmit={handleSubmit} />}>
      <Form.TextField id={"dice"} title={"Enter dice"} placeholder={"Input dice combination "} />
      <Form.Description text={"Some examples - 2d20, 3d6, d8, d20:dis, d6:adv"} />

      <Form.Description title={"🐉 Result:"} text={`${result || "—"}`} />

      <Form.Description text={" "} />

      {rolls?.map((roll, index) => (
        <RollInfo index={index} roll={roll} key={`${roll} + ${index}`} type={type} />
      ))}
    </Form>
  );
}
